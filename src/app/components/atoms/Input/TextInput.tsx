import { Placeholders } from "@/app/core/configs";
import { isLetter } from "@/app/core/configs/utils";
import { ChangeEvent, useState } from "react";

interface TextInputProps {
    onLoginEnter: (value: string) => void;
    id: string;
}

const TextInput = ({ onLoginEnter, id }: TextInputProps) => {
    const input = {
        placeholder: Placeholders.TEXT_INPUT,
    };

    const maxValueLength = 100;

    const [value, setValue] = useState("");

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (isLetter(value) && value.length <= maxValueLength) {
            setValue(value);
        }

        onLoginEnter(value);
    };

    return (
        <input
            id={id}
            type="text"
            onChange={onChangeHandler}
            placeholder={input.placeholder}
            value={value}
        />
    );
};

export default TextInput;
