export const makeLogin = (length: number) => {
    let result = "";

    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@123456789";
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }

    return result;
};

export const isLetter = (str: string) => {
    return str.length === 1 && str.match(/[a-z]/i);
};
