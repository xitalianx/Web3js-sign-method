import './App.css';
import Web3 from "web3/dist/web3.min.js"
import React, { useState, useEffect } from 'react';

function App() {
  const [address, setAddress] = useState('');
  const message ='ciao';
  const [signature, setSignature] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    async function getWeb3() {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        setAddress(accounts[0]);
        setWeb3(web3);
      }
    }
    getWeb3();
  }, []);

  const signMessage = async () => {
    const messageHex = web3.utils.utf8ToHex(message);
    const messageHash = web3.utils.sha3(messageHex);
    const signature = await web3.eth.personal.sign(messageHash, address);
    setSignature(signature);
  };

  const verifyMessage = async () => {
    const messageHex = web3.utils.utf8ToHex(message);
    const messageHash = web3.utils.sha3(messageHex);
    const signer = await web3.eth.personal.ecRecover(messageHash, signature);
    console.log(signer)
    console.log(address)
    if (toString(signer) == toString(address)) {
      setIsValid(true);
      console.log("yes")
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p><b>Sign Message:</b> {message}</p>
        <button className='button'onClick={signMessage}>Sign</button>
        <p><b>Signature:</b></p>
        <small>{signature}</small>
        <br></br>
        <button className='button' onClick={verifyMessage}>Verify</button>
        <p>Signature is Valid? {isValid ? 'Yes' : 'No'}</p>
      </header>
    </div>
  );
}

export default App;
