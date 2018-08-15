"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Maybe = (function () {
    function Maybe(value) {
        this.value = value;
    }
    Maybe.none = function () {
        return new Maybe(null);
    };
    Maybe.fromValue = function (value) {
        return value ? Maybe.some(value) : Maybe.none();
    };
    Maybe.some = function (value) {
        if (!value) {
            throw Error("Provided value must not be empty");
        }
        return new Maybe(value);
    };
    Maybe.prototype.getOrElse = function (defaultValue) {
        return this.value === null ? defaultValue : this.value;
    };
    Maybe.prototype.isEmpty = function () {
        return this.value === null;
    };
    return Maybe;
}());
exports.Maybe = Maybe;
