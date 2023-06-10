import { API } from "./API";
import { getToken } from "./Storage";

export class CategoryService {

    static get = async(id) => {
        const response = await API.get(`/category/${id}`);
        return response.data;
    }

    static getAll = async() => {
        const response = await API.get(`/category`);
        return response.data;
    }

    // Create and update for admin
    static new = async(item) => {
        const token = await getToken();
        const response = await API.post(`/category`, item, { headers: {"Authorization" : `Bearer ${token}`}});
        //const response = await API.post(`/category`, {item}, { headers: {'x-user-name': 'admin'}})
        return response.data;
    }

    static update = async(id, item) => {
        const token = await getToken();
        const response = await API.patch(`/category/${id}`, item, { headers: {"Authorization" : `Bearer ${token}`}});
        return response.data;
    }

}

export class SetService {

    static get = async(uid) => {
        const response = await API.get(`/set/${uid}`);
        return response.data;
    }

    static getAll = async(username = '', page = 1, limit = 10) => {
        const response = await API.get(`/set?page=${page}&size=${limit}&username=${username}`);
        return response.data.items;
    }

    static getLearned = async(page = 1, limit = 10) => {
        const token = await getToken();
        const response = await API.get(`/set/learned?page=${page}&size=${limit}`, { headers: {"Authorization" : `Bearer ${token}`}});
        return response.data.items;
    }

    static new = async(item) => {
        const token = await getToken();
        const response = await API.post(`/set`, item, { headers: {"Authorization" : `Bearer ${token}`}});
        return response.data;
    }

    static update = async(uid, item) => {
        const token = await getToken();
        const response = await API.patch(`/set/${uid}`, item, { headers: {"Authorization" : `Bearer ${token}`}});
        return response.data;
    }

    static delete = async(uid) => {
        const token = await getToken();
        const response = await API.delete(`/set/${uid}`, { headers: {"Authorization" : `Bearer ${token}`}});
        return response.data;
    }
    
}
