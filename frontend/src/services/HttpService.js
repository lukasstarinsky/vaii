import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8080/api/";
axios.defaults.withCredentials = true;

const DefaultErrorHandle = (err) => {
    alert("Something went wrong. Check console for more information.");
    if (err.response && err.response.status === 500) {
        console.error(err.response);
    } else if (err.request) {
        console.error(err.request);
    } else {
        console.error(err.message);
    }
}

const ExtractErrors = (err) => {
    if (err.response) {
        return err.response.data;
    } else if (err.request) {
        return [err.message];
    } else {
        return ["Something went wrong."];
    }
}

const HTTP = axios;

export { HTTP, DefaultErrorHandle, ExtractErrors };