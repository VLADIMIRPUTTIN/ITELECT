import { Component, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  @Output() searchEvent = new EventEmitter<string>(); // Event emitter for search
  isSearchVisible = false;
  isMobile = window.innerWidth <= 768;
  searchQuery = '';

  constructor(private eRef: ElementRef) {}

  toggleSearchVisibility() {
    if (this.isMobile) {
      this.isSearchVisible = !this.isSearchVisible;
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth <= 768; // Update isMobile on resize
    if (!this.isMobile) {
      this.isSearchVisible = false; // Hide search bar on desktop view
    }
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (this.isMobile && !this.eRef.nativeElement.contains(event.target)) {
      this.isSearchVisible = false; // Only close search bar in mobile view
    }
  }

  // Emit search event
  onSearch() {
    this.searchEvent.emit(this.searchQuery);
  }
}
