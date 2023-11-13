import { Component, Input, OnInit } from '@angular/core';
import { CardUtils } from './card-utils'

@Component({
  selector: 'component-card',
  templateUrl: './cards.component.html',
  styleUrls: [ './cards.component.css' ]
})
export class CardComponent implements OnInit {

  @Input()
  public value: string = ""

  @Input()
  public selected: boolean = false

  @Input()
  public playable: boolean = false

  @Input()
  public hidden: boolean = false

  colourClass: string = ""

  selectedClass: string = ""
  notPlayableClass: string = ""
  
  suitSymbol: string = ""
  cardValue: string = ""
  cardString: string = ""
  cardClassHidden: string = ""
  cardClasses: string = ""
  valueClasses: string = ""

  constructor() {
    console.log("Card component constructor")
  }

  ngOnInit() {
    this.colourClass = this.getClass()

    this.selectedClass = this.selected && this.playable ? "card-selected" : ""
    this.notPlayableClass = this.selected && !this.playable ? " card-selected-not-playable bounce" : ""
    
    this.suitSymbol = CardUtils.getSuitSymbol(this.value)
    this.cardValue = CardUtils.getValue(this.value)
    this.cardString = this.cardValue + this.suitSymbol
    this.cardClassHidden = this.hidden ? " card-hidden" : ""
    this.cardClasses = "card-card " + this.selectedClass + this.cardClassHidden + this.notPlayableClass
    this.valueClasses = "card-value " + this.colourClass
  }

  getClass(): string {

    const colours: {[key:string]:string} = {
      'C': 'card-black',
      'D': 'card-red',
      'S': 'card-black',
      'H': 'card-red'
    }
    let suit = CardUtils.getSuit(this.value)

    return colours[suit]
  }

}