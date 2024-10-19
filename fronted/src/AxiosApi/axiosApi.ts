import axios from 'axios';
import { apiURL} from "./baseUrl.ts";

const axiosApi = axios.create({
    baseURL: apiURL
});
export default axiosApi;