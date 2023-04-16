import React from 'react';
import {useState} from "react";




function Square({value , onSquareClick}){
  return <button className="square" onClick={onSquareClick} >{value}</button>
}



function Board({ xIsNext, squares, onPlay }) {

  function handleClick(i){
    if(squares[i] || calculateWinner(squares)){  //aca lo que hacemos es comprobar si el cuadrado ya esta lleno.Como un string representa un "TRUE", si esta lleno con una X o una O, genera un return y no actualiza el estado. si hay un null seria un false, por lo tanto no ejecuta esa porcion de codigo y sigue con el resto.Tambien al mismo tiempo verificamos si ya hay un ganador. 
      return;
    }
    const nextSquares = squares.slice()
    if(xIsNext){
      nextSquares[i] ="X";
    }else{
      nextSquares[i]="O";
    }
    onPlay(nextSquares);
  }

    const winner= calculateWinner(squares);
    let status;
    if(winner){
      status = "Ganador: " + winner;
    }else{
      status = "Siguiente jugador: " + (xIsNext ? "X" : "O");  //condición ? expresión_si_verdadero : expresión_si_falso
    }
  


  return (
<React.Fragment>
  <div className="status">{status}</div>
  <div className="board-row">
  <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
  <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
  <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
  </div>
  <div className="board-row">
  <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
  <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
  <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
  </div>
  <div className="board-row">
  <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
  <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
  <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
  </div>
  </React.Fragment>
  );
}

export default function game() {
  const [xIsNext , setXIsNext] =useState(true)
  const [history , setHistory] = useState([Array(9).fill(null)]) //es una matriz con un solo elemento, que a su vez es una matriz de 9 nulls
  const currentSquares = history[history.length - 1 ]

  function handlePlay(nextSquares){
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  return (
    <div className="game" >
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{}</ol>
      </div>
    </div>
  );
}


function calculateWinner(squares){
  const lines = [  // Defino la constante 'lines' que es un arreglo de todas las posibles combinaciones de cuadros que podrían formar una línea ganadora
  [0, 1, 2],  // Primera fila
  [3, 4, 5],  // Segunda fila
  [6, 7, 8],  // Tercera fila
  [0, 3, 6],  // Primera columna
  [1, 4, 7],  // Segunda columna
  [2, 5, 8],  // Tercera columna
  [0, 4, 8],  // Diagonal principal
  [2, 4, 6]   // Diagonal secundaria
  ];
for(let i=0 ; i< lines.length ; i++){ // Utilizo un bucle 'for' para iterar a través de cada posible línea ganadora en el arreglo 'lines'
  const [a,b,c] = lines[i];  // Desestructurao el arreglo actual en tres variables 'a', 'b' y 'c'
  if(squares[a] && squares[a] === squares[b] && squares[a] === squares [c]){  // Verifica si los valores en los índices 'a', 'b' y 'c' del arreglo 'squares' son iguales (osea si los 3 son una "X"o"O") y no son 'null'
    return squares[a];  // Si los valores son iguales, devuelve el valor del cuadro 'a' como ganador
    
  }
}
return null;

}


