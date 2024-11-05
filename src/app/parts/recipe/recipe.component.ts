import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  selectedIngredients: string[] = [];
  allRecipes: any[] = [];
  filteredRecipes: any[] = [];
  selectedRecipe: any;
  modalVisible: boolean = false;
  availableRecipesCount: number = 0;

  // Pagination properties
  currentPage: number = 1;
  recipesPerPage: number = 5; // Change this to adjust the number of recipes per page
  totalPages: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchAllRecipes();
  }

  fetchAllRecipes() {
    this.http.get<any>('http://localhost/api/api.php')
      .subscribe(response => {
        if (response.status === 'success') {
          this.allRecipes = response.data;
          this.filteredRecipes = [...this.allRecipes];
          this.updateAvailableRecipesCount();
          this.totalPages = Math.ceil(this.filteredRecipes.length / this.recipesPerPage);
        } else {
          console.error(response.error);
        }
      });
  }

  toggleIngredient(ingredient: string) {
    const index = this.selectedIngredients.indexOf(ingredient);
    if (index === -1) {
      this.selectedIngredients.push(ingredient);
    } else {
      this.selectedIngredients.splice(index, 1);
    }
    this.filterRecipes();
  }

  filterRecipes() {
    if (this.selectedIngredients.length === 0) {
      this.filteredRecipes = [...this.allRecipes];
    } else {
      this.filteredRecipes = this.allRecipes.filter(recipe =>
        this.selectedIngredients.every(ingredient =>
          recipe.ingredients.map((i: string) => i.toLowerCase()).includes(ingredient.toLowerCase())
        )
      );
    }
    this.updateAvailableRecipesCount();
    this.totalPages = Math.ceil(this.filteredRecipes.length / this.recipesPerPage);
    this.currentPage = 1; // Reset to first page when filtering
  }

  updateAvailableRecipesCount() {
    this.availableRecipesCount = this.filteredRecipes.length;
  }

  onSearch(query: string) {
    if (!query) {
      this.filteredRecipes = [...this.allRecipes];
      this.updateAvailableRecipesCount();
      return;
    }

    this.filteredRecipes = this.allRecipes.filter(recipe =>
      recipe.name.toLowerCase().includes(query.toLowerCase()) ||
      recipe.description.toLowerCase().includes(query.toLowerCase())
    );
    this.updateAvailableRecipesCount();
    this.totalPages = Math.ceil(this.filteredRecipes.length / this.recipesPerPage);
  }

  selectRecipe(recipe: any) {
    this.selectedRecipe = recipe;
    this.modalVisible = true;
  }

  // Pagination functions
  get paginatedRecipes() {
    const startIndex = (this.currentPage - 1) * this.recipesPerPage;
    return this.filteredRecipes.slice(startIndex, startIndex + this.recipesPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
