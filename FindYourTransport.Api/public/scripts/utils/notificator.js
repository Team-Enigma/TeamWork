/* globals toastr */
/* eslint-disable no-var */
/* eslint-disable no-use-before-define */

var app = app || {};

/* eslint-enable no-var */
/* eslint-enable no-use-before-define */

(function() {

    class Notificator {
        showNotification(message, type) {
            toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": true,
                "progressBar": false,
                "positionClass": "toast-top-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "100",
                "hideDuration": "100",
                "timeOut": "3000",
                "extendedTimeOut": "1000",
                "showEasing": "linear",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            };

            if (type === "success") {
                toastr.success(message);
            } else if (type === "error") {
                toastr.error(message);
            } else {
                toastr.info(message);
            }
        }
    }

    app.notificator = new Notificator();
}());