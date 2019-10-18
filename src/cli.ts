import { sep } from 'path';
import * as yargs from 'yargs';

import {
  allInstances,
  instanceFamily,
  InstanceFamilyType,
  instanceFamilyTypes,
  InstanceSize,
  instanceSizes,
  InstanceType,
} from './ec2-types';
import { awsCredentialsCheck, defaults, getGlobalSpotPrices } from './lib';
import {
  allProductDescriptions,
  instanceOfProductDescription,
  ProductDescription,
  productDescriptionWildcards,
} from './product-description';
import { defaultRegions, Region } from './regions';

export const main = (argvInput?: string[]): Promise<void> =>
  new Promise((res, rej): void => {
    const y = yargs
      .scriptName('spot-price')
      .command(
        '$0',
        'get current AWS spot instance prices',
        {
          region: {
            alias: 'r',
            describe: 'AWS regions.',
            type: 'array',
            choices: defaultRegions,
            string: true,
          },
          instanceType: {
            alias: 'i',
            describe: 'EC2 type',
            type: 'array',
            choices: allInstances,
            string: true,
          },
          family: {
            describe: 'EC2 instance family.',
            type: 'array',
            string: true,
            choices: Object.keys(instanceFamily),
          },
          familyType: {
            alias: 'f',
            describe: 'EC2 instance family types. Requires `sizes` parameter.',
            type: 'array',
            string: true,
            choices: instanceFamilyTypes,
          },
          size: {
            alias: 's',
            describe: 'EC2 instance sizes. Requires `families` parameter.',
            type: 'array',
            choices: instanceSizes,
            string: true,
            // demandOption: true, // TEMP
          },
          limit: {
            alias: 'l',
            describe: 'Limit results output length',
            type: 'number',
            default: defaults.limit,
            coerce: (val: number | number[]): number | undefined => {
              if (typeof val === 'object') {
                return val.pop();
              }
              return val;
            },
          },
          priceMax: {
            alias: 'p',
            describe: 'Maximum price',
            type: 'number',
          },
          productDescription: {
            alias: 'd',
            describe:
              'Product descriptions. Choose `windows` or `linux` (all lowercase) as wildcard.',
            type: 'array',
            string: true,
            choices: [
              ...allProductDescriptions,
              ...(Object.keys(
                productDescriptionWildcards,
              ) as (keyof typeof productDescriptionWildcards)[]),
            ],
          },
          accessKeyId: {
            describe: 'AWS Access Key ID.',
            type: 'string',
          },
          secretAccessKey: {
            describe: 'AWS Secret Access Key.',
            type: 'string',
          },
        },

        async args => {
          try {
            const {
              region,
              instanceType,
              family,
              familyType,
              size,
              limit,
              priceMax,
              productDescription,
              accessKeyId,
              secretAccessKey,
            } = args;

            if ((!familyType && size) || (familyType && !size)) {
              console.log('`familyTypes` or `sizes` attribute missing.');
              rej();
              return;
            }

            const familyTypeSet = new Set<InstanceFamilyType>();
            if (familyType) {
              (familyType as InstanceFamilyType[]).forEach(t => {
                familyTypeSet.add(t);
              });
            }

            const sizeSet = new Set<InstanceSize>();
            if (size) {
              (size as InstanceSize[]).forEach(s => {
                sizeSet.add(s);
              });
            }

            // process instance families
            if (family) {
              (family as (keyof typeof instanceFamily)[]).forEach(f => {
                instanceFamily[f].forEach((t: InstanceFamilyType) => {
                  familyTypeSet.add(t);
                  allInstances
                    .filter(instance => instance.startsWith(t))
                    .forEach(instance => {
                      sizeSet.add(instance.split('.').pop() as InstanceSize);
                    });
                });
              });
            }

            // process product description
            const productDescriptionsSet = new Set<ProductDescription>();
            if (productDescription) {
              (productDescription as (
                | ProductDescription
                | keyof typeof productDescriptionWildcards)[]).forEach(pd => {
                if (instanceOfProductDescription(pd)) {
                  productDescriptionsSet.add(pd);
                } else if (pd === 'linux') {
                  productDescriptionWildcards.linux.forEach(desc => {
                    productDescriptionsSet.add(desc);
                  });
                } else {
                  // `} else if (pd === 'windows') {`
                  // only windows wildcard case left: replaced with else for test coverage
                  productDescriptionWildcards.windows.forEach(desc => {
                    productDescriptionsSet.add(desc);
                  });
                }
              });
            }

            if (
              (accessKeyId !== undefined && secretAccessKey === undefined) ||
              (accessKeyId === undefined && secretAccessKey !== undefined)
            ) {
              console.log('`accessKeyId` & `secretAccessKey` should always be used together.');
              rej();
              return;
            }

            // test credentials
            const awsCredentialValidity = await awsCredentialsCheck({
              accessKeyId,
              secretAccessKey,
            });
            if (!awsCredentialValidity) {
              console.log('Invalid AWS credentials provided.');
              rej();
              return;
            }

            const productDescriptionsSetArray = Array.from(productDescriptionsSet);
            const familyTypeSetArray = Array.from(familyTypeSet);
            const sizeSetArray = Array.from(sizeSet);

            console.log('Querying current spot prices with options:');
            console.group();
            console.log('limit:', limit);
            if (region) console.log('regions:', region.join(', '));
            if (instanceType) console.log('instanceTypes:', instanceType.join(', '));
            if (familyTypeSetArray.length)
              console.log('familyTypes:', familyTypeSetArray.join(', '));
            if (sizeSetArray.length) console.log('sizes:', sizeSetArray.join(', '));
            if (priceMax) console.log('priceMax:', priceMax);
            if (productDescriptionsSetArray.length)
              console.log('productDescriptions:', productDescriptionsSetArray.join(', '));
            console.groupEnd();

            await getGlobalSpotPrices({
              regions: region as Region[],
              instanceTypes: instanceType as InstanceType[],
              familyTypes: familyTypeSetArray.length
                ? (familyTypeSetArray as InstanceFamilyType[])
                : undefined,
              sizes: sizeSetArray.length ? (sizeSetArray as InstanceSize[]) : undefined,
              limit,
              priceMax,
              productDescriptions: productDescriptionsSetArray.length
                ? productDescriptionsSetArray
                : undefined,
              accessKeyId,
              secretAccessKey,
            });

            res();
          } catch (error) {
            /* istanbul ignore next */
            console.log('unexpected getGlobalSpotPrices error:', JSON.stringify(error, null, 2));
            /* istanbul ignore next */
            rej();
          }
        },
      )
      .demandCommand()
      .help();

    if (argvInput) {
      y.exitProcess(false);
      y.parse(argvInput);
      if (argvInput.includes('--help')) res();
    } else {
      y.parse(process.argv);
    }

    /* istanbul ignore next */
    const cleanExit = (): void => {
      process.exit();
    };
    process.on('SIGINT', cleanExit); // catch ctrl-c
    process.on('SIGTERM', cleanExit); // catch kill
  });

/* istanbul ignore if */
if (
  require.main &&
  (require.main.filename === module.filename ||
    require.main.filename.endsWith(`${sep}bin${sep}aws-spot-price`))
) {
  (async (): Promise<void> => {
    await main();
  })();
}
