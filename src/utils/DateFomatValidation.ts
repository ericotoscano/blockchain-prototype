export type DateFormatValidationType = {
  validate(data: Date): boolean;
};

export class TimestampFormatValidation {
  static validate(data: number): boolean {
    const date = new Date(data);

    return !isNaN(date.getTime());
  }
}
