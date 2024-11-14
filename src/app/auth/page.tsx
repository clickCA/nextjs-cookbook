// src/app/auth/page.tsx
"use client";

import { useState, FormEvent } from "react";
import styles from "./auth.module.css";
import { gql } from "@apollo/client";
import createApolloClient from "@/app/lib/apolloClient";
interface FormState {
    email: string;
    password: string;
    isLoading: boolean;
}

interface FormErrors {
    email?: string;
    password?: string;
}

const AuthPage = () => {
    const [formData, setFormData] = useState<FormState>({
        email: "",
        password: "",
        isLoading: false,
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const validateEmail = (email: string): string | undefined => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return "Invalid email address";
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

        const LOGIN_MUTATION = gql`
            mutation Login($email: String!, $password: String!) {
                login(email: $email, password: $password) {
                    _id
                    email
                    accessToken
                    refreshToken
                }
            }
        `;

        const client = createApolloClient();

        const { data, errors: mutationErrors } = await client.mutate({
            mutation: LOGIN_MUTATION,
            variables: {
                email: formData.email,
                password: formData.password,
            },
        });

        if (mutationErrors) {
            setErrors((prev) => ({
                ...prev,
                email: mutationErrors.message,
            }));
        } else {
            console.log("Login successful:", data);
        }
        setFormData((prev) => ({ ...prev, isLoading: false }));
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    className={styles.input}
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => {
                        setFormData((prev) => ({
                            ...prev,
                            email: e.target.value,
                        }));
                    }}
                    onBlur={() => {
                        const error = validateEmail(formData.email);
                        setErrors((prev) => ({ ...prev, email: error }));
                    }}
                />
                {errors.email && (
                    <span className={styles.error}>{errors.email}</span>
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
