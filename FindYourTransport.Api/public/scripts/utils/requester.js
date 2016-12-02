var app = app || {};

(function() {

    function request(method, url, data) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url,
                data: data ? data : null,
                method,
                success(response) {
                    resolve(response);
                },
                error(error) {
                    reject(error);
                }
            });
        });
    }

    class Requester {
        get(url) {
            return request("GET", url);
        }

        post(url, data) {
            return request("POST", url, data);
        }

        put(url, data) {
            return request("PUT", url, data);
        }

        delete(url) {
            return request("DELETE", url);
        }
    }

    app.requester = new Requester();
}());