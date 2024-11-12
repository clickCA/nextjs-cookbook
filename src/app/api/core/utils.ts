export const generateToken = () => {
    return (
        Math.random().toString(36).substring(2) + Math.floor(Date.now() / 1000)
    );
};
