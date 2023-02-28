const fs = require(`fs`);
const path = `db`;

class DB {
    constructor(name) {
        this.name = name;
        this.path = `${path}/${name}.json`;
    }
    create = (jsonData) => {
        fs.writeFileSync(this.path, JSON.stringify(jsonData));
    }
    get = () => {
        const content = fs.readFileSync(this.path, `utf-8`);
        return JSON.parse(content);
    }
    addItem (newItem) {
        const content = this.get();
        content.push(newItem)
        this.create(content)
    }
};

module.exports = {
    DB
}