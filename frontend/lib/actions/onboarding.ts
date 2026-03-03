"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs/server";

export async function completeOnboarding(role: "brand" | "writer") {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("User not authenticated");
    }

    try {
        const client = await clerkClient();
        await client.users.updateUser(userId, {
            publicMetadata: {
                role,
            },
        });
        return { success: true };
    } catch (error) {
        console.error("Failed to update user metadata:", error);
        return { success: false, error: "Failed to save role" };
    }
}
