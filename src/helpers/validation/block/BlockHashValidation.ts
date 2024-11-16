import { BlockForPatchRequest } from "../../../types/request.types";
import { ValidationData } from "../../../types/response.types";

import { HashCreationType } from "../../../utils/HashCreation";
import { HexStringFormatValidation } from "../../../utils/HexStringFormatValidation";

export class BlockHashValidation {
  static validateFormat(hash: string): ValidationData {
    if (!hash || !HexStringFormatValidation.validate(hash, 64)) {
      const failData = {
        title: "Block Hash Format Validation",
        result: false,
        type: "Format Fail",
        code: 13,
        message:
          "The block hash was not provided or has an invalid format (it should be an hex 64 string).",
      };

      return failData;
    }

    const successData = {
      title: "Block Hash Format Validation",
      result: true,
      type: "Format Success",
      code: 13,
      message: "The block hash has a valid format.",
    };

    return successData;
  }

  static validateExpectedHash(
    block: BlockForPatchRequest,
    target: string,
    hashCreation: HashCreationType
  ) {
    const { height, nonce, hash, previousHash, transactions, timestamp } =
      block;

    const expectedHash = hashCreation.hash(
      `${height}${nonce}${previousHash}${JSON.stringify(
        transactions
      )}${timestamp}`
    );

    if (BigInt("0x" + expectedHash) >= BigInt("0x" + target)) {
      const failData = {
        title: "Block Expected Hash Validation",
        result: false,
        type: "Target Difficulty Matching Fail",
        code: 13,
        message:
          "The block hash does not match with the required blockchain target difficulty.",
      };

      return failData;
    }

    if (expectedHash !== hash) {
      const failData = {
        title: "Block Expected Hash Validation",
        result: false,
        type: "Expected Hash Matching Fail",
        code: 13,
        message: "The block hash does not match with the expected hash.",
      };

      return failData;
    }

    const successData = {
      title: "Block Expected Hash Validation",
      result: true,
      type: "Expected Hash Matching Success",
      code: 13,
      message: "The block hash match with the expected hash.",
    };

    return successData;
  }
}
