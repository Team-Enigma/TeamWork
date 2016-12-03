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

    function requestWithFile(method, url, data) {
        return new Promise((resolve, reject) => {
            $.ajax({
                async: true,
                url,
                type: "POST",
                data,
                contentType: false,
                processData: false,
                cache: false,
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

        postFile(url, data) {
            return requestWithFile("POST", url, data);
        }

        put(url, data) {
            return request("PUT", url, data);
        }

        delete(url, data) {
            return request("DELETE", url, data);
        }
    }

    app.requester = new Requester();
}());