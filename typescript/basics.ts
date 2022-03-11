let hobbies: string[];
hobbies=['gokce', 'karaduman', 'cicek'];
let person: {
    name:string,
    age:number,
    married: boolean
}[]
person=[
    {
    name:'gokce',
    age: 29,
    married:true
    },
    {
    name:'cicek',
    age: 28,
    married:false
    }
]

let union:string|number;
union='gokce';
union=28

//Generics
function begin<T>(array: T[], value:T){
    const newArray=[value, ...array];
    return newArray;
}
const fullofNumber=begin([1,2,3,4], -1);
const fullOfString=begin(['a', 'b', 'c'], 'd')