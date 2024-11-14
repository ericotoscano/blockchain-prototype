export type DateFormatValidationType = {
  validate(data: Date): boolean;
};

export class TimestampFormatValidation {
  static validate(data: Date): boolean {
    const date = new Date(data);

    return !isNaN(date.getTime());
  }
}
