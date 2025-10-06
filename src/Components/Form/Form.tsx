import { routes } from "../../utils/routes";
import Button from "../Button";
import { Link } from "react-router-dom";
import style from "./Form.module.css";

type FieldType = "text" | "number" | "textarea" | "select";

type Field = {
	label: string;
	type: FieldType;
	id: string;
	placeholder?: string;
	options?: { value: string; label: string }[];
};

type FormProps = {
	title: string;
	fields: Field[];
	buttonText: string;
};

const Form = ({ title, fields, buttonText }: FormProps) => {
	const firstGroup = fields.slice(0, 4);
	const textAreaGroup = fields.filter((f) => f.type === "textarea");

	return (
		<div className={style.containerFormulario}>
			<form>
				<h3>{title}</h3>

				{/* Grupo de inputs */}
				<div className={style.inputGroup}>
					{firstGroup.map((field) => (
						<div className={style.inputWrapper} key={field.id}>
							<label htmlFor={field.id}>{field.label}</label>
							{field.type === "select" ? (
								<select id={field.id} name={field.id}>
									{field.options?.map((opt) => (
										<option key={opt.value} value={opt.value}>
											{opt.label}
										</option>
									))}
								</select>
							) : (
								<input
									type={field.type}
									id={field.id}
									name={field.id}
									placeholder={field.placeholder}
								/>
							)}
						</div>
					))}
				</div>

				{/* Textarea */}
				<div className={style.textareaGroup}>
					{textAreaGroup.map((field) => (
						<div className={style.inputWrapper} key={field.id}>
							<label htmlFor={field.id}>{field.label}</label>
							<textarea
								id={field.id}
								name={field.id}
								placeholder={field.placeholder}
							></textarea>
						</div>
					))}
				</div>

				<div className={style.termsBox}>
					<input type="checkbox" name="terms" id="terms" />
					<label htmlFor="terms">
						Acepto la{" "}
						<Link to={routes.privacy_policy}>política de privacidad</Link> y{" "}
						<Link to={routes.tyc}>los términos y condiciones</Link>
					</label>
					<Button text={buttonText} onClick={() => {}} css="" />
				</div>

			</form>
		</div>
	);
};

export default Form;
