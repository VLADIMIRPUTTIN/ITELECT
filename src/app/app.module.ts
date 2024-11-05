import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './parts/home/home.component';
import { AboutComponent } from './parts/about/about.component';
import { RecipeComponent } from './parts/recipe/recipe.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RecipeModalComponent } from './parts/recipe-modal/recipe-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    RecipeComponent,
    NavComponent,
    RecipeModalComponent // Declare the RecipeModalComponent here
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule // Import FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent] // Bootstrapping the main component
})
export class AppModule { }
