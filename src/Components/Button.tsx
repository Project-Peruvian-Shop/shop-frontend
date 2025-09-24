
type ButtonProps = {
    text: string;
    onClick: () => void;
    css: string;
};
const Button = ({ text, onClick, css }: ButtonProps) => {
    return (
    <button onClick={onClick} className={css}>
        {text}
    </button>
    );
};

export default Button;