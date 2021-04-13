const boolArray = [true, false, "true", "false", "yes", "no", "1", "0", 1, 0];

export function isBoolean(arg: string | number | boolean) {
  if (boolArray.indexOf(arg) === -1) {
    return false;
  } else {
    return true;
  }
}
export function boolify(arg: string | number | boolean, falseIfNull = false) {
  if (boolArray.indexOf(arg) === -1) {
    return falseIfNull ? false : null;
  } else {
    return arg === true ||
      arg === "true" ||
      arg === "yes" ||
      arg === "1" ||
      arg === 1
      ? true
      : false;
  }
}
