import { HTTP, DefaultErrorHandle } from "@/services/HttpService";

export function CheckUser(onSuccess, onError) {
    HTTP.get("auth/check")
        .then((res) => onSuccess(res.data))
        .catch(() => onError());
}

export function LoginUser(formData, onSuccess, onError) {
    HTTP.post("auth/login", {...formData})
        .then((res) => onSuccess(res.data))
        .catch((err) => {
            if (err.response)
                onError(err.response.data);
            else if (err.request)
                onError([err.message]);
            else
                onError(["Something went wrong."]);
        });
}

export function RegisterUser(formData, onSuccess, onError) {
    HTTP.post("auth/register", {...formData})
        .then((res) => onSuccess(res.data))
        .catch((err) => {
            if (err.response)
                onError(err.response.data);
            else if (err.request)
                onError({ errors: [err.message] });
            else
                onError({ errors: ["Something went wrong."] })
        })
}

export function LogoutUser(onSuccess) {
    HTTP.post("auth/logout")
        .then(() => onSuccess())
        .catch((err) => DefaultErrorHandle(err));
}