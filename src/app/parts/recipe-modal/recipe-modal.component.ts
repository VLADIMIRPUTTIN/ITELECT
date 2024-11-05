import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recipe-modal',
  templateUrl: './recipe-modal.component.html',
  styleUrls: ['./recipe-modal.component.scss']
})
export class RecipeModalComponent {
  @Input() recipe: any; // Input for the recipe details
  @Input() visible: boolean = false; // Control modal visibility
  @Output() close = new EventEmitter<void>(); // Output event for closing modal

  closeModal() {
    this.close.emit(); // Emit close event to parent component
  }
}
