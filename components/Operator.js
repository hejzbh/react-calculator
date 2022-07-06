import React from 'react'
import css from '../simpleStyle.css'
export const Operator = ({operator, setOperator}) => {

  const operatorAnimation = (e) => {
    const {target} = e;


    target.style.color='#7C57FF';
    target.style.transform='scale(1.2)';
  

    setTimeout(()=>{
      target.style.color='#9985DE';
      target.style.transform='unset';
    }, 100)
  }

  return (
    <div
     style={operatorStyle}
      className='operator'
      onClick={(e)=>{
        setOperator(operator);
        operatorAnimation(e);
      }}>
            {operator}
    </div>
  )
}


const operatorStyle = {
    padding:'1.5em',
    fontSize:'26px',
    fontWeight:'500',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center',
    color:'#9985DE',
    fontFamily:'Poppins',
    cursor:'pointer'
  }
  

