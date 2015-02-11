window.addEventListener("load", function() {
    console.log("Loading Application");
    src = document.createElement("script");
    src.src = "/deps.js";
    src.onload = function() {
        React = require("react");
        React.render(React.createElement(require("./logic/TestComponent.jsx")), document.body);
    };
    document.head.appendChild(src);
});
