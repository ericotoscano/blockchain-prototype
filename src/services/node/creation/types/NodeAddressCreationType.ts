import { KeyDependenciesType } from '../../../../shared/helpers/DependenciesTypes';

export type NodeAddressCreationType = {
  create(data: string, keyDependencies: KeyDependenciesType): string;
};
