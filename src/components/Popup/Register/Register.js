import React, { useState } from 'react'
import './Register.scss'
import axios from 'axios'
const Register = (props)=>{
    const [username, setUsername] = useState({
        username: ''
    })
    const [uId, setUId] = useState({uId: ''})
    const [uPw, setUpw] = useState({uPw: ''})
    const [uPwC, setUpwc] = useState({uPwC: ''})

    let login = async ()=>{
        if(username.username ==='' || uId.uId === '' || uPw.uPw === '' || uPwC.uPwC == '' || (uPw.uPw != uPwC.uPwC)){
            alert("이런 무언가 문제가 있어요! 비밀번호체크를 올바르게 입력했나요?")
        }else{
            const res = await axios({
                url: 'http://danny-server.kro.kr:5000/user/registerUser',
                method: 'post',
                data:{
                    username: username.username,
                    id: uId.uId,
                    pw: uPw.uPw,
                    rank: 0
                }
            })
            console.log(res)
            if(res.status === 201){
                alert(res.data.data)
            }
            else if(res.status === 200){
                alert("회원가입 완료!\n로그인 해주시기 바랍니다!")
            }
        }
    }

    return (
        <div className="Register">
            <h1>회원가입</h1>
            <form>
                <input id="nameBox" type="text" placeholder="사용자명" value={username.username} onChange={e=>setUsername({username: e.target.value})}></input>
                <input id="idbox" type="text" placeholder="아이디" value={uId.uId} onChange={e=>setUId({uId: e.target.value})}></input>
                <input id="pwbox" type="password" placeholder="비밀번호" value={uPw.uPw} onChange={e=>setUpw({uPw: e.target.value})}></input>
                <input id="pwcheckbox" type="password" placeholder="비밀번호 확인" value={uPwC.uPwC} onChange={e=>setUpwc({uPwC: e.target.value})}></input>
            </form>
            <button id="register_btn" onClick={login}>회원가입</button>

        </div>
    )
}
export default Register