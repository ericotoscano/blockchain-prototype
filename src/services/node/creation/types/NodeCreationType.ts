import { KeyDependenciesType, NodeDependenciesType } from '../../../../helpers/dependencies/types/DependenciesTypes';
import { INode } from '../../../../types/INode';

export type NodeCreationType = {
  create(keyDependencies: KeyDependenciesType, nodeDependencies: NodeDependenciesType): INode;
};
