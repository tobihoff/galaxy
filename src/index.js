"use strict";

const romanToDecimal = [
  {
    id: "I",
    value: 1
  },
  {
    id: "V",
    value: 5
  },
  {
    id: "X",
    value: 10
  },
  {
    id: "L",
    value: 50
  },
  {
    id: "C",
    value: 100
  },
  {
    id: "D",
    value: 500
  },
  {
    id: "M",
    value: 1000
  }
];

function declareValue(str) {
  let newArray = str.split("");
  let newObject = new Object();
  newObject = newArray.map(value => {
    const container = {};
    container.id = value;
    container.value = "";
    return container;
  });
  const assignValue = newObject.map(int =>
    romanToDecimal.find(int2 => int.id === int2.id)
  );
  return assignValue;
}

//Check if the string corresponds to the specifications and does not contain unknown values.
function checkValidation(str) {
  if (
    str.match(/[^IVXLCDM]/g) ||
    (str.match(/V{2,}|L{2,}|D{2,}/g) && !str.match(/(I|C|M|X){2,3}/g))
  ) {
    return false;
  }
  return createObject(str);
}

//Data structure is manipulated for an object.
function createObject(str) {
  let newArray = str.split("");
  let newObject = new Object();
  newObject = newArray.map(value => {
    const container = {};
    container.id = value;
    container.value = "";
    return container;
  });
  const assignValue = newObject.map(int =>
    romanToDecimal.find(int2 => int.id === int2.id)
  );
  return respectRules(assignValue);
}

//The array must be manipulated and put in the right order to add the operators in the next step.
function respectRules(str) {
  const prepareOrder = str.map(string => string.id);

  function swap(arr, index1, index2) {
    [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
    return arr;
  }

  if (
    prepareOrder.find(
      element =>
        element === "I" &&
        prepareOrder.indexOf("I") < prepareOrder.indexOf("V" || "X")
    )
  )
    swap(
      prepareOrder,
      prepareOrder.indexOf("I"),
      prepareOrder.indexOf("V" || "X")
    );
  if (
    prepareOrder.find(
      element =>
        element === "X" &&
        prepareOrder.indexOf("X") < prepareOrder.indexOf("L" || "C")
    )
  )
    swap(
      prepareOrder,
      prepareOrder.indexOf("X"),
      prepareOrder.indexOf("L" || "C")
    );
  if (
    prepareOrder.find(
      element =>
        element === "C" &&
        prepareOrder.indexOf("C") < prepareOrder.indexOf("D" || "M")
    )
  )
    swap(
      prepareOrder,
      prepareOrder.indexOf("C"),
      prepareOrder.indexOf("D" || "M")
    );

  const getString = prepareOrder.join().replace(/,/g, "");
  const getValue = declareValue(getString);
  return addOperators(getValue);
}

//The necessary operators must be added to the array. The index is compared to include the rules.
function addOperators(str) {
  const symbols = str.map(id => id.id);
  const values = str.map(value => value.value);
  console.log(symbols);

  if (
    symbols.indexOf("I") > symbols.indexOf("V" || "X") &&
    symbols.includes("V" || "X")
  )
    values.splice(values.indexOf(1), 0, "-");
  else values.splice(values.indexOf(1), 0, "+");

  if (
    symbols.indexOf("X") > symbols.indexOf("L" || "C") &&
    symbols.includes("L" || "C")
  )
    values.splice(values.indexOf(10), 0, "-");
  else values.splice(values.indexOf(10), 0, "+");

  if (
    symbols.indexOf("C") > symbols.indexOf("D" || "M") &&
    symbols.includes("D" || "M")
  )
    values.splice(values.indexOf(100), 0, "-");
  else values.splice(values.indexOf(100), 0, "+");

  if (symbols.filter(element => element === "V"))
    values.splice(values.indexOf(5), 0, "+");

  if (symbols.filter(element => element === "L"))
    values.splice(values.indexOf(50), 0, "+");

  if (symbols.filter(element => element === "D"))
    values.splice(values.indexOf(500), 0, "+");

  if (symbols.filter(element => element === "M"))
    values.splice(values.indexOf(1000), 0, "+");

  return calculation(values);
}

function calculation(str) {
  const result = str.join().replace(/,/g, "");
  return console.log(eval(result));
}

let y = "MCMIII";
const test = checkValidation(y);
