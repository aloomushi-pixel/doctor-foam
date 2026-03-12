const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    const bookings = await prisma.booking.findMany({
        orderBy: { createdAt: 'desc' },
        take: 1
    });
    console.log(JSON.stringify(bookings, null, 2));
}

check().catch(console.error).finally(() => prisma.$disconnect());
