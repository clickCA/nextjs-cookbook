// src/components/molecules/FormField/index.tsx
import { ErrorText } from "@/app/components/atoms/ErrorText";
import styles from "./styles.module.css";
interface FormFieldProps {
    label: string;
    error?: string;
    inputId: string;
    children: React.ReactNode;
}

export const FormField = ({
    label,
    error,
    inputId,
    children,
}: FormFieldProps) => (
    <div className={styles.field}>
        <label className={styles.label} htmlFor={inputId}>
            {label}
        </label>
        {children}
        {error && <ErrorText id={`${inputId}-error`}>{error}</ErrorText>}
    </div>
);
