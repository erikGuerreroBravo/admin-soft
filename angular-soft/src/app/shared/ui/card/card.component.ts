import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'seph-card',
  standalone: true,
  template: `
    <section class="rounded-lg border border-slate-200 bg-white shadow-soft">
      @if (title()) {
        <header class="border-b border-slate-100 px-5 py-4">
          <h2 class="text-sm font-semibold text-slate-900">{{ title() }}</h2>
          @if (description()) {
            <p class="mt-1 text-xs text-slate-500">{{ description() }}</p>
          }
        </header>
      }
      <div class="p-5">
        <ng-content />
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  readonly title = input<string>();
  readonly description = input<string>();
}
