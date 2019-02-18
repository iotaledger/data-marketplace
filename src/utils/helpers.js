import FileSaver from 'file-saver';

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

export const getSensorStreamJSON = async (sensorId, stream) => {
  const blob = new Blob([JSON.stringify(stream, null, 2)], {type : 'application/json'});
  FileSaver.saveAs(blob, `${sensorId}-data.json`);
};