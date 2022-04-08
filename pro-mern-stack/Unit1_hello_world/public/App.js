"use strict";

var continents = ['Africa', 'Antarctica', 'North America', 'South America', 'Asia', 'Europe', 'Australia'];
var helloContinents = Array.from(continents, function (c) {
  return "Hello ".concat(c, "!");
});
var message = helloContinents.join(' ');
var element = React.createElement("div", {
  title: "Outer div"
}, React.createElement("h1", null, message));
ReactDOM.render(element, document.getElementById('contents'));