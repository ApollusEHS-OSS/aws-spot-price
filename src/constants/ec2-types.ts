export const instanceFamilyGeneral = [
  'a1',
  't1',
  't2',
  't3',
  't3a',
  'm1',
  'm2',
  'm3',
  'm4',
  'm5',
  'm5a',
  'm5ad',
  'm5d',
  'm5dn',
  'm5n',
] as const;

export const instanceFamilyCompute = ['c1', 'c3', 'c4', 'c5', 'c5d', 'c5n'] as const;

export const instanceFamilyMemory = [
  'r3',
  'r4',
  'r5',
  'r5a',
  'r5ad',
  'r5d',
  'r5dn',
  'r5n',
  'x1',
  'x1e',
  'z1d',
] as const;

export const instanceFamilyStorage = ['d2', 'h1', 'i2', 'i3', 'i3en', 'inf1'] as const;

export const instanceFamilyAcceleratedComputing = [
  'f1',
  'g2',
  'g3',
  'g3s',
  'g4dn',
  'p2',
  'p3',
  'p3dn',
] as const;

export const instanceFamily = {
  general: instanceFamilyGeneral,
  compute: instanceFamilyCompute,
  memory: instanceFamilyMemory,
  storage: instanceFamilyStorage,
  acceleratedComputing: instanceFamilyAcceleratedComputing,
};

export type InstanceFamily = keyof typeof instanceFamily;

export const instanceFamilyTypes = [
  ...instanceFamilyGeneral,
  ...instanceFamilyCompute,
  ...instanceFamilyMemory,
  ...instanceFamilyStorage,
  ...instanceFamilyAcceleratedComputing,
];

export type InstanceFamilyType = typeof instanceFamilyTypes[number];

export const instanceSizes = [
  'nano',
  'micro',
  'small',
  'medium',
  'large',
  'xlarge',
  '2xlarge',
  '3xlarge',
  '4xlarge',
  '6xlarge',
  '8xlarge',
  '9xlarge',
  '10xlarge',
  '12xlarge',
  '16xlarge',
  '18xlarge',
  '24xlarge',
  '32xlarge',
  'metal',
] as const;

export type InstanceSize = typeof instanceSizes[number];

export const allInstances = [
  'a1.medium',
  'a1.large',
  'a1.xlarge',
  'a1.2xlarge',
  'a1.4xlarge',
  'a1.metal',
  't1.micro',
  't2.micro',
  't2.small',
  't2.medium',
  't2.large',
  't2.xlarge',
  't2.2xlarge',
  't3.nano',
  't3.micro',
  't3.small',
  't3.medium',
  't3.large',
  't3.xlarge',
  't3.2xlarge',
  't3a.nano',
  't3a.micro',
  't3a.small',
  't3a.medium',
  't3a.large',
  't3a.xlarge',
  't3a.2xlarge',
  'm1.small',
  'm1.medium',
  'm1.large',
  'm1.xlarge',
  'm2.xlarge',
  'm2.2xlarge',
  'm2.4xlarge',
  'm3.medium',
  'm3.large',
  'm3.xlarge',
  'm3.2xlarge',
  'm4.large',
  'm4.xlarge',
  'm4.2xlarge',
  'm4.4xlarge',
  'm4.10xlarge',
  'm4.16xlarge',
  'm5.large',
  'm5.xlarge',
  'm5.2xlarge',
  'm5.4xlarge',
  'm5.8xlarge',
  'm5.12xlarge',
  'm5.16xlarge',
  'm5.24xlarge',
  'm5.metal',
  'm5a.large',
  'm5a.xlarge',
  'm5a.2xlarge',
  'm5a.4xlarge',
  'm5a.8xlarge',
  'm5a.12xlarge',
  'm5a.16xlarge',
  'm5a.24xlarge',
  'm5ad.large',
  'm5ad.xlarge',
  'm5ad.2xlarge',
  'm5ad.4xlarge',
  'm5ad.8xlarge',
  'm5ad.12xlarge',
  'm5ad.16xlarge',
  'm5ad.24xlarge',
  'm5d.large',
  'm5d.xlarge',
  'm5d.2xlarge',
  'm5d.4xlarge',
  'm5d.8xlarge',
  'm5d.12xlarge',
  'm5d.16xlarge',
  'm5d.24xlarge',
  'm5d.metal',
  'm5dn.large',
  'm5dn.xlarge',
  'm5dn.2xlarge',
  'm5dn.4xlarge',
  'm5dn.8xlarge',
  'm5dn.12xlarge',
  'm5dn.16xlarge',
  'm5dn.24xlarge',
  'm5n.large',
  'm5n.xlarge',
  'm5n.2xlarge',
  'm5n.4xlarge',
  'm5n.8xlarge',
  'm5n.12xlarge',
  'm5n.16xlarge',
  'm5n.24xlarge',
  'c1.medium',
  'c1.xlarge',
  'c3.large',
  'c3.xlarge',
  'c3.2xlarge',
  'c3.4xlarge',
  'c3.8xlarge',
  'c4.large',
  'c4.xlarge',
  'c4.2xlarge',
  'c4.4xlarge',
  'c4.8xlarge',
  'c5.large',
  'c5.xlarge',
  'c5.2xlarge',
  'c5.4xlarge',
  'c5.9xlarge',
  'c5.12xlarge',
  'c5.18xlarge',
  'c5.24xlarge',
  'c5.metal',
  'c5d.large',
  'c5d.xlarge',
  'c5d.2xlarge',
  'c5d.4xlarge',
  'c5d.9xlarge',
  'c5d.12xlarge',
  'c5d.18xlarge',
  'c5d.24xlarge',
  'c5d.metal',
  'c5n.large',
  'c5n.xlarge',
  'c5n.2xlarge',
  'c5n.4xlarge',
  'c5n.9xlarge',
  'c5n.18xlarge',
  'c5n.metal',
  'r3.large',
  'r3.xlarge',
  'r3.2xlarge',
  'r3.4xlarge',
  'r3.8xlarge',
  'r4.large',
  'r4.xlarge',
  'r4.2xlarge',
  'r4.4xlarge',
  'r4.8xlarge',
  'r4.16xlarge',
  'r5.large',
  'r5.xlarge',
  'r5.2xlarge',
  'r5.4xlarge',
  'r5.8xlarge',
  'r5.12xlarge',
  'r5.16xlarge',
  'r5.24xlarge',
  'r5.metal',
  'r5a.large',
  'r5a.xlarge',
  'r5a.2xlarge',
  'r5a.4xlarge',
  'r5a.8xlarge',
  'r5a.12xlarge',
  'r5a.16xlarge',
  'r5a.24xlarge',
  'r5ad.large',
  'r5ad.xlarge',
  'r5ad.2xlarge',
  'r5ad.4xlarge',
  'r5ad.8xlarge',
  'r5ad.12xlarge',
  'r5ad.16xlarge',
  'r5ad.24xlarge',
  'r5d.large',
  'r5d.xlarge',
  'r5d.2xlarge',
  'r5d.4xlarge',
  'r5d.8xlarge',
  'r5d.12xlarge',
  'r5d.16xlarge',
  'r5d.24xlarge',
  'r5d.metal',
  'r5dn.large',
  'r5dn.xlarge',
  'r5dn.2xlarge',
  'r5dn.4xlarge',
  'r5dn.8xlarge',
  'r5dn.12xlarge',
  'r5dn.16xlarge',
  'r5dn.24xlarge',
  'r5n.large',
  'r5n.xlarge',
  'r5n.2xlarge',
  'r5n.4xlarge',
  'r5n.8xlarge',
  'r5n.12xlarge',
  'r5n.16xlarge',
  'r5n.24xlarge',
  'x1.16xlarge',
  'x1.32xlarge',
  'x1e.xlarge',
  'x1e.2xlarge',
  'x1e.4xlarge',
  'x1e.8xlarge',
  'x1e.16xlarge',
  'x1e.32xlarge',
  'z1d.large',
  'z1d.xlarge',
  'z1d.2xlarge',
  'z1d.3xlarge',
  'z1d.6xlarge',
  'z1d.12xlarge',
  'z1d.metal',
  'd2.xlarge',
  'd2.2xlarge',
  'd2.4xlarge',
  'd2.8xlarge',
  'h1.2xlarge',
  'h1.4xlarge',
  'h1.8xlarge',
  'h1.16xlarge',
  'i2.xlarge',
  'i2.2xlarge',
  'i2.4xlarge',
  'i2.8xlarge',
  'i3.large',
  'i3.xlarge',
  'i3.2xlarge',
  'i3.4xlarge',
  'i3.8xlarge',
  'i3.16xlarge',
  'i3.metal',
  'i3en.large',
  'i3en.xlarge',
  'i3en.2xlarge',
  'i3en.3xlarge',
  'i3en.6xlarge',
  'i3en.12xlarge',
  'i3en.24xlarge',
  'i3en.metal',
  'inf1.xlarge',
  'inf1.2xlarge',
  'inf1.6xlarge',
  'inf1.24xlarge',
  'f1.2xlarge',
  'f1.4xlarge',
  'f1.16xlarge',
  'g2.2xlarge',
  'g2.8xlarge',
  'g3.4xlarge',
  'g3.8xlarge',
  'g3.16xlarge',
  'g3s.xlarge',
  'g4dn.xlarge',
  'g4dn.2xlarge',
  'g4dn.4xlarge',
  'g4dn.8xlarge',
  'g4dn.12xlarge',
  'g4dn.16xlarge',
  'p2.xlarge',
  'p2.8xlarge',
  'p2.16xlarge',
  'p3.2xlarge',
  'p3.8xlarge',
  'p3.16xlarge',
  'p3dn.24xlarge',
] as const;

export type InstanceType = typeof allInstances[number];
