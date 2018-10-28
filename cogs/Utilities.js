const query = (queryText, db, func) => {
    const querySelect = {
      text: queryText,
      rowMode: "array"
    };  
    db.query(querySelect, (err, result) => {
        if(err) {
          console.log(err);
        } else {
          func(result);
        }
    });
}

const queryInsert = (queryText, queryArgs, db, channel) => {
  db.query(
    queryText,
    queryArgs,
    err => {
      if (err) {
        console.log(err);
        channel.send("Could not update entry.");
      } else {
        channel.send("Updated entry!");
      }
    }
  );
} 

const queryCreate = (tableName, tableArgs, db) => {
  db.query(
    "CREATE TABLE IF NOT EXISTS " 
    + tableName 
    +  "(" + tableArgs + ")",
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
};

const isValidDate = text => {
  var t = text.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

  if (t !== null) {
    var m = +t[1],
      d = +t[2],
      y = +t[3];
    var date = new Date(y, m - 1, d);

    return date.getFullYear() === y && date.getMonth() === m - 1;
  }

  return false;
};

const randomGrab = array => {
  return array[Math.floor(Math.random() * array.length)];
};

module.exports = {
    query,
    queryInsert,
    queryCreate,
    isValidDate,
    randomGrab
}