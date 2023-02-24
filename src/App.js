import { useEffect, useState } from "react";
import ScoreBoard from "./components/ScoreBoard";
import blueCandy from "./images/blue-candy.png";
import greenCandy from "./images/green-candy.png";
import orangeCandy from "./images/orange-candy.png";
import purpleCandy from "./images/purple-candy.png";
import redCandy from "./images/red-candy.png";
import yellowCandy from "./images/yellow-candy.png";
import blank from "./images/blank.png";

//board width
const width = 8;
//array of candys colors
const candyColors = [
  blueCandy,
  greenCandy,
  orangeCandy,
  redCandy,
  yellowCandy,
  purpleCandy,
];

const App = () => {
  //STATE
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
  const [scoreDisplay, setScoreDisplay] = useState(0);

  //COMPORTEMENTS

  //checking the column of FOUR similar colors
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkForColumnOfFour = () => {
    //stop at index 39 because this is the beginning of last possible column of four
    for (let i = 0; i <= 39; i++) {
      //retrieve every possible column of four
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;
      if (
        columnOfFour.every(
          (square) => currentColorArrangement[square] === decidedColor
        ) &&
        !isBlank
      ) {
        setScoreDisplay((score) => score + 4);
        columnOfFour.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        return true;
      }
    }
  };

  //checking the column of THREE similar colors
  //adding a useCallBack to prevent unecessary rerender
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkForColumnOfThree = () => {
    //stop at index 47 because this is the beginning of last possible column of three
    for (let i = 0; i <= 47; i++) {
      //retrieve every possible column of three
      const columnOfThree = [i, i + width, i + width * 2];
      //retrieve color of the column first candy
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;
      //checking the three colors matches
      if (
        columnOfThree.every(
          (square) => currentColorArrangement[square] === decidedColor
        ) &&
        !isBlank
      ) {
        setScoreDisplay((score) => score + 3);
        columnOfThree.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        return true;
      }
    }
  };

  //Check rows of THREE
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      //retrieve every possible row of three
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;
      //exclude the two last columns of the grid
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];
      if (notValid.includes(i)) {
        continue;
      }
      //checking the three colors matches
      if (
        rowOfThree.every(
          (square) => currentColorArrangement[square] === decidedColor
        ) &&
        !isBlank
      ) {
        setScoreDisplay((score) => score + 3);
        rowOfThree.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        return true;
      }
    }
  };

  //Check rows of FOUR
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      //retrieve every possible row of four
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;
      //exclude the three last columns of the grid
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];
      if (notValid.includes(i)) {
        continue;
      }
      //checking the four colors matches
      if (
        rowOfFour.every(
          (square) => currentColorArrangement[square] === decidedColor
        ) &&
        !isBlank
      ) {
        setScoreDisplay((score) => score + 4);
        rowOfFour.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        return true;
      }
    }
  };

  //function that make candys fill blanks space from up to down
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const moveIntoSquareBelow = () => {
    //looping through grid minus the last line
    for (let i = 0; i <= 55; i++) {
      //identify first row
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      //checking if i is on first row
      const isFirstRow = firstRow.includes(i);

      //checking if its first row and if so generating some new candies
      if (isFirstRow && currentColorArrangement[i] === blank) {
        let randomNumber = Math.floor(Math.random() * candyColors.length);
        currentColorArrangement[i] = candyColors[randomNumber];
      }

      //checking if the square below is empty then move down the candy on index i + width
      if (currentColorArrangement[i + width] === blank) {
        currentColorArrangement[i + width] = currentColorArrangement[i];
        //as the block moves down its initial place become empty
        currentColorArrangement[i] = blank;
      }
    }
  };

  //Movement of drags action
  const dragStart = (e) => {
    setSquareBeingDragged(e.target);
  };

  const dragDrop = (e) => {
    setSquareBeingReplaced(e.target);
  };

  const dragEnd = (e) => {
    //getting the IDs of the moving squares
    const squareBeingDraggedID = parseInt(
      squareBeingDragged.getAttribute("data-id")
    );
    const squareBeingReplacedID = parseInt(
      squareBeingReplaced.getAttribute("data-id")
    );

    //swaping the colors between square being moved and square being dropped on
    currentColorArrangement[squareBeingReplacedID] =
      squareBeingDragged.getAttribute("src");
    currentColorArrangement[squareBeingDraggedID] =
      squareBeingReplaced.getAttribute("src");

    //listing all autorized moves based on the id of the square that was picked up
    const validMoves = [
      squareBeingDraggedID - 1,
      squareBeingDraggedID - width,
      squareBeingDraggedID + 1,
      squareBeingDraggedID + width,
    ];
    //checking if moves are valid, if not, prevent moves
    const validMove = validMoves.includes(squareBeingReplacedID);

    //to ckeck if moves are autorized it should also be equal to a row or column of three or four
    const isAColumnOfFour = checkForColumnOfFour();
    const isARowOfFour = checkForRowOfFour();
    const isAColumnOfThree = checkForColumnOfThree();
    const isARowOfThree = checkForRowOfThree();

    if (
      squareBeingReplacedID &&
      validMove &&
      (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)
    ) {
      setSquareBeingDragged(null);
      setSquareBeingReplaced(null);
    } else {
      currentColorArrangement[squareBeingReplacedID] =
        squareBeingReplaced.getAttribute("src");
      currentColorArrangement[squareBeingDraggedID] =
        squareBeingDragged.getAttribute("src");
      setCurrentColorArrangement([...currentColorArrangement]);
    }
  };

  //board initialization
  const createBoard = () => {
    const randomColorArrangement = [];

    for (let i = 0; i < width * width; i++) {
      //generating a random color from the candyColor array
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      //push 64 random colors to the array
      randomColorArrangement.push(randomColor);
    }
    //setter utilization to modify state with random array
    setCurrentColorArrangement(randomColorArrangement);
  };

  //to set only one random array and not an infinite rerender
  useEffect(() => {
    createBoard();
    //with an empty array as second dependency (parameter)
    //that will run only on the first render
  }, []);

  //call function that checks columns/rows of THREE/FOUR every 100ms
  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForRowOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      moveIntoSquareBelow();
      //regenerate random colors
      setCurrentColorArrangement([...currentColorArrangement]);
    }, 100);

    return () => clearInterval(timer);
  }, [
    checkForColumnOfFour,
    checkForRowOfFour,
    checkForColumnOfThree,
    checkForRowOfThree,
    moveIntoSquareBelow,
    currentColorArrangement,
  ]);

  //RENDER
  return (
    <div className="app">
      <div className="game">
        {/*for every color item in array, create image with background*/}
        {currentColorArrangement.map((candyColor, index) => (
          <img
            key={index}
            src={candyColor}
            alt={candyColor}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </div>
      <ScoreBoard score={scoreDisplay} />
    </div>
  );
};

export default App;
