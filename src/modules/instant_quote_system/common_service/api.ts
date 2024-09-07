import axios from "axios";

export function sendRequestToServer(end_point: string,method: string,data?: any) {
    try {
        let body = {};

        if (method !== "GET") {
            body = data;
        }

        return axios({
            method: method,
            url: `${import.meta.env.VITE_APP_BACKEND_URL}${end_point}`,
            data: JSON.stringify(body),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            if (res.data) {
                return {
                    message: res.data.message,
                    status: res.status,
                    data: res.data.data
                }
            }
        }).catch((error) => {
            if (error.response) {
                if (error.response.status === 500) {
                    return {
                        message: "Something Went wrong.",
                        status: error.response.status,
                        data: {},
                    };
                }
            } else {
                return {
                    message: "There is a network failure, please try again.",
                    status: "500",
                    data: {},
                };
            }
        })

    } catch (err: any) {
        return {
            message: "Something went wrong.",
            status: "500",
            data: {},
        }
    }
}