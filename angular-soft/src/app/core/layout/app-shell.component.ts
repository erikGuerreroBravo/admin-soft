import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {
  LucideBookOpen,
  LucideCalendar,
  LucideChartColumn,
  LucideChevronDown,
  LucideCircle,
  LucideCircleHelp,
  LucideFile,
  LucideGlobe,
  LucideHome,
  LucideImage,
  LucideLayers,
  LucideLayoutPanelLeft,
  LucideList,
  LucideMenu,
  LucideMessageCircle,
  LucideMonitor,
  LucideMoon,
  LucidePanelTop,
  LucidePencil,
  LucideRows3,
  LucideShoppingBag,
  LucideSquare,
  LucideSun,
  LucideTable,
  LucideTreePine,
  LucideUser,
  LucideX
} from '@lucide/angular';

type NavIcon =
  | 'home'
  | 'layout'
  | 'square'
  | 'monitor'
  | 'table'
  | 'list'
  | 'tree'
  | 'panel'
  | 'layers'
  | 'image'
  | 'menu'
  | 'message'
  | 'file'
  | 'chart'
  | 'calendar'
  | 'circle'
  | 'globe'
  | 'user'
  | 'pencil'
  | 'help'
  | 'book';

interface NavItem {
  label: string;
  icon: NavIcon;
  path?: string;
  active?: boolean;
  expandable?: boolean;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

@Component({
  selector: 'seph-app-shell',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    LucideBookOpen,
    LucideCalendar,
    LucideChartColumn,
    LucideChevronDown,
    LucideCircle,
    LucideCircleHelp,
    LucideFile,
    LucideGlobe,
    LucideHome,
    LucideImage,
    LucideLayers,
    LucideLayoutPanelLeft,
    LucideList,
    LucideMenu,
    LucideMessageCircle,
    LucideMonitor,
    LucideMoon,
    LucidePanelTop,
    LucidePencil,
    LucideRows3,
    LucideShoppingBag,
    LucideSquare,
    LucideSun,
    LucideTable,
    LucideTreePine,
    LucideUser,
    LucideX
  ],
  template: `
    <div class="admin-shell" [class.sidebar-collapsed]="sidebarCollapsed()" [class.mobile-sidebar-open]="mobileSidebarOpen()">
      <header class="topbar">
        <div class="d-flex align-items-center gap-3">
          <button class="icon-button" type="button" aria-label="Alternar menu" (click)="toggleSidebar()">
            <svg lucideMenu [size]="20" [strokeWidth]="2"></svg>
          </button>

          <a class="brand" routerLink="/dashboard" aria-label="Sakai dashboard">
            <span class="brand-mark" aria-hidden="true">
              <span></span>
            </span>
            <span class="brand-text">SAKAI</span>
          </a>
        </div>

        <div class="top-actions">
          <button
            class="top-action"
            type="button"
            [class.active]="theme() === 'dark'"
            [attr.aria-label]="theme() === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'"
            [attr.title]="theme() === 'dark' ? 'Modo claro' : 'Modo oscuro'"
            (click)="toggleTheme()">
            @if (theme() === 'dark') {
              <svg lucideMoon [size]="18"></svg>
            } @else {
              <svg lucideSun [size]="18"></svg>
            }
          </button>
          <button class="top-action language-action" type="button" aria-label="Idioma">
            <svg lucideGlobe [size]="18"></svg>
          </button>
          <button class="top-action" type="button" aria-label="Calendario">
            <svg lucideCalendar [size]="18"></svg>
          </button>
          <button class="top-action" type="button" aria-label="Compras">
            <svg lucideShoppingBag [size]="18"></svg>
          </button>
          <button class="top-action" type="button" aria-label="Usuario">
            <svg lucideUser [size]="18"></svg>
          </button>
        </div>
      </header>

      <button class="sidebar-backdrop" type="button" aria-label="Cerrar menu" (click)="closeMobileSidebar()"></button>

      <aside class="sidebar" aria-label="Navegacion principal">
        <button class="sidebar-close icon-button" type="button" aria-label="Cerrar menu" (click)="closeMobileSidebar()">
          <svg lucideX [size]="18"></svg>
        </button>

        <nav class="sidebar-nav">
          @for (group of navGroups; track group.title) {
            <section class="nav-section">
              <p class="nav-section-title">{{ group.title }}</p>
              @for (item of group.items; track item.label) {
                <a
                  class="nav-link"
                  [class.active]="item.active"
                  [routerLink]="item.path ?? '/dashboard'"
                  (click)="closeMobileSidebar()">
                  <span class="nav-icon">
                    @switch (item.icon) {
                      @case ('home') { <svg lucideHome [size]="15"></svg> }
                      @case ('layout') { <svg lucideLayoutPanelLeft [size]="15"></svg> }
                      @case ('square') { <svg lucideSquare [size]="15"></svg> }
                      @case ('monitor') { <svg lucideMonitor [size]="15"></svg> }
                      @case ('table') { <svg lucideTable [size]="15"></svg> }
                      @case ('list') { <svg lucideList [size]="15"></svg> }
                      @case ('tree') { <svg lucideTreePine [size]="15"></svg> }
                      @case ('panel') { <svg lucidePanelTop [size]="15"></svg> }
                      @case ('layers') { <svg lucideLayers [size]="15"></svg> }
                      @case ('image') { <svg lucideImage [size]="15"></svg> }
                      @case ('menu') { <svg lucideRows3 [size]="15"></svg> }
                      @case ('message') { <svg lucideMessageCircle [size]="15"></svg> }
                      @case ('file') { <svg lucideFile [size]="15"></svg> }
                      @case ('chart') { <svg lucideChartColumn [size]="15"></svg> }
                      @case ('calendar') { <svg lucideCalendar [size]="15"></svg> }
                      @case ('globe') { <svg lucideGlobe [size]="15"></svg> }
                      @case ('user') { <svg lucideUser [size]="15"></svg> }
                      @case ('pencil') { <svg lucidePencil [size]="15"></svg> }
                      @case ('help') { <svg lucideCircleHelp [size]="15"></svg> }
                      @case ('book') { <svg lucideBookOpen [size]="15"></svg> }
                      @default { <svg lucideCircle [size]="15"></svg> }
                    }
                  </span>
                  <span class="nav-label">{{ item.label }}</span>
                  @if (item.expandable) {
                    <svg class="ms-auto nav-chevron" lucideChevronDown [size]="14"></svg>
                  }
                </a>
              }
            </section>
          }
        </nav>
      </aside>

      <main class="content">
        <router-outlet />
      </main>

      <footer class="footer">
        <span>SAKAI by <strong>PrimeNG</strong></span>
      </footer>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppShellComponent {
  private readonly document = inject(DOCUMENT);

  readonly sidebarCollapsed = signal(false);
  readonly mobileSidebarOpen = signal(false);
  readonly theme = signal<'light' | 'dark'>('light');

  readonly navGroups: NavGroup[] = [
    {
      title: 'HOME',
      items: [{ label: 'Dashboard', icon: 'home', path: '/dashboard' }]
    },
    {
      title: 'UI COMPONENTS',
      items: [
        { label: 'Form Layout', icon: 'layout', path: '/dashboard', active: true },
        { label: 'Input', icon: 'square' },
        { label: 'Button', icon: 'monitor' },
        { label: 'Table', icon: 'table' },
        { label: 'List', icon: 'list' },
        { label: 'Tree', icon: 'tree' },
        { label: 'Panel', icon: 'panel' },
        { label: 'Overlay', icon: 'layers' },
        { label: 'Media', icon: 'image' },
        { label: 'Menu', icon: 'menu' },
        { label: 'Message', icon: 'message' },
        { label: 'File', icon: 'file' },
        { label: 'Chart', icon: 'chart' },
        { label: 'Timeline', icon: 'calendar' },
        { label: 'Misc', icon: 'circle' }
      ]
    },
    {
      title: 'PAGES',
      items: [
        { label: 'Landing', icon: 'globe' },
        { label: 'Auth', icon: 'user', expandable: true },
        { label: 'Crud', icon: 'pencil' },
        { label: 'Not Found', icon: 'help' },
        { label: 'Empty', icon: 'circle' }
      ]
    },
    {
      title: 'HIERARCHY',
      items: [
        { label: 'Submenu 1', icon: 'book', expandable: true },
        { label: 'Submenu 2', icon: 'book', expandable: true }
      ]
    },
    {
      title: 'GET STARTED',
      items: [{ label: 'Documentation', icon: 'book' }]
    }
  ];

  constructor() {
    const savedTheme = this.readStoredTheme();
    const preferredTheme = this.prefersDarkMode() ? 'dark' : 'light';
    this.applyTheme(savedTheme ?? preferredTheme, false);
  }

  toggleTheme(): void {
    this.applyTheme(this.theme() === 'dark' ? 'light' : 'dark');
  }

  toggleSidebar(): void {
    if (window.matchMedia('(max-width: 991.98px)').matches) {
      this.mobileSidebarOpen.update((open) => !open);
      return;
    }

    this.sidebarCollapsed.update((collapsed) => !collapsed);
  }

  closeMobileSidebar(): void {
    this.mobileSidebarOpen.set(false);
  }

  private applyTheme(theme: 'light' | 'dark', persist = true): void {
    this.theme.set(theme);
    this.document.documentElement.dataset['theme'] = theme;

    if (persist) {
      window.localStorage.setItem('sakai-theme', theme);
    }
  }

  private readStoredTheme(): 'light' | 'dark' | null {
    const theme = window.localStorage.getItem('sakai-theme');
    return theme === 'light' || theme === 'dark' ? theme : null;
  }

  private prefersDarkMode(): boolean {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}
