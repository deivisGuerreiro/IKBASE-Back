const pg = require("pg")

/*const client = new pg.Client({
  user: 'dilsinho',
  host: '69.171.4.30',
  database:'talentos1',
  password:'talentos2019',
  port:5432,
})*/
const client = new pg.Client({
  user: 'dilsinho',
  host: '69.171.4.30',
  database:'talentos1',
  password:'talentos2019',
  port:5432,
})
client.connect()

module.exports = client