import { BlockForPatchRequest } from "../../../types/request.types";
import { ValidationData } from "../../../types/response.types";

export class BlockValidation {
  static validateFormat(block: BlockForPatchRequest): ValidationData {
    if (!block || typeof block !== "object" || Array.isArray(block)) {
      const failData = {
        title: "Block Format Validation",
        result: false,
        type: "Format Fail",
        code: 12,
        message: "The block was not provided or has an invalid format.",
      };

      return failData;
    }

    const successData = {
      title: "Block Format Validation",
      result: true,
      type: "Format Success",
      code: 10,
      message: "The block has a valid format.",
    };

    return successData;
  }
}
