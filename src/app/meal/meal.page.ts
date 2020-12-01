import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MealdbApiService } from '../mealdb-api.service';
import { MEALDB_Meal } from '../model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.page.html',
  styleUrls: ['./meal.page.scss'],
})
export class MealPage implements OnInit {
  meal: MEALDB_Meal | null = null;
  ingredients: string[] = [];

  constructor(
    private mealdb: MealdbApiService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    let mealId: string = 
      this.route.snapshot.paramMap.get("id");
    
    this.mealdb.findById(mealId)
      .pipe(
        tap(meal => this.ingredients = this.getIngredients(meal) ),
        tap(meal => console.log(meal))
      )
      .subscribe(meal => this.meal = meal)
  }

  getYoutubeLink(meal: MEALDB_Meal): SafeResourceUrl {
    // URL de départ: "https://www.youtube.com/watch?v=4aZr5hZXP_s"
    //
    let videoId = meal.strYoutube.split('=')[1];
    let ytLink = "https://www.youtube.com/embed/" + videoId;
    return this.sanitizer.bypassSecurityTrustResourceUrl(ytLink);
  }

  private getIngredients(meal: MEALDB_Meal): string[] {
    let ingredients: string[] = [];
    for (var i=1; i<=20; i++) {
      let ingredient = meal["strIngredient" + i];
      // on "pousse" dans le tableau l'ingrédient s'il n'est pas une chaîne vide
      if (ingredient != "") ingredients.push(ingredient);
    }
    return ingredients;
  }

}
