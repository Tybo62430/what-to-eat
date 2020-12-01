import { Component } from "@angular/core";
import { MealdbApiService } from "../mealdb-api.service";
import { MEALDB_Category, MEALDB_ListItem } from "../model";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  meals: MEALDB_ListItem[] | null = null;
  categories: MEALDB_Category[] | null = null;
  category: string = "Vegetarian";

  constructor(private mealdb: MealdbApiService) {
    this.mealdb
      .findByCategory(this.category)
      .subscribe((meals: MEALDB_ListItem[]) => {
        this.meals = meals;
      });

    this.mealdb
      .findAllCategorie()
      .subscribe((categories: MEALDB_Category[]) => {
        this.categories = categories;
      });
  }

  onChange($event) {
    this.category = $event.target.value;
    this.mealdb
      .findByCategory(this.category)
      .subscribe((meals: MEALDB_ListItem[]) => {
        this.meals = meals;
      });
  }
}
