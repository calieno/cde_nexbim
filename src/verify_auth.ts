import { AuthenticateUserUseCase } from "./useCases/authenticateUser/AuthenticateUserUseCase";
import { CreateUserController } from "./useCases/createUser/CreateUserController";
import { RefreshTokenUseCase } from "./useCases/refreshtoken/RefreshTokenUseCase";
import { client } from "./db/client";
import { hash } from "bcryptjs";
import { UUIDGenerator } from "./lib/UuidGenerator";

async function main() {
    console.log("Starting verification...");

    const username = "testuser_" + Date.now();
    const password = "password123";

    try {
        // 1. Create User directly in DB to avoid HTTP overhead for this test
        console.log("Creating test user...");
        const passwordHash = await hash(password, 8);
        const user = await client.user.create({
            data: {
                id: UUIDGenerator.generateUUIDv4(),
                username,
                password: passwordHash,
                name: "Test User",
                email: `${username}@example.com`,
                cellphone: "1234567890",
                created_at: Math.floor(Date.now() / 1000),
                updated_at: Math.floor(Date.now() / 1000)
            }
        });
        console.log("User created:", user.username);

        // 2. Authenticate
        console.log("Authenticating...");
        const authUseCase = new AuthenticateUserUseCase();
        const authResult = await authUseCase.execute({ username, password });

        console.log("Authentication successful!");
        console.log("Token:", authResult.vToken.substring(0, 20) + "...");
        console.log("Refresh Token ID:", authResult.vRefreshToken.id);

        // 3. Refresh Token
        console.log("Testing Refresh Token...");
        const refreshUseCase = new RefreshTokenUseCase();
        const refreshResult = await refreshUseCase.execute(authResult.vRefreshToken.id);

        console.log("Refresh Token successful!");
        console.log("New Token:", refreshResult.vToken.substring(0, 20) + "...");

        if (refreshResult.newToken) {
            console.log("New Refresh Token generated:", refreshResult.newToken.id);
        } else {
            console.log("Refresh Token reused (not expired yet).");
        }

        console.log("\nVERIFICATION PASSED ✅");

    } catch (error) {
        console.error("\nVERIFICATION FAILED ❌");
        console.error(error);
    } finally {
        await client.$disconnect();
    }
}

main();
