import {MealChoiceEnum} from './mealChoice.enum';

export class Guest {
  id: number;
  name: string;
  mealChoice: MealChoiceEnum;

  constructor(name: string, mealChoice: MealChoiceEnum) {
    this.name = name;
    this.mealChoice = mealChoice;
  }

}
