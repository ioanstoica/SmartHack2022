import React from 'react'
import { Feature, Navbar } from './components'
import { Footer, What, Header, FAQ, Wallet} from './containers'
import './App.css'
import { useState } from 'react'
import { useMetaMask } from "metamask-react";
import Form from './Form'

const App = () => {
  const { status, connect, account, chainId, ethereum } = useMetaMask();
  const [editingForm, setEditingForm] = useState(false);

  return (
    <div className='App'>
        <div className='gradient__bg'>
          <Navbar status = {status} connect = {connect}/>
          {editingForm ? 
            <Form account = {account} setEditingForm = {setEditingForm}/>  
            : <Header account = {account} setEditingForm = {setEditingForm}/>}
        </div>
        <What />
        <Footer />
    </div>
  )
}

export default App