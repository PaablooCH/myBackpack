import { prisma } from "@/src/db";

async function main() {
    const user = "2d053cf4-3e6d-407c-a5b5-dfcf13efaac6";

    await prisma.category.createMany({
        data: Array.from({ length: 3 }).map((_, i) => ({
            name: `Category ${i + 1}`,
            slug: `category-${i + 1}`,
        })),
    });

    await prisma.product.createMany({
        data: Array.from({ length: 20 }).map((_, i) => ({
            name: `Product ${i + 1}`,
            description: `This is the product ${i + 1}`,
            price: Math.random() * 100,
            stock: Math.floor(Math.random() * 100),
            lowStock: i,
            userId: user,
        })),
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
