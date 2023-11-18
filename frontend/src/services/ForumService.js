import { HTTP } from "@/services/HttpService";

export function CreateThread(data, onSuccess, onError) {
    HTTP.post("forum", { ...data })
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