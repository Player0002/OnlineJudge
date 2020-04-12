import React from 'react'
import './test.scss'
import Test from './Login/Login'
import Register from './Register/Register'
const TestPopup = (props)=>{
    let updateToken = (token, username)=>{
        props.updateToken(token, username)
        console.log("CALL")
    }
    return (
        <div>
            <div className="popup-body" onClick={props.closePopup}>
            </div>
            <div className="popup-inside">
                {
                props.idx ===0 ?
                <Test updateToken={updateToken} className="inner"></Test>
                : <Register></Register>
                }
               
            </div>
        </div>
    )
}
export default TestPopup