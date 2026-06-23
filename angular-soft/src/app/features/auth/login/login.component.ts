import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthFacade } from '../../../core/auth/application/auth.facade';
import { ButtonComponent } from '../../../shared/ui/button/button.component';

@Component({
  selector: 'seph-login',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent],
  template: `
    <main class="grid min-h-screen bg-slate-950 text-white lg:grid-cols-[1.05fr_0.95fr]">
      <section class="flex items-center px-6 py-10 sm:px-10 lg:px-16">
        <div class="w-full max-w-md">
          <div class="mb-10 flex items-center gap-3">
            <div class="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-500 text-sm font-bold">SP</div>
            <div>
              <h1 class="text-xl font-bold">SEPH.PRINCIPAL</h1>
              <p class="text-sm text-slate-400">Acceso administrativo seguro</p>
            </div>
          </div>

          <form class="rounded-lg border border-white/10 bg-white p-6 text-slate-900 shadow-2xl" [formGroup]="form" (ngSubmit)="submit()">
            <h2 class="text-lg font-semibold">Iniciar sesión</h2>
            <p class="mt-1 text-sm text-slate-500">Usa tus credenciales corporativas para continuar.</p>

            <label class="mt-6 block text-sm font-medium" for="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              autocomplete="email"
              formControlName="email"
              class="focus-ring mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm outline-none"
              placeholder="admin@seph.local">

            <label class="mt-4 block text-sm font-medium" for="password">Contraseña</label>
            <input
              id="password"
              type="password"
              autocomplete="current-password"
              formControlName="password"
              class="focus-ring mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm outline-none"
              placeholder="••••••••••••">

            @if (error()) {
              <p class="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{{ error() }}</p>
            }

            <div class="mt-6">
              <seph-button type="submit" [disabled]="form.invalid || loading()">
                {{ loading() ? 'Validando...' : 'Entrar' }}
              </seph-button>
            </div>
          </form>
        </div>
      </section>

      <section class="hidden overflow-hidden border-l border-white/10 bg-slate-900 lg:block">
        <div class="flex h-full flex-col justify-between p-12">
          <div class="grid grid-cols-2 gap-4">
            <div class="rounded-lg border border-white/10 bg-white/5 p-5">
              <p class="text-sm text-slate-400">Disponibilidad API</p>
              <p class="mt-3 text-3xl font-bold">99.98%</p>
            </div>
            <div class="rounded-lg border border-white/10 bg-brand-500 p-5 text-slate-950">
              <p class="text-sm font-semibold">MFA</p>
              <p class="mt-3 text-3xl font-bold">Activo</p>
            </div>
          </div>

          <div>
            <p class="text-sm uppercase text-brand-300">Enterprise Security</p>
            <h2 class="mt-4 max-w-xl text-4xl font-bold leading-tight">Sesiones robustas, permisos granulares y telemetría operacional para plataformas críticas.</h2>
            <div class="mt-8 grid gap-3">
              @for (item of ['JWT con refresh token rotativo', 'Guards e interceptores centralizados', 'Clean Architecture end-to-end']; track item) {
                <div class="rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">{{ item }}</div>
              }
            </div>
          </div>
        </div>
      </section>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly auth = inject(AuthFacade);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.auth.login(this.form.getRawValue()).subscribe({
      next: () => void this.router.navigate(['/dashboard']),
      error: (error: Error) => {
        this.error.set(error.message);
        this.loading.set(false);
      },
      complete: () => this.loading.set(false)
    });
  }
}
