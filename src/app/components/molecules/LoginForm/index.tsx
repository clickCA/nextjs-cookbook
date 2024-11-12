import { Labels, Placeholders, TestIDs } from "@/app/core/configs";
import { Input } from "../../atoms/Input";
import { Button } from "../../atoms/Button";

const LoginForm: React.FC = () => {
    const errorTestId = TestIDs.ERROR;
    return (
        <section>
            <div>
                <Input placeholder={Placeholders.TEXT_INPUT} />
            </div>
            <div>
                <Input placeholder={Placeholders.PASSWORD_INPUT} />
            </div>
            <div>
                <Button>{Labels.SUBMIT}</Button>
            </div>
            <div data-testid={errorTestId}></div>
        </section>
    );
};

export default LoginForm;
