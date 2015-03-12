(function() {
    "use strict";

    var DEBUG  = require("debug");
    var    debug  = {
            warning: DEBUG("app:warning:compiler"),
            error  : DEBUG("app:error:compiler"),
            log    : DEBUG("app:log:compiler")
    };

    var fs   = require("fs"),
        path = require("path");

    var Walker = function(target) {
        this.tree = {};

        if (typeof target !== "undefined") this.crawl(target);
    };

    Walker.prototype.crawl = function(string, absolute) {
        if (typeof absolute === "undefined") string = (process.env.pwd || __dirname) + "/" + string;
        var crwl = function(string) {
            var p    = path.resolve(string),
                list = fs.readdirSync(p),
                tree = {};

            list.map(function(item, index) {
                if (fs.lstatSync(p + "/" + item).isDirectory()) tree[index] = crwl(p + "/" + item);
                else tree[index] = item;
            });

            tree["length"] = list.length;
            tree.map = function(fn) {
                for (var i = 0; i < tree.length; i++) {
                    fn(tree[i], i);
                };
            };

            return tree;
        };

        this.tree = crwl(string);
    };

    Walker.prototype.trim = function(tree) {

            tree = tree || {};
        var newtree = {};

        for (var key in tree) {
            if (key == "length" || key == "map") newtree[key] = tree[key];
            else {
                if (typeof tree[key].substr === "undefined") newtree[key] = this.trim(tree[key]);
                else newtree[key] = tree[key].substr(0, tree[key].lastIndexOf("."));
            }
        }

        return newtree;
    };

    module.exports = Walker;
})();
