const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
    console.log("Creando usuario administrador maestro...");

    const email = "juangarcia@ccurity.com.mx";
    const password = "E4ae5d6c0c.";
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.upsert({
            where: { email },
            update: {
                password: hashedPassword,
                role: "admin",
                name: "Juan Garcia",
            },
            create: {
                email,
                password: hashedPassword,
                role: "admin",
                name: "Juan Garcia",
                adminProfile: {
                    create: {
                        displayRole: "Administrador",
                    }
                }
            }
        });

        const adminProfile = await prisma.adminProfile.findUnique({
            where: { userId: user.id }
        });

        if (!adminProfile) {
            await prisma.adminProfile.create({
                data: {
                    userId: user.id,
                    displayRole: "Administrador"
                }
            });
        }

        console.log(`✅ Admin master creado exitosamente con ID: ${user.id}`);
        console.log(`📧 Email: ${email}`);
        console.log(`🔑 Contraseña: [ENCRIPTADA Y ACTUALIZADA]`);

    } catch (e) {
        console.error("❌ Error al crear el administrador:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
