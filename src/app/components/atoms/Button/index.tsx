import styles from "./styles.module.css";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
}

export const Button = ({ isLoading, children, ...props }: ButtonProps) => (
    <button className={styles.button} {...props}>
        {isLoading ? "Loading..." : children}
    </button>
);
