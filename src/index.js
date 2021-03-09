/* eslint-disable */ 

import './scss/main.scss';

let currencyValue = {
  twok: 2000,
  fiveh: 500,
  twoh: 200,
  oneh: 100,
  fifty: 50,
  twenty: 20,
  ten: 10,
  five: 5,
  two: 2,
  one: 1,
};

let currencyInRegister = {};
let currencyInCust = {};
let totalCash = 0;
let custCash = 0;
const totalCashdiv = document.getElementById("totalCash");
const custCashdiv = document.getElementById("custCash");
const statusDiv = document.getElementById("status");
const refreshTotal = () => {
  totalCash = 0;
  Object.keys(currencyInRegister).map((key) => {
    if (!currencyInRegister[key]) return;
    totalCash += currencyInRegister[key] * currencyValue[key];
  });
  totalCashdiv.innerHTML = totalCash;
};

const refreshCust = () => {
  custCash = 0;
  Object.keys(currencyInCust).map((key) => {
    if (!currencyInCust[key]) return;
    custCash += currencyInCust[key] * currencyValue[key];
  });
  custCashdiv.innerHTML = custCash;
};


let registerDiv = document.getElementById("register");
let registerInputs = registerDiv.getElementsByTagName("input");
for (let index = 0; index < registerInputs.length; ++index) {
  registerInputs[index].addEventListener("input", (e) => {
    currencyInRegister[e.target.name] = parseInt(e.target.value);
    refreshTotal();
  });
}
let custDiv = document.getElementById("cust");
let custInputs = custDiv.getElementsByTagName("input");
for (let index = 0; index < custInputs.length; ++index) {
  custInputs[index].addEventListener("input", (e) => {
    currencyInCust[e.target.name] = parseInt(e.target.value);
    refreshCust();
  });
}
const refreshInputs = () => {
  for(let index = 0; index<custInputs.length; index++)
  {
    custInputs[index].value = 0;
    if(currencyInRegister[custInputs[index].name])
      registerInputs[index].value = currencyInRegister[custInputs[index].name]
  }
}

const toDeduce = document.getElementById("toDeduce");
const currencyHandler = (e) => {
  e.preventDefault();
  let cost = parseInt(e.target.deduce.value);
  let toReturn = custCash - cost;

  if (cost <= 0) {
    statusDiv.innerHTML = "Nothing to Calculate";
    return;
  }
  if (toReturn < 0) {
    statusDiv.innerHTML = "Cost is more than cash given";
    return;
  }
  let currencyReturn = { };

  for (let key in currencyValue) {

    if(currencyInCust[key]){
      if(currencyInRegister[key])
      {
        currencyInRegister[key] += currencyInCust[key]
      }
      else
      {
        currencyInRegister[key] = currencyInCust[key]
      }
    }
    let count = currencyInRegister[key];
    if (!count) continue;
    while (currencyValue[key] * count > toReturn) {
      count--;
    }
    toReturn -= currencyValue[key] * count;
    currencyReturn[key] = count;
  }

  if (toReturn != 0) {
    statusDiv.innerHTML = "Not Enough Denominations";
  } else {
    let text = "Give:<br>";
    for (let i in currencyReturn) {
      if (currencyReturn[i] == 0) continue;
      currencyInRegister[i] -= currencyReturn[i];
      registerDiv.querySelector(`input[name="${i}"]`).value =
        currencyInRegister[i];
      text += currencyReturn[i] + " notes of Rs. " + currencyValue[i] + "<br>";
    }
    text += " = " + (custCash - cost);
    statusDiv.innerHTML = text + `<br><br><div class="text-warning">Don&apos;t Forget to count the cash </div>`
    refreshTotal();
    refreshInputs();
    currencyInCust = {}
    refreshCust();
  }
  e.target.reset();
};
toDeduce.addEventListener("submit", currencyHandler);