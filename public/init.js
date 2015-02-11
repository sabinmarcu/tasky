(function (argument) {
    'use strict';
    var handler = function() {
        var scr        = document.createElement("script");
            scr.src    = "/deps.js";
            scr.id     = "deps";
            scr.onload = function() {
                scr        = document.createElement("script");
                scr.src    = "/browser.js";
                scr.id     = "app";
                scr.onload = function() {
                    console.log("Loaded all!");
                };
                document.head.appendChild(scr);
            };
        document.head.appendChild(scr);
    };
    var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);
            handler();
        }
    }, 10);
})();