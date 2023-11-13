import { Component, Input } from '@angular/core';
import { PlayerModel } from "./player-model";
import { RoundState } from "../gameboard/gameboard.component"

@Component({
  selector: 'component-player',
  templateUrl: './player.component.html',
  styleUrls: [ './player.component.css' ]
})
export class PlayerComponent {

  @Input()
  public player!: PlayerModel

  @Input()
  public roundState: RoundState = RoundState.INIT

  public ROUND_STATE = RoundState // bodge...

}


