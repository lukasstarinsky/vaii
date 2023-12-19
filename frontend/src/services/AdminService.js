import { HTTP, DefaultErrorHandle, ExtractErrors } from "services/HttpService";

export function GetAdminData(onSuccess) {
    HTTP.get("admin")
        .then((res) => onSuccess(res.data))
        .catch((err) => DefaultErrorHandle(err));
}

export function BanUser(userId, data, onSuccess, onError) {
    HTTP.patch(`admin/user/${userId}/ban`, data)
        .then((res) => onSuccess(res.data))
        .catch((err) => onError(ExtractErrors(err)));
}