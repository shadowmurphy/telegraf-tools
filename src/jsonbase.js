const fs = require('fs');

class JsonBase {
  constructor(filename, defaultValue, dirpath = "database") {
    this.dirpath = dirpath;
    defaultValue = JSON.parse(JSON.stringify(defaultValue));
    this.pathfile = `${this.dirpath}/${filename}.json`;

    if (!fs.existsSync(this.dirpath)) {
      fs.mkdirSync(this.dirpath);
    }

    if (this.exists()) {
      this.read();
      let hasChanges = false;
      for (const key in defaultValue) {
        if (this.body[key] === undefined) {
          this.body[key] = defaultValue[key];
          hasChanges = true;
        }
      }
      if (hasChanges) this.save();
    } else {
      this.body = defaultValue;
      this.save();
    }
  }

  exists() {
    return fs.existsSync(this.pathfile);
  }

  read() {
    this.body = JSON.parse(fs.readFileSync(this.pathfile, { encoding: 'utf-8' }));
  }

  save() {
    fs.writeFileSync(this.pathfile, JSON.stringify(this.body, null, 4));
  }

  deleteFile() {
    fs.unlinkSync(this.pathfile);
  }

  copy(filename) {
    return new JsonBase(filename, this.body, this.dirpath);
  }

  transfer(filename) {
    this.deleteFile();
    return this.copy(filename);
  }
}


class User {
    constructor(from, database, dop_data) {
      this.user = from;
      const additionalData = dop_data();
      for (const key in additionalData) {
        if (!this.user[key]) this.user[key] = additionalData[key];
      }
      this.database = database;
      this.unpack();
    }
  
    edit(key, value) {
      this.user[key] = value;
      this.unpack();
      this.save();
    }
  
    unpack() {
      for (const key in this.user) {
        this[key] = this.user[key];
      }
    }
  
    save() {
      this.database.save();
    }
  }
  
  class Users {
    constructor(dop_data) {
      this.users = new JsonBase("users", {}, './database');
      this.dop_data = dop_data;
    }
  
    get(from, needCreate) {
      let user = this.users.body[from.id];
      if (!user && needCreate) {
        user = new User(from, this.users, this.dop_data);
        this.users.body[user.id] = user.user;
        this.save();
      }
      return this.users.body[from.id]
        ? new User(this.users.body[from.id], this.users, this.dop_data)
        : false;
    }
  
    save() {
      this.users.save();
    }
  
    getArray() {
      let array = [];
      for (const id in this.users.body) {
        array.push(this.users.body[id]);
      }
      return array;
    }
  }
  
  module.exports = () => ({ JsonBase, User, Users });