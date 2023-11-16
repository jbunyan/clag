export class CardUtils {

  static getSuit(value: string): string {
    return value.length === 2 ? value.charAt(1) : value.charAt(2)
  }

  static getValue(value: string): string {
    return value.length === 2 ? value.substring(0,1) : value.substring(0,2)
  }

  static getSuitSymbol(value: string): string {

    const suits: {[key:string]:string} = {
      'C': '\u2663',
      'D': '\u2666',
      'S': '\u2660',
      'H': '\u2665'
    }
  
    // cater for use when either a card or just a suit is passed to the fn
    let suit = value.length === 2 ? value.charAt(1) : value.length === 1 ? value : value.charAt(2);
  
    return suits[suit]
  }

  static getSuitColour(suit:string): string {
    let reds = ["H","D"]
    if (reds.indexOf(suit) !== -1) {
      return "red"
    } else {
      return "black"
    }
  }

  static getSuitIndex(card: string): number {
    let suits = ["H","C","D","S"]
    return suits.findIndex(c => c === this.getSuit(card))
  }

  static getValueIndex(card: string): number {
    let values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"]
    return values.findIndex(c => c === this.getValue(card))
  }

  static sortHand(hand: string[]) {
    hand.sort( (a,b) => {
      if (this.getSuitIndex(a) !== this.getSuitIndex(b)) {
        return (this.getSuitIndex(a) - this.getSuitIndex(b))
      } else {
        return (this.getValueIndex(a) - this.getValueIndex(b))
      }

    })
  }
}