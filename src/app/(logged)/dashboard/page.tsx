import CardComponent from "@/src/components/cardComponent";
import { prisma } from "@/src/lib/prisma/prisma";
import { RequireSession } from "@/src/lib/auth/server";
import { BiTrendingUp } from "react-icons/bi";
import { FaCircle } from "react-icons/fa";
import AreaChartComponent from "@/src/components/charts/areaChartComponent";
import PieChartComponent from "@/src/components/charts/pieChartComponent";
import { DataChart } from "@/src/types/charts/dataChart";

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
    const session = await RequireSession();
    const user = session?.user;

    const [totalProducts, lowCount, outStock, netValue, latest, categoriesProductQuery] = await Promise.all([
        prisma.product.findMany({
            where: { userId: user.id },
        }),
        prisma.product.count({where: {
            userId: user.id,
            lowStock: { not: null, gte: prisma.product.fields.stock },
            stock: {gt: 0}
        }}),
        prisma.product.count({where: {
            userId: user.id,
            stock: {equals: 0}
        }}),
        prisma.product.findMany({
            select: { price: true, stock: true },
            where: { stock: { gt: 0 }, userId: user.id}
        }),
        prisma.product.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' },
            take: 5
        }),
        prisma.category.findMany({
            where: {
                products: {
                    some: { userId: user.id }
                }
            },
            select: {
                name: true,
                products: {
                    where: {
                        userId: user.id,
                        stock: { gt: 0 }
                    },
                    select: {
                        price: true,
                        stock: true,
                    }
                }
            }
        })
    ]);

    const totalValue = netValue.reduce((sum, product) => sum + Number(product.price) * Number(product.stock), 0).toFixed(0);

    const productsByWeek: DataChart[] = [];
    for (let i = 11; i >= 0; i--) {
        const weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - i * 7);
        weekStart.setHours(0, 0, 0, 0);
        
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);

        const fmt = (d: Date) => 
            `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}`;
        const label = `${fmt(weekStart)}`

        const productsWeek = totalProducts.filter((product) => {
            const date = new Date(product.createdAt);
            return weekStart <= date && date <= weekEnd;
        } ).length;

        productsByWeek.push({name: label, value: productsWeek});
    }

    const categoriesProduct = categoriesProductQuery.map(c => ({
        name: c.name,
        totalValue: c.products.reduce((acc, p) => acc + Number(p.price) * p.stock, 0),
        productCount: c.products.length,
    }))

    const topCategoriesProducts = categoriesProduct;
    topCategoriesProducts.sort((a, b) => b.productCount - a.productCount);
    const top3Chart: DataChart[] = [];
    for (let i = 0; i < 3; i++)
    {
        top3Chart.push({name: topCategoriesProducts[i].name, value: Number(topCategoriesProducts[i].productCount)})
    }
    const otherCategories = netValue.length - top3Chart.reduce((sum, product) => sum + product.value, 0);
    if (otherCategories > 0)
    {
        top3Chart.push({name: 'Others', value: otherCategories})
    }
    
    categoriesProduct.sort((a, b) => b.totalValue - a.totalValue);

    return(
        <div className="min-h-screen w-full p-4 paragraph">
            <h1 className="uppercase text-5xl font-bold">Dashboard</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                {/* KEY METRICS */}
                <CardComponent title="Key metrics">
                    <div className="grid grid-cols-3 gap-4 p-4 mx-auto">
                        <div className="flex flex-col items-center gap-1">
                            <span className="paragraph text-3xl font-bold">{totalProducts.length}</span>
                            <span className="paragraph">Total products</span>
                            <div className="flex items-center text-sm text-green-400">
                                <span>+{totalProducts.length}</span>
                                <BiTrendingUp/>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-1">
                            <span className="paragraph text-3xl font-bold">{lowCount}</span>
                            <span className="paragraph">Low products</span>
                            <span className="text-sm text-red-400">+{lowCount}</span>
                        </div>

                        <div className="flex flex-col items-center gap-1">
                            <span className="paragraph text-3xl font-bold">{outStock}</span>
                            <span className="paragraph">Out of stock</span>
                            <span className={`text-sm ${outStock > 0 ? "text-red-400" : "text-green-400"}`}>
                                {outStock > 0 ? "Needs restock" : "No restock needed"}
                            </span>
                        </div>

                        <div className="flex flex-col items-center gap-1">
                            <span className="paragraph text-3xl font-bold">${totalValue}</span>
                            <span className="paragraph">Net value</span>
                            <div className="flex items-center text-sm text-green-400">
                                <span>+${totalValue}</span>
                                <BiTrendingUp/>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-1">
                            <span className="paragraph text-3xl font-bold">{categoriesProduct[0].name}</span>
                            <span className="paragraph">Worthest category</span>
                            <span className="text-sm paragraph">${categoriesProduct[0].totalValue.toFixed(0)}</span>
                        </div>

                        <div className="flex flex-col items-center gap-1">
                            <span className="paragraph text-3xl font-bold">{top3Chart[0].name}</span>
                            <span className="paragraph">Top category</span>
                            <span className="text-sm paragraph">{top3Chart[0].value} products</span>
                        </div>
                    </div>
                </CardComponent>

                {/* GRAPH */}
                <CardComponent title="New products per week">
                    <AreaChartComponent dataChart={productsByWeek} className="mt-2" />
                </CardComponent>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                {/* LAST FIVE MOVEMENTS */}
                <CardComponent title="Last five movements">
                    <div className="flex flex-col gap-4 mt-4">
                        { latest.map((product, key) => {
                            let className = '';
                            if (product.stock == 0) {
                                className += 'text-red-500'
                            }
                            else if (product.lowStock && product.stock <= product.lowStock) {
                                className += 'text-yellow-500'
                            }
                            else {
                                className += 'text-green-500'
                            }
                            return (
                                <div key={key} className="flex justify-between card-tag p-2 rounded-md">
                                    <span className="flex items-center gap-2">
                                        <FaCircle className={`size-2 ${className}`}/> { product.name } 
                                    </span>
                                    <span className={`${className}`}>{ product.stock } units</span>
                                </div>
                            );
                        }) }
                    </div>
                </CardComponent>
                {/* NUMBER OF PRODUCTS IN CATEGORIES */}
                <CardComponent title="Number of products in categories">
                    <PieChartComponent dataChart={top3Chart} />
                </CardComponent>
            </div>
        </div>
    )
}