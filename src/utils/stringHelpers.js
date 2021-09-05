export const formatAccountAddress = (account) => {
  if (account !== undefined && account !== "0x0") {
    var strLen = account.length;
    return `${account.substr(0, 6)}...${account.substr(strLen - 4, strLen - 1)}`
  } else {
    return "";
  }
}

export const formatTxAddress = (account) => {
  if (account !== undefined && account !== "0x0") {
    var strLen = account.length;
    return `${account.substr(0, 10)}...${account.substr(strLen - 10, strLen - 1)}`
  } else {
    return "";
  }
}