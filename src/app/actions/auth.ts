"use server";

import { logout, createSession } from "@/lib/session";
import { login } from "@/lib/auth";
import { redirect } from "next/navigation";

interface LoginInput {
    email: string;
    password: string;
}

export async function loginAction(data: LoginInput) {
    const { email, password } = data;

    try {
        const user = await login({ email, password });

        await createSession({
            user: {
                _id: user._id,
                email: user.emailOrPhone,
                role: user.role,
                name: user.name,
            },
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: "An unexpected error occurred" };
    }

    redirect("/admin");
}

export async function logoutAction() {
    await logout();
    redirect("/admin/login");
}
