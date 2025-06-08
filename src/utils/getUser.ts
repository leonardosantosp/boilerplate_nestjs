import { PrismaService } from '@database/PrismaService';
import { NotFoundException } from '@nestjs/common';

export async function getUser(prisma: PrismaService, userId: number) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new NotFoundException(`User with id ${userId} not found`);
  }
  return user;
}
