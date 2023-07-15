import bs58 from "bs58";
import dayjs from "dayjs";

const CHAR_MAP =
  "123456789" + "ABCDEFGHJKLMNPQRSTUVWXYZ" + "abcdefghijkmnopqrstuvwxyz";
export const host = "https://vm.aleo.org/api/testnet3/program";
export const programID = "power_voting_v0_2.aleo";

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

export const fieldLen = "field".length;
export const idUnitLen = "u64".length;
export const u8Len = "u8".length;

export function parseDetail(str) {
  const title = str.match(/title:\s*([\w\d]*)/)?.[1];
  const content = str.match(/content:\s*([\w\d]*)/)?.[1];
  const options = str.match(/options:\s*([\w\d]*)/)?.[1];
  const voteType = str.match(/vote_type:\s*([\w\d]*)/)?.[1];
  const expiration = str.match(/expieration:\s*([\w\d]*)/)?.[1];
  return {
    title: decodeBs58(title?.slice(0, -fieldLen)),
    content: decodeBs58(content?.slice(0, -fieldLen)),
    options: decodeBs58(options?.slice(0, -fieldLen)),
    voteType: decodeBs58(voteType?.slice(0, -u8Len)),
    expiration: decodeBs58(expiration?.slice(0, -fieldLen)),
  };
}

export async function parseStatus(expiration, id) {
  console.log(dayjs(expiration).isValid());
  const now = dayjs();
  const exp = dayjs(expiration);

  let status = "mint";
  if (now.isAfter(exp)) {
    // expired
  }
  const counts = await fetch(`${host}/${programID}/mapping/counts/id`).then(
    (res) => res.json()
  );
}
