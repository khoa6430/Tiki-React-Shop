import axiosClient from "./axiosClient";

const categoryApi = {
    getAll(params){
        const url='/categories';
        return axiosClient.get(url,{params}) //prams :prams vi giong nhau viet tat
    },
    get(id){
        const url= `/categories/${id}`;
        return axiosClient.get(url);
    },
    add(data){
        const url = '/categories';
        return axiosClient.post(url,data);
    },
    update(data){
        const url = `/categories/${data.id}`;
        return axiosClient.patch(url,data);
    },
    remove(id){
        const url = `/categories/${id}`;
        return axiosClient.delete(url);
    },
};
export default categoryApi;