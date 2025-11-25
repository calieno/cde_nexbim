import { client } from "./db/client";
import { hash } from "bcryptjs";

async function seed() {
    console.log("Starting seed...");

    // Delete all refresh tokens first
    await client.refreshToken.deleteMany({});
    console.log("Deleted all refresh tokens");

    // Delete all users
    await client.user.deleteMany({});
    console.log("Deleted all users");

    const users = [
        // ADM (Level 4)
        { username: "admin", password: "admin123", name: "Administrator", email: "admin@test.com", cellphone: "1111111111", level: 4 },
        { username: "superadmin", password: "super123", name: "Super Administrator", email: "superadmin@test.com", cellphone: "1111111112", level: 4 },

        // Level 3
        { username: "manager3", password: "manager3", name: "Manager Level 3", email: "manager3@test.com", cellphone: "2222222222", level: 3 },
        { username: "supervisor3", password: "supervisor3", name: "Supervisor Level 3", email: "supervisor3@test.com", cellphone: "2222222223", level: 3 },

        // Level 2
        { username: "user2", password: "user2", name: "User Level 2", email: "user2@test.com", cellphone: "3333333333", level: 2 },
        { username: "employee2", password: "employee2", name: "Employee Level 2", email: "employee2@test.com", cellphone: "3333333334", level: 2 },

        // Level 1
        { username: "user1", password: "user1", name: "User Level 1", email: "user1@test.com", cellphone: "4444444444", level: 1 },
        { username: "guest1", password: "guest1", name: "Guest Level 1", email: "guest1@test.com", cellphone: "4444444445", level: 1 },
    ];

    for (const userData of users) {
        const passwordHash = await hash(userData.password, 8);
        const user = await client.user.create({
            data: {
                id: require('crypto').randomUUID(),
                username: userData.username,
                password: passwordHash,
                name: userData.name,
                email: userData.email,
                cellphone: userData.cellphone,
                level: userData.level,
                created_at: Math.floor(Date.now() / 1000),
                updated_at: Math.floor(Date.now() / 1000)
            }
        });
        console.log(`Created user: ${user.username} (Level ${user.level})`);
    }

    await client.$disconnect();
    console.log("Seed completed!");
}

seed().catch(console.error);
