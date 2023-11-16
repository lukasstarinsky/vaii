import HTTP from "@/services/HttpService";

export function LoginUser(formData) {
    return HTTP.post("auth/login", {...formData})
        .then((res) => { return Promise.resolve(res.data) })
        .catch((err) => {
            if (err.response)
                return Promise.reject(err.response.data);
            else if (err.request)
                return Promise.reject({ errors: [err.message] });
            return Promise.reject({ errors: ["Something went wrong."] });
        });
}