// src/app/auth/page.tsx
"use client";

import { useState, FormEvent } from "react";
import styles from "./auth.module.css";

interface FormState {
    username: string;
    password: string;
    isLoading: boolean;
}

interface FormErrors {
    username?: string;
    password?: string;
}

const AuthPage = () => {
    const [formData, setFormData] = useState<FormState>({
        username: "",
        password: "",
        isLoading: false,
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const validateUsername = (username: string): string | undefined => {
        if (username.length < 3)
            return "Username must be at least 3 characters";
        if (username.length > 100)
            return "Username must be less than 100 characters";
        if (!/^[a-zA-Z]+$/.test(username))
            return "Username must contain only English letters";
        return undefined;
    };

    const validatePassword = (password: string): string | undefined => {
        if (password.length < 8)
            return "Password must be at least 8 characters";
        if (password.length > 50)
            return "Password must be less than 50 characters";
        if (!/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/.test(password))
            return "Password must contain at least one uppercase letter and one number";
        return undefined;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setFormData((prev) => ({ ...prev, isLoading: true }));

        // Add API call here
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setFormData((prev) => ({ ...prev, isLoading: false }));
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => {
                        const sanitized = e.target.value.replace(
                            /[^a-zA-Z]/g,
                            ""
                        );
                        setFormData((prev) => ({
                            ...prev,
                            username: sanitized,
                        }));
                    }}
                    onBlur={() => {
                        const error = validateUsername(formData.username);
                        setErrors((prev) => ({ ...prev, username: error }));
                    }}
                />
                {errors.username && (
                    <span className={styles.error}>{errors.username}</span>
                )}

                <input
                    className={styles.input}
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => {
                        const sanitized = e.target.value.replace(
                            /[^a-zA-Z0-9]/g,
                            ""
                        );
                        setFormData((prev) => ({
                            ...prev,
                            password: sanitized,
                        }));
                    }}
                    onBlur={() => {
                        const error = validatePassword(formData.password);
                        setErrors((prev) => ({ ...prev, password: error }));
                    }}
                />
                {errors.password && (
                    <span className={styles.error}>{errors.password}</span>
                )}

                <button
                    className={styles.button}
                    type="submit"
                    disabled={formData.isLoading}
                >
                    {formData.isLoading ? "Loading..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default AuthPage;
