
type InputProps = {
    label: string;
    type: "text" | "number" | "textarea" | "select" | "radio-card";
    id: string;
    placeholder?: string; 
    options?: { value: string; label: string; description?: string }[]; 
    onValidate: () => void;
};


const Input = ({ label, type, id, placeholder, options, onValidate }: InputProps) => {
    return (
        <div>
            <label>{label}</label>
            {type === "textarea" ? (
            <textarea id={id} placeholder={placeholder} onInvalid={onValidate} rows={4} />
            ) : type === "select" ? (
            <select id={id} onInvalid={onValidate}>
                <option value="">Seleccione una opción</option>
                {options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
                ))}
            </select>
            ) : type === "radio-card" ? (
            <div>
                {options?.map((opt) => (
                <label
                    key={opt.value}
                >
                    <strong>{opt.label}</strong>
                    <p>{opt.description}</p>
                    <input type="radio" name={id} value={opt.value} />
                </label>
                ))}
            </div>
            ) : (
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                onInvalid={onValidate}
            />
            )}
        </div>
    );    
};  

export default Input;