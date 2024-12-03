export class TimestampValidation {
  static validateFormat(data: number): boolean {
    const date = new Date(data);

    return !isNaN(date.getTime());
  }
}
