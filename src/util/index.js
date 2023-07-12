export const formatDollar = (value) => {
  const v = Number(value);
  if (Number.isNaN(v)) {
    return value;
  } else {
    return Intl.NumberFormat("en-US", {
      // style: 'currency',
      // currency: 'USD',
      // maximumSignificantDigits: 3,
      notation: "standard",
    }).format(v);
  }
};

export const shortAddress = (address) => {
  return (
    `${address}`.slice(0, 6) +
    "..." +
    `${address}`.slice(`${address}`.length - 4)
  );
};

export const optionSeparator = `-&&&&&-`

export const pollTypes = [
  {
    label: 'Single Answer',
    value: 0
  },
  {
    label: 'Multiple Answers',
    value: 1
  }
]

// export const encodeBs58 = (str) => {
//   return bs58.encode(new TextEncoder().encode(str))
// }
export function encodeBs58(input) {
  let decodedInt = BigInt(0);
  const int256 = BigInt(256);
  for (let i = 0; i < input.length; i++) {
    const b = BigInt(input.charCodeAt(i));
    decodedInt *= int256;
    decodedInt += b;
  }
  return decodedInt.toString();
}

export function decodeBs58(encodedString) {
  const n = +encodedString;
  const int256 = BigInt(256);
  let decodedString = "";
  let decodedInt = BigInt(n);

  while (decodedInt > 0n) {
    const remainder = decodedInt % int256;
    const char = String.fromCharCode(Number(remainder));
    decodedString = char + decodedString;
    decodedInt = (decodedInt - remainder) / int256;
  }

  return decodedString;
}