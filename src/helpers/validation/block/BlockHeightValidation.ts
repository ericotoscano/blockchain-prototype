import { ValidationData } from "../../../types/response.types";

export class BlockHeightValidation {
  static validateFormat(height: number): ValidationData {
    if (
      !height ||
      height < 0 ||
      !Number.isInteger(height) ||
      typeof height !== "number"
    ) {
      const failData = {
        title: "Block Height Format Validation",
        result: false,
        type: "Format Fail",
        code: 13,
        message:
          "The block height was not provided or has an invalid format (it should be a positive integer number).",
      };

      return failData;
    }

    const successData = {
      title: "Block Height Format Validation",
      result: true,
      type: "Format Success",
      code: 13,
      message: "The block height has a valid format.",
    };

    return successData;
  }
}
