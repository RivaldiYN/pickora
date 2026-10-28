"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { loginSchema, type LoginInput } from "@/lib/validations";

export async function loginAction(data: LoginInput) {
  const parsed = loginSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please provide a valid email and password",
    };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false,
    });

    return {
      success: true,
      message: "Signed in successfully",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            success: false,
            message: "Invalid email or password",
          };
        default:
          return {
            success: false,
            message: "Authentication failed. Please try again.",
          };
      }
    }
    throw error;
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/login" });
}
