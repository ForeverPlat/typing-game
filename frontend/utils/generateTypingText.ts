const jsText = [
    "\const greet = (name) => {\n" +
    "\t\tif (!name) {\n" +
    "\t\t\treturn \"No name provided\";\n" +
    "\t\t}\n\n" +
    "\t\tconst msg = `Hello, ${name}!`;\n" +
    "\t\tconsole.log(msg);\n" +
    "\t\treturn msg;\n" +
    "\t}\n" +
    "\tgreet(\"Ava\");\n",

    "\const sum = (a, b) => {\n" +
    "\t\tif (typeof a !== 'number' || typeof b !== 'number') {\n" +
    "\t\t\treturn 'Invalid input';\n" +
    "\t\t}\n\n" +
    "\t\tconst result = a + b;\n" +
    "\t\tconsole.log(result);\n" +
    "\t\treturn result;\n" +
    "\t}\n" +
    "\tsum(3, 7);\n",

    "\function fetchData(url) {\n" +
    "\t\treturn fetch(url)\n" +
    "\t\t\t.then(res => res.json())\n" +
    "\t\t\t.then(data => {\n" +
    "\t\t\t\tconsole.log(data);\n" +
    "\t\t\t\treturn data;\n" +
    "\t\t\t});\n" +
    "\t}\n" +
    "\tfetchData('/api/user');\n",

    "\class User {\n" +
    "\t\tconstructor(name) {\n" +
    "\t\t\tthis.name = name;\n" +
    "\t\t}\n\n" +
    "\t\tsayHi() {\n" +
    "\t\t\tconsole.log(`Hi, I'm ${this.name}`);\n" +
    "\t\t}\n" +
    "\t}\n" +
    "\tnew User('Mia').sayHi();\n",

    "\const nums = [1,2,3,4];\n" +
    "\t\tconst doubled = nums.map(n => n * 2);\n" +
    "\t\tconsole.log(doubled);\n" +
    "\t\tconsole.log('Done');\n",

    "\let counter = 0;\n" +
    "\t\tconst inc = () => {\n" +
    "\t\t\tcounter++;\n" +
    "\t\t\tconsole.log(counter);\n" +
    "\t\t}\n" +
    "\tinc(); inc();\n",

    "\const isEven = (n) => {\n" +
    "\t\tif (n % 2 === 0) return true;\n" +
    "\t\treturn false;\n" +
    "\t}\n" +
    "\tconsole.log(isEven(5));\n",

    "\const person = {name:'Lily', age:22};\n" +
    "\t\tfor (const key in person) {\n" +
    "\t\t\tconsole.log(key, person[key]);\n" +
    "\t\t}\n",

    "\async function wait(ms){\n" +
    "\t\treturn new Promise(r => setTimeout(r, ms));\n" +
    "\t}\n\n" +
    "\tawait wait(500);\n" +
    "\tconsole.log('Done');\n",

    "\const items = ['a','b','c'];\n" +
    "\t\titems.forEach(i => console.log(i));\n" +
    "\t\tconsole.log('Listed');\n",

    "\try {\n" +
    "\t\tJSON.parse('{broken json');\n" +
    "\t} catch (err) {\n" +
    "\t\tconsole.error('Error:', err.message);\n" +
    "\t}\n",

    "\function factorial(n) {\n" +
    "\t\tif (n <= 1) return 1;\n" +
    "\t\treturn n * factorial(n - 1);\n" +
    "\t}\n" +
    "\tconsole.log(factorial(5));\n",

    "\const obj = {a:1,b:2};\n" +
    "\t\tconst {a,b} = obj;\n" +
    "\t\tconsole.log(a+b);\n",

    "\const greetUser = (user='Guest') => {\n" +
    "\t\tconsole.log(`Welcome ${user}`);\n" +
    "\t\treturn user;\n" +
    "\t}\n" +
    "\tgreetUser();\n",

    "\const addUnique = (set,val) => {\n" +
    "\t\tif (!set.has(val)) set.add(val);\n" +
    "\t\tconsole.log(set);\n" +
    "\t}\n" +
    "\taddUnique(new Set(),3);\n",

    "\const rand = () => Math.floor(Math.random()*10);\n" +
    "\t\tconsole.log(rand());\n" +
    "\t\tconsole.log(rand());\n",

    "\const logProps = (obj) => {\n" +
    "\t\tObject.entries(obj).forEach(([k,v]) => {\n" +
    "\t\t\tconsole.log(k,v);\n" +
    "\t\t});\n" +
    "\t}\n" +
    "\tlogProps({x:1,y:2});\n",

    "\const reverse = str => {\n" +
    "\t\treturn str.split('').reverse().join('');\n" +
    "\t}\n" +
    "\tconsole.log(reverse('code'));\n",

    "\let x = 10;\n" +
    "\t\twhile (x > 7) {\n" +
    "\t\t\tconsole.log(x--);\n" +
    "\t\t}\n",

    "\const apiCall = async() => {\n" +
    "\t\ttry {\n" +
    "\t\t\tconst res = await fetch('/data');\n" +
    "\t\t\treturn await res.json();\n" +
    "\t\t} catch(e) {\n" +
    "\t\t\tconsole.error(e);\n" +
    "\t\t}\n" +
    "\t}\n" +
    "\tapiCall();\n",

    "\function multiply(...nums) {\n" +
    "\t\treturn nums.reduce((a,b) => a*b,1);\n" +
    "\t}\n" +
    "\tconsole.log(multiply(2,3,4));\n"
]

export const getJavascriptText = () => {
    const index = Math.floor(Math.random() * jsText.length);
    return jsText[index];
}