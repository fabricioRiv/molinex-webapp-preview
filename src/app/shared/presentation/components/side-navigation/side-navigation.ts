import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface NavigationItem {
  readonly icon: string;
  readonly label: string;
  readonly path: string;
}

export interface NavigationGroup {
  readonly label: string;
  readonly items: readonly NavigationItem[];
}

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-side-navigation',
  styleUrl: './side-navigation.css',
  templateUrl: './side-navigation.html',
})
export class SideNavigation {
  readonly navigationGroups = input.required<readonly NavigationGroup[]>();
  readonly navigated = output<void>();
}
