import { HTTP, DefaultErrorHandle, ExtractErrors } from "services/HttpService";

export function CheckUser(onSuccess, onError) {
    HTTP.get("auth/check")
        .then((res) => onSuccess(res.data))
        .catch(() => onError());
}

export function LoginUser(formData, onSuccess, onError) {
    HTTP.post("auth/login", {...formData})
        .then((res) => onSuccess(res.data))
        .catch((err) => onError(ExtractErrors(err)));
}

export function RegisterUser(formData, onSuccess, onError) {
    HTTP.post("auth/register", {...formData})
        .then((res) => onSuccess(res.data))
        .catch((err) => onError(ExtractErrors(err)));
}

export function LogoutUser(onSuccess) {
    HTTP.post("auth/logout")
        .then(() => onSuccess())
        .catch((err) => DefaultErrorHandle(err));
}