import {MealChoiceEnum} from './mealChoice.enum';

export class Guest {
  name: string;
  mealChoice: MealChoiceEnum;
  brunch: boolean;

  constructor(name: string, mealChoice: MealChoiceEnum, brunch: boolean) {
    this.name = name;
    this.mealChoice = mealChoice;
    this.brunch = brunch;
  }
}
