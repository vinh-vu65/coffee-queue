import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
        
      <div>
        <Table data={drinks} onRemove={handleRemove} />
      </div>
    </>
  )
}

export default App
