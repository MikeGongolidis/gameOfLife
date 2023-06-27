import './App.css'
import GameOfLife from './components/GameOfLife'

function App() {

  return (
    <>
        <GameOfLife     
          gridSize={80}
          cellSize={10}
          colors={{
              alive: 'black',
              dead: 'white'
          }}
         />
    </>
  )
}

export default App
