const Axios = require('axios').default



export default class AxiosServices{
    post(url,data,Header){
        return Axios.post(url,data,Header);
    }
}