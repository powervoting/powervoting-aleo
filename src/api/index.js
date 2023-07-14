import { execute } from "./aleo";
import { encodeBs58, decodeBs58 } from "@/util";
const programID = "power_voting_v0_2.aleo";
export { execute };

export const createPropose = async ({
  title,
  content,
  options,
  vote_type,
  expieration,
}) => {
  return await execute({
    programID,
    functionName: "propose",
    fee: 1000,
    inputs: [
      [title, "field"],
      [content, "field"],
      [options, "field"],
      [vote_type, "u8"],
      [expieration, "field"],
    ]
      .map(([value, type]) => `${encodeBs58(value)}${type}`)
      .join(" "),
  });
};
const fieldLen = "field".length;
const idUnitLen = "u64".length;
const u8Len = "u8".length;
function parseDetail(str) {
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

export const getList = async () => {
  const mappingName = "proposal_ids";
  const key = "2074281269322187893875field";
  const api = `https://vm.aleo.org/api/testnet3/program/${programID}/mapping/${mappingName}/${key}`;
  const res = await fetch(api).then((res) => res.json());
  const id = +res.slice(0, -idUnitLen);
  const ids = Array.from({ length: id + 1 }, (_, i) => i);
  const details = await Promise.all(
    ids.map(
      (id) =>
        new Promise((r) => {
          getDetail(id).then((detail) => r({ detail, id }));
        })
    )
  );
  const filterDetails = details
    .filter((v) => Boolean(v.detail))
    .map((v) => {
      return {
        ...parseDetail(v.detail),
        id,
      };
    });
  return filterDetails;
};

export const getDetail = async (id) => {
  const mappingName = "proposals";
  const key = `${id}u64`;
  const api = `https://vm.aleo.org/api/testnet3/program/${programID}/mapping/${mappingName}/${key}`;
  return await fetch(api).then((res) => res.json());
};
