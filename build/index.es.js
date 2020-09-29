import React, { useEffect } from 'react';
import { Admin, Filter as Filter$1 } from 'react-admin';
import { Auth } from '@aws-amplify/auth';
import { GRAPHQL_AUTH_MODE, API } from '@aws-amplify/api';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
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
}

var defaultOptions = {
    authGroups: [],
};
var AuthProvider = /** @class */ (function () {
    function AuthProvider(options) {
        var _this = this;
        if (options === void 0) { options = defaultOptions; }
        this.login = function (_a) {
            var username = _a.username, password = _a.password, clientMetadata = _a.clientMetadata;
            return Auth.signIn(username, password, clientMetadata);
        };
        this.changePassword = function (_a) {
            var user = _a.user, oldPassword = _a.oldPassword, newPassword = _a.newPassword, clientMetadata = _a.clientMetadata;
            return Auth.changePassword(user, oldPassword, newPassword, clientMetadata);
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.logout = function () {
            return Auth.signOut();
        };
        this.checkAuth = function () { return __awaiter(_this, void 0, void 0, function () {
            var session, userGroups, _i, userGroups_1, group;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Auth.currentSession()];
                    case 1:
                        session = _a.sent();
                        if (this.authGroups.length === 0) {
                            return [2 /*return*/];
                        }
                        userGroups = session.getAccessToken().decodePayload()["cognito:groups"];
                        if (!userGroups) {
                            throw new Error("Unauthorized");
                        }
                        for (_i = 0, userGroups_1 = userGroups; _i < userGroups_1.length; _i++) {
                            group = userGroups_1[_i];
                            if (this.authGroups.includes(group)) {
                                return [2 /*return*/];
                            }
                        }
                        throw new Error("Unauthorized");
                }
            });
        }); };
        this.checkError = function (error) {
            if (error === null || typeof error !== "object") {
                return Promise.resolve();
            }
            var errors = error.errors;
            if (!errors || !Array.isArray(errors)) {
                return Promise.resolve();
            }
            for (var _i = 0, errors_1 = errors; _i < errors_1.length; _i++) {
                var e = errors_1[_i];
                if (e === null || typeof e !== "object") {
                    continue;
                }
                if (e.errorType === "Unauthorized") {
                    return Promise.reject();
                }
            }
            return Promise.resolve();
        };
        this.getPermissions = function () { return __awaiter(_this, void 0, void 0, function () {
            var session, groups;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Auth.currentSession()];
                    case 1:
                        session = _a.sent();
                        groups = session.getAccessToken().decodePayload()["cognito:groups"];
                        return [2 /*return*/, groups ? Promise.resolve(groups) : Promise.reject()];
                }
            });
        }); };
        var optionsBag = __assign(__assign({}, defaultOptions), options);
        this.authGroups = optionsBag.authGroups;
    }
    return AuthProvider;
}());

var sortOperators = ["eq", "le", "lt", "ge", "gt", "beginsWith"];
var bannedKeyNames = ["sortDirection", "limit", "nextIndex"];
var Filter = /** @class */ (function () {
    function Filter() {
    }
    Filter.getQueryName = function (queries, filter) {
        if (!this.isObjectOfLength(filter, 1)) {
            return null;
        }
        // The filter unique field is the query name
        var queryName = Object.keys(filter)[0];
        if (!queries[queryName]) {
            console.log("Could not find query " + queryName);
            throw new Error("Data provider error");
        }
        return queryName;
    };
    Filter.getQueryVariables = function (filter) {
        var _a, _b;
        if (!this.isObjectOfLength(filter, 1)) {
            return null;
        }
        var queryParams = Object.values(filter)[0];
        for (var _i = 0, bannedKeyNames_1 = bannedKeyNames; _i < bannedKeyNames_1.length; _i++) {
            var bannedKeyName = bannedKeyNames_1[_i];
            delete queryParams[bannedKeyName];
        }
        // Case when there is only the hash key
        if (this.isObjectOfLength(queryParams, 1)) {
            var onlyParam = Object.values(queryParams)[0];
            if (this.isHashKeyValid(onlyParam)) {
                return queryParams;
            }
            return null;
        }
        // Case when there are the hash key and the sort key
        if (this.isObjectOfLength(queryParams, 2)) {
            var firstParam = Object.values(queryParams)[0];
            var secondParam = Object.values(queryParams)[1];
            if (this.isHashKeyValid(firstParam)) {
                if (this.isSortKeyValid(secondParam)) {
                    return queryParams;
                }
                return _a = {},
                    _a[Object.keys(queryParams)[0]] = firstParam,
                    _a;
            }
            if (this.isHashKeyValid(secondParam)) {
                if (this.isSortKeyValid(firstParam)) {
                    return queryParams;
                }
                return _b = {},
                    _b[Object.keys(queryParams)[1]] = secondParam,
                    _b;
            }
        }
        return null;
    };
    Filter.isObject = function (obj) {
        return obj !== null && typeof obj === "object";
    };
    Filter.isObjectOfLength = function (obj, length) {
        if (length === void 0) { length = 0; }
        if (!this.isObject(obj)) {
            return false;
        }
        return Object.keys(obj).length === length;
    };
    Filter.isString = function (str) {
        return typeof str === "string" && str !== "";
    };
    Filter.isHashKeyValid = function (key) {
        return this.isString(key) || typeof key === "number";
    };
    Filter.isSortKeyValid = function (obj) {
        if (!this.isObjectOfLength(obj, 1)) {
            return false;
        }
        var key = obj;
        if (!sortOperators.includes(Object.keys(key)[0])) {
            return false;
        }
        var keyInput = Object.values(key)[0];
        if (this.isHashKeyValid(keyInput)) {
            return true;
        }
        if (this.isObject(keyInput) && Object.keys(keyInput).length > 1) {
            for (var sortField in keyInput) {
                if (!this.isHashKeyValid(keyInput[sortField])) {
                    return false;
                }
            }
            return true;
        }
        return false;
    };
    return Filter;
}());

var Pagination = /** @class */ (function () {
    function Pagination() {
    }
    Pagination.getNextToken = function (querySignature, page) {
        var _a;
        // Initialize the array of tokens
        if (!this.tokens[querySignature]) {
            this.tokens[querySignature] = [];
        }
        if (page !== 1 &&
            typeof this.tokens[querySignature][page - 1] === "undefined") {
            return undefined;
        }
        return (_a = this.tokens[querySignature][page - 1]) !== null && _a !== void 0 ? _a : null;
    };
    Pagination.saveNextToken = function (nextToken, querySignature, page) {
        // Initialize the array of tokens
        if (!this.tokens[querySignature]) {
            this.tokens[querySignature] = [];
        }
        this.tokens[querySignature][page] = nextToken;
    };
    Pagination.tokens = {};
    return Pagination;
}());

var defaultOptions$1 = {
    authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
};
var DataProvider = /** @class */ (function () {
    function DataProvider(operations, options) {
        var _this = this;
        if (options === void 0) { options = defaultOptions$1; }
        this.getList = function (resource, params) { return __awaiter(_this, void 0, void 0, function () {
            var filter, queryName, queryVariables, query, _a, page, perPage, querySignature, nextToken, queryData, total;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        filter = params.filter;
                        queryName = Filter.getQueryName(this.queries, filter);
                        queryVariables = Filter.getQueryVariables(filter);
                        if (!queryName || !queryVariables) {
                            // Default list query without filter
                            queryName = "list" + (resource.charAt(0).toUpperCase() + resource.slice(1));
                        }
                        query = this.getQuery(queryName);
                        if (!queryVariables) {
                            queryVariables = {};
                        }
                        _a = params.pagination, page = _a.page, perPage = _a.perPage;
                        querySignature = JSON.stringify({
                            queryName: queryName,
                            queryVariables: queryVariables,
                            perPage: perPage,
                        });
                        nextToken = Pagination.getNextToken(querySignature, page);
                        // Checks if page requested is out of range
                        if (typeof nextToken === "undefined") {
                            return [2 /*return*/, {
                                    data: [],
                                    total: 0,
                                }]; // React admin will redirect to page 1
                        }
                        // Adds sorting if requested
                        if (params.sort.field === queryName) {
                            queryVariables["sortDirection"] = params.sort.order;
                        }
                        return [4 /*yield*/, this.graphql(query, __assign(__assign({}, queryVariables), { limit: perPage, nextToken: nextToken }))];
                    case 1:
                        queryData = (_b.sent())[queryName];
                        // Saves next token
                        Pagination.saveNextToken(queryData.nextToken, querySignature, page);
                        total = (page - 1) * perPage + queryData.items.length;
                        if (queryData.nextToken) {
                            total++; // Tells react admin that there is at least one more page
                        }
                        return [2 /*return*/, {
                                data: queryData.items,
                                total: total,
                            }];
                }
            });
        }); };
        this.getOne = function (resource, params) { return __awaiter(_this, void 0, void 0, function () {
            var queryName, query, queryData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryName = "get" + (resource.charAt(0).toUpperCase() + resource.slice(1, -1));
                        query = this.getQuery(queryName);
                        return [4 /*yield*/, this.graphql(query, { id: params.id })];
                    case 1:
                        queryData = (_a.sent())[queryName];
                        return [2 /*return*/, {
                                data: queryData,
                            }];
                }
            });
        }); };
        this.getMany = function (resource, params) { return __awaiter(_this, void 0, void 0, function () {
            var queryName, query, queriesData, _i, _a, id, queryData, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        queryName = "get" + (resource.charAt(0).toUpperCase() + resource.slice(1, -1));
                        query = this.getQuery(queryName);
                        queriesData = [];
                        _i = 0, _a = params.ids;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        id = _a[_i];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.graphql(query, { id: id })];
                    case 3:
                        queryData = (_b.sent())[queryName];
                        queriesData.push(queryData);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _b.sent();
                        console.log(e_1);
                        return [3 /*break*/, 5];
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/, {
                            data: queriesData,
                        }];
                }
            });
        }); };
        this.getManyReference = function (resource, params) { return __awaiter(_this, void 0, void 0, function () {
            var target, filter, id, pagination, sort;
            return __generator(this, function (_a) {
                target = params.target.split(".");
                // Target is used to build the filter
                // It must be like: queryName.resourceID
                if (target.length !== 2) {
                    throw new Error("Data provider error");
                }
                filter = params.filter, id = params.id, pagination = params.pagination, sort = params.sort;
                if (!filter[target[0]]) {
                    filter[target[0]] = {};
                }
                filter[target[0]][target[1]] = id;
                return [2 /*return*/, this.getList(resource, { pagination: pagination, sort: sort, filter: filter })];
            });
        }); };
        this.create = function (resource, params) { return __awaiter(_this, void 0, void 0, function () {
            var queryName, query, queryData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryName = "create" + (resource.charAt(0).toUpperCase() + resource.slice(1, -1));
                        query = this.getQuery(queryName);
                        return [4 /*yield*/, this.graphql(query, { input: params.data })];
                    case 1:
                        queryData = (_a.sent())[queryName];
                        return [2 /*return*/, {
                                data: queryData,
                            }];
                }
            });
        }); };
        this.update = function (resource, params) { return __awaiter(_this, void 0, void 0, function () {
            var queryName, query, data, queryData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryName = "update" + (resource.charAt(0).toUpperCase() + resource.slice(1, -1));
                        query = this.getQuery(queryName);
                        data = params.data;
                        delete data._deleted;
                        delete data._lastChangedAt;
                        delete data.createdAt;
                        delete data.updatedAt;
                        return [4 /*yield*/, this.graphql(query, { input: data })];
                    case 1:
                        queryData = (_a.sent())[queryName];
                        return [2 /*return*/, {
                                data: queryData,
                            }];
                }
            });
        }); };
        // This may not work for API that uses DataStore because
        // DataStore works with a _version field that needs to be properly set
        this.updateMany = function (resource, params) { return __awaiter(_this, void 0, void 0, function () {
            var queryName, query, data, ids, _i, _a, id, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        queryName = "update" + (resource.charAt(0).toUpperCase() + resource.slice(1, -1));
                        query = this.getQuery(queryName);
                        data = params.data;
                        delete data._deleted;
                        delete data._lastChangedAt;
                        delete data.createdAt;
                        delete data.updatedAt;
                        ids = [];
                        _i = 0, _a = params.ids;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        id = _a[_i];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.graphql(query, { input: __assign(__assign({}, data), { id: id }) })];
                    case 3:
                        _b.sent();
                        ids.push(id);
                        return [3 /*break*/, 5];
                    case 4:
                        e_2 = _b.sent();
                        console.log(e_2);
                        return [3 /*break*/, 5];
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/, {
                            data: ids,
                        }];
                }
            });
        }); };
        this.delete = function (resource, params) { return __awaiter(_this, void 0, void 0, function () {
            var queryName, query, id, previousData, data, queryData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryName = "delete" + (resource.charAt(0).toUpperCase() + resource.slice(1, -1));
                        query = this.getQuery(queryName);
                        id = params.id, previousData = params.previousData;
                        data = { id: id };
                        if (previousData._version) {
                            data._version = previousData._version;
                        }
                        return [4 /*yield*/, this.graphql(query, { input: data })];
                    case 1:
                        queryData = (_a.sent())[queryName];
                        return [2 /*return*/, {
                                data: queryData,
                            }];
                }
            });
        }); };
        this.deleteMany = function (resource, params) { return __awaiter(_this, void 0, void 0, function () {
            var queryName, query, ids, _i, _a, id, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        queryName = "delete" + (resource.charAt(0).toUpperCase() + resource.slice(1, -1));
                        query = this.getQuery(queryName);
                        ids = [];
                        _i = 0, _a = params.ids;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        id = _a[_i];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.graphql(query, { input: { id: id } })];
                    case 3:
                        _b.sent();
                        ids.push(id);
                        return [3 /*break*/, 5];
                    case 4:
                        e_3 = _b.sent();
                        console.log(e_3);
                        return [3 /*break*/, 5];
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/, {
                            data: ids,
                        }];
                }
            });
        }); };
        var optionsBag = __assign(__assign({}, defaultOptions$1), options);
        this.queries = operations.queries;
        this.mutations = operations.mutations;
        this.authMode = optionsBag.authMode;
    }
    DataProvider.prototype.getQuery = function (queryName) {
        if (this.queries[queryName]) {
            return this.queries[queryName];
        }
        if (this.mutations[queryName]) {
            return this.mutations[queryName];
        }
        console.log("Could not find query " + queryName);
        throw new Error("Data provider error");
    };
    DataProvider.prototype.graphql = function (query, variables
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) {
        return __awaiter(this, void 0, void 0, function () {
            var queryResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, API.graphql({
                            query: query,
                            variables: variables,
                            authMode: this.authMode,
                        })];
                    case 1:
                        queryResult = _a.sent();
                        if (queryResult.errors || !queryResult.data) {
                            throw new Error("Data provider error");
                        }
                        return [2 /*return*/, queryResult.data];
                }
            });
        });
    };
    return DataProvider;
}());

function buildAuthProvider(options) {
    var authProvider = new AuthProvider(options);
    return {
        login: authProvider.login,
        logout: authProvider.logout,
        checkAuth: authProvider.checkAuth,
        checkError: authProvider.checkError,
        getPermissions: authProvider.getPermissions,
    };
}
function buildDataProvider(operations, options) {
    var dataProvider = new DataProvider(operations, options);
    return {
        getList: dataProvider.getList,
        getOne: dataProvider.getOne,
        getMany: dataProvider.getMany,
        getManyReference: dataProvider.getManyReference,
        create: dataProvider.create,
        update: dataProvider.update,
        updateMany: dataProvider.updateMany,
        delete: dataProvider.delete,
        deleteMany: dataProvider.deleteMany,
    };
}

var defaultOptions$2 = {
    authGroups: [],
};
var AmplifyAdmin = function (_a) {
    var children = _a.children, operations = _a.operations, _b = _a.options, options = _b === void 0 ? defaultOptions$2 : _b, propsRest = __rest(_a, ["children", "operations", "options"]);
    var optionsBag = __assign(__assign({}, defaultOptions$2), options);
    var authGroups = optionsBag.authGroups;
    return (React.createElement(Admin, __assign({}, propsRest, { authProvider: buildAuthProvider({ authGroups: authGroups }), dataProvider: buildDataProvider(operations) }), children));
};

// Extracts hash and sort keys from source props
function getKeys(filters) {
    var keys = {};
    for (var _i = 0, filters_1 = filters; _i < filters_1.length; _i++) {
        var filter = filters_1[_i];
        if (filter === null || typeof filter !== "object") {
            throw new Error("AmplifyFilter children are invalid");
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var input = filter;
        if (!input.props || !input.props.source) {
            throw new Error("AmplifyFilter children are invalid");
        }
        var source = input.props.source;
        var sourceSplit = source.split(".");
        // A dot must seperate the query name and the key name
        if (sourceSplit.length < 2) {
            throw new Error("Source " + source + " is not valid because a separation dot is missing");
        }
        var queryName = sourceSplit[0];
        var keyName = sourceSplit[1];
        if (!keys[queryName]) {
            keys[queryName] = {
                hashKey: "",
                sortKey: "",
            };
        }
        // Case when there is only the hash key
        if (sourceSplit.length === 2) {
            if (keys[queryName].hashKey !== "") {
                throw new Error("Source " + source + " is not valid because hash key is already defined by another input");
            }
            keys[queryName].hashKey = keyName;
            continue;
        }
        keys[queryName].sortKey = keyName;
    }
    return keys;
}
var AmplifyFilter = function (_a) {
    var children = _a.children, defaultQuery = _a.defaultQuery, _b = _a.setQuery, setQuery = _b === void 0 ? null : _b, propsRest = __rest(_a, ["children", "defaultQuery", "setQuery"]);
    var filters;
    if (children !== null && typeof children === "object") {
        filters = [children];
    }
    if (Array.isArray(children)) {
        filters = children;
    }
    if (!filters) {
        throw new Error("AmplifyFilter children are invalid");
    }
    // First checks if children source props are well formatted
    var keys = getKeys(filters);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var rest = propsRest;
    var filterValues = rest.filterValues;
    var setFilters = rest.setFilters;
    // Determines which query will be executed depending on the filter
    var query = defaultQuery;
    if (Object.keys(filterValues).length === 1) {
        query = Object.keys(filterValues)[0];
        var filterHashKey = filterValues[query][keys[query].hashKey];
        // Case when filter values do not contain mandatory hash key
        if (!filterHashKey && setFilters) {
            setFilters({});
        }
    }
    // Tells the list component about the query in order to know which fields are sortable
    useEffect(function () {
        setQuery && setQuery(query);
    }, [query, setQuery]);
    function showFilter(queryName) {
        return query === defaultQuery || query === queryName;
    }
    // Checks if filter has a value
    function notBlank(filter) {
        return !!filter.split(".").reduce(function (o, i) { return (!o ? o : o[i]); }, filterValues);
    }
    function renderInput(filter) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var input = filter;
        var source = input.props.source;
        var sourceSplit = source.split(".");
        var queryName = sourceSplit[0];
        if (sourceSplit.length === 2) {
            return showFilter(queryName) && input;
        }
        var hashKeySource = queryName + "." + keys[queryName].hashKey;
        return showFilter(queryName) && notBlank(hashKeySource) && input;
    }
    return React.createElement(Filter$1, __assign({}, rest), filters.map(renderInput));
};

export { AmplifyAdmin, AmplifyFilter, buildAuthProvider, buildDataProvider };
//# sourceMappingURL=index.es.js.map
