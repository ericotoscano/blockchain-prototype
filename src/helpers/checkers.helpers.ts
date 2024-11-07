import { CheckReturn, CheckerFunction } from '../types/check.types';

export const checkAll = (checkers: CheckerFunction[]): CheckReturn => {
  for (const checker of checkers) {
    const { result, message } = checker();

    if (!result) {
      return { result, message };
    }
  }

  return { result: true, message: 'All checks are okay' };
};
