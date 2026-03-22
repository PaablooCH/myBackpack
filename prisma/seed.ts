import { prisma } from "@/src/lib/prisma/prisma";

async function main() {
    const user = "2d053cf4-3e6d-407c-a5b5-dfcf13efaac6";

    const categories = await Promise.all(
        [0, 1, 2].map((i) =>
            prisma.category.upsert({
                where: { slug: `category-${i}` },
                update: {},
                create: {
                    name: `Category ${i}`,
                    slug: `category-${i}`,
                },
            })
        )
    );

    await Promise.all(
        Array.from({ length: 20 }).map((_, i) =>
            prisma.product.create({
                data: {
                    name: `Product ${i + 1}`,
                    description: `This is the product ${i + 1}`,
                    price: Math.random() * 100,
                    stock: Math.floor(Math.random() * 10),
                    lowStock: Math.floor(Math.random() * 10),
                    userId: user,
                    categories: {
                        connect: { id: categories[i % 3].id },
                    },
                },
            })
        )
    );
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
