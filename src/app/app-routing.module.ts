import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameboardComponent } from './gameboard/gameboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/gameboard', pathMatch: 'full' },
  { path: 'gameboard', component: GameboardComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
