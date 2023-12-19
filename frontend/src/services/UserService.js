import { HTTP, DefaultErrorHandle, ExtractErrors } from "services/HttpService";

export function GetUserProfile(profileId, onSuccess, onError) {
    HTTP.get(`user/${profileId}/profile`)
        .then((res) => onSuccess(res.data))
        .catch(() => onError());
}