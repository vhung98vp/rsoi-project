import { API } from "./API";
import { getToken } from "./Storage";

export class LearnService {

    static getAll = async (page = 1, limit = 10) => {
        const token = await getToken();
        const response = await API.get(`/history?page=${page}&size=${limit}`, { headers: {"Authorization" : `Bearer ${token}`}});
        return response.data;
    }

    static get = async(setUid) => {
        const token = await getToken();
        const response = await API.get(`/history/set/${setUid}`, { headers: {"Authorization" : `Bearer ${token}`}});
        return response.data;
    }

    static new = async(setUid) => {
        const token = await getToken();
        const response = await API.post(`/history`, {setUid}, { headers: {"Authorization" : `Bearer ${token}`}});
        return response.data;
    }

    static update = async(setUid, props) => {
        const token = await getToken();
        const response = await API.patch(`/history/set/${setUid}`, props, { headers: {"Authorization" : `Bearer ${token}`}});
        return response.data;
    }

    static getNotice = async() => {
        const token = await getToken();
        const response = await API.get(`/history/notice`, { headers: {"Authorization" : `Bearer ${token}`}});
        return response.data.items;
    }
}