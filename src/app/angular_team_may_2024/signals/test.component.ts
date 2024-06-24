import {
  Component,
  computed,
  effect,
  inject,
  input,
  model,
  output,
} from '@angular/core';

export type Orientation = 'vertical' | 'horizontal';

@Component({
  selector: 'tl-listbox',
  template: `<ng-content />`,
  standalone: true,
  host: {
    role: 'listbox',
    '[tabIndex]': 'dissabled() ? -1 : 0',
  },
  styles: `
  :host{
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    padding: 4px;
  }
  `,
})
export class ListBox<T> {
  readonly value = model<T>();
  readonly disabled = input(false);
  readonly orientation = input<Orientation>('horizontal');

  readonly orientationChange = output<Orientation>();

  constructor() {
    effect(() => {
      this.orientationChange.emit(this.orientation());
    });
  }

  dissabled() {}
}

@Component({
  selector: 'tl-option',
  template: `
    <ng-content />
    @if(isSelected()){ ✅ }
  `,
  standalone: true,
  host: {
    role: 'option',
    '[attr.aria-dissabled]': 'isDisabled()',
    '[attr.aria-selected]': 'isSelected()',
    '(click)': 'select()',
  },
  styles: `
  :host{
    display: block;
    border: 1px solid black;
    margin: 4px;
    padding: 4px;
    cursor: pointer;
  }

  :host[aria-disabled="true"]{
    color: lightgray;
    border-color: lightgray;
    cursor: default
  }

  `,
})
export class Option<T> {
  private listbox = inject<ListBox<T>>(ListBox);
  readonly disabled = input(false);

  readonly value = input.required<T>();

  protected readonly isDisabled = computed(
    () => this.listbox.disabled() || this.disabled()
  );

  protected readonly isSelected = computed(
    () => this.value() === this.listbox.value()
  );

  protected select() {
    if (!this.isDisabled()) {
      this.listbox.value.set(this.value());
    }
  }
}
