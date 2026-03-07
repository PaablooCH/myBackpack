export function UserInfoSkeleton() {
    return (
        <div className="flex items-center gap-2 mx-2 px-2">
            {/* User Avatar Skeleton */}
            <div className="w-6 h-6 rounded-full bg-linear-to-r from-gray-300 to-gray-200 animate-pulse shrink-0" />
            
            {/* User Name Skeleton */}
            <div className="flex flex-col flex-1 gap-2">
                <div className="h-4 bg-linear-to-r from-gray-300 to-gray-200 rounded animate-pulse w-full" />
                <div className="h-4 bg-linear-to-r from-gray-300 to-gray-200 rounded animate-pulse w-full" />
            </div>
        </div>
    );
}
