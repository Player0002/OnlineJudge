import React, { useState, useEffect} from 'react'
import Http from '../../../api'
import './Board.scss'
const Board = (props)=>{

    const [ currentPost, setCurrentPost ] = useState({
        currentPost: {}
    })
    
    useEffect( () => {
        async function getData() {
            const res = await Http.requestGet(false, 'http://danny-server.kro.kr:5000/board/getPost/' + props.match.params.id).then(rw=>{
                setCurrentPost({currentPost: rw.data})
            }).catch(err=>{
            });
            
        }
        getData()
    }, [])

    let obj = currentPost.currentPost
    let title = obj.title
    let contents = obj.contents + ''
    let writer = obj.writer
    let when = (obj.when + '').substring(0, 10)

    return (
        
        <div className="Board_Main">
            <h1>
                {title}
            </h1>
            <a href={"/userinfo/:" + writer}>{writer}</a>
            <p className="when">{when}</p>
            <div className="contents">
                <div className="inside" dangerouslySetInnerHTML={{__html : contents}}>
                </div>
            </div>
        </div>
    )
}
export default Board