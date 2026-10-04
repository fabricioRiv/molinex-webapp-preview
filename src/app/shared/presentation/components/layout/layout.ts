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
      label: 'navigation.groups.plant',
      items: [
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
  ]);

  protected closeNavigation(): void {
    this.navigationOpen.set(false);
  }

  protected toggleNavigation(): void {
    this.navigationOpen.update((isOpen) => !isOpen);
  }
}
