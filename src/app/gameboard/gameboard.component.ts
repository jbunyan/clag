import { Component, OnInit } from '@angular/core';
import { ConnectionService, Message } from '../connection.service';
import { PlayerModel } from '../player/player-model';
import { Scoreboard, ScoreboardEntry } from '../scoreboard/scoreboard.component';
import { CardUtils } from '../cards/card-utils';

export enum RoundState {
  INIT,
  PREDICTIONS,
  PREDICTIONS_COMPLETE,
  IN_PROGRESS,
  COMPLETE
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './gameboard.component.html',
  styleUrls: [ './gameboard.component.css' ]
})
export class GameboardComponent {

  names: string[] = ['John','Eric','Nancy','Allen','Gavin']
  myHand: string[] = []
  myName: string = "XXX"
  predictions: number[] = []
  trick: number = 0
  currentTrick: string[] = []
  scoreboard: Scoreboard = {
    players: [],
    scores: [],
    hidden: true
  };
  roundState: RoundState = RoundState.INIT
  predictionRequested: boolean = false
  predictionRange: number[] = []
  myPrediction: number = -1
  playCardRequested: boolean = false
  trumps: string = ""
  trumpsColour: string = ""
  trumpsStyle: {color: string} = {color: ""}

  players: PlayerModel[] = []

  constructor(
    public connection: ConnectionService
  ) {
    console.log("gameboard constructor")

    this.connection.getMessageBehaviourSubject().subscribe({
      next: (message:Message) => {
        switch(message.messageType) {
          case "hand": {
            this.roundState = RoundState.PREDICTIONS
            this.myHand = message.data.hand
            this.players.forEach(p => {
              p.clearDealer()
              p.setTricksWon(0)
              p.setCurrentPrediction(-1)
            })
            this.players[message.data.dealer].setDealer()
            this.trumps = CardUtils.getSuitSymbol(message.data.trumps)
            this.trumpsStyle = {color: CardUtils.getSuitColour(message.data.trumps)}
            break
          }
          case "predictionRequest": {
            this.myPrediction = -1
            this.predictionRange = []
            for (let i = 0; i <= this.myHand.length ; i++) {
              this.predictionRange.push(i);
           }
            this.predictionRequested = true
            break
          }
          case "predictions": {
            this.players[message.data.prediction.playerId].setCurrentPrediction(message.data.prediction.prediction)
            let predictionsComplete: boolean = true
            this.players.forEach( p => {
              if (predictionsComplete && (p.getCurrentPrediction() === -1)) {
                predictionsComplete = false
              }
            })
            if (predictionsComplete) this.roundState = RoundState.PREDICTIONS_COMPLETE
            break
          }
          case "playCard": {
            this.playCardRequested = true
            break
          }
          case "cardPlayed": {
            this.roundState = RoundState.IN_PROGRESS
            this.currentTrick.push(message.data.card)
            break
          }
          case "trickResult": {
            setTimeout( () => {
              this.currentTrick = []
            }, 5000)
            let t = this.players[message.data.trickResult.winningPlayer].getTricksWon()
            this.players[message.data.trickResult.winningPlayer].setTricksWon(t + 1)
            break
          }
          case "players": {
            this.updatePlayers(message)
            break
          }
          case "scoreboard": {
            this.roundState = RoundState.COMPLETE
            this.scoreboard.players = this.players
            this.scoreboard.scores = message.data.scoreboard
            this.scoreboard.hidden = true // LEAVE HIDDEN FOR NOW....

            let lastRound: ScoreboardEntry[] = message.data.scoreboard.pop()

            lastRound.forEach( (se: ScoreboardEntry, index: number) => {
              this.players[index].setCurrentScore(se.score)
            })
            break
          }
          default: {
            console.log("dashboard: ignoring message")
          }
        }
      }
    })
  }

  updatePlayers(message: Message) {
    this.players = message.data.players.map(
      (p: string) => {
        let player = new PlayerModel()
        player.setName(p)
        return player
      }
    )
  }

  playerSelected() {
    this.connection.setMyName(this.myName)
    this.connection.send("register",{"name":this.myName});
  }

  predictionSelected() {
    this.connection.send("prediction",{"prediction":this.myPrediction});
    this.predictionRequested = false
  }

  cardSelected(card: string) {
    if (this.playCardRequested) {
      this.connection.send("card",{"card":card});
      this.playCardRequested = false
      let index = this.myHand.findIndex(c => c === card)
      this.myHand.splice(index,1)
    }
  }

  newGame() {
    console.log("New game")
    this.connection.send("newGame")
  }
}
