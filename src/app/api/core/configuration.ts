import { LoginWithGQL, LoginWithMock, LoginWithAmplify } from "./loginStrategy";

enum Configuration {
    SUCCESS_REQUEST = "Success !",
    ERROR_REQUEST = "No Such request",
}

enum LoginStrategiesNames {
    MOCK = "mock",
}

const LoginStrategies = {
    [LoginStrategiesNames.MOCK]: new LoginWithMock(),
};

const currentLoginStrategy = LoginStrategies[LoginStrategiesNames.AMPLIFY];

export { Configuration, currentLoginStrategy, UserBuilderMethods };
