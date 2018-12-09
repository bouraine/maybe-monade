export const isNullOrUndefined = (value: any): boolean => {
  return value === null || typeof value === "undefined";
};

export const ErrorMessages = {
  emptyValue: "Provided value must not be empty",
  emptyCallback: "Provided value must be a function",
  getEmptyValue: "You try to access an empty value"
};
