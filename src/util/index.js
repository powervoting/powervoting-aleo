import bs58 from 'bs58'

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

export const encodeBs58 = (str) => {
  return bs58.encode(new TextEncoder().encode(str))
}