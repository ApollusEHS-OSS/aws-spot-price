import { SpotPrice } from 'aws-sdk/clients/ec2';
import mockConsole, { RestoreConsole } from 'jest-mock-console';
import { filter } from 'lodash';
import nock from 'nock';

import { mockAwsCredentials, mockAwsCredentialsClear } from '../../test/mock-credential-endpoints';
import {
  mockDefaultRegionEndpoints,
  mockDefaultRegionEndpointsClear,
} from '../../test/mock-ec2-endpoints';
import { consoleMockCallJoin } from '../../test/utils';
import { InstanceFamilyType, InstanceSize } from '../constants/ec2-types';
import { ProductDescription } from '../constants/product-description';
import { Region } from '../constants/regions';
import { getGlobalSpotPrices } from './core';

describe('lib', () => {
  describe('getGlobalSpotPrices', () => {
    describe('run with default options', () => {
      let results: SpotPrice[];
      let restoreConsole: RestoreConsole;

      beforeAll(async () => {
        restoreConsole = mockConsole();
        mockDefaultRegionEndpoints();
        results = await getGlobalSpotPrices();
      });

      afterAll(() => {
        restoreConsole();
        mockDefaultRegionEndpointsClear();
      });

      it('should return expected values', () => {
        expect(results).toMatchSnapshot();
      });
    });

    describe('run with specific options', () => {
      let results: SpotPrice[];
      const familyTypes: InstanceFamilyType[] = ['c4', 'c5'];
      const sizes: InstanceSize[] = ['large', 'xlarge'];
      const productDescriptions: ProductDescription[] = ['Linux/UNIX'];

      beforeAll(async () => {
        mockDefaultRegionEndpoints({ maxLength: 5, returnPartialBlankValues: true });

        results = await getGlobalSpotPrices({
          familyTypes,
          sizes,
          productDescriptions,
          limit: 20,
        });
      });

      afterAll(() => {
        mockDefaultRegionEndpointsClear();
      });

      it('should return expected values', () => {
        expect(results).toBeDefined();
        expect(results.length).toEqual(20);
        if (results) {
          results.forEach(result => {
            expect(result.InstanceType).toBeDefined();
            expect(result.ProductDescription).toBeDefined();
            if (result.InstanceType && result.ProductDescription) {
              expect(
                familyTypes.includes(result.InstanceType.split('.').shift() as InstanceFamilyType),
              ).toBeTruthy();
              expect(
                sizes.includes(result.InstanceType.split('.').pop() as InstanceSize),
              ).toBeTruthy();
              expect(
                productDescriptions.includes(result.ProductDescription as ProductDescription),
              ).toBeTruthy();
            }
          });
        }
      });
    });

    describe('run with family type only', () => {
      let results: SpotPrice[];
      const familyTypes: InstanceFamilyType[] = ['c1', 'c3', 'c4'];

      beforeAll(async () => {
        mockDefaultRegionEndpoints({ maxLength: 5, returnPartialBlankValues: true });

        results = await getGlobalSpotPrices({
          familyTypes,
          limit: 20,
        });
      });

      afterAll(() => {
        mockDefaultRegionEndpointsClear();
      });

      it('should return expected values', () => {
        expect(results).toBeDefined();
        expect(results.length).toEqual(20);
        if (results) {
          results.forEach(result => {
            expect(result.InstanceType).toBeDefined();
            if (result.InstanceType) {
              expect(
                familyTypes.includes(result.InstanceType.split('.').shift() as InstanceFamilyType),
              ).toBeTruthy();
            }
          });
        }
      });
    });

    describe('run with family sizes only', () => {
      let results: SpotPrice[];
      const sizes: InstanceSize[] = ['small', 'medium', 'large'];

      beforeAll(async () => {
        mockDefaultRegionEndpoints({ maxLength: 5, returnPartialBlankValues: true });

        results = await getGlobalSpotPrices({
          sizes,
          limit: 20,
        });
      });

      afterAll(() => {
        mockDefaultRegionEndpointsClear();
      });

      it('should return expected values', () => {
        expect(results).toBeDefined();
        expect(results.length).toEqual(20);
        if (results) {
          results.forEach(result => {
            expect(result.InstanceType).toBeDefined();
            if (result.InstanceType) {
              expect(
                sizes.includes(result.InstanceType.split('.').pop() as InstanceSize),
              ).toBeTruthy();
            }
          });
        }
      });
    });

    describe('check instance types mix', () => {
      let results: SpotPrice[];

      beforeAll(async () => {
        mockDefaultRegionEndpoints();

        results = await getGlobalSpotPrices({
          familyTypes: ['c4', 'c5'],
          sizes: ['large', 'xlarge'],
          instanceTypes: ['c5.2xlarge'],
          productDescriptions: ['Linux/UNIX'],
          limit: 200,
        });
      });

      afterAll(() => {
        mockDefaultRegionEndpointsClear();
      });

      it('should contain all instance types', () => {
        const c4large = filter(results, { InstanceType: 'c4.large' });
        const c5large = filter(results, { InstanceType: 'c5.large' });
        const c4xlarge = filter(results, { InstanceType: 'c4.xlarge' });
        const c5xlarge = filter(results, { InstanceType: 'c5.xlarge' });
        const c52xlarge = filter(results, { InstanceType: 'c5.2xlarge' });
        expect(c4large.length).toBeGreaterThan(0);
        expect(c5large.length).toBeGreaterThan(0);
        expect(c4xlarge.length).toBeGreaterThan(0);
        expect(c5xlarge.length).toBeGreaterThan(0);
        expect(c52xlarge.length).toBeGreaterThan(0);
      });
    });

    describe('filter max price', () => {
      const priceMax = 0.0018;
      let results: SpotPrice[];

      beforeAll(async () => {
        mockDefaultRegionEndpoints();

        results = await getGlobalSpotPrices({
          priceMax,
        });
      });

      afterAll(() => {
        mockDefaultRegionEndpointsClear();
      });

      it(`should return prices less than ${priceMax}`, () => {
        results.forEach(r => {
          expect(parseFloat(r.SpotPrice || '0')).toBeLessThanOrEqual(priceMax);
        });
      });
    });

    describe('should handle error', () => {
      const region: Region = 'ap-east-1';
      let restoreConsole: RestoreConsole;

      beforeAll(() => {
        restoreConsole = mockConsole();
        mockAwsCredentials();
        nock(`https://ec2.${region}.amazonaws.com`)
          .persist()
          .post('/')
          .reply(400, '');
      });
      afterAll(() => {
        restoreConsole();
        mockAwsCredentialsClear();
        nock.cleanAll();
      });
      it('should console log error', async () => {
        await getGlobalSpotPrices({ regions: [region] });
        expect(console.error).toHaveBeenCalled();
        expect(consoleMockCallJoin('error')).toContain('unexpected getEc2SpotPrice error');
      });
    });
  });
});
