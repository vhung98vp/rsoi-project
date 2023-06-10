import { API } from "./API";
import { getToken } from "./Storage";

export class StatisticService {

    static getAll = async (page = 1, limit = 10) => {
        const token = await getToken();
        const response = await API.get(`/statistic?page=${page}&size=${limit}`, { headers: {"Authorization" : `Bearer ${token}`}});
        return response.data;
    }

}