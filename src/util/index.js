import bs58 from "bs58";

const CHAR_MAP =
  "123456789" + "ABCDEFGHJKLMNPQRSTUVWXYZ" + "abcdefghijkmnopqrstuvwxyz";

export const encodeBs58 = (str) => {
  const base58str = stringToBase58(str);
  const int = base58ToInt(base58str);
  return int;
};
export const decodeBs58 = (int) => {
  const bs58str = intToBase58(BigInt(int));
  const str = base58ToString(bs58str);
  return str;
};
// console.log(
//   "decodeBs58->",
//   decodeBs58("334293052093172934233615438351426228415456219217055")
// );
// console.log("encodeBs58->", encodeBs58("今天下雨了么？"));
function intToBase58(int) {
  let base58 = "";
  while (int > 0n) {
    const remainder = Number(int % 58n);
    base58 = CHAR_MAP[remainder] + base58;
    int = int / 58n;
  }
  return base58;
}

function base58ToInt(base58) {
  // here some error
  return base58
    .split("")
    .reverse()
    .reduce(
      (v, a, i) => v + BigInt(CHAR_MAP.indexOf(a)) * 58n ** BigInt(i),
      BigInt(0)
    )
    .toString();
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
