import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  constructor() { }

  input : string = "";
  result : string = "";
  history : string = "";

  pressNum(num : string)
  {
    if(num == ".")
    {
      if(this.containsOperator(this.input))
      {
      let lastValueString = this.getAfterOpValue()
        if(lastValueString.includes("."))
        {
          return;
        }
      }
      else
      {
        if(this.input.includes("."))
        {
        return;
        }
      }
    }

    if(num === "0")
    {
      let lastValueString = this.getAfterOpValue()

      if(this.input == "")
      {
        return;
      }
      else if(lastValueString.length < 1)
      {
        return;
      }
    }

    this.input = this.input + num;
  }

  pressNumEvent(event : MouseEvent) {
    const target = event.target as HTMLButtonElement;
    const value = target.innerHTML;
    this.pressNum(value);
  }

  pressOperatorEvent(event : MouseEvent) {
    const target = event.target as HTMLButtonElement;
    const value = target.innerHTML;
    this.pressOperator(value);
  }
  
  //TODO: e+51 en e-51 (grote getallen afvangen en alsnog de mogelijkheid geven voor een operator toevoegen)
  pressOperator(op : string)
  { 
    if(this.input.charAt(0) == "-" && this.containsOperator(op) == true && this.input.length == 1)
    {
      return;
    }
    if(this.containsOperator(this.input) == false && this.input != "")
    {
      this.input = this.input + op;
    }
    else if(this.containsOperator(this.input) == false && op == "-")
    {
      this.input = this.input + op;
    }
    else
    {
      if(this.input.indexOf("-") == 0)
      {
        let input2 = this.input.substring(1);
        if(this.containsOperator(input2) == false)
        {
          this.input = this.input + op;
        }
        else if(this.containsOperator(input2.substr(input2.length - 1)) == true)
        {
          if(this.countOperatorOccerences(input2) <= 1 && op == "-" && input2.substr(input2.length - 1) != "-")
          {
            this.input = this.input + op;
          }
        }
      }
    }
  }

  countOperatorOccerences(op : string)
  {
    let count = 0;
    if(op.includes("-"))
    {
      count += op.split("-").length -1;
    }
    if(op.includes("+"))
    {
      count += op.split("+").length -1;
    }
    if(op.includes("/"))
    {
      count += op.split("/").length -1;
    }
    if(op.includes("*"))
    {
      count += op.split("*").length -1;
    }

    return count;
  }

  containsOperator(op : string) : boolean
  {
    if(op.indexOf("*") !== -1)
    {
      return true;
    }
    if(op.indexOf("-") !== -1)
    {
      return true;
    } 
    if(op.indexOf("+") !== -1)
    {
      return true
    }
    if(op.indexOf("/") !== -1)
    {
      return true;
    }
    return false;
  }

  calculate()
  {
    let lastValueString = this.getAfterOpValue()

    if(this.containsOperator(this.input) == false)
    {
      return;
    }
    else if(this.getAfterOpValue() == null)
    {
      return
    }
    else if(lastValueString.length < 1)
    {
      return;
    }

    let firstValueString = this.input.replace(lastValueString, "").replace("*", "").replace("-", "").replace("+", "").replace("/", "");

    let lastValue = Number(lastValueString);
    let firstValue = Number(firstValueString);

    console.log(firstValue, firstValueString, lastValue, lastValueString)

    if(lastValue == 0 || firstValue == 0)
    {
      if(this.input.indexOf("/") > -1)
      {
      this.result = "Cannot divide by zero";
      return;
      }
    }

    let result = 0;

    result = eval(this.input)

    console.log(result, firstValue, firstValueString, lastValue, lastValueString)
    this.result = result.toString();
    this.history += this.input + "=" + this.result + "\n";
    this.input = this.result;
  }

  getAfterOpValue()
  {
    var pos : number;

    pos = this.input.toString().lastIndexOf("+");
    if(this.input.toString().lastIndexOf("-") > pos)
    {
      pos = this.input.lastIndexOf("-");
    }
    if(this.input.toString().lastIndexOf("*") > pos)
    {
      pos = this.input.lastIndexOf("*");
    }
    if(this.input.toString().lastIndexOf("/") > pos)
    {
      pos = this.input.lastIndexOf("/");
    }

    return this.input.substr(pos + 1);
  }

  clearAll()
  {
    this.input = "";
    this.result = "";
    this.result = "";
    this.history = "";
  }

  clear()
  {
    if(this.input != "")
    {
      this.input = this.input.substr(0, this.input.length - 1)
    }
  }

  ngOnInit(): void {

  }
}
