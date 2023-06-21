import { useEffect, useState } from 'react'
import boulderLabLogo from './assets/Boulder-Lab-Logo+Vector.png'
import coffeeEmoji from './assets/coffee.png'
import './App.css'
import DrinkOrder from './Types'
import { socket } from './socket'
import Table from './Table'

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

  const handleRemove = (index: number) => {
    const updatedData = [...drinks];
    updatedData.splice(index, 1);
    setDrinks(updatedData);
  }

  return (
    <>
      <div>
        <img src={boulderLabLogo} className="logo" alt="Vite logo" />
        <a href="https://react.dev" target="_blank">
          <img src={coffeeEmoji} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Boulder Lab Coffee Queue</h1>
      <div className="card">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
        
      <div>
        <Table data={drinks} onRemove={handleRemove} />
      </div>
    </>
  )
}

export default App
