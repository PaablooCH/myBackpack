export default function TagComponent({ name }: { name: string }) {
    return (
        <div className="px-2 py-1 rounded-full text-sm mr-2 mb-2 card-tag">
            {name}
        </div>
    )
}