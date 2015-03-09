(function(){
    "use strict";

    var info    = process.appinfo = require("./package.json"),
        args    = process.args    = (new (require("cliparser"))(process.argv)).link({
            "-v": "--version",
            "-h": "--help",
            "-p": "--port",
            "-H": "--host",
            "-V": "--verbose",
            "-u": "--username",
            "-P": "--password",
            "-s": "--server",
            "-c": "--compile",
            "-b": "--bundle",
            "-t": "--test",
            "-w": "--watch"
        }).booleanify().doubleDashArgs;

    var host    = args.host || process.env.IP || "0.0.0.0",
        port    = parseInt(args.port || process.env.PORT || "8000"),
        verbose = args.verbose || process.env.DEBUG || false,
        DEBUG   = require("debug");

    process.env.PORT = port;
    process.env.IP   = host;

    DEBUG.enable("app:error*");
    DEBUG.enable("app:warning*");
    if (verbose) DEBUG.enable("app:log*");
    var debug = {
            warning: DEBUG("app:warning:main"),
            error  : DEBUG("app:error:main"),
            log    : DEBUG("app:log:main")
        };
    debug.error.log = console.error.bind(console);


    debug.log("Bootstrapping Application");
    if (args.version) {
        debug.log("Displaying Version");
        console.log(info.version);
    } else if (args.help) {
        debug.log("Displaying Help");
        // require("./help")(info); // TODO do the help
    } else if (args.test) {
        // User this part whenever you want to test something quickly
    } else if (args.server) {

        debug.log("Booting up Server");
        var Server = new (require("./server/http"))(host, port, args["watch"]);

        if (args.compile !== null && typeof args.compile !== "undefined" && args.compile) Server.injectCompiler(new (require("./server/compiler"))());

        Server.start();

    } else if (args.compile) {
        debug.log("The application will now compile the web application");

        var Compiler = new (require("./server/compiler"))();
        Compiler.compile();
        Compiler.compileStyles();

        debug.log("Finished compiling everything");
    } else {
        console.log("Instruction unknown! Please run the tool using --help to learn more.");
    }
})();
