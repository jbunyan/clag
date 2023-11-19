import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Message {
  messageType: string,
  data?: any
}

interface ServerMessage {
  playerId: number,
  connectionId: number,
  messageType: string,
  data?: any
}

@Injectable({ providedIn: 'root' })
export class ConnectionService {

  myPlayerId: number = -1
  myConnectionId: number = -1
  myName: string = "XXX"

  localServer: string = "ws://localhost:8080"
  railwayServer: string = "wss://clag-production.up.railway.app/"

  messageBehaviourSubject: BehaviorSubject<Message> = new BehaviorSubject({
    messageType: "init"
  })

  ws: WebSocket

  constructor() {

    let url = window.location.hostname === 'localhost'  ? this.localServer : this.railwayServer

    console.log(`Connecting to: ${url}`)

    this.ws = new WebSocket(url);
				
      this.ws.onopen = function() {
        
        // Web Socket is connected, send data using send()
        console.log("Connection successful")
      };

      this.ws.onmessage = (evt) => { 
        let received_msg = JSON.parse(evt.data) as ServerMessage;
        console.log("Message received... " + JSON.stringify(received_msg));

        switch(received_msg.messageType) {
          case "connection": {
            this.myConnectionId = received_msg.connectionId
            break
          }
          case "players": {
            if ( this.myConnectionId === received_msg.connectionId) {
              this.myPlayerId = received_msg.data.players.findIndex((p: string) => p === this.myName)
            }
            this.forward(received_msg)
            console.log(`New player: ${received_msg.data.name}`)
            break
          }
          case "predictionRequest": {
            this.forward(received_msg)
            break
          }
          case "hand": {
            this.forward(received_msg)
            break
          }
          case "predictions": {
            this.forward(received_msg)
            break
          }
          case "playCard": {
            this.forward(received_msg)
            break
          }
          case "cardPlayed": {
            this.forward(received_msg)
            break
          }
          case "trickResult": {
            this.forward(received_msg)
            break
          }
          case "scoreboard": {
            this.forward(received_msg)
            break
          }
          default: {
            console.log("unrecognised message type received")
          }
        }
        
      };

      this.ws.onclose = () => { 
        
        // websocket is closed.
        this.myConnectionId = -1
        alert("Connection is closed..."); 
      };
  }

  setMyName(n: string) {
    this.myName = n
  }

  getMyPlayerId(): number {
    return this.myPlayerId
  }

  getMessageBehaviourSubject(): BehaviorSubject<Message> {
    return this.messageBehaviourSubject
  }

  send(messageType: string, data?: any) {
    let dataSection: string = data ? `,"data":${JSON.stringify(data)}` : ""
    this.ws.send(`{"connectionId": ${this.myConnectionId},"playerId": ${this.myPlayerId},"messageType":"${messageType}"${dataSection}}`);
  }

  forward(msg: ServerMessage) {
    this.messageBehaviourSubject.next({
      messageType: msg.messageType,
      data: msg.data ? msg.data : undefined
    })
  }

  isConnected(): boolean {
    return this.myConnectionId !== -1
  }

}
