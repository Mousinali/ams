"use server";

import { prisma } from "@/lib/prisma";
import { getSession, hashPassword, comparePassword, login } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function updateCredentialsAction(formData: FormData) {
  const session = await getSession();
  if (!session) return { success: false, error: "Not authenticated" };

  const username = formData.get("username") as string;
  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!username) return { success: false, error: "Username is required" };

  const user = await prisma.user.findFirst({
    where: { username: session.username },
  });

  if (!user) return { success: false, error: "User not found" };

  // 1. Verify current password
  const isValid = await comparePassword(currentPassword, user.password);
  if (!isValid) return { success: false, error: "Invalid current password" };

  // 2. If changing password, verify new password
  let hashedPassword = user.password;
  if (newPassword) {
    if (newPassword !== confirmPassword) {
      return { success: false, error: "New passwords do not match" };
    }
    if (newPassword.length < 6) {
      return { success: false, error: "New password must be at least 6 characters" };
    }
    hashedPassword = await hashPassword(newPassword);
  }

  // 3. Update DB
  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        username,
        password: hashedPassword,
      },
    });

    // Update the session cookie so the user stays logged in with the new username
    await login(username, user.id);

    revalidatePath("/settings");
    return { success: true };
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { success: false, error: "Username already taken" };
    }
    return { success: false, error: "Failed to update credentials" };
  }
}
