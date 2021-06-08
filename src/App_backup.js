import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      displayValue: '0',
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
      displayValue: '0'
    }))
  }

  inputChange(){
    this.setState(prevState => ({
      displayValue: prevState.displayValue
    }))
  }

  inputNumber(event){
    let num = event.target.value;
    this.setState(prevState => ({
      displayValue: prevState.displayValue === "0" ? String(num) : prevState.displayValue + num
    }));
  }

  inputDot() {
    const {displayValue} = this.state;

    if(displayValue.indexOf('.') === -1) {
      this.setState(prevState => ({
        displayValue: displayValue !=="0" ? prevState.displayValue + '.' : displayValue
      }))
    }
  }

  toggleSign(){
    const {displayValue} = this.state;

    this.setState(prevState => ({
      displayValue: prevState.displayValue.charAt(0) === '-' ? prevState.displayValue.substring(1) : '-' + prevState.displayValue
    }))
  }

  inputPercent() {
    const {displayValue} = this.state;
    const value = Number.parseFloat(displayValue/ 100);
    this.setState(prevState => ({
      displayValue: String(value)
    }))
  }

  inputOperator() {
    const {displayValue, operator} = this.state;
    const addition = displayValue + '+';
    if (displayValue.indexOf('+') === -1){
      this.setState(prevState => ({
      displayValue: displayValue === '0' ? '0' : displayValue,
      operator: displayValue + addition
    }))
    }
  }

  performOperation() {

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
            <input type="button" className="side-function" value="/" onClick={this.performOperation}/>
            <input type="button" className="number-button" value="7"  onClick={this.inputNumber}/>
            <input type="button" className="number-button" value="8" onClick={this.inputNumber} />
            <input type="button" className="number-button" value="9" onClick={this.inputNumber}/>
            <input type="button" className="side-function" value="*" onClick={this.performOperation}/>
            <input type="button" className="number-button" value="4" onClick={this.inputNumber}/>
            <input type="button" className="number-button" value="5" onClick={this.inputNumber}/>
            <input type="button" className="number-button" value="6" onClick={this.inputNumber}/>
            <input type="button" className="side-function" value="-" onClick={this.performOperation}/>
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
