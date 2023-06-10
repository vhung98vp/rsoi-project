import { API } from "./API";
import { getToken } from "./Storage";

export class UserService {

    static get = async() => {
        const token = await getToken();
        const response = await API.get(`/user/get`, { headers: {"Authorization" : `Bearer ${token}`} });
        return response.data;
    }

    static getRole = async() => {
        const token = await getToken();
        if (!token) {
            return undefined;
        }
        const response = await API.get(`/user/role`, { headers: {"Authorization" : `Bearer ${token}`} });
        return response.data;
    }

    static new = async (item) => {
        const response = await API.post(`/user`, {item});
        return response.data;
    }
    
}