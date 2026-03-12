import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function main() {
    const hash = "$2b$10$iT9XTWDoXp6Ncn3K549BletMrRICQ2j6QjeOvr2pLqtwVU4bN3c.6";

    const user = await prisma.user.create({
        data: {
            email: 'juangarcia@ccurity.com.mx',
            password: hash,
            name: 'Juan Garcia',
            role: 'admin',
            adminProfile: {
                create: {
                    displayRole: 'Administrador Principal'
                }
            }
        }
    });

    console.log('✅ Admin creado exitosamente con ID:', user.id)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
