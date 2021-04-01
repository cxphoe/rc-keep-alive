export const getElementId = (suffix: string) => {
  return `keepalive-${suffix}`;
};

export const randomString = (len: number) => {
  const t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz012345678-_+=.';
  const a = t.length;
  let res = '';
  for (let i = 0; i < len; i++) {
    res += t.charAt(Math.floor(Math.random() * a));
  }
  return res;
};

export const getNodeId = () => {
  const rs = randomString(8);
  return rs;
};

export const getNodeName = (suffix: string) => {
  return `keepalive-${suffix}`;
};
