export enum MealChoiceEnum {
  Chicken = 0,
  Beef = 1,
  Vegetarian = 2
}

export class MealChoiceUtils {

  static MealChoiceDisplayName(choice: MealChoiceEnum): string {

    switch (choice) {
      case MealChoiceEnum.Beef:
        return 'Braised Beef Short Rib';
        break;
      case MealChoiceEnum.Chicken:
        return 'Blackened Chicken';
        break;
      case MealChoiceEnum.Vegetarian:
        return 'Vegetable Terrine';
        break;
    }
  }

}
