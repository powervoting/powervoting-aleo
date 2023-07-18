import { execute } from "./aleo";
import {
  encodeBs58,
  idUnitLen,
  parseDetail,
  host,
  programID,
  parseStatus,
} from "@/util";
import { pollList, originPollList, pollOrigin } from "@/api/mock";

const isMock = () => globalThis?.location?.search?.includes("mock=1");

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
    // fee: 10000,
    inputs: [
      [title, "field"],
      [content, "field"],
      [options, "field"],
      [vote_type, "u8"],
      [expieration, "field"],
    ]
      .map(([value, type]) => `${encodeBs58(value)}${type}`)
      .join("&&"),
  });
};

export const getList = async () => {
  // console.log("isMock", isMock());
  // if (isMock()) {
  //   console.log("mock", originPollList, pollList);
  //   console.log("----");
  //   return pollList;
  // }
  const mappingName = "proposal_ids";
  const key = "2074281269322187893875field";
  const api = `${host}/${programID}/mapping/${mappingName}/${key}`;
  const res = await fetch(api).then((res) => res.json());
  const id = +res.slice(0, -idUnitLen);
  const ids = Array.from({ length: id }, (_, i) => i);
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
  // 获取状态信息
  const finalDetails = await Promise.all(
    filterDetails.map((item) => {
      return new Promise((r) => {
        parseStatus(item.expiration, item.id).then((status) =>
          r({ ...item, status })
        );
      });
    })
  );
  // console.log({ finalDetails });
  return finalDetails;
};
getList();

export const getDetail = async (id) => {
  const mappingName = "proposals";
  const key = `${id}u64`;
  const api = `${host}/${programID}/mapping/${mappingName}/${key}`;
  return await fetch(api).then((res) => res.json());
};

export const getParsedDetail = async (id) => {
  const res = await getDetail(id);
  return isMock() ? parseDetail(pollOrigin) : parseDetail(res);
};
