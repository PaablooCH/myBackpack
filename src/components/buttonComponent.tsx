'use client'

type Props = {
    text: string,
    onClick: () => void,
    className?: string
}

export default function ButtonComponent({ text, onClick, className }: Props) {
    return (
        <button className={className} onClick={onClick}>
            {text}
        </button>
    )
}