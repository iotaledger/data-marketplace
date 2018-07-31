export const reducer = amount => {
  if (amount < Math.pow(10, 3)) {
    const num = amount;
    if (num % 1 !== 0) return num.toFixed(2) + 'i';
    return num + 'i';
  } else if (amount < Math.pow(10, 6)) {
    const num = amount / Math.pow(10, 3);
    if (num % 1 !== 0) return num.toFixed(2) + 'Ki';
    return num + 'Ki';
  } else if (amount < Math.pow(10, 9)) {
    const num = amount / Math.pow(10, 6);
    if (num % 1 !== 0) return num.toFixed(2) + 'Mi';
    return num + 'Mi';
  } else if (amount < Math.pow(10, 12)) {
    const num = amount / Math.pow(10, 9);
    if (num % 1 !== 0) return num.toFixed(2) + 'Gi';
    return num + 'Gi';
  } else if (amount < Math.pow(10, 15)) {
    const num = amount / Math.pow(10, 12);
    if (num % 1 !== 0) return num.toFixed(2) + 'Ti';
    return num + 'Ti';
  }
};

export const generateSeed = length => {
  if (window.crypto && window.crypto.getRandomValues) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9';
    let result = '';
    let values = new Uint32Array(length);
    window.crypto.getRandomValues(values);
    values.forEach(value => (result += charset[value % charset.length]));
    return result;
  } else {
    console.error('generateSeed error');
    throw new Error("Your browser is outdated and can't generate secure random numbers");
  }
};
