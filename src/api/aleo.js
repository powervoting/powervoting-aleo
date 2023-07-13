
/**
 * 连接钱包 返回 账户
 * @constructor
 */
export async function connectWalletPlugin(){
  let account = await window.wallet.features['standard:connect'].connect()
  return account
}

export async function disconnectWalletPlugin(){
  await window.wallet.features[ 'standard:cancelPre'].cancelPre();
  await window.wallet.features['standard:disConnect'].disConnect();
}

/**
 * 钱包是否连接
 */
export function walletConnected() {
  let connected = window.wallet.connected
  return connected
}

export function walletAccount() {
  let accounts = window.wallet.accounts
  return accounts
}

/**
 * 解密record 返回 解密后的数据
 * @param record
 */
export async function decryptRecord(record){
  try {
    let records = [] 
    records.unshift(record)
    let recordData = await window.wallet.features['standard:decrypt'].decrypt(records)
    return recordData.result
  } catch (e) {
    return []
  }
}
export async function transfer(params){
  try {
    let transferRes = await window.wallet.features['standard:transfer'].transfer(params);
    return transferRes;
  } catch (e) {
    return "";
  }
};
export async function sign(params) {
  try {
    let signResult = await window.wallet.features['standard:sign'].sign(params);
    return JSON.parse(signResult);
  } catch (e) {
    return "";
  }
}

export async function queryRecords(params){
  try {
    let signResult = await window.wallet.features['standard:records'].sign(params);
    return JSON.parse(signResult);
  } catch (e) {
    return "";
  }
}
export async function execute(params){
    try{
      let executeRes = await window.wallet.features['standard:execute'].execute(params);
      return executeRes
    }catch(e){
      console.log(e)
    }
}
