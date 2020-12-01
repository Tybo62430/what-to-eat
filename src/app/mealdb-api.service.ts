import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MEALDB_Category, MEALDB_ListItem, MEALDB_Meal } from "./model";
import { map } from "rxjs/operators";

const API = {
  ROOT: "https://www.themealdb.com/api/json/v1/1/",
  get FILTER() {
    return this.ROOT + "filter.php?c=";
  },
  get LOOKUP() {
    return this.ROOT + "lookup.php?i=";
  },
  get CATEGORIE() {
    return this.ROOT + "list.php?c=list";
  },
};

@Injectable({
  providedIn: "root",
})
export class MealdbApiService {
  constructor(private http: HttpClient) {}

  findAllCategorie(): Observable<MEALDB_Category[]> {
    return this.http.get(API.CATEGORIE).pipe(map((res: any) => res.meals));
  }

  findByCategory(categoryName: string): Observable<MEALDB_ListItem[]> {
    return this.http
      .get(API.FILTER + categoryName)
      .pipe(map((res: any) => res.meals));
  }

  findById(mealId: string): Observable<MEALDB_Meal> {
    return this.http.get(API.LOOKUP + mealId).pipe(
      map((res: any) => res.meals[0])
      // en entrée: { meals: [objet] } => en sortie: objet
    );
  }
}
