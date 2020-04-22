import React from 'react'
import {Route} from 'react-router-dom'
import Home from '../Home/Home'
import Problems from '../Board/Contents/Problems/ProblemPage/Problems'
import Board from '../Board/Contents/Board'
import Problem from '../Board/Contents/Problems/Problem'
import SendPost from '../Board/Contents/SendPost/SendPost'
import Admin from '../Admin/Board'
import AllUserInfo from '../Admin/User/AllUserInfo.js'
const Contents = (props)=>{
    return (
        <div>
            <Route hasToken={props.hasToken} exact path="/" component={Home}/>
            <Route hasToken={props.hasToken}  exact path="/#" component={Home}/>
            <Route hasToken={props.hasToken}  path="/problems/:id" component={Problems}/>
            <Route hasToken={props.hasToken}  path="/boards/:id" component={Board}/>
            <Route hasToken={props.hasToken}  path="/admin" component={Admin}/>
            <Route path="/alluserinfo" component={AllUserInfo}/>
            <Route path="/alluserinfo/:name" component={AllUserInfo}/>
            <Route path="/problem/:id" component={Problem}/>
            <Route path="/sendPost/:id" component={SendPost}/>
        </div>
    )
}
export default Contents