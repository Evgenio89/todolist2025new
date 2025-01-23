export type ButtonType = {
    title: string
    onClick?: () => void
}

export const Button = ({
                           title,
                           onClick
                       }: ButtonType) => {
    return (
        <button onClick={onClick}>{title}</button>
    )
}