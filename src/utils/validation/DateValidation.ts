export class TimestampFormatValidation {
  static validateFormat(data: number): boolean {
    const date = new Date(data);

    return !isNaN(date.getTime());
  }
}
