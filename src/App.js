import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      displayValue: '0',
      prevValue: null,
      waitingforOperand: false,
      waitingtoCompute: false,
      operator: null,
    }

    this.inputChange = this.inputChange.bind(this);
    this.inputNumber = this.inputNumber.bind(this);
    this.toggleSign = this.toggleSign.bind(this);
    this.inputDot = this.inputDot.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
    this.inputPercent = this.inputPercent.bind(this);
    this.inputOperator = this.inputOperator.bind(this);
    this.performOperation = this.performOperation.bind(this);
  }  

  clearDisplay(){
    this.setState(prevState => ({
      displayValue: '0',
      operator: null,
      prevValue: null,
      waitingforOperand: false
    }))
  }

  inputChange(){
    this.setState(prevState => ({
      displayValue: prevState.displayValue
    }))
  }

  inputNumber(event){
    const {waitingforOperand, operator, displayValue, prevValue, operatorValue} = this.state;
    let num = String(event.target.value);

    if (waitingforOperand) {
      //alert('waitingforOperand')
      this.setState( prevState => ({
        prevValue: String(displayValue),
        displayValue: '',
        waitingforOperand: false,
        waitingtoCompute: true
      }))
    } 

    //check if both preValue and display are both numbers if so then waitingforOperand is false
    /* if (operator) {
      if(typeof Number(prevValue) === 'number' && typeof Number(displayValue) === 'number') {
        //alert('both')
        this.setState(prevState => ({
          displayValue: alert(),
          waitingforOperand: true
        }))
      }
    } */
    
    this.setState(prevState => ({
      displayValue: prevState.displayValue === "0" ? String(num) : prevState.displayValue + String(num)
    }));
    

    
  }

  //logic for the dot and when the plus sign is clcked again for equal
  inputDot() {
    const {displayValue, waitingforOperand} = this.state;

    if(waitingforOperand){
      this.setState(prevState => ({
        displayValue: '.',
        waitingforOperand: false
      }))
    } else if(displayValue.indexOf('.') === -1) {
        this.setState(prevState => ({
          displayValue: displayValue !=="0" ? prevState.displayValue + '.' : displayValue + '.'
        }))
    }
  }

  toggleSign(){
    const {displayValue} = this.state;

    if(displayValue === '0' && displayValue.length === 1){
      this.setState( prevState => ({
          displayValue: "0"
      }))
    } else {
      this.setState(prevState => ({
        displayValue: prevState.displayValue.charAt(0) === '-' ? prevState.displayValue.substring(1) : '-' + prevState.displayValue
      }))
    }
  }

  inputPercent() {
    const {displayValue} = this.state;
    const value = Number.parseFloat(displayValue/ 100);
    this.setState(prevState => ({
      displayValue: String(value)
    }))
  }

  inputOperator(event) {
    const {displayValue, operator, waitingforOperand, prevValue} = this.state;
    const operatorValue = event.target.value;

    this.setState( prevState => ({
      operator: operatorValue,
      waitingforOperand: true,
      waitingtoCompute: false
    }))

    //checking if the preValue is not null
    if(prevValue !== null){
      //alert()
      if(operator === "/") {
        this.setState( prevState => ({
          displayValue: String(Number(prevValue) / Number(displayValue)),
          prevValue: null,
          operator: null
        }))
      }

      if(operator === "*") {
        this.setState( prevState => ({
          displayValue: String(Number(prevValue) * Number(displayValue)),
          prevValue: null,
          operator: null
        }))
      }
      if(operator === "-") {
        this.setState( prevState => ({
          displayValue: String(Number(prevValue) - Number(displayValue)),
          prevValue: null,
          operator: null
        }))
      }
      if(operator === "+") {
        this.setState( prevState => ({
          displayValue: String(Number(prevValue) + Number(displayValue)),
          prevValue: null,
          operator: null
        }))
      }
      
    }
  }

  performOperation() {
    const {waitingtoCompute, waitingforOperand, displayValue, operator, prevValue} = this.state;

    if (waitingtoCompute) {
      if(operator === "/") {
        this.setState( prevState => ({
          displayValue: String(Number(prevValue) / Number(displayValue)),
          prevValue: null
        }))
      }

      if(operator === "*") {
        this.setState( prevState => ({
          displayValue: String(Number(prevValue) * Number(displayValue)),
          prevValue: null
        }))
      }
      if(operator === "-") {
        this.setState( prevState => ({
          displayValue: String(Number(prevValue) - Number(displayValue)),
          prevValue: null
        }))
      }
      if(operator === "+") {
        this.setState( prevState => ({
          displayValue: String(Number(prevValue) + Number(displayValue)),
          prevValue: null
        }))
      }
    }
  }
  
  
  render() {
    return (
      <div className="App">
        <div className="container">
        <form className="form-container">
            <input type="text" readOnly="disable" className="result" value={this.state.displayValue} onChange={this.inputChange}></input>
            <input type="button" className="top-function" value="AC" onClick={this.clearDisplay}/>
            <input type="button" className="top-function" value="+/-" onClick={this.toggleSign} />
            <input type="button" className="top-function" value="%" onClick={this.inputPercent}/>
            <input type="button" className="side-function" value="/" onClick={this.inputOperator}/>
            <input type="button" className="number-button" value="7"  onClick={this.inputNumber}/>
            <input type="button" className="number-button" value="8" onClick={this.inputNumber} />
            <input type="button" className="number-button" value="9" onClick={this.inputNumber}/>
            <input type="button" className="side-function" value="*" onClick={this.inputOperator}/>
            <input type="button" className="number-button" value="4" onClick={this.inputNumber}/>
            <input type="button" className="number-button" value="5" onClick={this.inputNumber}/>
            <input type="button" className="number-button" value="6" onClick={this.inputNumber}/>
            <input type="button" className="side-function" value="-" onClick={this.inputOperator}/>
            <input type="button" className="number-button" value="1" onClick={this.inputNumber}/>
            <input type="button" className="number-button" value="2" onClick={this.inputNumber}/>
            <input type="button" className="number-button" value="3" onClick={this.inputNumber}/>
            <input type="button" className="side-function" value="+" onClick={this.inputOperator}/>
            <input type="button" value="0" className="zero-span" onClick={this.inputNumber}/>
            <input type="button" className="number-button" value="." onClick={this.inputDot}/>
            <input type="button" className="side-function" value="=" onClick={this.performOperation}/>
        </form>
        </div>
      </div>
    );
  }
}

export default App;
