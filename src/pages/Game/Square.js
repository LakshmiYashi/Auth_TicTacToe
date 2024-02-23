import React from 'react';
import styles from "./Game.module.css";
import ClearIcon from '@material-ui/icons/Clear';
import RadioButtonUncheckedSharpIcon from '@material-ui/icons/RadioButtonUncheckedSharp';



function Square(props) {
 const icon = () =>{
     if(props.value==="X"){
       return <ClearIcon className = {styles.iconButton2} />
     } else if(props.value === "O"){
       return <RadioButtonUncheckedSharpIcon className = {styles.iconButton1} />
     }
 }
    return (
       <button className ={styles.square} onClick={props.onClick}>
          {icon()}
       </button>
    )
}

export default Square
