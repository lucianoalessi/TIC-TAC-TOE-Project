import React from 'react';
import {useState} from "react";




function Square({value , onSquareClick}){
  return <button className="square" onClick={onSquareClick} >{value}</button>
}



export default function Board() {


  const [xIsNext , setXIsNext] =useState(true)
  const [squares , setSquares] = useState(Array(9).fill(null))
  
  function handleClick(i){
    if(squares[i]){        //aca lo que hacemos es comprobar si el cuadrado ya esta lleno.Como un string representa un "TRUE", si esta lleno con una X o una O, genera un return y no actualiza el estado. si hay un null seria un false, por lo tanto no ejecuta esa porcion de codigo y sigue con el resto. 
      return
    }
    const nextSquares = squares.slice()
    if(xIsNext){
      nextSquares[i] ="X"
    }else{
      nextSquares[i]="O"
    }
    setSquares(nextSquares)
    setXIsNext(!xIsNext)
  }

  return (

<React.Fragment>
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

function calculareWinner(squares){
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