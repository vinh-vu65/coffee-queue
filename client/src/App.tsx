import { useEffect, useState } from 'react'
import boulderLabLogo from './assets/Boulder-Lab-Logo+Vector.png'
import coffeeEmoji from './assets/coffee.png'
import './App.css'
import DrinkOrder from './Types'
import { socket } from './socket'
import Table from './Table'
import NavBar from './Navbar'

function App() {
  
  let newDrinkArray: Array<DrinkOrder> = [] 
  const [drinks, setDrinks] = useState(newDrinkArray)
  const [location, setLocation] = useState('Brunswick')
  
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

  const handleSelect = (option: string) => {
    setLocation(option)
  }

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
        <NavBar onOptionSelect={handleSelect} />
      </div>
        
      <div>
        <Table data={drinks} onRemove={handleRemove} selectedLocation={location} />
      </div>
    </>
  )
}

export default App
