"use client"

import { useEffect, useState } from "react"

const values = [{name:"rock", value:"1"},
{name:"paper", value:"2"},
{name:"scissors", value:"3"}]

export default function NormalGames () {
    const [result, setResult] = useState("");

    const getRandomInt = () => {
        return Math.floor(Math.random() * 3);
    }

    useEffect(() => {
        console.log("NormalGames")
        setResult("")

    }, [])

    const handleClick = (e:any) =>{
        e.preventDefault();
        const random = values[getRandomInt()].name
        let gameResult = ""
        if (random
             == e.target.value){
            console.log("draw")
            gameResult = "draw"
        }
        else{
            switch (e.target.value) {
                case "rock":
                    gameResult = random === "paper" ? "lose" : "win"
                    break;
                case "paper":
                    gameResult = random === "scissors" ? "lose" : "win"
                    break;
                case "scissors":
                    gameResult = random === "rock" ? "lose" : "win"
                    break;
                default:
                    break;
            }
        }
        console.log(gameResult)
        console.log("The game uses "+random)
        console.log("U use "+ e.target.value)
    }

    return(<>Normal Games
    <form>
        {values.map((value, index)=>
        {
            return(<div key={index}>
                <button type="button" value={value.name} onClick={handleClick}>{value.name}</button>
                </div>)
        })}
    </form></>)
}