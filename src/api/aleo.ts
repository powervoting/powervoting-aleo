import {AccountData, ConnectData, DecryptRecordData, Execute, QueryRecords, RecordData, Sign, Transfer} from "./type";

/**
 * 连接钱包 返回 账户
 * @constructor
 */
export async function connectWalletPlugin(): Promise<ConnectData> {
  // @ts-ignore
  let account = await window.wallet.features['standard:connect'].connect()
  return account
}

/**
 * 钱包是否连接
 */
export function walletConnected() {
  // @ts-ignore
  let connected = window.wallet.connected
  return connected
}

export function walletAccount(): Promise<AccountData> {
  // @ts-ignore
  let accounts = window.wallet.accounts
  return accounts
}

/**
 * 解密record 返回 解密后的数据
 * @param record
 */
export async function decryptRecord(record: string): Promise<DecryptRecordData[]> {
  try {
    let records = [] as string[]
    records.unshift(record)
    // @ts-ignore
    let recordData = await window.wallet.features['standard:decrypt'].decrypt(records)
    return recordData.result
  } catch (e) {
    return [] as DecryptRecordData[]
  }
}
export async function transfer(params: Transfer): Promise<any> {
  try {
    // @ts-ignore
    let transferRes = await window.wallet.features['standard:transfer'].transfer(params);
    return transferRes;
  } catch (e) {
    return "";
  }
};
export async function sign(params: Sign): Promise<any> {
  try {
    // @ts-ignore
    let signResult = await window.wallet.features['standard:sign'].sign(params);
    console.log(signResult);
    return JSON.parse(signResult);
  } catch (e) {
    return "";
  }
}

export async function queryRecords(params: QueryRecords): Promise<any> {
  try {
    // @ts-ignore
    let signResult = await window.wallet.features['standard:records'].sign(params);
    console.log(signResult);
    return JSON.parse(signResult);
  } catch (e) {
    return "";
  }
}
export async function execute(params:Execute):Promise<any>{
    try{
      // @ts-ignore
      let executeRes = await window.wallet.features['standard:execute'].execute(params);
      console.log('executeRes--->',executeRes);
      return JSON.parse(executeRes);
    }catch(e){
      console.log(e)
    }
}
