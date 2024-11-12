// components/atoms/Input/index.tsx
import styles from "./styles.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
}

export const Input = ({ error, ...props }: InputProps) => (
    <div>
        <input
            className={`${styles.input} ${error ? styles.inputError : ""}`}
            {...props}
        />
        {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
);
