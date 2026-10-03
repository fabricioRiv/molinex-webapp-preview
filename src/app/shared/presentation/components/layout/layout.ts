import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { NavigationGroup, SideNavigation } from '../side-navigation/side-navigation';
import { TopBar } from '../top-bar/top-bar';

@Component({
  imports: [RouterOutlet, SideNavigation, TopBar, TranslatePipe],
  selector: 'app-layout',
  styleUrl: './layout.css',
  templateUrl: './layout.html',
})
export class Layout {
  protected readonly navigationOpen = signal(false);

  protected readonly options = signal<readonly NavigationGroup[]>([
    {
      label: 'navigation.groups.general',
      items: [
        {
          icon: 'space_dashboard',
          label: 'navigation.items.overview',
          path: '/overview',
        },
      ],
    },
    {
      label: 'navigation.groups.management',
      items: [
        { icon: 'handshake', label: 'navigation.items.commercial', path: '/commercial' },
        { icon: 'conveyor_belt', label: 'navigation.items.operations', path: '/production' },
        { icon: 'fact_check', label: 'navigation.items.quality', path: '/quality' },
      ],
    },
    {
      label: 'navigation.groups.assets',
      items: [
        {
          icon: 'precision_manufacturing',
          label: 'navigation.items.machinery',
          path: '/assets/machinery',
        },
        {
          icon: 'build_circle',
          label: 'navigation.items.maintenance',
          path: '/assets/maintenance',
        },
      ],
    },
    {
      label: 'navigation.groups.analysis',
      items: [
        {
          icon: 'monitoring',
          label: 'navigation.items.intelligence',
          path: '/intelligence/analysis',
        },
        { icon: 'bar_chart_4_bars', label: 'navigation.items.reports', path: '/reporting' },
      ],
    },
    {
      label: 'navigation.groups.administration',
      items: [
        {
          icon: 'manage_accounts',
          label: 'navigation.items.users',
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
