import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CardComponent } from '../../../shared/ui/card/card.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';

interface UserRow {
  name: string;
  email: string;
  role: string;
  status: 'Activo' | 'Bloqueado';
  lastAccess: string;
}

@Component({
  selector: 'seph-users',
  standalone: true,
  imports: [CardComponent, ButtonComponent],
  template: `
    <div class="space-y-6">
      <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 class="text-2xl font-bold">Usuarios y roles</h2>
          <p class="mt-1 text-sm text-slate-500">Administración de identidad, autorización y sesiones.</p>
        </div>
        <seph-button>Nuevo usuario</seph-button>
      </div>

      <seph-card title="Directorio empresarial" description="Separación por rol, estado operativo y último acceso.">
        <div class="overflow-hidden rounded-md border border-slate-100">
          <table class="min-w-full divide-y divide-slate-100 text-left text-sm">
            <thead class="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th class="px-4 py-3 font-semibold">Nombre</th>
                <th class="px-4 py-3 font-semibold">Correo</th>
                <th class="px-4 py-3 font-semibold">Rol</th>
                <th class="px-4 py-3 font-semibold">Estado</th>
                <th class="px-4 py-3 font-semibold">Último acceso</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 bg-white">
              @for (user of users(); track user.email) {
                <tr class="hover:bg-slate-50">
                  <td class="px-4 py-3 font-semibold">{{ user.name }}</td>
                  <td class="px-4 py-3 text-slate-500">{{ user.email }}</td>
                  <td class="px-4 py-3">{{ user.role }}</td>
                  <td class="px-4 py-3">
                    <span class="rounded-md px-2 py-1 text-xs font-semibold" [class.bg-brand-50]="user.status === 'Activo'" [class.text-brand-700]="user.status === 'Activo'" [class.bg-red-50]="user.status === 'Bloqueado'" [class.text-red-700]="user.status === 'Bloqueado'">
                      {{ user.status }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-slate-500">{{ user.lastAccess }}</td>
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
export class UsersComponent {
  readonly users = signal<UserRow[]>([
    { name: 'Administración SEPH', email: 'admin@seph.local', role: 'SuperAdmin', status: 'Activo', lastAccess: 'Hace 8 min' },
    { name: 'Equipo Seguridad', email: 'security@seph.local', role: 'SecurityAdmin', status: 'Activo', lastAccess: 'Hace 32 min' },
    { name: 'Mesa de ayuda', email: 'support@seph.local', role: 'Operator', status: 'Activo', lastAccess: 'Ayer' },
    { name: 'Cuenta bloqueada', email: 'risk@seph.local', role: 'Auditor', status: 'Bloqueado', lastAccess: 'Hace 4 días' }
  ]);
}
