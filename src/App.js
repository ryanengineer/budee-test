import React, { useEffect, useState } from 'react'
import ChessBoard from 'chessboardjsx'
// import CustomBoard from './CustomBoard'
import './App.css'

const App = () => {
  const [topSideColor, setTopSideColor] = useState('red')
  const [changeColor, setChangeColor] = useState(false)
  const [width, setWidth] = useState(500)
  const [error, setError] = useState('')
  const [position, setPositions] = useState('')
  const [defaultBoardPosition, setDefaultBoardPosition] = useState(false)

  useEffect(() => {
    const prevPosition = JSON.parse(localStorage.getItem('position'))

    if (prevPosition) {
      setPositions(prevPos => [...prevPos, prevPosition])
    }
  }, [defaultBoardPosition, topSideColor, position])

  const inputHandler = event => {
    if (event.target.value === '') {
      setError('')
    }

    const num = event.target.value
    if (event.target.value !== '') {
      if (num < 5 || num > 20) {
        setError("Number can't be less than 5 or greater than 20")
      } else {
        setWidth(event.target.value * 50)
        setError('')
      }
    }
  }

  const redPiece = ({ squareWidth, isDragging }) => {
    return (
      <img
        style={{
          width: isDragging ? squareWidth * 1.75 : squareWidth,
          height: isDragging ? squareWidth * 1.75 : squareWidth
        }}
        src={`red-sphere.png`}
        alt={'elvis'}
      />
    )
  }

  const blackPiece = color => {
    let squareWidth, isDragging
    if (color) {
      squareWidth = 62.5
      isDragging = false
    }
    console.log('pieceProps', color, squareWidth)
    return (
      <img
        style={{
          width: isDragging ? squareWidth * 1.75 : squareWidth,
          height: isDragging ? squareWidth * 1.75 : squareWidth
        }}
        src={`${color}-sphere.png`}
        alt={'elvis'}
      />
    )
  }

  const saveInLocalStorage = position => {
    if (position) {
      localStorage.setItem('position', JSON.stringify(position))
    }
  }

  const handleInputChange = () => {
    setChangeColor(true)
  }

  const resetButtonHandler = () => {
    setDefaultBoardPosition(prevPosition => !prevPosition)
  }

  const savePositions = position => {
    setPositions(JSON.stringify(position))
  }

  const saveButtonHandler = () => {
    localStorage.clear()
    saveInLocalStorage(position)
  }

  let posObj
  if (position && position !== '') {
    posObj = JSON.parse(position)
  }

  let newPosition
  if (defaultBoardPosition) {
    newPosition = JSON.parse(position)
  } else {
    newPosition = 'start'
  }

  return (
    <div className="container">
      CheckerBoard
      <div>
        <input
          className="input"
          type="number"
          placeholder="Change the size of the grid?"
          onChange={event => inputHandler(event)}
        />
        <div style={{ color: 'red' }}>{width ? error : null}</div>

        {changeColor ? (
          <>
            <h1>New</h1>
            <ChessBoard
              id="0"
              orientation="black"
              darkSquareStyle={{ backgroundColor: 'black' }}
              lightSquareStyle={{ backgroundColor: 'white' }}
              dropSquareStyle={{ boxShadow: 'inset 0 0 1px 4px lightblue' }}
              width={width}
              undo={defaultBoardPosition}
              position={'start'}
              getPosition={position => {
                savePositions(position)
              }}
              pieces={{
                wK: redPiece,
                wB: redPiece,
                wN: redPiece,
                wR: redPiece,
                wQ: redPiece,
                wP: redPiece,
                bK: blackPiece('', 'black'),
                bB: blackPiece,
                bN: blackPiece,
                bR: blackPiece,
                bQ: blackPiece,
                bP: blackPiece
              }}
            />
          </>
        ) : (
          <>
            <h1>Old</h1>

            <ChessBoard
              id="1"
              orientation="black"
              darkSquareStyle={{ backgroundColor: 'black' }}
              lightSquareStyle={{ backgroundColor: 'white' }}
              dropSquareStyle={{ boxShadow: 'inset 0 0 1px 4px lightblue' }}
              width={width}
              undo={defaultBoardPosition}
              position={'start'}
              getPosition={position => {
                savePositions(position)
              }}
              pieces={{
                wK: blackPiece('black')
                // wb: blackPiece,
                // wN: blackPiece,
                // wR: blackPiece,
                // wQ: blackPiece,
                // wP: blackPiece,
                // bK: redPiece,
                // bB: redPiece,
                // bN: redPiece,
                // bR: redPiece,
                // bQ: redPiece,
                // bP: redPiece
              }}
            />
          </>
        )}

        <button onClick={saveButtonHandler}>Save</button>
        <button onClick={resetButtonHandler}>Reset</button>
        <label>
          Change color:
          <input
            name="isGoing"
            type="radio"
            onChange={handleInputChange}
            // checked={this.state.isGoing}
          />
        </label>
      </div>
    </div>
  )
}

export default App
