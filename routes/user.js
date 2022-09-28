"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var router = require('express').Router();
var bodyParser = require('body-parser');
var _a = require('./verifyToken'), verifyToken = _a.verifyToken, VerifyTokenAndAuthorization = _a.VerifyTokenAndAuthorization, VerifyTokenAndAdmin = _a.VerifyTokenAndAdmin;
var CryptoJS = require("crypto-js");
var User = require('../models/Users');
var jsonParser = bodyParser.json();
//Update
router.put("/:id", VerifyTokenAndAuthorization, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var updateUser, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (req.body.password) {
                    req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User.findByIdAndUpdate(req.params.id, {
                        //setting what is in the body to the user example:updating username
                        $set: req.body
                    }, { "new": true })];
            case 2:
                updateUser = _a.sent();
                res.status(200).json(updateUser);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                res.status(500).json(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//Delete
router["delete"]("/:id", VerifyTokenAndAuthorization, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User.findByIdAndDelete(req.params.id)];
            case 1:
                _a.sent();
                res.status(200).json("User has been deleted successfully");
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(500).json(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//get user
router.get("/find/:id", VerifyTokenAndAdmin, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, _a, password, others, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User.findById(req.params.id)];
            case 1:
                user = _b.sent();
                _a = user._doc, password = _a.password, others = __rest(_a, ["password"]);
                res.status(200).json({ others: others });
                return [3 /*break*/, 3];
            case 2:
                err_3 = _b.sent();
                res.status(500).json(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//get all users
router.get("/", VerifyTokenAndAdmin, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, users, _a, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                query = req.query["new"];
                if (!query) return [3 /*break*/, 2];
                return [4 /*yield*/, User.find().sort({ _id: -1 }).limit(1)];
            case 1:
                _a = _b.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, User.find()];
            case 3:
                _a = _b.sent();
                _b.label = 4;
            case 4:
                users = _a;
                //responding with users
                res.status(200).json(users);
                return [3 /*break*/, 6];
            case 5:
                err_4 = _b.sent();
                res.status(500).json(err_4);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
//get user stats
router.get("/stats", VerifyTokenAndAdmin, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var date, lastYear, data, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                date = new Date();
                lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User.aggregate([
                        //matching all the users that are created from lastyear till now
                        { $match: { createdAt: { $gte: lastYear } } },
                        // getting the month that the user got created at
                        { $project: {
                                month: { $month: "$createdAt" }
                            }
                        },
                        //grouping all the users created at each month
                        { $group: {
                                _id: "$month",
                                total: { $sum: 1 }
                            } }
                    ])];
            case 2:
                data = _a.sent();
                res.status(200).json(data);
                return [3 /*break*/, 4];
            case 3:
                err_5 = _a.sent();
                res.status(500).json(err_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
