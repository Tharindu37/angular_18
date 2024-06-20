import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  ListBox,
  Option,
  Orientation,
} from './angular_team_may_2024/signals/test.component';
import { single } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListBox, Option],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular_18';
  protected orientation = signal<Orientation>('horizontal');

  logValueChange(newValue: string) {
    console.log(newValue);
  }

  logOrientationChange(newOrientation: Orientation) {
    console.log(newOrientation);
  }

  toggleOrientation() {}
}
