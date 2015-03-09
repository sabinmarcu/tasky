(function() {
    "use strict";
        var DEBUG      = require("debug"),
            BODYPARSER = require("body-parser"),
            debug      = {
                warning: DEBUG("app:warning:http"),
                error  : DEBUG("app:error:http"),
                log    : DEBUG("app:log:http")
            }, isDebugging = DEBUG.enabled("app:log*"),
            _exists = function (item) { return item !== null && typeof item !== "undefined"; };
    debug.error.log = console.error.bind(console);


    debug.log("Bootstrapping HTTP Server");
    var HTTPServer = function(host, port, watch) {

        watch = (_exists(watch)?watch:false);

        debug.log("Setting up the internals of the server!");
        var compiler = false, livereload = null;

        if (watch) {
            try {
                livereload = require("livereload").createServer( { exts: ["less", "js", "stylus", "jade"] } );
                livereload.watch("./src");
            } catch (e) {}
        }

        debug.log("Initialising HTTP server");
        var App = (require("express"))();

        if (isDebugging) {
            App.get("/test", function(req, res) {
                res.send("Hello there, this is just a test message. The server works!");
            });
        }

        debug.log("Setting up API endpoints");
        App.use(BODYPARSER.json());
        App.use(BODYPARSER.urlencoded());


        return {
            start: function() {

                debug.log("Starting HTTP server on " + host + ":" + port + " ...");
                try {

                    var sourceInfo = JSON.parse(require("fs").readFileSync(require("path").resolve(__dirname + "/../config/sources.json"), "utf-8"));
                    debug.log("Running in the " + require("path").resolve(__dirname + "/../" + sourceInfo.public.root) + " directory.");

                    if (compiler) {
                        debug.log("Creating the endpoints for dynamic compiling...");
                        var hookPackage = function(pkg, compile) {
                            debug.log("Hooking ", "/" + sourceInfo.public[pkg.folder] + pkg.filename);
                            App.get("/" + sourceInfo.public[pkg.folder] + pkg.filename, function(req, res) {
                                debug.log("Compiling source ", req.url);
                                compile().then(function(source){
                                    debug.log("Sending " + req.url + " with content type " + pkg["content-type"] || "application/javascript");
                                    res.set("Content-Type", pkg["content-type"] || "application/javascript");
                                    res.status(200).send(source);
                                }, function(error){
                                    res.send(500).end("There has been an error while compiling this file. Check logs for more info!");
                                });
                            });
                        };
                        for (var pkg in sourceInfo.packages) hookPackage(sourceInfo.packages[pkg], compiler[sourceInfo.packages[pkg].compiler || "compile"]);
                    }

                    App.get("*", function(req, res) {
                        debug.log("Requested", (require("path").resolve(__dirname + "/../" + sourceInfo.public.root + req.url)));
                        (require("fs")).exists(require("path").resolve(__dirname + "/../" + sourceInfo.public.root + req.url), function(exists) {
                            if (exists && (req.url !== "/")) res.sendFile(require("path").resolve(__dirname + "/../public" + req.url));
                            else {
                                res.sendFile(require("path").resolve(__dirname + "/../public/index.html"));
                            }
                        });
                    });

                    debug.log("These are the process arguments", process.env.PORT, process.env.IP);
                    App.listen(process.env.PORT || port, process.env.IP || host);
                } catch (e) {
                    debug.error("An error has occurred while starting the server.", e.stack);
                }

            },
            injectCompiler: function(Compiler) {
                compiler = Compiler;
            }
        };
    };
    debug.log("Finished bootstrapping HTTP Server");

    module.exports = HTTPServer;
})();
