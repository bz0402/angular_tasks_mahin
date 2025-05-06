import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './features/search/search.component';
import { HomeComponent } from './features/home/home.component';
import { ErrorComponent } from './shared/error/error.component';
import { OurSourcesComponent } from './features/our-sources/our-sources.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'our-sources', component: OurSourcesComponent },

  // Error handling routes can be added here
  { path: 'unauthorized', component: ErrorComponent, data: { code: 401 } },
  { path: 'forbidden', component: ErrorComponent, data: { code: 403 } },
  { path: 'not-found', component: ErrorComponent, data: { code: 404 } },
  { path: 'server-error', component: ErrorComponent, data: { code: 500 } },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
