"use client";
import { FormField } from "@/app/components/molecules/FormField";
import { useState } from "react";
import styles from "./AuthForm.module.css"; // Assuming you have a CSS module for styles
import { Button } from "../../atoms/Button"; // Assuming you have a Button component
import { Input } from "../../atoms/Input";

interface FormState {
    username: string;
    password: string;
    isLoading: boolean;
}

export const AuthForm = () => {
    const [formData, setFormData] = useState<FormState>({
        username: "",
        password: "",
        isLoading: false,
    });
    const [errors, setErrors] = useState<{
        username?: string;
        password?: string;
    }>({});

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Add your submit logic here
    };

    const handleUsernameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({ ...formData, username: event.target.value });
    };

    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({ ...formData, password: event.target.value });
    };

    const validateUsername = () => {
        if (formData.username.length < 3) {
            setErrors((prev) => ({
                ...prev,
                username: "Username must be at least 3 characters",
            }));
        } else {
            setErrors((prev) => ({ ...prev, username: undefined }));
        }
    };

    const validatePassword = () => {
        if (formData.password.length < 6) {
            setErrors((prev) => ({
                ...prev,
                password: "Password must be at least 6 characters",
            }));
        } else {
            setErrors((prev) => ({ ...prev, password: undefined }));
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <FormField
                label="Username"
                error={errors.username}
                inputId="username"
            >
                <Input
                    type="text"
                    value={formData.username}
                    onChange={handleUsernameChange}
                    onBlur={validateUsername}
                />
            </FormField>
            <FormField
                label="Password"
                error={errors.password}
                inputId="password"
            >
                <Input
                    type="password"
                    value={formData.password}
                    onChange={handlePasswordChange}
                    onBlur={validatePassword}
                />
            </FormField>
            <Button type="submit" isLoading={formData.isLoading}>
                Submit
            </Button>
        </form>
    );
};
