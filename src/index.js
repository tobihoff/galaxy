const romanToDecimal = {
  M: 1000,
  D: 500,
  C: 100,
  L: 50,
  X: 10,
  V: 5,
  I: 1
};

function isValidRomanNumber(romanNumber) {
  return (
    !romanNumber.match(/[^IVXLCDM]/g) &&
    !romanNumber.match(/V{2,}|L{2,}|D{2,}/g) &&
    !romanNumber.match(/(I|C|M|X){4,}/g)
  );
}

function convertToDecimalNumber(romanNumber) {
  const romanChars = romanNumber.split("");

  let decimalNumber = 0;
  for (let index = 0; index < romanChars.length; index++) {
    const romanChar = romanChars[index];
    const nextRomanChar = romanChars[index + 1];

    if (romanChar === "I") {
      if (nextRomanChar === "V" || nextRomanChar === "X") {
        decimalNumber +=
          romanToDecimal[nextRomanChar] - romanToDecimal[romanChar];
        index++; // Skip next char
      } else {
        decimalNumber += romanToDecimal[romanChar];
      }
    }

    if (romanChar === "X") {
      if (nextRomanChar === "L" || nextRomanChar === "C") {
        decimalNumber +=
          romanToDecimal[nextRomanChar] - romanToDecimal[romanChar];
        index++; // Skip next char
      } else {
        decimalNumber += romanToDecimal[romanChar];
      }
    }

    if (romanChar === "C") {
      if (nextRomanChar === "D" || nextRomanChar === "M") {
        decimalNumber +=
          romanToDecimal[nextRomanChar] - romanToDecimal[romanChar];
        index++; // Skip next char
      } else {
        decimalNumber += romanToDecimal[romanChar];
      }
    }

    if (
      romanChar === "V" ||
      romanChar === "L" ||
      romanChar === "D" ||
      romanChar === "M"
    ) {
      decimalNumber += romanToDecimal[romanChar];
    }
  }

  return decimalNumber;
}

const romanNumber = process.argv[2];
if (!isValidRomanNumber(romanNumber)) {
  throw new Error(`${romanNumber} is not valid`);
}

const decimalNumber = convertToDecimalNumber(romanNumber);
console.log(`${romanNumber} is ${decimalNumber}`);
