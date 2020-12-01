import { Component } from '@angular/core';
import { MealdbApiService } from '../mealdb-api.service';
import { MEALDB_ListItem } from '../model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  meals: MEALDB_ListItem[] | null = null;

  constructor(private mealdb: MealdbApiService) {
    this.mealdb.findByCategory("Vegetarian")
      .subscribe((meals: MEALDB_ListItem[]) => {
        this.meals = meals;
      })
  }

}
