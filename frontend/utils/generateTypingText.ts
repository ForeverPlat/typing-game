import type { Language } from "../src/types";

const snippets: Record<Language, string[]> = {
    "javascript": [
        "const greet = (user) => {\n" +
        "\t\tif (!user) {\n" +
        "\t\t\treturn \"Missing user value\";\n" +
        "\t\t}\n\n" +
        "\t\tconst msg = `Welcome, ${user}!`;\n" +
        "\t\tconsole.log(msg);\n" +
        "\t\treturn msg;\n" +
        "\t}\n" +
        "\tgreet(\"Liam\");\n",

        "const square = (n) => {\n" +
        "\t\tif (typeof n !== 'number') {\n" +
        "\t\t\treturn \"Invalid number\";\n" +
        "\t\t}\n\n" +
        "\t\tconst res = n * n;\n" +
        "\t\tconsole.log(res);\n" +
        "\t\treturn res;\n" +
        "\t}\n" +
        "\tsquare(6);\n",

        "const upper = (text) => {\n" +
        "\t\tif (!text) {\n" +
        "\t\t\treturn \"No text supplied\";\n" +
        "\t\t}\n\n" +
        "\t\tconst out = text.toUpperCase();\n" +
        "\t\tconsole.log(out);\n" +
        "\t\treturn out;\n" +
        "\t}\n" +
        "\tupper(\"code\");\n",

        "const repeat = (str) => {\n" +
        "\t\tif (!str) {\n" +
        "\t\t\treturn \"Empty string\";\n" +
        "\t\t}\n\n" +
        "\t\tconst out = str + str;\n" +
        "\t\tconsole.log(out);\n" +
        "\t\treturn out;\n" +
        "\t}\n" +
        "\trepeat(\"hi\");\n",

        "const negate = (n) => {\n" +
        "\t\tif (typeof n !== 'number') {\n" +
        "\t\t\treturn \"Invalid number\";\n" +
        "\t\t}\n\n" +
        "\t\tconst res = -n;\n" +
        "\t\tconsole.log(res);\n" +
        "\t\treturn res;\n" +
        "\t}\n" +
        "\tnegate(4);\n",

        "const length = (s) => {\n" +
        "\t\tif (!s) {\n" +
        "\t\t\treturn \"Empty string\";\n" +
        "\t\t}\n\n" +
        "\t\tconst res = s.length;\n" +
        "\t\tconsole.log(res);\n" +
        "\t\treturn res;\n" +
        "\t}\n" +
        "\tlength(\"test\");\n",

        "const trim = (s) => {\n" +
        "\t\tif (!s) {\n" +
        "\t\t\treturn \"No value given\";\n" +
        "\t\t}\n\n" +
        "\t\tconst out = s.trim();\n" +
        "\t\tconsole.log(out);\n" +
        "\t\treturn out;\n" +
        "\t}\n" +
        "\ttrim(\" hi \");\n",

        "const double = (n) => {\n" +
        "\t\tif (typeof n !== 'number') {\n" +
        "\t\t\treturn \"Invalid number\";\n" +
        "\t\t}\n\n" +
        "\t\tconst res = n * 2;\n" +
        "\t\tconsole.log(res);\n" +
        "\t\treturn res;\n" +
        "\t}\n" +
        "\tdouble(7);\n",

        "const lower = (s) => {\n" +
        "\t\tif (!s) {\n" +
        "\t\t\treturn \"No text supplied\";\n" +
        "\t\t}\n\n" +
        "\t\tconst out = s.toLowerCase();\n" +
        "\t\tconsole.log(out);\n" +
        "\t\treturn out;\n" +
        "\t}\n" +
        "\tlower(\"CODE\");\n",

        "const absVal = (n) => {\n" +
        "\t\tif (typeof n !== 'number') {\n" +
        "\t\t\treturn \"Invalid number\";\n" +
        "\t\t}\n\n" +
        "\t\tconst res = Math.abs(n);\n" +
        "\t\tconsole.log(res);\n" +
        "\t\treturn res;\n" +
        "\t}\n" +
        "\tabsVal(-5);\n"
    ],

    "python": [
        "\ndef greet(user=None):\n" +
        "\t\tif not user:\n" +
        "\t\t\treturn \"Missing user value\"\n\n" +
        "\t\tmsg = f\"Welcome, {user}!\"\n" +
        "\t\tprint(msg)\n" +
        "\t\treturn msg\n\n" +
        "greet(\"Liam\")\n",

        "\ndef square(n):\n" +
        "\t\tif not isinstance(n, int):\n" +
        "\t\t\treturn \"Invalid number\"\n\n" +
        "\t\tres = n * n\n" +
        "\t\tprint(res)\n" +
        "\t\treturn res\n\n" +
        "square(6)\n",

        "\ndef upper(text):\n" +
        "\t\tif not text:\n" +
        "\t\t\treturn \"No text supplied\"\n\n" +
        "\t\tout = text.upper()\n" +
        "\t\tprint(out)\n" +
        "\t\treturn out\n\n" +
        "upper(\"code\")\n",

        "\ndef repeat(s):\n" +
        "\t\tif not s:\n" +
        "\t\t\treturn \"Empty string\"\n\n" +
        "\t\tout = s + s\n" +
        "\t\tprint(out)\n" +
        "\t\treturn out\n\n" +
        "repeat(\"hi\")\n",

        "\ndef negate(n):\n" +
        "\t\tif not isinstance(n, int):\n" +
        "\t\t\treturn \"Invalid number\"\n\n" +
        "\t\tres = -n\n" +
        "\t\tprint(res)\n" +
        "\t\treturn res\n\n" +
        "negate(4)\n",

        "\ndef length(s):\n" +
        "\t\tif not s:\n" +
        "\t\t\treturn \"Empty string\"\n\n" +
        "\t\tres = len(s)\n" +
        "\t\tprint(res)\n" +
        "\t\treturn res\n\n" +
        "length(\"test\")\n",

        "\ndef trim(s):\n" +
        "\t\tif not s:\n" +
        "\t\t\treturn \"No value given\"\n\n" +
        "\t\tout = s.strip()\n" +
        "\t\tprint(out)\n" +
        "\t\treturn out\n\n" +
        "trim(\" hi \")\n",

        "\ndef double(n):\n" +
        "\t\tif not isinstance(n, int):\n" +
        "\t\t\treturn \"Invalid number\"\n\n" +
        "\t\tres = n * 2\n" +
        "\t\tprint(res)\n" +
        "\t\treturn res\n\n" +
        "double(7)\n",

        "\ndef lower(s):\n" +
        "\t\tif not s:\n" +
        "\t\t\treturn \"No text supplied\"\n\n" +
        "\t\tout = s.lower()\n" +
        "\t\tprint(out)\n" +
        "\t\treturn out\n\n" +
        "lower(\"CODE\")\n",

        "\ndef abs_val(n):\n" +
        "\t\tif not isinstance(n, int):\n" +
        "\t\t\treturn \"Invalid number\"\n\n" +
        "\t\tres = abs(n)\n" +
        "\t\tprint(res)\n" +
        "\t\treturn res\n\n" +
        "abs_val(-5)\n"
    ],

    "java": [
        "\npublic class Main {\n" +
        "\t\tstatic String greet(String user) {\n" +
        "\t\t\tif (user == null) return \"Missing user value\";\n\n" +
        "\t\t\tString msg = \"Welcome, \" + user + \"!\";\n" +
        "\t\t\tSystem.out.println(msg);\n" +
        "\t\t\treturn msg;\n" +
        "\t\t}\n" +
        "\t\tpublic static void main(String[] a) { greet(\"Liam\"); }\n" +
        "}\n",

        "\npublic class Main {\n" +
        "\t\tstatic Object square(Object n) {\n" +
        "\t\t\tif (!(n instanceof Integer)) return \"Invalid number\";\n\n" +
        "\t\t\tint res = (int)n * (int)n;\n" +
        "\t\t\tSystem.out.println(res);\n" +
        "\t\t\treturn res;\n" +
        "\t\t}\n" +
        "\t\tpublic static void main(String[] a) { square(6); }\n" +
        "}\n",

        "\npublic class Main {\n" +
        "\t\tstatic String upper(String text) {\n" +
        "\t\t\tif (text == null) return \"No text supplied\";\n\n" +
        "\t\t\tString out = text.toUpperCase();\n" +
        "\t\t\tSystem.out.println(out);\n" +
        "\t\t\treturn out;\n" +
        "\t\t}\n" +
        "\t\tpublic static void main(String[] a) { upper(\"code\"); }\n" +
        "}\n",

        "\npublic class Main {\n" +
        "\t\tstatic String repeat(String s) {\n" +
        "\t\t\tif (s == null) return \"Empty string\";\n\n" +
        "\t\t\tString out = s + s;\n" +
        "\t\t\tSystem.out.println(out);\n" +
        "\t\t\treturn out;\n" +
        "\t\t}\n" +
        "\t\tpublic static void main(String[] a) { repeat(\"hi\"); }\n" +
        "}\n",

        "\npublic class Main {\n" +
        "\t\tstatic Object negate(Object n) {\n" +
        "\t\t\tif (!(n instanceof Integer)) return \"Invalid number\";\n\n" +
        "\t\t\tint res = -(int)n;\n" +
        "\t\t\tSystem.out.println(res);\n" +
        "\t\t\treturn res;\n" +
        "\t\t}\n" +
        "\t\tpublic static void main(String[] a) { negate(4); }\n" +
        "}\n",

        "\npublic class Main {\n" +
        "\t\tstatic Object length(String s) {\n" +
        "\t\t\tif (s == null) return \"Empty string\";\n\n" +
        "\t\t\tint res = s.length();\n" +
        "\t\t\tSystem.out.println(res);\n" +
        "\t\t\treturn res;\n" +
        "\t\t}\n" +
        "\t\tpublic static void main(String[] a) { length(\"test\"); }\n" +
        "}\n",

        "\npublic class Main {\n" +
        "\t\tstatic String trim(String s) {\n" +
        "\t\t\tif (s == null) return \"No value given\";\n\n" +
        "\t\t\tString out = s.trim();\n" +
        "\t\t\tSystem.out.println(out);\n" +
        "\t\t\treturn out;\n" +
        "\t\t}\n" +
        "\t\tpublic static void main(String[] a) { trim(\" hi \"); }\n" +
        "}\n",

        "\npublic class Main {\n" +
        "\t\tstatic Object absVal(Object n) {\n" +
        "\t\t\tif (!(n instanceof Integer)) return \"Invalid number\";\n\n" +
        "\t\t\tint res = Math.abs((int)n);\n" +
        "\t\t\tSystem.out.println(res);\n" +
        "\t\t\treturn res;\n" +
        "\t\t}\n" +
        "\t\tpublic static void main(String[] a) { absVal(-5); }\n" +
        "}\n"
    ]
};

export const getText = (language: Language) => {
    const texts = snippets[language];
    const index = Math.floor(Math.random() * texts.length);
    return texts[index];
};
