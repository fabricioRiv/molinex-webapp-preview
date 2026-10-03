import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationGroup, SideNavigation } from '../side-navigation/side-navigation';
import { TopBar } from '../top-bar/top-bar';

@Component({
  imports: [RouterOutlet, SideNavigation, TopBar],
  selector: 'app-layout',
  styleUrl: './layout.css',
  templateUrl: './layout.html',
})
export class Layout {
  protected readonly navigationOpen = signal(false);

  protected readonly options = signal<readonly NavigationGroup[]>([
    {
      label: 'General',
      items: [
        {
          icon: 'space_dashboard',
          label: 'Resumen',
          path: '/intelligence/overview',
        },
      ],
    },
    {
      label: 'Gestión',
      items: [
        { icon: 'handshake', label: 'Comercial', path: '/commercial' },
        { icon: 'conveyor_belt', label: 'Operaciones', path: '/production' },
        { icon: 'fact_check', label: 'Calidad y rendimiento', path: '/quality' },
      ],
    },
    {
      label: 'Activos',
      items: [
        {
          icon: 'precision_manufacturing',
          label: 'Maquinaria',
          path: '/assets/machinery',
        },
        {
          icon: 'build_circle',
          label: 'Mantenimiento',
          path: '/assets/maintenance',
        },
      ],
    },
    {
      label: 'Análisis',
      items: [
        {
          icon: 'monitoring',
          label: 'Inteligencia',
          path: '/intelligence/analysis',
        },
        { icon: 'bar_chart_4_bars', label: 'Reportes', path: '/reporting' },
      ],
    },
    {
      label: 'Administración',
      items: [
        {
          icon: 'manage_accounts',
          label: 'Usuarios y permisos',
          path: '/iam/users',
        },
      ],
    },
  ]);

  protected closeNavigation(): void {
    this.navigationOpen.set(false);
  }

  protected toggleNavigation(): void {
    this.navigationOpen.update((isOpen) => !isOpen);
  }
}
