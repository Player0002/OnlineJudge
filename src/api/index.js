import axios from 'axios'
import cookies from 'react-cookies'
let obj = {}
axios.defaults.headers.common["authorization"] = cookies.load('userdata') == null ? '' : cookies.load('userdata').token
axios.interceptors.request.use(
    config => {
        if(cookies.load('userdata') != null) config.headers['authorization'] = cookies.load('userdata').token
        
        return config
    },
    error=>{
        Promise.reject(error)
    }
)
axios.interceptors.response.use(config =>{
    return config;
}, err=> {
    const orq = err.config
    if(err.response.status == 401 && !orq._retry){
        orq._retry = true
        return axios.post(
            'http://danny-server.kro.kr:5000/user/refresh',
            {
                id: cookies.load('userdata').id,
                refreshToken: cookies.load('userdata').refresh
            }
        ).then(dat =>{
            if(dat.status === 200){
                let userdata = cookies.load('userdata')
                userdata.token = dat.data.data.token
                cookies.save('userdata', userdata, {path:'/'})
                axios.defaults.headers.common["authorization"] = userdata.token
                return axios(orq)
            }
        })
    }
    return Promise.reject(err)
})
obj.requestPost = async(url, data)=>{
    let cfg = {
        url: url,
        method: 'post',
        data: data
    }
    return await axios(cfg).catch(err=>{
        cfg.headers = {
            'Content-type':'application/json',
            'authorization': cookies.load('userdata').token
        }
        return (err.config.ret) ? 
         axios(cfg) : Promise.reject(err)
    })
}
obj.requestGet=async (bol, url)=>{
    if(bol === true){
        return axios({
            url: url,
            method: 'get'
        });
    } 
    else{
        let cfg = {
            url: url,
            method: 'get'
        }
        return await axios(cfg).catch(err=> {
            console.log(err.config.ret)
            cfg.headers = {
                'Content-type':'application/json',
                'authorization': cookies.load('userdata').token
            }
            return (err.config.ret) ? 
             axios(cfg) : Promise.reject(err)
        })
    }
}
export default obj