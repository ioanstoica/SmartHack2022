import React, { useState } from 'react'
import './form.css'
import { BallTriangle } from 'react-loader-spinner'

const Form = (props) => {

  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [supply, setSupply] = useState("");
  const [decimals, setDecimals] = useState("");

  const handleSubmit = (event) => {
    // post to backend
    props.setTokenInCreation(true);
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
      .then(result => props.setAddress(result))
      .then(() => props.setTokenCreated(true))
      .then(() => props.setTokenInCreation(false))
      .catch(error => console.log('error', error));
  }
    
  return ( <form onSubmit={handleSubmit} className="form-container">
        <div className='form-title gradient__text'>Create token form</div>
        <label>Enter token name&#160;:&#160;
            <input type="text" onChange={(e) => setName(e.target.value)} value = "Ethereum"/>
        </label>
        <label>Enter token symbol&#160;:&#160;
            <input type="text" onChange={(e) => setSymbol(e.target.value)} value = "ETH"/>
        </label>
        <label>Enter token supply&#160;:&#160;
            <input type="text" onChange={(e) => setSupply(e.target.value)} value = "1000000000"/>
        </label>
        <label>Enter token decimals&#160;:&#160;
            <input type="text" onChange={(e) => setDecimals(e.target.value)} value = "18" />
        </label>
        <label className="submit">
        {props.tokenInCreation ? 
          <input type="submit"  id = 'disabledd' value="Wait for creation..." disabled/> : 
          <input type="submit" value="Create token" />}
            {/* <input type="submit" value="Submit"/> */}
            {props.tokenInCreation ? 
              <BallTriangle
  height={100}
  width={100}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperClass={{}}
  wrapperStyle=""
  visible={true}
/>: 
          null}
          
        </label>
        </form>
  )
}

export default Form