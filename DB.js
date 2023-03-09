const fs = require(`fs`);
const path = `db`;

class DB {
    constructor(name) {
        this.name = name;
        this.path = `${path}/${name}.json`;
    }
    create = (jsonData) => {
        this.save(jsonData)
    }
    save = (list) => {
        fs.writeFileSync(this.path, JSON.stringify(list));
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
    updateItem = (updatedItem, itemId) => {
        const newList = this.getFilteredList((item) => item.id != itemId)
        newList.push(updatedItem)
        this.save(newList)
    }
    deleteItemById = (itemId) => this.save(this.getFilteredList((item) => item.id != itemId))
    
    getFilteredList = (filterCallback) => {
        const list = this.get()
        return list.filter(filterCallback)
    }
};

module.exports = {
    DB
};