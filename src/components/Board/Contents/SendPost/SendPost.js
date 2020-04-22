import React, {useState} from 'react'
import './SendPost.scss'
import Http from '../../../../api'
import cookies from 'react-cookies'
const SendPost = (props) => {
    let [txt, setTxt] = useState({
        value: ''
    })
    let [info, setInfo] = useState({
        value: '제출하지 않음'
    })
    let [completed, setCompleted] = useState({
        value: false
    })
    let submit = ()=>{
        console.log(txt.value)
        
        setInfo({value: '제출중...'})
        Http.requestPost('http://danny-server.kro.kr:5000/compiler/write',{
            username: cookies.load('userdata').username,
            id: props.match.params.id,
            code: txt.value
        }).then(rw =>{
            setInfo({value: '컴파일중...'})
            Http.requestGet(false, 'http://danny-server.kro.kr:5000/compiler/' + cookies.load('userdata').username +'/' + props.match.params.id).then(rw=>{
                console.log(rw)
                if(rw.data.score === rw.data.max) {
                    alert('완벽합니다!')
                    setCompleted({value:true})
                }
                setInfo({value: rw.data.score + " / " + rw.data.max})
            })
        })
    }
    return (
        <div className="code">
            <textarea rows="20" cols="100" onChange={event=>setTxt({value:event.target.value})}/><br/>
            {completed.value ?  null : <button onClick={submit}>제출하기</button>}
            <p>{info.value}</p>
        </div>
    )
}

export default SendPost