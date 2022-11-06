import React, { useState } from 'react'
import './form.css'

const Form = (props) => {

  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [supply, setSupply] = useState("");
  const [decimals, setDecimals] = useState("");

  const handleSubmit = (event) => {
    // post to backend
    event.preventDefault();
    console.log(name, symbol, supply, decimals, props.address);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("nume", name);
    urlencoded.append("simbol", symbol);
    urlencoded.append("supply", supply);
    urlencoded.append("decimals", decimals);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch("http://localhost:7545/create_token/" + props.account, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
    
  return ( <form onSubmit={handleSubmit} className="form-container">
        <div className='form-title gradient__text'>Create token form</div>
        <label>Enter token name&#160;:&#160;
            <input type="text" onChange={(e) => setName(e.target.value)} />
        </label>
        <label>Enter token symbol&#160;:&#160;
            <input type="text" onChange={(e) => setSymbol(e.target.value)} />
        </label>
        <label>Enter token supply&#160;:&#160;
            <input type="text" onChange={(e) => setSupply(e.target.value)} />
        </label>
        <label>Enter token decimals&#160;:&#160;
            <input type="text" onChange={(e) => setDecimals(e.target.value)} />
        </label>
        <label className="submit">
            <input type="submit" value="Submit"/>
        </label>
        </form>
  )
}

export default Form