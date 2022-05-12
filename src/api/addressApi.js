import axiosAddress from "./axiosAddress";

const addressApi = {
    getAllAdress(params){
        const url='/api/?depth=3';
        return axiosAddress.get(url);
    },
 
};
export default addressApi;