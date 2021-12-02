"use strict";
exports.__esModule = true;
var express_1 = require("express");
var express_2 = require("express");
var app = (0, express_1["default"])();
var route = (0, express_2.Router)();
app.use(express_1["default"].json());
route.get('/', function (req, res) {
    res.json({ message: 'hello world with Typescript' });
});
app.use(route);
app.listen(3333, function () { return 'server running on port 3333'; });
