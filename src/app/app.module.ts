import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { GameboardComponent } from './gameboard/gameboard.component';
import { CardComponent } from './cards/cards.component';
import { PlayerComponent } from './player/player.component'
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { SmiliesComponent } from './smilies/smilies.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    SmiliesComponent
  ],
  declarations: [
    AppComponent,
    GameboardComponent,
    CardComponent,
    PlayerComponent,
    ScoreboardComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
