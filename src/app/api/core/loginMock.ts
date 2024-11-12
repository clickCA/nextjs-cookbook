import { getMock, ILoginStrategy } from "@/app/lib/dataService";
import { generateToken } from "./utils";

export class LoginWithMock implements ILoginStrategy {
    public login(user: string, password: string) {
        const users = getMock.users;

        const checkUser = users.find(
            (userItem: { user: string; password: string }) => {
                return userItem.user === user && userItem.password === password;
            }
        );

        let loginState = { state: false, token: "" };

        if (checkUser) {
            loginState = { state: true, token: generateToken() };
        }

        return loginState;
    }
}
