import { ReactNode } from "react";

type Props = {
    children: ReactNode,
    title: string,
    className?: string,
}

export default function CardComponent({ children, title, className }: Props) {
    return (
        <div className={`card ${className}`}>
            <h2 className="card-headline font-bold text-lg">{title}</h2>
            { children }
        </div>
    );
}