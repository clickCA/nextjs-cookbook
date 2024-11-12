import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "@/app/components/atoms/Button";
import { Labels, Placeholders, TestIDs } from "../core/configs";
import { Input } from "../components/atoms/Input";
import TextInput from "../components/atoms/Input/TextInput";
import { makeLogin } from "../core/configs/utils";

interface TestObject {
    isTextInput: (s: typeof screen) => HTMLElement;
    isPasswordInput: (s: typeof screen) => HTMLElement;
    isSubmitButton: (s: typeof screen) => HTMLElement;
    isErrorField: (s: typeof screen) => HTMLElement;
}

const testObject: TestObject = {
    isTextInput: (screen) => {
        return screen.getByPlaceholderText(Placeholders.TEXT_INPUT);
    },
    isPasswordInput: (screen) => {
        return screen.getByPlaceholderText(Placeholders.PASSWORD_INPUT);
    },
    isSubmitButton: (screen) => {
        return screen.getByText(Labels.SUBMIT);
    },
    isErrorField: (screen) => {
        return screen.getByTestId(TestIDs.ERROR);
    },
};

const expectation = (element: HTMLElement) =>
    expect(element).toBeInTheDocument();

describe("UI inputs must render properly", () => {
    it("renders a text input", () => {
        render(<Input placeholder={Placeholders.TEXT_INPUT} />);

        expectation(testObject.isTextInput(screen));
    });

    it("renders a password input", () => {
        render(<Input placeholder={Placeholders.PASSWORD_INPUT} />);

        expectation(testObject.isPasswordInput(screen));
    });

    it("renders a submit button", () => {
        render(<Button>{Labels.SUBMIT}</Button>);

        expectation(testObject.isSubmitButton(screen));
    });

    it("Should render login input and check that it can take only English letters", () => {
        render(<TextInput id="login" onLoginEnter={(value) => value} />);

        const input = testObject.isTextInput(screen);

        expectation(testObject.isTextInput(screen));

        fireEvent.change(input, { target: { value: "おはようございます！" } });
        expect(input).toHaveDisplayValue("");

        const generatedLogin = makeLogin(101);

        fireEvent.change(input, { target: { value: generatedLogin } });
        expect(input).toHaveDisplayValue("");
    });
});
