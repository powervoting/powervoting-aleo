import bs58 from "bs58";
// import "buffer";
const CHAR_MAP =
  "123456789" + "ABCDEFGHJKLMNPQRSTUVWXYZ" + "abcdefghijkmnopqrstuvwxyz";
export const encodeBs58 = (str) => {
  const base58str = stringToBase58(str);
  // console.log("base58str->", base58str)
  const int = base58ToInt(base58str);
  return int;
};
export const decodeBs58 = (int) => {
  const bs58str = intToBase58(BigInt(int));
  const str = base58ToString(bs58str);
  return str;
};
console.log('decodeBs58->', decodeBs58('334293052093172934233615438351426228415456219217055'))
console.log('encodeBs58->', encodeBs58('今天下雨了么？'))
function intToBase58(int) {
  let base58 = '';
  while (int > 0n) {
    const remainder = Number(int % 58n);
    base58 = CHAR_MAP[remainder] + base58;
    int = int / 58n;
  }
  return base58;
}

function base58ToInt(base58) {
  // here some error
  const bytes = bs58.decode(base58);
  let int = 0n;
  for (let i = 0; i < bytes.length; i++) {
    int = int * 58n + BigInt(bytes[i]);
  }
  return int.toString();
}

function base58ToString(base58) {
  const bytes = bs58.decode(base58);
  return new TextDecoder().decode(bytes);
}

function stringToBase58(str) {
  const bytes = new TextEncoder().encode(str);
  return bs58.encode(bytes);
}

// 今天下雨了么？-> base58string encode-> F4n5FmCWFukqSPjZZ47S1RKpq9kLe
// F4n5FmCWFukqSPjZZ47S1RKpq9kLe -> base58int encode -> 334293052093172934233615438351426228415456219217055

//334293052093172934233615438351426228415456219217055 ->base58int decode -> F4n5FmCWFukqSPjZZ47S1RKpq9kLe
// F4n5FmCWFukqSPjZZ47S1RKpq9kLe -> base58string decode -> 今天下雨了么？



// export function encodeBs58(input) {
//   let decodedInt = BigInt(0);
//   const int256 = BigInt(256);
//   for (let i = 0; i < input.length; i++) {
//     const b = BigInt(input.charCodeAt(i));
//     decodedInt *= int256;
//     decodedInt += b;
//   }
//   return decodedInt.toString();
// }

// export function decodeBs58(input) {
//   const decodedInt = BigInt(input);
//   const int256 = BigInt(256);
//   let remaining = decodedInt;
//   const result = [];
//   while (remaining > 0) {
//     const byte = Number(remaining % int256);
//     result.unshift(byte);
//     remaining = (remaining - BigInt(byte)) / int256;
//   }
//   return new Uint8Array(result);
// }

// const CHAR_MAP =
//   "123456789" + "ABCDEFGHJKLMNPQRSTUVWXYZ" + "abcdefghijkmnopqrstuvwxyz";

// const width = BigInt(58);

// export function encodeBs58(in_str) {
//   // return in_str.split('')
//   //   .reduce((v, a, i) => v + BigInt(CHAR_MAP.indexOf(a)) * (width ** i), BigInt(0))
//   return (in_str + "")
//     .split("")
//     .reduce(
//       (v, a, i) => v + BigInt(CHAR_MAP.indexOf(a)) * width ** BigInt(i),
//       BigInt(0)
//     );
// }

// export function decodeBs58(in_str) {
//   let out = "";
//   let input = BigInt(in_str);
//   while (input) {
//     out = CHAR_MAP[input % width] + out;
//     input /= width;
//   }
//   return out;
// }

export const formatDollar = (value) => {
  const v = Number(value);
  if (Number.isNaN(v)) {
    return value;
  } else {
    return Intl.NumberFormat("en-US", {
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

export const optionSeparator = `-&&&&&-`;

export const pollTypes = [
  {
    label: "Single Answer",
    value: 0,
  },
  {
    label: "Multiple Answers",
    value: 1,
  },
];
