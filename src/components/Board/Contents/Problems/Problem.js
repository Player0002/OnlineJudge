import Http from '../../../../api'
import React, { useState, useEffect, Fragment} from 'react'
import './Problem.scss'
import cookies from 'react-cookies'
const Problem = (props)=>{
    const [ currentPost, setCurrentPost ] = useState({
        currentPost: {isCompleted: true}
    })
    
    useEffect( () => {
        async function getData() {
            const res = await Http.requestGet(false, 'http://danny-server.kro.kr:5000/board/getProblems/' + props.match.params.id).then(rw=>{
                console.log(rw.data)
                setCurrentPost({currentPost: rw.data})
                Http.requestGet(false, 'http://danny-server.kro.kr:5000/user/isSolve/' + cookies.load('userdata').username + '/'+ props.match.params.id).then(rwc=>{
                    rw.data.isCompleted = rwc.data.isCompleted;
                    setCurrentPost({currentPost: rw.data})
                }).catch(err=>{})
            }).catch(err=>{
            });
            
        }
        getData()
    }, [])

    let obj = currentPost.currentPost
    let exam = (obj.example + '').toString().split('|');
    return(
        <div className="problems">
            {obj != null ? 
                <Fragment>
                    <header>
                        <h1>{obj.id}. {obj.name}</h1>
                        <p>제한시간 : 2초</p>
                        {currentPost.currentPost.isCompleted ? <p>이미 완료했습니다!</p>: <a href={"/sendPost/" + obj.id}>제출하기</a>}
                    </header>
                    <div className="card">
                        <div className='header'>
                            설명
                        </div>
                        <div className='inside' dangerouslySetInnerHTML={{__html : obj.introduce}}>
                            
                        </div>
                    </div>
                    <div className="card">
                        <div className='header'>
                            입력값
                        </div>
                        <div className='inside'>
                            {obj.input}
                        </div>
                    </div>
                    <div className="card">
                        <div className='header'>
                            출력값
                        </div>
                        <div className='inside'>
                            {obj.output}
                        </div>
                    </div>
                    <div className="card">
                        <div className='header'>
                            예제
                        </div>
                        <div className='inside'>
                            {exam != null?
                            <Fragment>
                                <div className="input" dangerouslySetInnerHTML={{__html : exam[0]}}></div>
                                <div className="output" dangerouslySetInnerHTML={{__html : exam[1]}}></div>
                            </Fragment>
                            :
                            ''}
                        </div>
                    </div>
                </Fragment>
            :
            <header>
                Error
            </header>
            }
            
        </div>
    )
}
export default Problem