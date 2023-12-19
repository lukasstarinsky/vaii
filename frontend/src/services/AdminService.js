import { HTTP, DefaultErrorHandle, ExtractErrors } from "services/HttpService";

export function GetAdminData(onSuccess) {
    HTTP.get("admin")
        .then((res) => onSuccess(res.data))
        .catch((err) => DefaultErrorHandle(err));
}

export function PromoteUser(userId, onSuccess) {
    HTTP.patch(`admin/user/${userId}/promote`)
        .then(() => onSuccess())
        .catch((err) => DefaultErrorHandle(err));
}

export function DeleteUser(userId, onSuccess) {
    HTTP.delete(`admin/user/${userId}`)
        .then(() => onSuccess())
        .catch((err) => DefaultErrorHandle(err));
}

export function BanUser(userId, data, onSuccess, onError) {
    HTTP.patch(`admin/user/${userId}/ban`, data)
        .then((res) => onSuccess(res.data))
        .catch((err) => onError(ExtractErrors(err)));
}

export function EditBan(banId, newReason, onSuccess) {
    HTTP.patch(`admin/ban/${banId}`, { newReason })
        .then(() => onSuccess())
        .catch((err) => DefaultErrorHandle(err));
}

export function RevokeBan(banId, onSuccess) {
    HTTP.delete(`admin/ban/${banId}`)
        .then(() => onSuccess())
        .catch((err) => DefaultErrorHandle(err));
}