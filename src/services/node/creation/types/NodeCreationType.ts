import { KeyDependenciesType, NodeDependenciesType } from '../../../../shared/helpers/DependenciesTypes';
import { INode } from '../../../../domain/types/INode';

export type NodeCreationType = {
  create(keyDependencies: KeyDependenciesType, nodeDependencies: NodeDependenciesType): INode;
};
