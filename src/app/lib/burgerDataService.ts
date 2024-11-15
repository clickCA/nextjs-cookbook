import { getMock } from "./dataService";
import { BurgerSteps } from "./burgerEnums";

class BurgerDataService {
    private static instance: BurgerDataService;

    private steps!: { key: BurgerSteps; value: string }[];

    private constructor() {
        this.steps = [];
    }

    public static getInstance(): BurgerDataService {
        if (!BurgerDataService.instance) {
            console.log("BurgerDataService new instance");
            BurgerDataService.instance = new BurgerDataService();
        }
        return BurgerDataService.instance;
    }

    getStep(key: BurgerSteps) {
        let currentStep = this.steps.find(
            (step: { key: BurgerSteps; value: string }) => step.key === key
        );
        if (!currentStep) {
            currentStep = {
                key,
                value: getMock.baking[key],
            };
            this.steps.push(currentStep);
        }
        return currentStep;
    }
}

export { BurgerDataService };
