import { BurgerBuilder, BurgerDirector } from "./burgerBuilder";

enum StrategiesNames {
    HAMBURGER = "hamburger",
    CHICKENBURGER = "chickenburger",
}
interface IStrategy {
    bakeMeAburger(
        burgerBuilder: BurgerBuilder,
        burgerDirector: BurgerDirector
    ): Array<string>;
}

class MakeHamBurger implements IStrategy {
    bakeMeAburger(
        burgerBuilder: BurgerBuilder,
        burgerDirector: BurgerDirector
    ) {
        burgerDirector.setBuilder(burgerBuilder);
        burgerDirector.buildHamburger();
        return burgerBuilder.getRecipe();
    }
}
class MakeChickenBurger implements IStrategy {
    bakeMeAburger(
        burgerBuilder: BurgerBuilder,
        burgerDirector: BurgerDirector
    ) {
        burgerDirector.setBuilder(burgerBuilder);
        burgerDirector.buildChickenBurger();
        return burgerBuilder.getRecipe();
    }
}
const Strategies = {
    [StrategiesNames.HAMBURGER]: new MakeHamBurger(),
    [StrategiesNames.CHICKENBURGER]: new MakeChickenBurger(),
};

class Kitchen {
    private strategy: IStrategy | undefined;
    constructor(strategy: IStrategy) {
        console.log("Strategy class is", strategy);
        this.strategy = strategy;
    }
    public setStrategy(strategy: IStrategy) {
        console.log("Strategy class is", strategy);
        this.strategy = strategy;
    }
    public bakeSomething(
        burgerBuilder: BurgerBuilder,
        burgerDirector: BurgerDirector
    ) {
        console.log("Now Kitchen is on fire");
        const result = this.strategy?.bakeMeAburger(
            burgerBuilder,
            burgerDirector
        );
        console.log("We baked:", result);
    }
}
