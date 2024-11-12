import { ILoginStrategy, IUser } from "@/app/lib/dataService";

class LoginContext {
    private strategy: ILoginStrategy;

    constructor(strategy: ILoginStrategy) {
        console.log("Login strategy class is", strategy);
        this.strategy = strategy;
    }

    public useLogin(user: string, password: string): IUser {
        console.log("Now login is on fire");
        return this.strategy.login(user, password);
    }
}

export { LoginContext };
