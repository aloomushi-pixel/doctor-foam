import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const hash = await bcrypt.hash('E4ae5d6c0c.', 10);
    const email = 'juangarcia@ccurity.com.mx';

    const user = await prisma.user.upsert({
        where: { email },
        update: {
            password: hash,
            role: 'admin',
            name: 'Juan Garcia'
        },
        create: {
            email,
            name: 'Juan Garcia',
            password: hash,
            role: 'admin',
            adminProfile: {
                create: {
                    displayRole: 'Administrador Principal'
                }
            }
        }
    });

    const profile = await prisma.adminProfile.findUnique({ where: { userId: user.id } });
    if (!profile) {
        await prisma.adminProfile.create({ data: { userId: user.id, displayRole: 'Administrador Principal' } });
    }

    console.log('User seeded successfully: ' + user.email + ' as ' + user.role);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
