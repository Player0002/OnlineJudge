import React, { useState } from 'react'
import './Login.scss'
import axios from 'axios'
import cookies from 'react-cookies'

const Login = (props)=>{

    const [uId, setUId ] = useState({
        id : ''
    })
    const [uPw, setUPw] = useState({
        pw:''
    })
    
    let updateToken = (updated, username)=>{
        props.updateToken(updated, username)
    }

    let goLogin = () => {
        async function getLog(){
            const res = await axios({
                url: 'http://danny-server.kro.kr:5000/user/login',
                method: 'post',
                data:{
                    id: uId.id,
                    pw: uPw.pw
                }
            })
            console.log(res)
            if(res.status === 201){
                alert(res.data.data)
            }
            else if(res.status === 200){
                let dat = res.data.data;
                cookies.save('userdata',{
                    id: uId.id,
                    token: dat.token,
                    username : dat.username,
                    rank: dat.rank,
                    refresh: dat.refreshToken
                }, {path:'/'})
                alert("로그인완료!\n화면을 새로고침 해주세요!")
                updateToken(true, dat.username)
            }
        }
        getLog()
    }
    return (
        <div className="Login">
            <h1>로그인</h1>
            <form>
                <input id="idbox" type="text" value={uId.id} placeholder="아이디" onChange={e=>setUId({id: e.target.value})}></input>
                <input id="pwbox" type="password" value={uPw.pw} placeholder="비밀번호" onChange={e=>setUPw({pw: e.target.value})}></input>
            </form>
            <button id="login_btn" onClick={goLogin}>로그인</button>

        </div>
    )
}
export default Login