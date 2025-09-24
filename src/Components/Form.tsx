import Button from "./Button";
import Input from "./Input";

const Form = () => {
    return (
        <div>
            <form>
                <div>
                    <h3>Datos Personales</h3>
                    <Input label="Nombre Completo/Razon Social*" type="text" id="fullName"  placeholder="Ingrese su nombre completo o de la empresa" onValidate={() => {}} />
                    <Input label="Número de documento*" type="number" id="documentNumber" placeholder="Ingrese su número de documento" onValidate={() => {}} />
                    <Input label="Teléfono/Celular*" type="number" id="phoneNumber" placeholder="Ingrese su número de teléfono o celular" onValidate={() => {}} />
                </div>
                <div>
                    <Input label="Comentario o Mensaje*" type="textarea" id="message" placeholder="Ingrese la consulta que desea realizar para poder atenderla de manera eficiente" onValidate={() => {}} />
                </div>
                <div>
                    <input type="checkbox" name="terms" id="terms" />
                    <label htmlFor="terms">Acepto la <a href="#">política de privacidad</a> y <a href="#">los términos y condiciones</a></label>
                    <Button text="Enviar" onClick={() => {}} css="background-color: blue; color: white;" />
                </div>
            </form>

        </div>
    )
}

export default Form;