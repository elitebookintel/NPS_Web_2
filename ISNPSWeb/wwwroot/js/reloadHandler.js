var time = new Date().getTime();
var page = "";
$(document.body).bind("mousemove keypress", function (e) {
    page = e.target.ownerDocument.location.pathname;

    time = new Date().getTime();
});

function refresh() {
    if (page == "/Account/Login") {
        return;
    } else {
        var timeNow = new Date().getTime();
        if (timeNow - time >= 1200000) {
            var currentUrl = window.location.href;
            var cleanUrl = new URL(currentUrl);
            var baseUrl = cleanUrl.origin + cleanUrl.pathname;
            if (baseUrl !== null && baseUrl !== undefined && baseUrl !== "") {
                var redirectUrl = '/Account/LockScreen/?redirectedFrom=' + encodeURIComponent(baseUrl);
            } else { redirectUrl = "/"; }
            window.location.href = redirectUrl;
        } else {
            setTimeout(refresh, 60000);
        }
    }
}
setTimeout(refresh, 60000);