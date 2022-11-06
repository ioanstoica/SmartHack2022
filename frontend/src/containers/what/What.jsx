import React from 'react'
import { Feature } from '../../components'
import './what.css'

const What = () => {
  return (
    <div className='ckmint__what section__padding' id='what'>
      <div className='ckmint__what-feature'>
        <Feature title="What is CryptoMint" text="We are avid enjoyers of the crypto market and the blockchain who want to introduce more people to this new and exciting world. Our goal is to make cryptocurrency easy to understand and help individuals experiment with their own tokens that can be listed on a exchange."/>
      </div>
      <div className='ckmint__what-heading'>
        <h1 className='gradient__text'>Introducing the most advanced token creator</h1>
      </div>
      <div className='ckmint__what-container'>
        <Feature title="Create your token" text="You don't need to run any code. Just click a few buttons"/>
        <Feature title="List it on the exchange" text="In a matter of minutes your coin can be listed on the Ethereum exchange and you can start making transactions"/>
        <Feature title="Check transactions real-time" text={<>See every transaction with your coin on <a href="https://goerli.etherscan.io/">goerli.etherscan.io</a> just as they happen</>}/>
      </div>
    </div>
  )
}

export default What