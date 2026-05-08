"use server";

import { prisma } from "@/lib/prisma";
import { comparePassword, hashPassword, login } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { success: false, error: "Please enter both username and password" };
  }

  // Find user
  let user = await prisma.user.findUnique({
    where: { username },
  });

  // If no users exist at all, create the default admin
  const userCount = await prisma.user.count();
  if (userCount === 0 && username === "admin") {
    const hashedPassword = await hashPassword("123456");
    user = await prisma.user.create({
      data: {
        username: "admin",
        password: hashedPassword,
      },
    });
  }

  if (!user) {
    return { success: false, error: "Invalid credentials" };
  }

  const isValid = await comparePassword(password, user.password);

  if (!isValid) {
    return { success: false, error: "Invalid credentials" };
  }

  await login(user.username, user.id);
  redirect("/dashboard");
}

export async function logoutAction() {
  const { logout } = await import("@/lib/auth");
  await logout();
  redirect("/login");
}
