import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CardComponent } from '../../shared/ui/card/card.component';
import { DashboardApiService, DashboardSummary } from './dashboard-api.service';

const fallbackSummary: DashboardSummary = {
  activeUsers: 128,
  activeSessions: 42,
  securityAlerts: 3,
  apiAvailability: 99.98,
  recentActivities: [
    { title: 'Inicio de sesión administrativo', actor: 'admin@seph.local', occurredAtUtc: new Date().toISOString(), severity: 'info' },
    { title: 'Política MFA actualizada', actor: 'security@seph.local', occurredAtUtc: new Date().toISOString(), severity: 'success' },
    { title: 'Intento de acceso bloqueado', actor: 'gateway', occurredAtUtc: new Date().toISOString(), severity: 'warning' }
  ]
};

@Component({
  selector: 'seph-dashboard',
  standalone: true,
  imports: [CardComponent],
  template: `
    <div class="space-y-6">
      <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        @for (metric of metrics(); track metric.label) {
          <seph-card>
            <p class="text-sm font-medium text-slate-500">{{ metric.label }}</p>
            <div class="mt-3 flex items-end justify-between">
              <p class="text-3xl font-bold tracking-normal text-slate-950">{{ metric.value }}</p>
              <span class="rounded-md bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">{{ metric.delta }}</span>
            </div>
          </seph-card>
        }
      </section>

      <section class="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <seph-card title="Telemetría de sesiones" description="Visibilidad operacional por canal y nivel de riesgo.">
          <div class="space-y-4">
            @for (bar of sessionBars; track bar.label) {
              <div>
                <div class="mb-2 flex justify-between text-sm">
                  <span class="font-medium">{{ bar.label }}</span>
                  <span class="text-slate-500">{{ bar.value }}%</span>
                </div>
                <div class="h-3 rounded-full bg-slate-100">
                  <div class="h-3 rounded-full bg-brand-600" [style.width.%]="bar.value"></div>
                </div>
              </div>
            }
          </div>
        </seph-card>

        <seph-card title="Postura de seguridad" description="Indicadores OWASP y gobierno de identidad.">
          <div class="grid gap-3">
            @for (control of controls; track control.name) {
              <div class="flex items-center justify-between rounded-md border border-slate-100 bg-slate-50 px-3 py-3">
                <span class="text-sm font-medium">{{ control.name }}</span>
                <span class="rounded-md px-2 py-1 text-xs font-semibold" [class.bg-brand-50]="control.ok" [class.text-brand-700]="control.ok" [class.bg-amber-50]="!control.ok" [class.text-amber-700]="!control.ok">
                  {{ control.ok ? 'Cumple' : 'Revisar' }}
                </span>
              </div>
            }
          </div>
        </seph-card>
      </section>

      <seph-card title="Actividad reciente" description="Eventos relevantes de autenticación, autorización y administración.">
        <div class="overflow-hidden rounded-md border border-slate-100">
          <table class="min-w-full divide-y divide-slate-100 text-left text-sm">
            <thead class="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th class="px-4 py-3 font-semibold">Evento</th>
                <th class="px-4 py-3 font-semibold">Actor</th>
                <th class="px-4 py-3 font-semibold">Severidad</th>
                <th class="px-4 py-3 font-semibold">Fecha</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 bg-white">
              @for (activity of summary().recentActivities; track activity.title) {
                <tr class="hover:bg-slate-50">
                  <td class="px-4 py-3 font-medium text-slate-900">{{ activity.title }}</td>
                  <td class="px-4 py-3 text-slate-500">{{ activity.actor }}</td>
                  <td class="px-4 py-3">
                    <span class="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">{{ activity.severity }}</span>
                  </td>
                  <td class="px-4 py-3 text-slate-500">{{ activity.occurredAtUtc }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </seph-card>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  private readonly api = inject(DashboardApiService);
  readonly summary = signal<DashboardSummary>(fallbackSummary);

  readonly sessionBars = [
    { label: 'Web corporativo', value: 78 },
    { label: 'API Gateway', value: 64 },
    { label: 'Dispositivos confiables', value: 91 }
  ];

  readonly controls = [
    { name: 'HTTPS enforcement', ok: true },
    { name: 'Refresh token rotation', ok: true },
    { name: 'Rate limiting adaptativo', ok: true },
    { name: 'MFA obligatorio', ok: false }
  ];

  constructor() {
    this.api.summary().subscribe({
      next: (summary) => this.summary.set(summary),
      error: () => this.summary.set(fallbackSummary)
    });
  }

  metrics() {
    const value = this.summary();
    return [
      { label: 'Usuarios activos', value: value.activeUsers.toString(), delta: '+12%' },
      { label: 'Sesiones activas', value: value.activeSessions.toString(), delta: 'Tiempo real' },
      { label: 'Alertas seguridad', value: value.securityAlerts.toString(), delta: '24h' },
      { label: 'Disponibilidad API', value: `${value.apiAvailability}%`, delta: 'SLA' }
    ];
  }
}
