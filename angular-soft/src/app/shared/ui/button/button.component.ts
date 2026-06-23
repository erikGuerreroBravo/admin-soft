import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'seph-button',
  standalone: true,
  template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      class="focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60"
      [class.bg-brand-600]="variant() === 'primary'"
      [class.text-white]="variant() === 'primary'"
      [class.hover:bg-brand-700]="variant() === 'primary'"
      [class.border]="variant() === 'secondary'"
      [class.border-slate-200]="variant() === 'secondary'"
      [class.bg-white]="variant() === 'secondary'"
      [class.text-slate-700]="variant() === 'secondary'"
      [class.hover:bg-slate-50]="variant() === 'secondary'">
      <ng-content />
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  readonly type = input<'button' | 'submit'>('button');
  readonly variant = input<'primary' | 'secondary'>('primary');
  readonly disabled = input(false);
}
