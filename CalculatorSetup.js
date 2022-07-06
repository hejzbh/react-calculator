// Numbers and operators for calculator
export const numbers = Array.from({length:10}, (_, i)=> i);
export const operators = ['+','-','*','/'];

// Command types for the reduce function

export const ACTION_TYPE = {
    ADD_FIRST:'add first operand',
    ADD_SECCOND:'add second operand',
    REMOVE_FIRST:'remove frist operand',
    DEEP_CHANGE_FIRST:'deep change first',
    RESET_ALL:'reset all operands'
}


// Function that updates the state (use Reducer)
export function reduce(state, {type, payload}){
  const num = payload?.num ?? '';

      switch(type){

            case ACTION_TYPE.ADD_FIRST:
            return {...state, firstOperand: state.firstOperand+=num}
            break;


            case ACTION_TYPE.ADD_SECCOND:
              return {...state, secondOperand:num}
            break;

            case ACTION_TYPE.REMOVE_FIRST:
               return {...state, firstOperand:''}
            break;

    

            case ACTION_TYPE.DEEP_CHANGE_FIRST: 
            return {...state, firstOperand:num}
           break;

            case ACTION_TYPE.RESET_ALL:
              return {firstOperand:'', secondOperand:''}
            break;

       
            
            default: return state;
      }
}