import React, {useState, useEffect} from 'react'
import Http from '../../../../../api'
import './Problems.scss'
import Board from '../../../Board'
const Problems = (props)=>{
    let [posts, setPosts] = useState({
        posts: []
    })

    useEffect( () => {
        async function getData() {
            await Http.requestGet(false, 'http://danny-server.kro.kr:5000/board/getProblemsByLim/20/' + props.match.params.page).then(rw=>{
                console.log(rw)
                setPosts({posts: rw.data})
            }).catch(err => console.log(err))
        }
        getData()
    }, [])


    return(
        <div className="boards">
            <Board className="problem_board" width={800} title="문제목록들" type="problems" page={1} limit={20}/>
        </div>
    )
}
export default Problems