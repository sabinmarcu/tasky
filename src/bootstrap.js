(function() {
    "use strict";

    module.exports = function(stylesFunc) {
        AppInfo.displayname =  AppInfo.displayname || AppInfo.name
        document.title = AppInfo.displayname;

        window.DepMan = new (require("DepMan"))();
        window.DepMan.googleFont("Open Sans");

        window.DepMan.vendor("js/angular")
        window.DepMan.vendor("js/angular.aria")
        window.DepMan.vendor("js/angular.animate")
        window.DepMan.vendor("js/angular.material")

        window.DepMan.vendor("css/angular.material");
        window.DepMan.vendor("css/angular.material.default");

        var div = document.createElement("script");
        div.src = "http://" + (location.host || 'localhost').split(':')[0] + ":35729/livereload.js?snipver=1";
        document.body.appendChild(div);

        div = document.createElement("div");
        div.id = "wrapper";
        div.innerHTML = window.DepMan.render("index");
        document.body.appendChild(div);

        var app = angular.module(AppInfo.displayname, ["ngAnimate", "ngAria", "ngMaterial"]);
        // app.config(["$locationProvider"], function(location) { location.html5Mode = true; });
        angular.bootstrap(document.getElementById("appwrapper"), [AppInfo.displayname]);

        document.head.appendChild(stylesFunc());
    };
})();
