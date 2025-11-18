import { prisma } from '../prisma';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';

/**
 * Finds a user by their email address.
 * @param email The email address of the user to find.
 * @returns The user object if found, otherwise null.
 */
export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

/**
 * Finds a user by their ID.
 * @param id The ID of the user to find.
 * @param select Optional object to select specific fields.
 * @returns The user object if found, otherwise null.
 */
export const findUserById = async <T extends Prisma.UserSelect>(id: string, select?: T) => {
  return prisma.user.findUnique({
    where: { id },
    ...(select && { select }),
  });
};

/**
 * Creates a new user.
 * @param data The user data.
 * @returns The newly created user.
 */
export const createUser = async (data: Prisma.UserCreateInput) => {
  return prisma.user.create({
    data,
  });
};

/**
 * Updates a user's data.
 * @param id The ID of the user to update.
 * @param data The data to update.
 * @returns The updated user.
 */
export const updateUser = async (id: string, data: Prisma.UserUpdateInput) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

/**
 * Changes a user's password.
 * @param id The ID of the user.
 * @param newPassword The new password.
 */
export const changePassword = async (id: string, newPassword: string) => {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return prisma.user.update({
        where: { id },
        data: { password: hashedPassword },
    });
};

/**
 * Deletes a user account after verifying their password.
 * @param id The ID of the user to delete.
 * @param password The user's current password for verification.
 * @returns A boolean indicating if the deletion was successful.
 */
export const deleteAccount = async (id: string, password: string): Promise<boolean> => {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user || !user.password) {
        return false;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return false;
    }

    await prisma.user.delete({ where: { id } });
    return true;
};

/**
 * Creates a password reset token.
 * @param userId The ID of the user.
 * @param token The reset token.
 * @param expiresAt The token expiration date.
 */
export const createPasswordResetToken = async (userId: string, token: string, expiresAt: Date) => {
  return prisma.passwordResetToken.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  });
};

/**
 * Retrieves a password reset token.
 * @param token The token to retrieve.
 */
export const getPasswordResetToken = async (token: string) => {
  return prisma.passwordResetToken.findUnique({
    where: { token },
  });
};

/**
 * Deletes a password reset token.
 * @param token The token to delete.
 */
export const deletePasswordResetToken = async (token: string) => {
  return prisma.passwordResetToken.delete({
    where: { token },
  });
};

/**
 * Gets all users.
 */
export const getAllUsers = async () => {
  return prisma.user.findMany();
};

/**
 * Pings the database to check the connection.
 */
export const pingDb = async () => {
  // Use a lightweight query to check the connection.
  return prisma.$queryRaw`SELECT 1`;
};
