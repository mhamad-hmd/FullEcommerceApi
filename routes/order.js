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
exports.__esModule = true;
var router = require('express').Router();
var bodyParser = require('body-parser');
var _a = require('./verifyToken'), verifyToken = _a.verifyToken, VerifyTokenAndAuthorization = _a.VerifyTokenAndAuthorization, VerifyTokenAndAdmin = _a.VerifyTokenAndAdmin;
var CryptoJS = require("crypto-js");
var Order = require('../models/Order');
var jsonParser = bodyParser.json();
//CREATE
router.post("/", verifyToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newOrder, savedOrder, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newOrder = new Order(req.body);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, newOrder.save()];
            case 2:
                savedOrder = _a.sent();
                res.status(200).json(savedOrder);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                res.status(500).json(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// // Update
router.put("/:id", VerifyTokenAndAdmin, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var updateOrder, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Order.findByIdAndUpdate(req.params.id, {
                        //setting what is in the body to the Order example:updating img
                        $set: req.body
                    }, { "new": true })];
            case 1:
                updateOrder = _a.sent();
                res.status(200).json(updateOrder);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(500).json(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// //Delete
router["delete"]("/:id", VerifyTokenAndAuthorization, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Order.findByIdAndDelete(req.params.id)];
            case 1:
                _a.sent();
                res.status(200).json("Order has been deleted successfully");
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.status(500).json(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// get user Order
router.get("/find/:userId", VerifyTokenAndAuthorization, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Order.find({ userId: req.params.userId })];
            case 1:
                orders = _a.sent();
                res.status(200).json(orders);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.status(500).json(err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// // //get all
router.get("/", VerifyTokenAndAdmin, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Orders, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Order.find()];
            case 1:
                Orders = _a.sent();
                res.status(200).json(Orders);
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                res.status(500).json(err_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// GET MONTHLY INCOME 
router.get("/incocme", VerifyTokenAndAdmin, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var date, lastMonth, previousMonth, income, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                date = new Date();
                lastMonth = new Date(date.setMonth(date.getMonth() - 1));
                previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Order.aggregate([
                        { $match: { createdAt: { gte: previousMonth } } },
                        {
                            $project: {
                                month: { $month: "$createdAt" },
                                sales: "$amount"
                            }
                        },
                        {
                            $group: {
                                _id: "$month",
                                total: { $sum: "$sales" }
                            }
                        }
                    ])];
            case 2:
                income = _a.sent();
                res.status(200).json(income);
                return [3 /*break*/, 4];
            case 3:
                err_6 = _a.sent();
                res.status(500).json(err_6);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
