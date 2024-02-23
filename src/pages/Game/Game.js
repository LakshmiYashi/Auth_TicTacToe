import React , { useState , useEffect }from "react";
import { useHistory } from "react-router-dom";
import styles from "./Game.module.css";
import Board from "./Board";
import {calculateWinner} from "./Winner";
import { alert } from "./Alert";
import Marquee from "react-fast-marquee";
import { Tie } from "./Tie";


const Game = () => {
const [board , setBoard] = useState(Array(9).fill(null));
const [xIsNext , setXisNext] = useState(true);
const winner = calculateWinner(board);
const mayWin = alert(board);
const gameTie = Tie(board);
const history = useHistory();
const [start , setStart] = useState(true);
const [ran, setRan] = useState(false);
const signoutTime = 60000;
const warningTime = 15000;
let warnTimeout;
let logoutTimeout;
const [warning , setWarning] = useState(false);
const [computer , setComputer] = useState(false);
let boardCopy;


const logout = () => {

    /* eslint-disable */
    // const toLogout = confirm("Are you sure to logout ?");
    /* eslint-enable */
    // if (toLogout) {
      localStorage.clear();
      history.push("/login");
    // }
    setWarning(false);
  };
  const warn = () => {
    console.log('Warning Session is logging out');
    setWarning(true);
}
const setTimeouts = () => {
    warnTimeout = setTimeout(warn, warningTime);
    logoutTimeout = setTimeout(logout, signoutTime);
}
const clearTimeouts = () => {
    if (warnTimeout) clearTimeout(warnTimeout);
    setWarning(false);
    if (logoutTimeout) clearTimeout(logoutTimeout);
};
  useEffect(() => {
    const events = [
        'load',
        'mousemove',
        'mousedown',
        'click',
        'scroll',
        'keypress'
    ];
    const resetTimeout = () => {
        clearTimeouts();
        setTimeouts();
    };
    for (let i in events) {
        window.addEventListener(events[i], resetTimeout);
    }
    setTimeouts();
    return () => {
        for(let i in events){
            window.removeEventListener(events[i], resetTimeout);
            clearTimeouts();
        }
    }
  },[])




  
  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function computerMove() {
    console.log("im inside computer move");
   let randomindex = getRandomInt(0, 8);

   //checking how many null blocks are der
  let count =0;
  for(let i=0;i<9;i++){
    if(board[i]===null)
    {count = count+1}
  }
  //if only one null block is der return its index
  if(count===1){
    randomindex = board.map((element,index)=>{
      if( element === null)
     return index;
       })
  }  
   else 
   {

    while(board[randomindex]){
         randomindex = getRandomInt(0, 8);
       }
  }

  //  if(boardCopy[randomindex] === "X" || boardCopy[randomindex] === "O"){
  //     computerMove();
  //  }
  //  else if(boardCopy[randomindex] !== "X" || board[randomindex] !== "O" || boardCopy[randomindex] !== null){ 
  //    console.log ("the value of randomIndex is"+ randomindex);
  //  return randomindex;
   //}

  //  
  
   return randomindex;
  }


  const handleClick = async (i) => {
    
    console.log("Inside handleClick function i is:", i);
     
      setStart(false);
   boardCopy = [...board];
   //if user click an occupied square or if game is won, return

   if(winner || boardCopy[i]) return;
   // Put an X or an O in the clicked square
   

   //this if is for random x or o
   if(ran){
    let r =  Math.floor(Math.random() * 2);
    console.log("random number is "+ r)
    if(r===1){
      boardCopy[i] = "X";
    } else {
      boardCopy[i] = "O";
    }
    console.log("Inside random boardCopy value is"+boardCopy[i] );
    
    setBoard(boardCopy);
    if(r===1){
        setXisNext(!xIsNext)
    } else {setXisNext(xIsNext)}
   }
    
   // for regular game 
   else {boardCopy[i] = xIsNext ? "X" : "O";
  console.log("boardCopy[]"+i+"is:" + boardCopy[i]);
  let flag = await setBoard(boardCopy);
   console.log(boardCopy);
   setXisNext(!xIsNext);
    
    }

    //checking how many blocks are der to go to computer move
    let count1 = 0;
  for(let i=0;i<9;i++){
    if(boardCopy[i]===null)
    {count1 = count1+1}
  }

  //if all are filled after i clicked return the function before going to computer move
   if(count1 = 0) {
     return;
   } else {
    if(computer && !winner ){
      console.log("inside if block of computer");
      var j = await computerMove();
      console.log("the value of j is " +j)
      // if((board[j] !== null) || (board[j] === "X") || (board[j] === "O")){
      //   j = await computerMove();
      //   console.log("the value of j inside another if " +j)
      // } 
      while(boardCopy[j] && !winner){
        j = computerMove(); 
      }
       boardCopy[j]="O";
       setBoard(boardCopy);
       setXisNext(true); 
    }
       
   }
   
  
 
  console.log(boardCopy);

  }
   
  const random = () => {
 setRan(!ran);
}
const move2players = () => {
  setComputer(!computer);
}

  return (
 <>
{warning && <Marquee className={styles.warning} gradient={false} > <h1 > Warning! Session is about to logout </h1></Marquee>}
<button onClick={move2players}  className={styles.playComputer}>{computer ? "Play yourself" : "Play with Computer"} </button>
  <Board squares={board} onClick ={handleClick} />
  <div className={styles.boardStyle} >

  {(mayWin && !winner) && <h3>Watch out someone is winning  </h3>}
  {(gameTie && !winner) &&  <h3>Well played better luck next time!! </h3> }
  {winner && <><Marquee className={styles.winner} gradient={false} speed = {50}> <h3>Player {winner} is the winner !!!  </h3></Marquee>
     <h3 className={styles.winner}> Better luck next time Player {(winner === "X") ? "O" : "X"}</h3></>}
    
      <button onClick = {()=> {
          setBoard(Array(9).fill(null))
          setXisNext(true);
          setStart(true);
          setRan(false);
          }}> {start ? "Start" : "Restart"} </button>
          <button onClick={random}>{ran ? "Unrandomize" : "Randomize"} </button>
          <button onClick={logout}>Logout</button>
  </div>
  
  
</>
    
  );




}

export default Game;