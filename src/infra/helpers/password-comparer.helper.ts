import { compare } from 'bcrypt';

export const validatePasswords = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return compare(password, hashedPassword);
};
