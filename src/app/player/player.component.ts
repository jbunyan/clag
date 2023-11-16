import { Component, Input, OnInit } from '@angular/core';
import { PlayerModel } from "./player-model";
import { RoundState } from "../gameboard/gameboard.component"
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'component-player',
  templateUrl: './player.component.html',
  styleUrls: [ './player.component.css' ]
})
export class PlayerComponent implements OnInit {

  @Input()
  public player!: PlayerModel

  @Input()
  public roundState: RoundState = RoundState.INIT

  public ROUND_STATE = RoundState // bodge...

  public flashClass: string = ""

  private eventSubject!: BehaviorSubject<any>

  ngOnInit() {
    this.eventSubject = this.player.getEventSubject()

    this.eventSubject.subscribe({
      next: (d) => {
        if (d) {
          this.flashClass = "player-highlight"
          setTimeout( () => {
            this.flashClass = ""
          }, 6000)
        }        
      }
    })
  }

}


