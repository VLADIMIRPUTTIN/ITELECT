import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './parts/home/home.component';
import { AboutComponent } from './parts/about/about.component';
import { RecipeComponent } from './parts/recipe/recipe.component';
import { NavComponent } from './nav/nav.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent }, 
  { path: 'recipe', component: RecipeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'nav', component: NavComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
