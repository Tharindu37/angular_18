import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';
import { PageMenuComponent } from './page-menu/page-menu.component';
import { PageContentComponent } from './page-content/page-content.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-example1',
  standalone: true,
  imports: [PageMenuComponent, PageContentComponent, CommonModule],
  animations: [
    trigger('openClose', [
      state('closed', style({ transform: 'translateX(120%)' })),
      state('open', style({ transform: 'translateX(0)' })),
      transition('closed <=> open', [animate('1s ease-in')]),
    ]),
  ],
  templateUrl: './example1.component.html',
  styleUrl: './example1.component.scss',
})
export class Example1Component {
  protected menuState: 'open' | 'closed' = 'closed';
  print() {
    console.log(this.menuState);
    this.menuState = 'open';
  }
}
