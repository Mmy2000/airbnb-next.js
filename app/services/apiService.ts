import { getAccessToken } from "../lib/actions";

const apiService = {
    get: async function (url: string): Promise<any> {
        console.log('get', url);

        const token = await getAccessToken();
        console.log("Access Token:", token);

        return new Promise((resolve, reject) => {
            fetch(`https://wardany2023.pythonanywhere.com${url}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then((json) => {
                    console.log('Response:', json);

                    resolve(json);
                })
                .catch((error => {
                    reject(error);
                }))
        })
    },
    post: async function(url: string, data: any): Promise<any> {
        console.log('post', url, data);
        const token = await getAccessToken();

        return new Promise((resolve, reject) => {
            fetch(`https://wardany2023.pythonanywhere.com${url}`, {
                method: 'POST',
                body: data,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then((json) => {
                    console.log('Response:', json);

                    resolve(json);
                })
                .catch((error => {
                    reject(error);
                }))
        })
    },
    put: async function(url: string, data: any): Promise<any> {
        console.log('put', url, data);
        const token = await getAccessToken();

        return new Promise((resolve, reject) => {
            fetch(`https://wardany2023.pythonanywhere.com${url}`, {
                method: 'PUT',
                body: data,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then((json) => {
                    console.log('Response:', json);

                    resolve(json);
                })
                .catch((error => {
                    reject(error);
                }))
        })
    },
    delete: async function(url: string, data?: any): Promise<any> {
        console.log('delete', url, data);
        const token = await getAccessToken();

        return new Promise((resolve, reject) => {
            fetch(`https://wardany2023.pythonanywhere.com${url}`, {
                method: 'DELETE',
                body: data,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then((json) => {
                    console.log('Response:', json);

                    resolve(json);
                })
                .catch((error => {
                    reject(error);
                }))
        })
    },
    postWithoutToken: async function(url: string, data: any): Promise<any> {
        console.log('post', url, data);

        return new Promise((resolve, reject) => {
            fetch(`https://wardany2023.pythonanywhere.com${url}`, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then((json) => {
                    console.log('Response:', json);

                    resolve(json);
                })
                .catch((error => {
                    reject(error);
                }))
        })
    }
}

export default apiService;