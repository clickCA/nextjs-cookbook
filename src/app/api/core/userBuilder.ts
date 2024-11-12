import { UserBuilderMethods } from "./configuration";
import { IUser } from "./types";

interface UserBuilder {
    [UserBuilderMethods.PRODUCE_REGULAR_USER](): void;
    [UserBuilderMethods.PRODUCE_UPDATED_USER](): void;
    [UserBuilderMethods.PRODUCE_ADMIN_USER](): void;
}

class ApplicationUser implements UserBuilder {
    constructor(private user: IUser) {}

    [UserBuilderMethods.PRODUCE_REGULAR_USER](): void {
        console.log("trigger build");
        this.user.userPropertiesActions?.push("Regular properties");
    }

    [UserBuilderMethods.PRODUCE_UPDATED_USER](): void {
        this.user.userPropertiesActions?.push("Updated properties");
    }

    [UserBuilderMethods.PRODUCE_ADMIN_USER](): void {
        this.user.userPropertiesActions?.push("Admin properties");
    }
}

export { ApplicationUser };
