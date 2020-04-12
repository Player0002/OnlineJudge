import React from 'react'
import {Route} from 'react-router-dom'
import Home from '../Home/Home'
import Problems from '../Problems/Problems'
import Board from '../Board/Contents/Board'
import Problem from '../Board/Contents/Problems/Problem'
import SendPost from '../Board/Contents/SendPost/SendPost'
const Contents = (props)=>{
    return (
        <div>
            <Route hasToken={props.hasToken} exact path="/" component={Home}/>
            <Route hasToken={props.hasToken}  exact path="/#" component={Home}/>
            <Route hasToken={props.hasToken}  path="/problems/:id" component={Problems}/>
            <Route hasToken={props.hasToken}  path="/boards/:id" component={Board}/>
            <Route path="/problem/:id" component={Problem}/>
            <Route path="/sendPost/:id" component={SendPost}/>
        </div>
    )
}
export default Contents