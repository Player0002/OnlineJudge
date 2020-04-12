import React from 'react'
import logo from '../public/logo/danny_logo.png'
import './Header.scss'
import cookies from 'react-cookies'
const Header = (props)=>{
    
    const login = ()=>{ 
        props.press(0)
    }
    const register = ()=>{ props.press(1)}

    let removeCookie = ()=>{
        cookies.remove('userdata')
        props.updateToken(false, null)
    }

    return (
        <div className="Header-HeaderTop">
            <img src={logo} className="topLogo" alt="logo"/>
            <ul className="sideLeft">
                <li><a href="/OnlineJudge/">메인페이지</a></li>
                <li><a href="/OnlineJudge/problems">문제목록</a></li>
                {cookies.load('userdata') != null && cookies.load('userdata').rank === 1 ? <li><a href="/admin">관리자페이지</a></li> : <li></li>} 
            </ul>
            {props.hasToken ? 
                <ul className="sideRight">
                    <li><a href='#' onClick={removeCookie}>Welcome, {props.username}</a></li>
                </ul>
            :
            <ul className="sideRight">
                <li><a href="#" onClick={login}>로그인</a></li>
                <li><a href="#" onClick={register}>회원가입</a></li>
            </ul>
            }
        </div>
    )
}

export default Header