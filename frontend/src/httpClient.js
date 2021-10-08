import axios from "axios";


const httpClient = axios.create({
    baseURL: 'https://localhost:44349',
});

httpClient.defaults.headers.post["Content-Type"] = "application/json";




export default httpClient;
