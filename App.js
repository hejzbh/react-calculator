import React, {useEffect, useState, useReducer, useMemo} from 'react';

// Helper functions
import { formatNumber } from './HelperFunctions';

// Images 
import svg from './wave.svg';
import background from './wave1.png'

// css
import simpleCss from './simpleStyle.css'

// Components
import { Number } from './components/Number';
import { Operator } from './components/Operator';
import { Button } from './components/Button';

// Game setup
import { numbers, ACTION_TYPE, operators } from './CalculatorSetup';

// Reduce function
import {reduce} from './CalculatorSetup'


function App() {
    const [operands, setOperands] = useReducer(reduce, {
      firstOperand:'',
      secondOperand:''
    });
    const [operator, setOperator] = useState('');
    const [result, setResult] = useState();

    const allOperandsFull = useMemo(()=>{
     return Object.values(operands).every(prop=>prop!=='');
    }, [operands]);



    // SIDE EFFECTS

    useEffect(()=>{

     if (allOperandsFull) calculateImmediately();


    }, [operands]);




    // Insert number for calculate
    const handleNumberClick = async (num) => {
    
      setOperands({type:ACTION_TYPE.ADD_FIRST, payload:{num}});
    
    }


    // Calculate result
    const calculate = (firstNumber, secondNumber) => {
      if(firstNumber==='' || secondNumber==='') return null;

      // Convert from string to number
      let firstOperand=+firstNumber;
      let secondOperand=+secondNumber;



          switch(operator){
              case '+':
                return secondOperand+firstOperand;
              break;
            
              case '-':
                return secondOperand-firstOperand;
              break;

              case '*':
                return secondOperand*firstOperand;
              break;

              case '/':
                return secondOperand/firstOperand;
              break;


              default: return null;
          }

    }


  // Function that runs when both numbers for an operation are available
  const calculateImmediately = () => {
    const finalResult = calculate(
      operands.firstOperand,
      operands.secondOperand
    );

    setResult(finalResult);
  

    return finalResult;
  }


  const replaceOperands=(number)=>{

    setOperands({
      type:ACTION_TYPE.ADD_SECCOND,
      payload:{
        num:number+''
      }
    });

    
   setOperands({
   type:ACTION_TYPE.REMOVE_FIRST,
    payload:{
    num:''
    }
   });
  }




  // Function that restarts everything and returns us to the beginning

  const deleteAll = () => {
    setOperands({type:ACTION_TYPE.RESET_ALL});
    setOperator('');
    setResult(null);
  }

  // Delete number by number
  const deleteOneByOne = () => {
      if(operands.firstOperand==='' && operator!==''){
        setOperator('');
        return;
  
      };

      if(operands.firstOperand!==''){
        const copyOperand = operands.firstOperand.slice(0);
        const newOperand = copyOperand.slice(0, -1);

        setOperands({
          type:ACTION_TYPE.DEEP_CHANGE_FIRST,
          payload:{
            num:newOperand
          }
        })

        return;
      }

    
      if(operands.secondOperand!==''){
        const copyOperand = operands.secondOperand.slice(0);
        const newOperand = copyOperand.slice(0, -1);

        setOperands({
          type:ACTION_TYPE.ADD_SECCOND,
          payload:{
            num:newOperand
          }
        });

        return;
      }

    
  }



  //When we select a new operator, the current number that is in the position (firstOperand) moves to (secondOperand), in order to free the firstOperand for the next number that we select after the operator
  const selectOperator = (newOperator) => {
 

    // No operands ? Operator cannot be setted
    if(!operands.firstOperand && !operands.secondOperand)return;


    // Automatically calculate result
    if(allOperandsFull) {
      
         const finalResult = calculateImmediately();
         replaceOperands(finalResult);
         setOperator(newOperator);

          return;
    }


   // Set first operand to second
   if(operands.firstOperand!=='')  replaceOperands(operands.firstOperand);
    

    // Change operator for next number
    setOperator(newOperator);
  }





  return (
    <div className="App" style={appStyle}>
      {/** SVG BACKGROUND  */}
      <img style={svgStyle} src={svg}></img>

      <div style={containerStyle} className='calculator__container'>
            <div style={calculatorStyle} className='calculator'>
              
                  <div
                   style={topStyle}
                   className='top'>

                    <img className='top_bg' src={background}></img>

                    <h4
                    className='operands'
                    style={{
                      fontWeight:'400',
                      color:'gray',
                      fontSize:'19px'
                    }}     
                    >
                        {/** Example: 100 + 200 */}
                      ({formatNumber(+operands.secondOperand)}{operator && operator}{formatNumber(+operands.firstOperand)})
                      </h4>



                    {/** DISPLAY RESULT */}
                    {result && <h3 className='result'>{`${(formatNumber(+result))}`}</h3>}

            

                  </div>

                  <div
                   style={bottomStyle}
                   className='bottom'>

                      <div
                       className='leftside'>
                          <div style={shortcutsStyle} className='shortcuts'>
                              <Button
                              className={'delete__all'}
                              title='C'
                              onClick={deleteAll}
                              />
                              <Button
                              className={'delete__one'}
                              title='<-'
                              onClick={deleteOneByOne}
                              />
                          </div>


                          <div style={numbersContainerStyle} className='numbers__container'>
                            {numbers.map(num=>(
                              <Number
                               num={num}
                               handleNumberClick={handleNumberClick} />
                            ))}
                          </div>
                      </div>

                      <div className='rightside'>
                            <div style={operatorsStyle} className='operators'>
                              {operators.map(operator=><Operator operator={operator}  setOperator={selectOperator}/>)}
                            </div>
                      </div>
                  </div>
            </div>
      </div>

    </div>
  );
}

export default App;

const containerStyle = {
  minHeight:'80vh',
  minWidth:'40%',
  padding:'2.5em',
  borderRadius:'18px',
  background:'#9274FF',
  zIndex:100,
  boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
}

const calculatorStyle = {
  background:'#FFFDFF',
  position:'relative',
  width:'100%',
  minHeight:'calc(90vh - 5vh)',
  display:'flex',
  flexDirection:'column',
  justifyContent:'space-between',
  "::after":{
    width:'80px',
    height:'40px',
    borderRadius:'10px',
    background:'red',
    position:'absoulute',
    top:'0',
    left:'50%',
    transform:'translateX(-50%)'
  }
}

const appStyle = {
  display:'flex',
  minHeight:'100vh',
  justifyContent:'center',
  alignItems:'center',
  background:'#7751FF',
  position:'relative'
}


const svgStyle = {
  position:'absolute',
  width:'100%',
  bottom:'0',
  left:'0'

}

const topStyle = {
  minHeight:'30vh',
  background:'rgb(246,247,252)',
  padding:'2em',
  display:'flex',
  flexDirection:'column',
  justifyContent:'flex-end',
  alignItems:'flex-end',
  position:'relative',
  zIndex:1
}

const bottomStyle={
  minHeight:'54vh',
  padding:'1.5em',
  display:'grid',
  gridTemplateColumns:'80% 20%',
  gridGap:'1rem',
  position:'relative',
  zIndex:'1'
}


const numbersContainerStyle = {
    display:'grid',
    gridTemplateColumns:'1fr 1fr 1fr',
    gridGap:'1rem'
}

const shortcutsStyle = {
  display:'grid',
  gridTemplateColumns:'repeat(auto-fit, minmax(5em, 1fr))',
  justifyContent:'center',
}


const operatorsStyle = {
  display:'flex',
  flexDirection:'column',
  alignItems:'center',
  height:'100%'
}