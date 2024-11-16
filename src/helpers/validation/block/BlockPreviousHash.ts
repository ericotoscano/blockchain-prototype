import { ValidationData } from "../../../types/response.types";

import { HexStringFormatValidation } from "../../../utils/HexStringFormatValidation";

export class BlockPreviousHashValidation {
  static validateFormat(previousHash: string): ValidationData {
    if (
      !previousHash ||
      !HexStringFormatValidation.validate(previousHash, 64)
    ) {
      const failData = {
        title: "Block Previous Hash Format Validation",
        result: false,
        type: "Format Fail",
        code: 13,
        message:
          "The block previous hash was not provided or has an invalid format (it should be an hex 64 string).",
      };

      return failData;
    }

    const successData = {
      title: "Block Previous Hash Format Validation",
      result: true,
      type: "Format Success",
      code: 13,
      message: "The block previous hash has a valid format.",
    };

    return successData;
  }

  static validateExpectedPreviousHash(
    previousHash: string,
    expectedPreviousHash: string
  ): ValidationData {
    if (previousHash !== expectedPreviousHash) {
      const failData = {
        title: "Block Expected Previous Hash Validation",
        result: false,
        type: "Expected Previous Hash Matching Fail",
        code: 13,
        message:
          "The block previous hash does not match with the last valid block hash in blockchain.",
      };

      return failData;
    }

    const successData = {
      title: "Block Expected Previous Hash Validation",
      result: true,
      type: "EExpected Previous Hash Matching Success",
      code: 13,
      message: "The block previous hash match with the expected previous hash.",
    };

    return successData;
  }
}
