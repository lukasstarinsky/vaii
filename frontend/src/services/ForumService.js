import { HTTP, DefaultErrorHandle } from "@/services/HttpService";

export function CreateThread(data, onSuccess, onError) {
    HTTP.post(`forum/category/${data.category}`, { ...data })
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

export function GetSummary(onSuccess) {
    HTTP.get("forum")
        .then((res) => onSuccess(res.data))
        .catch((err) => DefaultErrorHandle(err));
}

export function GetThreads(category, onSuccess) {
    HTTP.get(`forum/category/${category}`)
        .then((res) => onSuccess(res.data))
        .catch((err) => DefaultErrorHandle(err));
}

export function GetThread(threadId, onSuccess) {
    HTTP.get(`forum/thread/${threadId}`)
        .then((res) => onSuccess(res.data))
        .catch((err) => DefaultErrorHandle(err));
}