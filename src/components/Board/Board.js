import React, { useState, useEffect} from 'react'

import Http from '../../api'

import './Board.scss'

const Board = (props)=>{
    let title = props.title
    let type = props.type
    let page = props.page != null ? props.page : 1 //Default is 1

    let width = props.width
    
    let [posts, setPosts] = useState({
        posts: []
    })

    useEffect( () => {
        async function getData() {
            if(type === 'problems'){
                await Http.requestGet(false, 'http://danny-server.kro.kr:5000/board/getProblemsByLim/' + props.limit + '/' + (props.page - 1)).then(rw=>{
                    console.log(rw)
                    setPosts({posts: rw.data})
                }).catch(err => console.log(err))
            }else{
                await Http.requestGet(false, 'http://danny-server.kro.kr:5000/board/getTypePost/' + type + '/7').then(rw=>{
                    console.log(rw)
                    setPosts({posts: rw.data})
                }).catch(err => console.log(err))
            }
        }
        getData()
    }, [])

    return (
        <div className="Board">
            <h1>{title}</h1>
            <div className="inner">
                <ul>
                    {
                        type === 'problems'?
                            posts.posts.length > 0 ? posts.posts.map((p) => (
                                <li key={p.id}>
                                    <a href={"/problem/" + p.id} className="lft">{p.name}</a>
                                </li>
                            
                                
                            )) :
                            <li>
                                <div className="noData">
                                    <a href="#">게시물이 없습니다.</a>
                                </div>
                            </li>
                        :
                            posts.posts.length > 0 ? posts.posts.map((p) => (
                                <li key={p.id}>
                                    <a href={"/boards/" + p.id} className="lft">{p.title}</a>
                                </li>
                            
                                
                            )) :
                            <li>
                                <div className="noData">
                                    <a href="#">게시물이 없습니다.</a>
                                </div>
                            </li>
                    }
                </ul>
            </div>
        </div>
    )
    
}

export default Board