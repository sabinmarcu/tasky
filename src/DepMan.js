(function() {
    'use strict';
    var _exists = function(item) { return typeof item !== 'undefined' && item !== null; },
        _init = function(item, value) {
            if (_exists(item)) return item;
            return value;
        };

    var DepMan = function(basePrefix, dependencies) {
        basePrefix = _init(basePrefix, "");
        dependencies = _init(dependencies, []);
        self = this;

        var _require   = function(module, prefix) {
                prefix = _init(prefix, "");
                if (_exists(module.join)) module = module.join("/");

                var str = prefix + module;
                if (!dependencies[str]) dependencies[str] = require(basePrefix + str);

                return dependencies[str];
            },
            _data      = function(module, suffix) { return _require(module, "data/" + _init(suffix, "")); },
            _classes   = function(module, suffix) { return _require(module, "logic/" + _init(suffix, "")); },
            _vendor    = function(module, suffix) { return _require(module, "vendor/" + _init(suffix, "")); },
            _fixrender = function(module, who, args) {
                if (_exists(module.apply)) return module.apply(who, args);

                return module;
            },
            _render    = function() {
                var args_arr = Array.prototype.slice.apply(arguments),
                    module = args_arr[0], args = args_arr.splice(1) || [];

                module = _data(module, "views/");
                if (_exists(module.main)) {
                    for (var i = 0; i < 3; i++ ) args.unshift(null);
                    return _fixRender(module.main, self, args);
                } else return _fixrender(module, self, args);
            },
            _extScript = function(src, callback, del) {
                callback = _init(callback, null);
                del      = _init(del, true);

                if (_exists(dependencies[src])) return dependencies[src];

                var _name = src.substr(src.lastIndexOf("/") + 1),
                    _s = dependencies[src] = document.createElement("script");

                _s.src    = src;
                _s.id     = _name;
                _s.onload = function() {
                    if (del) _s.parentElement.removeChild(_s);
                    if (_exists(callback)) callback(_s);
                };
                document.head.appendChild(_s);
                return _s;
            },
            _extLink = function(src, stylesheet) {
                stylesheet = _init(stylesheet, true);

                if (_exists(dependencies[src])) return dependencies[src];

                var _name = src.substr(src.lastIndexOf("/") + 1),
                    _s = dependencies[src] = document.createElement("link");

                _s.href    = src;
                _s.id     = _name;

                if (stylesheet) _s.rel = "stylesheet";

                document.head.appendChild(_s);
                return _s;
            },
            _googleFont = function(font, sizes, subsets) {
                if (_exists(dependencies[font])) return dependencies[font];

                sizes = _init(sizes, [100, 300]);
                subsets = _init(subsets, null);

                var names = font.split(" "),
                    _s = dependencies[font] = document.createElement("link"),
                    str = window.location.protocol + "//fonts.googleapis.com/css?family=" + names.join("+") + ":" + sizes.join(",");
                if (_exists(subsets)) str += "&subset=" + subsets.join(",");

                _s.setAttribute("href", str);
                _s.setAttribute("rel", "stylesheet");
                _s.setAttribute("type", "text/css");

                document.head.appendChild(_s);
                return _s;
            };

        return {
            data:       function(module, suffix) { return _data(module, suffix); },
            classes:    function(module, suffix) { return _classes(module, suffix); },
            render:     function(module, suffix) { return _render(module, suffix); },
            extScript:  function(module, suffix) { return _extScript(module, suffix); },
            extLink:    function(module, suffix) { return _extLink(module, suffix); },
            googleFont: function(module, suffix) { return _googleFont(module, suffix); },
            vendor:     function(module, suffix) { return _vendor(module, suffix); },
            doc:        function(module) { return _data(module, "docs/"); },
            stylesheet: function(module) { return _data(module, "stylesheets/"); },
            image:      function(module) { return _data(module, "images/"); },
            font:       function(module) { return _data(module, "fonts/"); },
            json:       function(module) { return _data(module, "jsons/"); },
            helper:     function(module) { return _classes(module, "helpers/"); },
            controller: function(module) { return _classes(module, "controllers/"); },
            directive:  function(module) { return _classes(module, "directives/"); },
            model:      function(module) { return _classes(module, "models/"); },
            language:   function(module) { return _data(module, "languages/"); }
        };
    };

    module.exports = DepMan;
})();
