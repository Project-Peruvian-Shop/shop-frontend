
type InputProps = {
    label: string;
    type: string;
    id: string;
    placeholder: string;
    onValidate: () => void;
}

const Input = ({label, type, id, placeholder, onValidate} : InputProps) => {
    return (
    <>
        <label htmlFor={id}>{label}</label>
        <input type={type} id={id} placeholder={placeholder} onInvalid={onValidate} />
    </>
    )
}

export default Input;