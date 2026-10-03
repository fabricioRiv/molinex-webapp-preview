import { Component, inject, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [MatButton, TranslatePipe],
  selector: 'app-page-not-found',
  styleUrl: './page-not-found.css',
  templateUrl: './page-not-found.html',
})
export class PageNotFound implements OnInit {
  protected invalidPath = '';

  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);

  ngOnInit(): void {
    this.invalidPath = this.#route.snapshot.url.map((url) => url.path).join('/');
  }

  protected navigateToOverview(): void {
    this.#router.navigate(['/intelligence/overview']).then();
  }
}
