import type { Language } from "../src/types";

const snippets: Record<Language, string[]> = {
    "javascript": [
        "const greet = (name) => {\n" +
        "\t\tif (!name) {\n" +
        "\t\t\treturn \"No name provided\";\n" +
        "\t\t}\n\n" +
        "\t\tconst msg = `Hello, ${name}!`;\n" +
        "\t\tconsole.log(msg);\n" +
        "\t\treturn msg;\n" +
        "\t}\n" +
        "\tgreet(\"Ava\");\n",

        "const sum = (a, b) => {\n" +
        "\t\tif (typeof a !== 'number' || typeof b !== 'number') {\n" +
        "\t\t\treturn 'Invalid input';\n" +
        "\t\t}\n\n" +
        "\t\tconst result = a + b;\n" +
        "\t\tconsole.log(result);\n" +
        "\t\treturn result;\n" +
        "\t}\n" +
        "\tsum(3, 7);\n",

        "function fetchData(url) {\n" +
        "\t\treturn fetch(url)\n" +
        "\t\t\t.then(res => res.json())\n" +
        "\t\t\t.then(data => {\n" +
        "\t\t\t\tconsole.log(data);\n" +
        "\t\t\t\treturn data;\n" +
        "\t\t\t});\n" +
        "\t}\n" +
        "\tfetchData('/api/user');\n",

        "class User {\n" +
        "\t\tconstructor(name) {\n" +
        "\t\t\tthis.name = name;\n" +
        "\t\t}\n\n" +
        "\t\tsayHi() {\n" +
        "\t\t\tconsole.log(`Hi, I'm ${this.name}`);\n" +
        "\t\t}\n" +
        "\t}\n" +
        "\tnew User('Mia').sayHi();\n",

        "const nums = [1,2,3,4];\n" +
        "\t\tconst doubled = nums.map(n => n * 2);\n" +
        "\t\tconsole.log(doubled);\n" +
        "\t\tconsole.log('Done');\n",

        "let counter = 0;\n" +
        "\t\tconst inc = () => {\n" +
        "\t\t\tcounter++;\n" +
        "\t\t\tconsole.log(counter);\n" +
        "\t\t}\n" +
        "\tinc(); inc();\n",

        "const isEven = (n) => {\n" +
        "\t\tif (n % 2 === 0) return true;\n" +
        "\t\treturn false;\n" +
        "\t}\n" +
        "\tconsole.log(isEven(5));\n",

        "const person = {name:'Lily', age:22};\n" +
        "\t\tfor (const key in person) {\n" +
        "\t\t\tconsole.log(key, person[key]);\n" +
        "\t\t}\n",

        "async function wait(ms){\n" +
        "\t\treturn new Promise(r => setTimeout(r, ms));\n" +
        "\t}\n\n" +
        "\tawait wait(500);\n" +
        "\tconsole.log('Done');\n",

        "const items = ['a','b','c'];\n" +
        "\t\titems.forEach(i => console.log(i));\n" +
        "\t\tconsole.log('Listed');\n",

        "try {\n" +
        "\t\tJSON.parse('{broken json');\n" +
        "\t} catch (err) {\n" +
        "\t\tconsole.error('Error:', err.message);\n" +
        "\t}\n",

        "function factorial(n) {\n" +
        "\t\tif (n <= 1) return 1;\n" +
        "\t\treturn n * factorial(n - 1);\n" +
        "\t}\n" +
        "\tconsole.log(factorial(5));\n",

        "const obj = {a:1,b:2};\n" +
        "\t\tconst {a,b} = obj;\n" +
        "\t\tconsole.log(a+b);\n",

        "const greetUser = (user='Guest') => {\n" +
        "\t\tconsole.log(`Welcome ${user}`);\n" +
        "\t\treturn user;\n" +
        "\t}\n" +
        "\tgreetUser();\n",

        "const addUnique = (set,val) => {\n" +
        "\t\tif (!set.has(val)) set.add(val);\n" +
        "\t\tconsole.log(set);\n" +
        "\t}\n" +
        "\taddUnique(new Set(),3);\n",

        "const rand = () => Math.floor(Math.random()*10);\n" +
        "\t\tconsole.log(rand());\n" +
        "\t\tconsole.log(rand());\n",

        "const logProps = (obj) => {\n" +
        "\t\tObject.entries(obj).forEach(([k,v]) => {\n" +
        "\t\t\tconsole.log(k,v);\n" +
        "\t\t});\n" +
        "\t}\n" +
        "\tlogProps({x:1,y:2});\n",

        "const reverse = str => {\n" +
        "\t\treturn str.split('').reverse().join('');\n" +
        "\t}\n" +
        "\tconsole.log(reverse('code'));\n",

        "let x = 10;\n" +
        "\t\twhile (x > 7) {\n" +
        "\t\t\tconsole.log(x--);\n" +
        "\t\t}\n",

        "const apiCall = async() => {\n" +
        "\t\ttry {\n" +
        "\t\t\tconst res = await fetch('/data');\n" +
        "\t\t\treturn await res.json();\n" +
        "\t\t} catch(e) {\n" +
        "\t\t\tconsole.error(e);\n" +
        "\t\t}\n" +
        "\t}\n" +
        "\tapiCall();\n",

        "function multiply(...nums) {\n" +
        "\t\treturn nums.reduce((a,b) => a*b,1);\n" +
        "\t}\n" +
        "\tconsole.log(multiply(2,3,4));\n"
    ],
    "python": [
        "\ndef greet(name=None):\n" +
        "\t\tif not name:\n" +
        "\t\t\treturn \"No name provided\"\n\n" +
        "\t\tmsg = f\"Hello, {name}!\"\n" +
        "\t\tprint(msg)\n" +
        "\t\treturn msg\n\n" +
        "greet(\"Ava\")\n",

        "\ndef add(a, b):\n" +
        "\t\tif not isinstance(a, int) or not isinstance(b, int):\n" +
        "\t\t\treturn \"Invalid input\"\n\n" +
        "\t\tres = a + b\n" +
        "\t\tprint(res)\n" +
        "\t\treturn res\n\n" +
        "add(3, 7)\n",

        "\nimport requests\n\ndef fetch_data(url):\n" +
        "\t\tres = requests.get(url)\n" +
        "\t\tdata = res.json()\n" +
        "\t\tprint(data)\n" +
        "\t\treturn data\n\n" +
        "fetch_data('https://api.example.com')\n",

        "\nclass User:\n" +
        "\t\tdef __init__(self, name):\n" +
        "\t\t\tself.name = name\n\n" +
        "\t\tdef say_hi(self):\n" +
        "\t\t\tprint(f\"Hi, I'm {self.name}\")\n\n" +
        "User('Mia').say_hi()\n",

        "\nnums = [1,2,3,4]\n" +
        "\tdoubled = [n*2 for n in nums]\n" +
        "\tprint(doubled)\n" +
        "\tprint('Done')\n",

        "\ncounter = 0\n\ndef inc():\n" +
        "\t\tglobal counter\n" +
        "\t\tcounter += 1\n" +
        "\t\tprint(counter)\n\n" +
        "inc(); inc()\n",

        "\ndef is_even(n):\n" +
        "\t\treturn n % 2 == 0\n\n" +
        "print(is_even(5))\n",

        "\nperson = {'name':'Lily','age':22}\n" +
        "\tfor k,v in person.items():\n" +
        "\t\tprint(k,v)\n",

        "\nimport time\n\nasync def wait(ms):\n" +
        "\t\ttime.sleep(ms/1000)\n\n" +
        "await wait(500)\n" +
        "print('Done')\n",

        "\nitems = ['a','b','c']\n" +
        "\tfor i in items:\n" +
        "\t\tprint(i)\n" +
        "\tprint('Listed')\n",

        "\ntry:\n" +
        "\t\tint('bad')\n" +
        "except Exception as e:\n" +
        "\t\tprint('Error:',e)\n",

        "\ndef factorial(n):\n" +
        "\t\tif n<=1:\n" +
        "\t\t\treturn 1\n" +
        "\t\treturn n*factorial(n-1)\n\n" +
        "print(factorial(5))\n",

        "\nobj={'a':1,'b':2}\n" +
        "\ta=obj['a']; b=obj['b']\n" +
        "\tprint(a+b)\n",

        "\ndef greet_user(user='Guest'):\n" +
        "\t\tprint(f'Welcome {user}')\n" +
        "\t\treturn user\n\n" +
        "greet_user()\n",

        "\ndef add_unique(s,val):\n" +
        "\t\tif val not in s:\n" +
        "\t\t\ts.add(val)\n" +
        "\t\tprint(s)\n\n" +
        "add_unique(set(),3)\n",

        "\nimport random\n" +
        "\tprint(random.randint(0,9))\n" +
        "\tprint(random.randint(0,9))\n",

        "\ndef log_props(obj):\n" +
        "\t\tfor k,v in obj.items():\n" +
        "\t\t\tprint(k,v)\n\n" +
        "log_props({'x':1,'y':2})\n",

        "\ndef reverse(s):\n" +
        "\t\treturn s[::-1]\n\n" +
        "print(reverse('code'))\n",

        "\nx=10\n" +
        "\twhile x>7:\n" +
        "\t\tprint(x)\n" +
        "\t\tx-=1\n",

        "\nfrom functools import reduce\n\ndef multiply(*nums):\n" +
        "\t\treturn reduce(lambda a,b:a*b,nums,1)\n\n" +
        "print(multiply(2,3,4))\n"
    ],
    "java": [
        "\npublic class Main {\n" +
        "\t\tstatic String greet(String name){\n" +
        "\t\t\tif(name==null) return \"No name provided\";\n\n" +
        "\t\t\tString msg = \"Hello, \" + name + \"!\";\n" +
        "\t\t\tSystem.out.println(msg);\n" +
        "\t\t\treturn msg;\n" +
        "\t\t}\n\n" +
        "\t\tpublic static void main(String[] args){\n" +
        "\t\t\tgreet(\"Ava\");\n" +
        "\t\t}\n" +
        "}\n",

        "\npublic class Main {\n" +
        "\t\tstatic Object sum(Object a,Object b){\n" +
        "\t\t\tif(!(a instanceof Integer) || !(b instanceof Integer)) return \"Invalid input\";\n\n" +
        "\t\t\tint r=(int)a+(int)b;\n" +
        "\t\t\tSystem.out.println(r);\n" +
        "\t\t\treturn r;\n" +
        "\t\t}\n\n" +
        "\t\tpublic static void main(String[]args){sum(3,7);} \n" +
        "}\n",

        "\nimport java.net.*;\nimport java.io.*;\npublic class Main{\n" +
        "\t\tstatic void fetchData(String url)throws Exception{\n" +
        "\t\t\tvar conn=new URL(url).openConnection();\n" +
        "\t\t\ttry(var in=new BufferedReader(new InputStreamReader(conn.getInputStream()))){\n" +
        "\t\t\t\tSystem.out.println(in.readLine());\n" +
        "\t\t\t}\n" +
        "\t\t}\n" +
        "\t\tpublic static void main(String[]a)throws Exception{fetchData(\"https://example.com\");}\n" +
        "}\n",

        "\nclass User{\n" +
        "\t\tString name;\n" +
        "\t\tUser(String n){this.name=n;}\n\n" +
        "\t\tvoid sayHi(){System.out.println(\"Hi, I'm \"+name);}\n" +
        "}\n" +
        "public class Main{\n" +
        "\t\tpublic static void main(String[]a){new User(\"Mia\").sayHi();}\n" +
        "}\n",

        "\nimport java.util.*;\npublic class Main{\n" +
        "\t\tpublic static void main(String[]a){\n" +
        "\t\t\tList<Integer> nums=Arrays.asList(1,2,3,4);\n" +
        "\t\t\tnums.stream().map(n->n*2).forEach(System.out::println);\n" +
        "\t\t\tSystem.out.println(\"Done\");\n" +
        "\t\t}\n" +
        "}\n",

        "\npublic class Main{\n" +
        "\t\tstatic int counter=0;\n" +
        "\t\tstatic void inc(){System.out.println(++counter);} \n\n" +
        "\t\tpublic static void main(String[]a){inc();inc();}\n" +
        "}\n",

        "\npublic class Main{\n" +
        "\t\tstatic boolean isEven(int n){return n%2==0;}\n" +
        "\t\tpublic static void main(String[]a){System.out.println(isEven(5));}\n" +
        "}\n",

        "\nimport java.util.*;\npublic class Main{\n" +
        "\t\tpublic static void main(String[]a){\n" +
        "\t\t\tMap<String,Object> p=Map.of(\"name\",\"Lily\",\"age\",22);\n" +
        "\t\t\tp.forEach((k,v)->System.out.println(k+\" \"+v));\n" +
        "\t\t}\n" +
        "}\n",

        "\npublic class Main{\n" +
        "\t\tstatic void waitMs(long ms)throws Exception{Thread.sleep(ms);} \n" +
        "\t\tpublic static void main(String[]a)throws Exception{waitMs(500);System.out.println(\"Done\");}\n" +
        "}\n",

        "\nimport java.util.*;\npublic class Main{\n" +
        "\t\tpublic static void main(String[]a){\n" +
        "\t\t\tList<String> items=Arrays.asList(\"a\",\"b\",\"c\");\n" +
        "\t\t\titems.forEach(System.out::println);\n" +
        "\t\t\tSystem.out.println(\"Listed\");\n" +
        "\t\t}\n" +
        "}\n",

        "\npublic class Main{\n" +
        "\t\tpublic static void main(String[]a){\n" +
        "\t\t\ttry{Integer.parseInt(\"broken\");}\n" +
        "\t\t\tcatch(Exception e){System.out.println(\"Error: \"+e.getMessage());}\n" +
        "\t\t}\n" +
        "}\n",

        "\npublic class Main{\n" +
        "\t\tstatic int factorial(int n){return n<=1?1:n*factorial(n-1);} \n" +
        "\t\tpublic static void main(String[]a){System.out.println(factorial(5));}\n" +
        "}\n",

        "\npublic class Main{\n" +
        "\t\tpublic static void main(String[]a){int a1=1,b1=2;System.out.println(a1+b1);} \n" +
        "}\n",

        "\npublic class Main{\n" +
        "\t\tstatic String greetUser(String u){System.out.println(\"Welcome \"+u);return u;} \n" +
        "\t\tpublic static void main(String[]a){greetUser(\"Guest\");}\n" +
        "}\n",

        "\nimport java.util.*;\npublic class Main{\n" +
        "\t\tstatic void addUnique(Set<Integer>s,int v){s.add(v);System.out.println(s);} \n" +
        "\t\tpublic static void main(String[]a){addUnique(new HashSet<>(),3);} \n" +
        "}\n",

        "\nimport java.util.*;\npublic class Main{\n" +
        "\t\tpublic static void main(String[]a){Random r=new Random();System.out.println(r.nextInt(10));System.out.println(r.nextInt(10));}\n" +
        "}\n",

        "\nimport java.util.*;\npublic class Main{\n" +
        "\t\tstatic void logProps(Map<String,Object>m){m.forEach((k,v)->System.out.println(k+\" \"+v));} \n" +
        "\t\tpublic static void main(String[]a){logProps(Map.of(\"x\",1,\"y\",2));}\n" +
        "}\n",

        "\npublic class Main{\n" +
        "\t\tstatic String reverse(String s){return new StringBuilder(s).reverse().toString();} \n" +
        "\t\tpublic static void main(String[]a){System.out.println(reverse(\"code\"));}\n" +
        "}\n",

        "\npublic class Main{\n" +
        "\t\tpublic static void main(String[]a){int x=10;while(x>7)System.out.println(x--);} \n" +
        "}\n",

        "\nimport java.util.*;\npublic class Main{\n" +
        "\t\tstatic int multiply(int...n){int r=1;for(int i:n)r*=i;return r;} \n" +
        "\t\tpublic static void main(String[]a){System.out.println(multiply(2,3,4));}\n" +
        "}\n"
    ]
}

export const getText = (language: Language) => { 
    const texts = snippets[language];
    const index = Math.floor(Math.random() * texts.length);
    
    return texts[index]
}

// please get gpt to generate snippeets that are all the same size