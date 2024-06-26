import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-page-content',
  standalone: true,
  imports: [],
  templateUrl: './page-content.component.html',
  styleUrl: './page-content.component.scss',
})
export class PageContentComponent {
  @Output() menuClick = new EventEmitter<void>();
}
