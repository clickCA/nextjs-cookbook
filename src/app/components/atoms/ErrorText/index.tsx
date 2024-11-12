import styles from "./styles.module.css";
interface ErrorTextProps {
    children: React.ReactNode;
    id?: string;
}

export const ErrorText = ({ children, id }: ErrorTextProps) => (
    <span className={styles.error} role="alert" id={id}>
        {children}
    </span>
);
