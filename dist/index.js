var Maybe = (function() {
  function Maybe(value) {
    if (value === void 0) {
      value = null;
    }
    this.value = value;
  }
  Maybe.none = function() {
    return new Maybe(null);
  };
  Maybe.fromValue = function(value) {
    return value ? Maybe.some(value) : Maybe.none();
  };
  Maybe.some = function(value) {
    if (!value) {
      throw Error("Provided value must not be empty");
    }
    return new Maybe(value);
  };
  Maybe.prototype.getOrElse = function(defaultValue) {
    return this.value === null ? defaultValue : this.value;
  };
  return Maybe;
})();
exports.Maybe = Maybe;
