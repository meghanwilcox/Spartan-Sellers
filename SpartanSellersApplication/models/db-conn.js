"use strict";

const sqlite = require("better-sqlite3");
const path = require("path");
const db = new sqlite(path.join(__dirname, "../.data", "spartanSellersDatabase.db"));

function all(sql, ...params) {
  return db.prepare(sql).all(params);
}

function get(sql, ...params) {
  return db.prepare(sql).get(params);
}

function run(sql, ...params) {
  return db.prepare(sql).run(params[0]);
}

module.exports = {
  all,
  get,
  run,
};
