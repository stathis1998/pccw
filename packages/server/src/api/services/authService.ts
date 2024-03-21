import bcrypt from "bcrypt";

const saltRounds = 10;

async function hashPassword(password: string): Promise<string> {
  try {
    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    throw new Error("Error hashing password");
  }
}

async function comparePasswords(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
}

export default {
  hashPassword,
  comparePasswords,
};
