import Axios from "axios";

let urls = {
    test: `https://qcreditapp.herokuapp.com/api/v1/`,
    development: 'https://qcreditapp.herokuapp.com/api/v1/',
    production: 'https://qcreditapp.herokuapp.com/api/v1/',
}
const api = Axios.create({
    baseURL: urls[process.env.NODE_ENV],
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default api;