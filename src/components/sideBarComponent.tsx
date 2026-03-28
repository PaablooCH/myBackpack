'use client';
import { FaArchive, FaChartBar } from "react-icons/fa";
import UserInfoComponent from "./userInfoComponent/userInfoComponent";
import { JSX } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Item = {
    icon: JSX.Element;
    name: string;
    link: string;
}

export default function SideBarComponent() {
    const pathname = usePathname()
    const sidebarItems: Item[] = [
        {
            icon: <FaChartBar />,
            name: "Dashboard",
            link: "/dashboard"
        },
        {
            icon: <FaArchive />,
            name: "Inventory",
            link: "/inventory"
        },
    ]
    return (
        <nav className="h-screen w-64 py-4 sidebar flex flex-col overflow-hidden shrink-0 fixed">
            <div className="flex items-center gap-4 text-(--sidebar-text) font-bold px-2 py-2.5">
                <FaChartBar className="size-8"></FaChartBar>
                <h1 className="text-2xl ">MyBackpack</h1>
            </div>
            <ul className="px-2 space-y-1 grow overflow-auto">
                { sidebarItems.map((item, index) => {
                    return (
                        <li key={index}>
                            <Link href={item.link}>
                                <div className={`flex items-center gap-2 sidebar-item px-2 rounded-xl ${pathname === item.link ? "active" : ""}`}>
                                    {item.icon}
                                    <span>{item.name}</span>
                                </div>
                            </Link>
                        </li>
                    )
                })}
            </ul>
            <div className="border-t border-gray-300 pt-4">
                <UserInfoComponent />
            </div>
        </nav>
    );
}