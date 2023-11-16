import { BehaviorSubject } from "rxjs";

export class PlayerModel {

  private name: string = "X"
  private tricksWon: number = 0;
  private currentPrediction: number = 0;
  private currentScore: number = 0;
  private dealer: boolean = false;

  private eventSubject!: BehaviorSubject<any>

  constructor() {
    this.eventSubject = new BehaviorSubject(null)
  }

  public getEventSubject(): BehaviorSubject<any> {
    return this.eventSubject
  }

  public setName(name: string) {
    this.name = name
  }

  public getName(): string {
    return this.name
  }

  public setTricksWon(n: number) {
    this.tricksWon = n
    if (this.tricksWon > 0 && this.eventSubject ) {
      this.eventSubject.next("evt")
    }
  }

  public getTricksWon(): number {
    return this.tricksWon
  }

  public setCurrentPrediction(p: number) {
    this.currentPrediction = p
  }

  public getCurrentPrediction() {
    return this.currentPrediction
  }

  public setCurrentScore(s: number) {
    this.currentScore = s
  }

  public getCurrentScore() {
    return this.currentScore
  }

  public setDealer() {
    this.dealer = true
  }

  public clearDealer() {
    this.dealer = false
  }

  public getDealer() {
    return this.dealer
  }

}