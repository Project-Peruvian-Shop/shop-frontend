import { routes } from "../utils/routes";
import Button from "./Button";
import Input from "./Input";
import { Link } from "react-router-dom";

type FieldType = "text" | "number" | "textarea" | "select" | "radio-card";

type Field = {
    label: string;
    type: FieldType; 
    id: string;
    placeholder?: string;
    options?: { value: string; label: string; description?: string }[]; 
};

type FormProps = {
    title: string;
    fields: Field[];
    buttonText: string;
};

const Form = ({ title, fields, buttonText }: FormProps) => {
    return (
    <div>
        <form>
            <div>
                <h3>{title}</h3>
                {fields.map((field) => (
                <Input
                    key={field.id}
                    label={field.label}
                    type={field.type}
                    id={field.id}
                    placeholder={field.placeholder}
                    options={field.options}
                    onValidate={() => {}}
                />
                ))}
            </div>

            <div>
                <input type="checkbox" name="terms" id="terms" />
                    <label htmlFor="terms">
                    Acepto la <Link to={routes.privacy_policy}>política de privacidad</Link> y
                    <Link to={routes.tyc}>los términos y condiciones</Link>
                </label>
                <Button
                    text={buttonText}
                    onClick={() => {}}
                    css=""
                />
            </div>
        </form>
    </div>
    );
};

export default Form;
