import React, {useState, useEffect} from 'react'
import Http from '../../../api'
import './AllUserInfo.scss'
const AllUserInfo = (props) => {
    const [ currentUser, setCurrentUser ] = useState([])
    
    useEffect( () => {
        async function getData() {
            const res = await Http.requestGet(true, 'http://danny-server.kro.kr:5000/user/allUser').then(rw=>{
                setCurrentUser(rw.data)
                console.log(rw.data)
            }).catch(err=>{
                console.log(err)
            });
            
        }
        getData()
    }, [])

    return (
        <div className="userList">
            {
                currentUser.length > 0 ? currentUser.map((val) => {return(
                    <div className="selector">
                        <p className="idx">{val.id}</p>
                        <a className="userName" href={"/userinfo/" + val.id}>{val.username}</a>
                    </div>    
                )}
                )
                :
                <div>
                <p>Error</p>
                </div>
            }
        </div>
    )
}
export default AllUserInfo