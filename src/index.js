import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import './App.css';
import { useState } from 'react';
import { createStore } from 'redux';
//import { renderApp } from './index';
//import sneakers from csv
import Table from 'react-bootstrap/Table'

const root = ReactDOM.createRoot(document.getElementById('root'));
const renderApp = () => {
  root.render(
    <App />
  );
}
renderApp();
reportWebVitals();

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
const actionAdd = payload => {
  return {
    type: '@stock/add',
    payload: payload
  }
}

const actionRemove = {
  type: '@stock/remove'
}

const stockReducer = (state=stock_initial,action) => {
  switch(action.type) {
    case '@stock/add':
      var sku=action.payload.sku;
      var size=action.payload.size;
      var quantity=action.payload.quantity;
      var sell_price=action.payload.sell_price;
      if (sku in state) {
        console.log(size)
        if (size in state[sku]) {
          
          state[sku][size].quantity = state[sku][size].quantity + quantity;
          state[sku][size].sell_price = sell_price;
        }
        else {
          state[sku][size] = {quantity: quantity,sell_price: sell_price};
        }
      }
      else {
        state[sku] = {[size]: {quantity: quantity, sell_price: sell_price}};
      }
      console.log("Sneaker added: ",sku)
      return state;
    case '@stock/remove':
      return state;
    default:
      return state;
  }
}

const store  = createStore(stockReducer)
store.subscribe(renderApp)


let sizes = ["35.5","36","36.5","37.5","38","38.5","39","40","40.5","41","42","42.5","43","44","44.5","45","45.5","46","47","47.5","48","48.5","49","49.5"]

const addStock = (event) => { 
  event.preventDefault()
  const {target} = event;
  const sku = target.sku.value;
  target.sku.value = '';
  const size = target.size.value;
  target.size.value = "Size";
  const quantity = parseInt(target.quantity.value);
  target.quantity.value = 1;
  const sell_price = target.sell_price.value;
  target.sell_price.value = '';
  //document.getElementById("sell_form").style.display = "none";
  const payload = {
    sku: sku,
    size: size,
    quantity: quantity,
    sell_price: sell_price
  }
  store.dispatch(actionAdd(payload));
}

function Sneaker(props) {
  return (
    <span>1</span>
  );
}

function SellForm(props) {
  return(
    <div id="sell_form">
        <form onSubmit={addStock}>
          <label>Type SKU:</label>
          <input id="POST-SKU" type="text" name="sku" placeholder='SKU' required="required"></input>
          <label>Choose size:</label>
          <select id="POST-SIZE" name="size" defaultValue="Size" required="required">
            <option value={0}>Size</option>)
            {sizes.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <label>Select quantity:</label>
          <input id="POST-QUANTITY" name="quantity" placeholder='QUANTITY' defaultValue="1" min="1" required="required"></input>
          <label>Select sell price:</label>
          <input id="POST-SELL_PRICE" type="number" name="sell_price" placeholder='SELL PRICE' min="0" required="required"></input>
          <button>Add to stock</button>
        </form>
    </div>
  );
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
      {/*<button onClick={store.dispatch(actionAdd())}>Show stock</button>*/}
      {Object.entries(store.getState()).map( ([sku, value]) => 
        <div>
          <span>SKU: {sku}</span>
          {Object.entries(value).map( ([size, value2]) => 
          <div>
            <span>Size: {size}</span><br></br>
            <span>Quantity: {value2.quantity}</span><br></br>
            <span>Sell price: {value2.sell_price}€</span>
            <hr></hr>
          </div>
          )}
          <hr></hr>
        </div>
      )}
      <table>
        <tr>
          <th>SKU</th>
          <th>Size</th>
          <th>Quantity</th>
          <th>Sell price</th>
        </tr>
        {Object.entries(store.getState()).map( ([sku, value]) => 
          {Object.entries(value).map( ([size, value2]) => (
            <tr>
              <td>{sku}</td>
              <td>{size}</td>
              <td>{value2.quantity}</td>
              <td>{value2.sell_price}</td>
            </tr>
            )
          )}
        )}
      </table>
      </div>
    </div>
  );
}

export default App;
