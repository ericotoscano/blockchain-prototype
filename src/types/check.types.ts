export type CheckReturn = {
  result: boolean;
  message: string;
};

export type CheckerFunction = () => CheckReturn;
