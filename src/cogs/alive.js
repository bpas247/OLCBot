const calculateTimeDist = (startDate, endDate) => {
  var out = [];

  var difference = Math.abs(startDate - endDate);

  out.push(Math.floor(difference / (1000 * 60 * 60 * 24)));

  difference -= out[0] * 1000 * 60 * 60 * 24;

  out.push(Math.floor(difference / (1000 * 60 * 60)));

  difference -= out[1] * 1000 * 60 * 60;

  out.push(Math.floor(difference / (1000 * 60)));

  difference -= out[2] * 1000 * 60;

  out.push(Math.floor(difference / 1000));

  return out;
};

const alive = (startDate, endDate) => {
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

module.exports = {
  alive,
  calculateTimeDist
};
