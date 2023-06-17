import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Drink from './Drink'
import DrinkOrder from './Types'

function App() {
  const [count, setCount] = useState(0)
  

  let newDrinkArray: Array<DrinkOrder> = [] 
  const [drinks, setDrinks] = useState(newDrinkArray)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <button onClick={() => {
        setCount((count) => count + 1)
        let drink: DrinkOrder = {Name: `Vinh${count}`, Drink: "Coffee"}
        setDrinks(drinks => [...drinks, drink])
        }
      }>
          Add 
      </button>
      {drinks.map(drink => {
        return (
          <p>
            <Drink {...drink} />
            <button onClick={() => {
              let newDrinks = [...drinks]
              newDrinks.splice(newDrinks.indexOf(drink), 1)
              setDrinks(newDrinks)
            } }>Remove</button>
          </p>
        )
      })}
    </>
  )
}

export default App
