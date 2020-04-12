import React, { useState } from 'react';
import './App.css';
import TestPopup from '../Popup/TestPopup'

import Header from '../Header/Header'
import Contents from '../contents/Contents'
import {BrowserRouter as Router} from 'react-router-dom'

import cookies from 'react-cookies'

 
function App() {
  const [ showPopup, setShowPopup ] = useState(
    {
      showPopup: false
    }
  )
  const [idx, setIdx ] = useState(
    {
      idx: 0
    }
  )
  const [loginInfo, setLoginInfo] = useState(
    {
      hasCookie: cookies.load('userdata') == null ? false : true,
      username: cookies.load('userdata') == null ? '' : cookies.load('userdata').username
    }
  )
  let toggle = ()=>{
    setShowPopup(
      {
        showPopup: !showPopup.showPopup
      }
    )
  }
  let update = (token, username)=>{
    console.log("OK")
    toggle()
    setLoginInfo({
      hasCookie: token,
      username: username
    })
  }
  let press = (idx)=>{
    toggle()
    setIdx(
      {
        idx: idx
      }
    )
  }
  return (
    <div className="App">
      <Header updateToken={update} hasToken={loginInfo.hasCookie} username={loginInfo.hasCookie ? cookies.load('userdata').username : ''} press={press}/>
      <Contents hasToken={loginInfo.hasCookie}></Contents>
      {
        showPopup.showPopup ? <TestPopup updateToken={update} closePopup={toggle} idx={idx.idx}/> : null
      }
    </div>
  );
}

export default App;
