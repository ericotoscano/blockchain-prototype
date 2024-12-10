import { KeyDependenciesType } from '../../../../helpers/dependencies/types/DependenciesTypes';

export type NodeAddressCreationType = {
  create(data: string, keyDependencies: KeyDependenciesType): string;
};
