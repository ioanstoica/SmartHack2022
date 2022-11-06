import React from 'react'
import { Feature, Navbar } from './components'
import { Footer, What, Header, FAQ, Wallet} from './containers'
import './App.css'
import { useState } from 'react'
import { useMetaMask } from "metamask-react";
import Form from './Form'

const NewForm = (props) => {
  return (
    <form className="form-container">
        <div className='form-title gradient__text'>Your token is created:</div>
        <label>New token address&#160;:&#160; {props.address}</label>
        <a href = {"https://goerli.etherscan.io/address/" + props.address}> 
          <label > Find the token on etherscan here! &#160;:&#160;   </label>  
        </a> 
        
    </form>
  )
}

const App = () => {
  const { status, connect, account, chainId, ethereum } = useMetaMask();
  const [editingForm, setEditingForm] = useState(false);
  const [tokenCreated, setTokenCreated] = useState(false);
  const [address, setAddress] = useState("");

  return (
    <div className='App'>
        <div className='gradient__bg'>
          <Navbar status = {status} connect = {connect}/>
          {editingForm ? 
            <Form setAddress = {setAddress} account = {account} setEditingForm = {setEditingForm} setTokenCreated={setTokenCreated}/>  
            : <Header account = {account} setEditingForm = {setEditingForm}/>}
          {tokenCreated ? <NewForm account = {account} address = {address}/>  : null}
        </div>
        <What />
        <Footer />
    </div>
  )
}

export default App