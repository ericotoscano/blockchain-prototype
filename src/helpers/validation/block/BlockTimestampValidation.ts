import { ValidationData } from "../../../types/response.types";

import { TimestampFormatValidation } from "../../../utils/DateFomatValidation";

export class BlockTimestampValidation {
  static validateFormat(timestamp: number): ValidationData {
    if (!timestamp || TimestampFormatValidation.validate(timestamp)) {
      const failData = {
        title: "Block Timestamp Format Validation",
        result: false,
        type: "Format Fail",
        code: 13,
        message:
          "The block timestamp was not provided or has an invalid format (it should be a number representing a timestamp).",
      };

      return failData;
    }

    const successData = {
      title: "Block Timestamp Format Validation",
      result: true,
      type: "Format Success",
      code: 13,
      message: "The block timestamp has a valid format.",
    };

    return successData;
  }
}
