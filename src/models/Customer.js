class Customer {
    constructor(_id, _name, _age, _purchases = []) {
        this.id = _id;
        this.name = _name;
        this.age = _age;
        this.purchases = _purchases;
    }
}

export default Customer;


