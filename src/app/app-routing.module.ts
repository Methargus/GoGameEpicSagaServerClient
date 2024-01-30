import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';
import { GameMenuComponent } from './game-menu/game-menu.component';
import { GoGameComponent } from './game-menu/go-game/go-game.component';
import { HomeMenuComponent } from './home-menu/home-menu.component';
import { ReplayComponent } from './replay/replay.component';

const routes: Routes = [
  {
    path: '',
    component: HomeMenuComponent
  },
  {
    path: 'game-menu',
    component: GameMenuComponent,
  },
  {
    path:'game',
    component: GoGameComponent
  },
  {
    path: 'replay',
    component: ReplayComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {}),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
