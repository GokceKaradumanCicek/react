class Human{
    gender= 'Female';//Property in not in the constructor() function but works as in constructor function
    printMyGender=()=>{ //Using arrow function as method
        console.log(this.gender);
    }
}
class Person extends Human{ //Person class is extended to Human class.Now,Person class have Human class properties and methods.  
    name= 'Gokce';
    printMyName=()=>{
        console.log(this.name);
    }
}
const person= new Person();
person.printMyName()
person.printMyGender()