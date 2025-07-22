class Greeter{
    constructor(name){
        this.name=name;
    }
    greet(){
        return `Hi, ${this.name}!`;
    }
    farewell(){
        return `Goodbye, ${this.name}!`;
    }
}
module.exports=Greeter;