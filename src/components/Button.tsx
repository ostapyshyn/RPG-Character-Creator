import attackOptionsList from '../data/attackOptionsList'
import namesList from '../data/namesList'

interface CharacterData {
  hat: boolean
  shield: boolean
  weapon: 'sword' | 'staff'
  stats: {
    hp: number
    mp: number
    strength: number
  }
  attackOptions: string[]
  name: string
}

interface ButtonProps {
  setCharacterData: React.Dispatch<React.SetStateAction<CharacterData>>
}

export default function Button({ setCharacterData }: ButtonProps) {
  function toggle() {
    setCharacterData(() => {
      function genRanNum(max: number): number {
        return Math.floor(Math.random() * max)
      }

      function flipCoin() {
        return genRanNum(100) < 50 ? true : false
      }

      function getAttackOptions(): string[] {
        const optionsListCopy = [...attackOptionsList]
        return new Array(6).fill(null).map(() => {
          const randomIndex = genRanNum(optionsListCopy.length)
          return optionsListCopy.splice(randomIndex, 1)[0]
        })
      }

      return {
        hat: flipCoin() ? true : false,
        shield: flipCoin() ? true : false,
        weapon: flipCoin() ? 'sword' : 'staff',
        stats: {
          hp: genRanNum(100),
          mp: genRanNum(100),
          strength: genRanNum(100),
        },
        attackOptions: getAttackOptions(),
        name: namesList[genRanNum(namesList.length)],
      }
    })
  }

  return <button onClick={toggle}>Toggle</button>
}
