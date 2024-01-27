import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

import { HomeRoutingModule } from './home/home-routing.module';
import { DetailRoutingModule } from './detail/detail-routing.module';
import { QueueHandlerComponent } from './queue-handler/queue-handler.component';
import { GameMenuComponent } from './game-menu/game-menu.component';

const routes: Routes = [
  {
    path: '',
    component: QueueHandlerComponent,
  },
  {
    path:'game',
    component: GameMenuComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {}),
    HomeRoutingModule,
    DetailRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
