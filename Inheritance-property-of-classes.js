class Human{
    constructor(){
        this.gender= 'Female';
    }
    printMyGender(){
        console.log(this.gender);
    }
}
class Person extends Human{ //Person class is extended to Human class.Now,Person class have Human class properties and methods.
    constructor(){
        super(); //executes parent constructors
        this.name= 'Gokce';
    }
    printMyName(){
        console.log(this.name);
    }
}
const person= new Person();
person.printMyName()
person.printMyGender()