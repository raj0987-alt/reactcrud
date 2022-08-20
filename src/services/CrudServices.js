import Configuration from "../configuration/Configuration";
import Axios from "./AxiosServices";

const axios = new Axios();
//const Config =new Configuration();

export default class CrudServices{
    CreateRecord(data){
        console.log(" data : ",data," url : ",Configuration.CreateRecord);
        return axios.post(Configuration.CreateRecord, data, false);
    }
}