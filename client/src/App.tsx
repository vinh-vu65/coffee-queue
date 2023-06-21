import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Drink from './Drink'
import DrinkOrder from './Types'
import { socket } from './socket'

function App() {
  
  let newDrinkArray: Array<DrinkOrder> = [] 
  const [drinks, setDrinks] = useState(newDrinkArray)
  
  socket.connect()
  useEffect(() => {
    function serverSendDrinks(value: Array<DrinkOrder>) {
      setDrinks([...value])
    }
    
    socket.on('sendDrinks', serverSendDrinks)
    socket.emit('removeDrink', drinks)

    return () => {
      socket.off('sendDrinks', serverSendDrinks)
    }
  }, [drinks])

  


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
        
      {drinks.map(drink => {
        return (
          <div>
            <Drink {...drink} />
            <button onClick={() => {
              let newDrinks = [...drinks]
              newDrinks.splice(newDrinks.indexOf(drink), 1)
              setDrinks(newDrinks)
            }}>Remove</button>
          </div>
        )
      })}
    </>
  )
}

export default App
