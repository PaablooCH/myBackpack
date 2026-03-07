import Image from "next/image";
import { useSessionContext } from "../../app/providers/sessionProvider";
import { UserInfoSkeleton } from "./userInfoSkeleton";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

export default function UserInfoComponent() {
    const { user, loading } = useSessionContext();

    if (loading) {
        return <UserInfoSkeleton />;
    }

    if (!user) {
        return <div className="mx-2 px-2 text-gray-500">No user</div>;
    }

    return (
        <Link href={'/settings'} className="flex items-center gap-2 mx-2 px-2 rounded-md sidebar-item">
            { user.image != '{}' ? 
                <Image
                    src={user?.image}
                    alt="user image"
                    width={24}
                    height={24}
                    loading="eager"
                    className="rounded-full"
                /> :
                <FaUser className="w-6 h-6 rounded-full icon"></FaUser>
            }
            <div className="flex flex-col overflow-hidden">
                <span className="truncate">{user.name}</span>
                <span className="truncate text-sm text-gray-500">{user.email}</span>
            </div>
        </Link>
    );
}