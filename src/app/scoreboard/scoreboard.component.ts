import { Component, Input } from '@angular/core';
import { PlayerModel } from '../player/player-model';

export interface ScoreboardEntry {
  prediction: number,
  made: boolean,
  score: number
}

export interface Scoreboard {
  players: PlayerModel[],
  scores: ScoreboardEntry[][]
  hidden: boolean
}

@Component({
  selector: 'component-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: [ './scoreboard.component.css' ]
})
export class ScoreboardComponent {

  @Input()
  public scoreboard!: Scoreboard

  hide() {
    this.scoreboard.hidden = true
  }

  show() {
    this.scoreboard.hidden = false
  }

}
