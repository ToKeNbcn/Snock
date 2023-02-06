import './App.css';
import { useState } from 'react';
import { createStore } from 'redux';
import { renderApp } from './index';
//import sneakers from csv

let stock_initial = {
  "CU1726-100": {
    "39": {
      quantity: 1,
      sell_price: 120
    }
  },
  "CU1726-101": {
    "39": {
      quantity: 1,
      sell_price: 120
    }
  },
  "CU1726-102": {
    "39": {
      quantity: 1,
      sell_price: 120
    }
  },
  "123": {
    "39": {
      quantity: 1,
      sell_price: 120
    }
  }
}
// REDUX 
const actionAdd = {
  type: '@stock/add'
}
const actionRemove = {
  type: '@stock/remove'
}

const stockReducer = (state=0,action) => {
  switch(action.type) {
    case '@stock/add':
      return state+1;
    case '@stock/remove':
      return state;
    default:
      return state;
  }
}

const store  = createStore(stockReducer)

store.subscribe(renderApp)

store.dispatch(actionAdd)

let sizes = ["35.5","36","36.5","37.5","38","38.5","39","40","40.5","41","42","42.5","43","44","44.5","45","45.5","46","47","47.5","48","48.5","49","49.5"]

/*
function addStock(form_data){ 
  document.getElementById("sell_form").style.display = "none";
  var sku=document.getElementById("POST-SKU").value;
  var size=document.getElementById("POST-SIZE").value;
  var quantity=parseInt(document.getElementById("POST-QUANTITY").value);
  var sell_price=parseInt(document.getElementById("POST-SELL_PRICE").value);
  console.log("Sneaker added: ",sku)
  if (sku in stock) {
    if (size in stock[sku]) {
      stock[sku][size].quantity = stock[sku][size].quantity + quantity;
      stock[sku][size].sell_price = sell_price;
    }
    else {
      stock[sku][size] = {quantity: quantity,sell_price: sell_price};
    }
  }
  else {
    stock[sku] = {[size]: {quantity: quantity, sell_price: sell_price}};
  }
}

function Sneaker(props) {
  return (
    <span>1</span>
  );
}
*/
function SellForm(props) {
  /*let form_data = {
    sku: 0,
    size: "",
    quantity: 0,
    sell_price: 0
  }*/
  return(
    <div id="sell_form">
        <label>Type SKU:</label>
        <input id="POST-SKU" type="text" name="SKU" placeholder='SKU' required="required"></input>
        <label>Choose size:</label>
        <select id="POST-SIZE" name="size" defaultValue="Size" required="required">
          <option value={0}>Size</option>)
          {sizes.map(s => <option id={s} value={s}>{s}</option>)}
        </select>
        <label>Select quantity:</label>
        <input id="POST-QUANTITY" name="QUANTITY" placeholder='QUANTITY' defaultValue="1" min="1" required="required"></input>
        <label>Select sell price:</label>
        <input id="POST-SELL_PRICE" type="number" name="SELL_PRICE" placeholder='SELL PRICE' min="0" required="required"></input>
        <input type="submit" value="Add to stock" onClick></input>
    </div>
  );
  /*
  return (
    <div>
        
        <label for="SIZE">Choose size:</label>
        <select id="SIZE" name="size" defaultValue="Size">
          <option value={0}>Size</option>
          {sizes.map(s => <option value={s}>{s}</option>)}
        </select>
        <label for="QUANTITY">Select quantity:</label>
        <input id="QUANTITY" type="number" name="QUANTITY" placeholder='QUANTITY' defaultValue="1" min="1"></input>
        <label for="SELL_PRICE">Select sell price:</label>
        <input id="SELL_PRICE" type="number" name="SELL_PRICE" placeholder='SELL PRICE' defaultValue="0" min="0"></input>
        <button value="Add to stock" onClick={addStock(form_data)}></button>
    </div>
  );
*/
}

function App() {
  return (
    <div className="App">
      <div>
        <button onClick={() => {var x = document.getElementById("sell_form"); x.style.display === "none" ? x.style.display = "block" : x.style.display = "none"}}>Sell Sneaker</button>
      </div>
      <div>
        <SellForm></SellForm>
      </div>
      <div>
        {store.getState()}
      <button onClick={console.log(store.dispatch(actionAdd))}>Show stock</button>
      {/*
      {Object.entries(store.getState()).map( ([key, value]) => 
        <div>
          <span>SKU: {key}</span>
          {Object.entries(value).map( ([key2, value2]) => 
          <div>
            <span>Size: {key2}</span><br></br>
            <span>Quantity: {value2.quantity}</span><br></br>
            <span>Sell price: {value2.sell_price}€</span>
            <hr></hr>
          </div>
          )}
        </div>
      )}
      */}
      </div>
    </div>
  );
}

export default App;
