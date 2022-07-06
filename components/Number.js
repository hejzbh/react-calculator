import React from 'react'
import {fadeInDown} from 'react-animations'
import fade from '../animations.css';

export const Number = ({num, handleNumberClick}) => {
  const addAnimation = (e) => {
    const {target} = e;


    target.style.background='#BDAEEB';

    setTimeout(()=>{
      target.style.background='unset';
    }, 100)
  }

  return (
    <div style={numberStyle} className='number'
    
    onClick={(e)=>
      {
            handleNumberClick(num);
            addAnimation(e);
    }}>
        {num}
    </div>
  )
}


const numberStyle = {
    padding:'0.5em',
    fontSize:'35px',
    fontWeight:'500',
    color:'#332B5B',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    cursor:'pointer'
}
