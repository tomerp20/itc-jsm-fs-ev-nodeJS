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
    addItem = (info) => {
        const content = this.get();
        const newItem = {
            ...info,
            id:content[content.length-1].id+1
        };
        content.push(newItem);
        this.create(content);
        return newItem;
    }
    getItemById = (id) => {
        const list = this.get();
        const item = list.find(item => id == item.id);
        return item;
    }
};

module.exports = {
    DB
};