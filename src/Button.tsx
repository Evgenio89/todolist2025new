export type ButtonType = {
    title: string
    onClick?: () => void
    className?: string
}

export const Button = ({
                           title,
                           onClick,
                           className
                       }: ButtonType) => {
    return (
        <button className={className} onClick={onClick}>{title}</button>
    )
}