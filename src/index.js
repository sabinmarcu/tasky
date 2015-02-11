window.addEventListener("load", function() {
    src = document.createElement("script");
    src.src = "/deps.js";
    src.onload = function() {
        console.log("Document Loaded!");
        React = require("react");
        React.render(React.createElement(require("./logic/TestComponent.jsx")), document.body);
    };
    document.head.appendChild(src);
});
