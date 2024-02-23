export function Tie(squares) {
    let tie = squares.every((box)=> {return box !== null});
   return tie;
}