import { ValidationData } from "../../../types/response.types";

export class BlockNonceValidation {
  static validateFormat(nonce: number): ValidationData {
    if (
      !nonce ||
      nonce < 0 ||
      !Number.isInteger(nonce) ||
      typeof nonce !== "number"
    ) {
      const failData = {
        title: "Block Nonce Format Validation",
        result: false,
        type: "Format Fail",
        code: 13,
        message:
          "The block nonce was not provided or has an invalid format (it should be a positive integer number).",
      };

      return failData;
    }

    const successData = {
      title: "Block Nonce Format Validation",
      result: true,
      type: "Format Success",
      code: 13,
      message: "The block nonce has a valid format.",
    };

    return successData;
  }
}
