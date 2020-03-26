// import React from 'react'
// import ChessBoard from 'chessboardjsx'
// import Chess from 'chess.js'

// const game = new Chess()

// const CustomBoard = ({
//   redPiece,
//   blackPiece,
//   width,
//   position,
//   savePositions
// }) => {
//   console.log('position', position)
//   const onDrop = ({ sourceSquare, targetSquare }) => {
//     debugger
//     // see if the move is legal
//     let move = game.move({
//       from: sourceSquare,
//       to: targetSquare,
//       promotion: 'q' // always promote to a queen for example simplicity
//     })

//     // illegal move
//     if (move === null) return
//     this.setState(({ history, pieceSquare }) => ({
//       fen: this.game.fen(),
//       history: this.game.history({ verbose: true })
//       //   squareStyles: squareStyling({ pieceSquare, history })
//     }))
//   }

//   return (
//     <>
      
//     </>
//   )
// }

// export default CustomBoard
