import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-page-menu',
  standalone: true,
  imports: [],
  templateUrl: './page-menu.component.html',
  styleUrl: './page-menu.component.scss',
})
export class PageMenuComponent {
  @Output() close = new EventEmitter<void>();
  protected items = [
    'Shoes',
    'Clothing',
    'Accessories',
    'Sale',
    'Gift guide',
    'Customs',
    'Skateboarding',
    'More',
  ];
}
