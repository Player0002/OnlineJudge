import React from 'react'
import Board from '../Board/Board'
import './Home.scss'
const Home = (props)=>{
    return(
        <div>
            <h1>HOME!</h1>
            <div className="contents">
                <div className="Home-cards">
                    <Board className="inner_card" width={800} title="공지사항" type="acco" page={1}/> 
                    <Board className="inner_card" width={800} title="문제목록들" type="problems" page={1}  page={1} limit={20}/> 
                </div>
            </div>
            
        </div>
    )
}
export default Home