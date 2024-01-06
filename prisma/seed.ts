import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password', 10); // Replace '10' with your chosen salt rounds

  await prisma.admin.create({
    data: {
      name: 'Admin',
      email: 'admin@example.com',
      password: hashedPassword,
    },
  });
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  });
