import { parseDetail } from "@/util";

export const pollOrigin =
  "{\n title: 19925418620894726171112980744327677990056609field,\n content: 4219155622620297605793field,\n options: 5100646169157899646708593107459609121230469259field,\n vote_type: 48u8,\n expieration: 66711648213557050627541067457638315056field\n}";

export const originPollList = [pollOrigin];
export const pollList = originPollList.map((v, i) => ({
  ...parseDetail(v),
  id: i + 1,
}));
