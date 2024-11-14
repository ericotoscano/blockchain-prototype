export type TargetManagementType = {
  calculate(targetZeros: number): string;
};

export class TargetManagement {
  static calculate(targetZeros: number): string {
    return '0'.repeat(targetZeros).concat('f', '0'.repeat(64 - targetZeros));
  }
}
