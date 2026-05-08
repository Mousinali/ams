import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  console.log("Current Users in DB:");
  users.forEach(u => console.log(`- ID: ${u.id}, Username: ${u.username}`));
  
  if (users.length > 1) {
    console.log("\nFound multiple users. You should probably delete the ones you don't need.");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
