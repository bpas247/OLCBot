import Cog from './cog';
const startDate = new Date();

export const calculateTimeDist = (startDate: Date, endDate: Date) => {
  var out = [];

  var difference: number = Math.abs(Number(startDate) - Number(endDate));

  out.push(Math.floor(difference / (1000 * 60 * 60 * 24)));

  difference -= out[0] * 1000 * 60 * 60 * 24;

  out.push(Math.floor(difference / (1000 * 60 * 60)));

  difference -= out[1] * 1000 * 60 * 60;

  out.push(Math.floor(difference / (1000 * 60)));

  difference -= out[2] * 1000 * 60;

  out.push(Math.floor(difference / 1000));

  return out;
};

export const alive = (startDate: Date, endDate: Date) => {
  const timeDist = calculateTimeDist(startDate, endDate);

  const labels = ['days', 'hours', 'minutes', 'seconds'];

  var out = 'I have been alive for: \n';

  for (var i = 0; i < labels.length; i++) {
    out += timeDist[i] + ' ' + labels[i];
    if (i !== labels.length - 1) {
      out += ', ';
    }
  }

  return out;
};

const AliveCog = new Cog(
  "alive",
  () => alive(startDate, new Date()),
  "How long have I been alive for?"
);

export default AliveCog;

