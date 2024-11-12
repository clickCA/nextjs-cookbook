import { IUser } from "@/app/lib/dataService";
import { LoginContext } from "./loginStrategy";
import { LoginWithMock } from "./loginMock";

export class LoginService {
    private static instance: LoginService;
    private isLoggedIn: boolean = false;
    private token: string = "";
    private loginState: IUser | null = null;

    private constructor() {}

    public static getInstance(): LoginService {
        if (!LoginService.instance) {
            console.log("LoginService new instance");
            LoginService.instance = new LoginService();
        }
        return LoginService.instance;
    }

    async login(user: string, password: string) {
        // Here we will provide the login logic depending on what strategy is selected
        const loginType = new LoginWithMock();
        const loginContext = new LoginContext(loginType);

        this.loginState = await loginContext.useLogin(user, password);
        if (this.loginState) {
            this.isLoggedIn = this.loginState.state;
            this.token = this.loginState.token;
        }
    }

    getLoginStatus() {
        return this.isLoggedIn;
    }

    getToken() {
        return this.token;
    }
}
