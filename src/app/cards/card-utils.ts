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
}