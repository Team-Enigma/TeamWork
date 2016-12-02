var app = app || {};

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
                "timeOut": "1500",
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
            }
        }
    }

    app.notificator = new Notificator();
}());