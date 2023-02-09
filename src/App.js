import { useState } from "react";

//board width
const width = 8 ;
//array of candys colors
const candyColors = [
  'blue',
  'green',
  'red',
  'orange',
  'yellow',
  'purple'
]

const App = () => {
  //STATE
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]) ;

  //board initialization
  const createBoard = () => {
    const randomColorArrangement = [] ; 
    for(let i = 0 ; i < width * width ; i ++) {
      //generating a random color from the candyColor array
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)] ;
      randomColorArrangement.push(randomColor) ; 
    }
  }

  createBoard();


  return (
    <div>
      HENLO
    </div>
  );
}

export default App;
