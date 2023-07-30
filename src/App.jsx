import React from "react"
import Die from './components/Die'
import {nanoid} from "nanoid"

import Confetti from 'react-confetti'

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)

    function randomDieValue() {
        return Math.ceil(Math.random() * 6)
    }
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            console.log("You won!")
        }
    }, [dice])

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push({
                value: Math.ceil(Math.random() * 6), 
                isHeld: false,
                id: nanoid()})
        }
        return newDice
    }
    
    const diceElements = dice.map(die => 
        <Die key={die.id} {...die} hold={() => holdDice(die.id)} />)
    
    function rollDice() {

        if(tenzies) {
            setTenzies(false)
            setDice(oldDice => oldDice.map(die => {
                return {...die, isHeld: false}
            }))
            allNewDice()
        }
        
        setDice((oldDice) =>oldDice.map((die, i) =>
            die.isHeld ?
                    die :
                    { value: randomDieValue(), isHeld: false, id: nanoid() }
            ))
        //setDice(allNewDice())
    }

    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }

    console.log("dice array", dice)
    console.log("dice ele 0", dice[0])
    console.log("diceElements array", diceElements)
    console.log("diceElements 0", diceElements[0])

    return(
        <main>
            {tenzies && <Confetti />}
            <div className="dice-container">
                {diceElements}
            </div>
            {/*New button here*/}
            <button className="roll-dice" onClick={rollDice}>
              {tenzies ? "You Won!" : "Roll"}</button>

        </main>
    )
}
