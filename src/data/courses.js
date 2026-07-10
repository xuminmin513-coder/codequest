export const CHAPTERS = [
  {
    id: 'ch1',
    title: 'Chapter 1: 冒险开始',
    titleEn: 'Chapter 1: Adventure Begins',
    description: '认识Python，学会第一个程序',
    descriptionEn: 'Meet Python, write your first program',
    icon: '🚀',
    lessons: [
      {
        id: 'ch1_01',
        title: '你好，世界！',
        titleEn: 'Hello, World!',
        xp: 50,
        content: `
## Hello, World!

当你学习一门新编程语言时，第一个程序通常是打印 "Hello, World!"。

在 Python 中，我们使用 \`print()\` 函数来输出文本到屏幕。

\`\`\`python
print("Hello, World!")
\`\`\`

> 💡 **提示:** 文本需要用双引号或单引号括起来。

### 📝 任务
在下方编辑器中输入代码，打印出 "Hello, World!"。
`,
        contentEn: `
## Hello, World!

When learning a new programming language, the first program is usually printing "Hello, World!".

In Python, we use the \`print()\` function to output text to the screen.

\`\`\`python
print("Hello, World!")
\`\`\`

> 💡 **Tip:** Text needs to be wrapped in double or single quotes.

### 📝 Task
Type code in the editor below to print "Hello, World!".
`,
        starterCode: '',
        answer: 'print("Hello, World!")',
        hints: ['记得把文本放在引号里', 'Remember to put text in quotes'],
        testCases: [{ input: '', expected: 'Hello, World!' }]
      },
      {
        id: 'ch1_02',
        title: '多行输出',
        titleEn: 'Multiple Lines',
        xp: 50,
        content: `
## 多行输出

你可以多次调用 \`print()\` 来输出多行内容。

\`\`\`python
print("第一行")
print("第二行")
print("第三行")
\`\`\`

### 📝 任务
打印三行：第一行输出 "Python"，第二行输出 "is"，第三行输出 "fun!"。
`,
        contentEn: `
## Multiple Lines

You can call \`print()\` multiple times to output multiple lines.

\`\`\`python
print("First line")
print("Second line")
print("Third line")
\`\`\`

### 📝 Task
Print three lines: first "Python", second "is", third "fun!".
`,
        starterCode: '',
        answer: 'print("Python")\nprint("is")\nprint("fun!")',
        hints: ['每行用一个print()', 'Use one print() per line'],
        testCases: [{ input: '', expected: 'Python\nis\nfun!' }]
      },
      {
        id: 'ch1_03',
        title: '注释',
        titleEn: 'Comments',
        xp: 50,
        content: `
## 注释

注释是代码中不会被执行的说明文字。在 Python 中用 \`#\` 表示注释。

\`\`\`python
# 这是一条注释
print("Hello!")  # 这也是注释
\`\`\`

注释帮助你和他人理解代码的作用。

### 📝 任务
在 \`print()\` 语句上方添加一行注释 "# My first comment"，然后输出 "Comments are useful!"。
`,
        contentEn: `
## Comments

Comments are notes in code that won't be executed. In Python, use \`#\` for comments.

\`\`\`python
# This is a comment
print("Hello!")  # This is also a comment
\`\`\`

Comments help you and others understand what the code does.

### 📝 Task
Add a comment "# My first comment" above the \`print()\` statement, then print "Comments are useful!".
`,
        starterCode: 'print("Comments are useful!")',
        answer: '# My first comment\nprint("Comments are useful!")',
        hints: ['注释以 # 开头', 'Comments start with #'],
        testCases: [{ input: '', expected: 'Comments are useful!' }]
      },
      {
        id: 'ch1_04',
        title: '数字运算',
        titleEn: 'Math Operations',
        xp: 50,
        content: `
## 数字运算

Python 可以直接做数学运算！

\`\`\`python
print(3 + 5)    # 加法 → 8
print(10 - 4)   # 减法 → 6
print(2 * 3)    # 乘法 → 6
print(10 / 2)   # 除法 → 5.0
\`\`\`

### 📝 任务
计算 \`25 + 37\` 的结果并打印出来。
`,
        contentEn: `
## Math Operations

Python can do math directly!

\`\`\`python
print(3 + 5)    # Addition → 8
print(10 - 4)   # Subtraction → 6
print(2 * 3)    # Multiplication → 6
print(10 / 2)   # Division → 5.0
\`\`\`

### 📝 Task
Calculate and print the result of \`25 + 37\`.
`,
        starterCode: '',
        answer: 'print(25 + 37)',
        hints: ['直接写数学表达式', 'Write the math expression directly'],
        testCases: [{ input: '', expected: '62' }]
      },
      {
        id: 'ch1_05',
        title: '组合输出',
        titleEn: 'Combined Output',
        xp: 100,
        content: `
## 组合输出

你可以用逗号分隔多个值，\`print()\` 会自动用空格连接它们。

\`\`\`python
print("结果:", 42)
print("3 + 5 =", 3 + 5)
\`\`\`

### 📝 挑战
打印 \`"The answer is" 42\`（用逗号分隔）。
`,
        contentEn: `
## Combined Output

You can separate multiple values with commas, \`print()\` will join them with spaces.

\`\`\`python
print("Result:", 42)
print("3 + 5 =", 3 + 5)
\`\`\`

### 📝 Challenge
Print \`"The answer is" 42\` (separated by comma).
`,
        starterCode: '',
        answer: 'print("The answer is", 42)',
        hints: ['用逗号分隔文本和数字', 'Separate text and number with a comma'],
        testCases: [{ input: '', expected: 'The answer is 42' }]
      }
    ]
  },
  {
    id: 'ch2',
    title: 'Chapter 2: 变量魔法',
    titleEn: 'Chapter 2: Variable Magic',
    description: '学习使用变量存储数据',
    descriptionEn: 'Learn to store data with variables',
    icon: '🔮',
    lessons: [
      {
        id: 'ch2_01',
        title: '创建变量',
        titleEn: 'Creating Variables',
        xp: 50,
        content: `
## 创建变量

变量就像"盒子"，用来存储数据。用 \`=\` 来给变量赋值。

\`\`\`python
name = "Alice"
age = 25
print(name)
print(age)
\`\`\`

变量名要有描述性，让人一看就知道里面存了什么。

### 📝 任务
创建一个变量 \`city\` 值为 "Beijing"，然后打印它。
`,
        contentEn: `
## Creating Variables

Variables are like "boxes" that store data. Use \`=\` to assign values.

\`\`\`python
name = "Alice"
age = 25
print(name)
print(age)
\`\`\`

Variable names should be descriptive.

### 📝 Task
Create a variable \`city\` with value "Beijing", then print it.
`,
        starterCode: '',
        answer: 'city = "Beijing"\nprint(city)',
        hints: ['先赋值，再打印', 'Assign first, then print'],
        testCases: [{ input: '', expected: 'Beijing' }]
      },
      {
        id: 'ch2_02',
        title: '多变量',
        titleEn: 'Multiple Variables',
        xp: 50,
        content: `
## 多变量

你可以创建多个变量来存储不同类型的数据。

\`\`\`python
name = "Bob"
age = 20
height = 1.75
is_student = True
\`\`\`

Python 中的主要数据类型：
- **字符串 (str)**: 文本，如 "Hello"
- **整数 (int)**: 如 42
- **浮点数 (float)**: 如 3.14
- **布尔值 (bool)**: True 或 False

### 📝 任务
创建三个变量：\`name\`="Luna", \`level\`=5, \`score\`=99.9，然后打印它们。
`,
        contentEn: `
## Multiple Variables

You can create multiple variables to store different types of data.

\`\`\`python
name = "Bob"
age = 20
height = 1.75
is_student = True
\`\`\`

Main data types in Python:
- **str**: text, like "Hello"
- **int**: like 42
- **float**: like 3.14
- **bool**: True or False

### 📝 Task
Create three variables: \`name\`="Luna", \`level\`=5, \`score\`=99.9, then print them each on a new line.
`,
        starterCode: '',
        answer: 'name = "Luna"\nlevel = 5\nscore = 99.9\nprint(name)\nprint(level)\nprint(score)',
        hints: ['每个变量一行打印', 'Print each variable on its own line'],
        testCases: [{ input: '', expected: 'Luna\n5\n99.9' }]
      },
      {
        id: 'ch2_03',
        title: '变量运算',
        titleEn: 'Variable Math',
        xp: 50,
        content: `
## 变量运算

你可以用变量做数学运算，就像用数字一样。

\`\`\`python
a = 10
b = 3
sum_result = a + b
print(sum_result)
\`\`\`

### 📝 任务
创建 \`x = 15\` 和 \`y = 4\`，然后计算并打印 \`x * y\` 的结果。
`,
        contentEn: `
## Variable Math

You can do math with variables, just like with numbers.

\`\`\`python
a = 10
b = 3
sum_result = a + b
print(sum_result)
\`\`\`

### 📝 Task
Create \`x = 15\` and \`y = 4\`, then calculate and print \`x * y\`.
`,
        starterCode: '',
        answer: 'x = 15\ny = 4\nprint(x * y)',
        hints: ['用 * 做乘法', 'Use * for multiplication'],
        testCases: [{ input: '', expected: '60' }]
      },
      {
        id: 'ch2_04',
        title: '字符串拼接',
        titleEn: 'String Concatenation',
        xp: 50,
        content: `
## 字符串拼接

用 \`+\` 可以将字符串连接起来。

\`\`\`python
"My name is " + "Python"
\`\`\`

### 📝 任务
拼接 \`"My name is "\` 和 \`"Python"\`，然后打印结果。
`,
        contentEn: `
## String Concatenation

Use \`+\` to join strings together.

\`\`\`python
"My name is " + "Python"
\`\`\`

### 📝 Task
Concatenate \`"My name is "\` and \`"Python"\`, then print the result.
`,
        starterCode: '',
        answer: 'result = "My name is " + "Python"\nprint(result)',
        hints: ['"My name is " + "Python" 就是一个拼接', 'Just use "My name is " + "Python"'],
        testCases: [{ input: '', expected: 'My name is Python' }]
      },
      {
        id: 'ch2_05',
        title: '用户输入',
        titleEn: 'User Input',
        xp: 100,
        content: `
## 用户输入

\`input()\` 函数可以获取用户输入。输入的内容默认是字符串。

\`\`\`python
name = input("请输入你的名字: ")
print("你好, " + name)
\`\`\`

### 📝 挑战
使用 \`input()\` 函数，将用户输入保存到变量 \`name\`，然后打印 \`"Hello, " + name\`。

> 💡 在测试时，系统会自动提供输入。
`,
        contentEn: `
## User Input

The \`input()\` function gets user input. Input is always a string.

\`\`\`python
name = input("Enter your name: ")
print("Hello, " + name)
\`\`\`

### 📝 Challenge
Use \`input()\` to get user input, save it to variable \`name\`, then print \`"Hello, " + name\`.

> 💡 The system will auto-provide input during testing.
`,
        starterCode: '',
        answer: 'name = input()\nprint("Hello, " + name)',
        hints: ['第1步：用 name = input() 获取用户输入，括号里可以加提示文字', '第2步：用 print("Hello, " + name) 拼接字符串并输出', '运行后系统会自动输入测试值，看看输出效果'],
        testCases: [{ input: 'World', expected: 'World\nHello, World' }]
      }
    ]
  },
  {
    id: 'ch3',
    title: 'Chapter 3: 字符串工坊',
    titleEn: 'Chapter 3: String Workshop',
    description: '掌握字符串的各种操作技巧',
    descriptionEn: 'Master string manipulation skills',
    icon: '📝',
    lessons: [
      {
        id: 'ch3_01',
        title: '字符串长度',
        titleEn: 'String Length',
        xp: 50,
        content: `
## 字符串长度

用 \`len()\` 函数可以获取字符串的长度（字符个数）。

\`\`\`python
text = "Python"
print(len(text))  # → 6
\`\`\`

### 📝 任务
创建变量 \`text = "Python"\`，打印它的长度。
`,
        contentEn: `
## String Length

Use \`len()\` function to get the length of a string.

\`\`\`python
text = "Python"
print(len(text))  # → 6
\`\`\`

### 📝 Task
Create \`text = "Python"\`, print its length.
`,
        starterCode: '',
        answer: 'text = "Python"\nprint(len(text))',
        hints: ['len() 返回字符串长度', 'len() returns string length'],
        testCases: [{ input: '', expected: '6' }]
      },
      {
        id: 'ch3_02',
        title: '大小写转换',
        titleEn: 'Case Conversion',
        xp: 50,
        content: `
## 大小写转换

Python 提供多种字符串大小写转换方法。

\`\`\`python
text = "hello Python"
print(text.upper())   # → HELLO PYTHON
print(text.lower())   # → hello python
print(text.title())   # → Hello Python
\`\`\`

### 📝 任务
将 \`"coding is fun"\` 转换为大写并打印。
`,
        contentEn: `
## Case Conversion

Python provides several string case methods.

\`\`\`python
text = "hello Python"
print(text.upper())   # → HELLO PYTHON
print(text.lower())   # → hello python
print(text.title())   # → Hello Python
\`\`\`

### 📝 Task
Convert \`"coding is fun"\` to uppercase and print.
`,
        starterCode: '',
        answer: 'text = "coding is fun"\nprint(text.upper())',
        hints: ['用 .upper() 方法', 'Use .upper() method'],
        testCases: [{ input: '', expected: 'CODING IS FUN' }]
      },
      {
        id: 'ch3_03',
        title: '字符串切片',
        titleEn: 'String Slicing',
        xp: 50,
        content: `
## 字符串切片

你可以用方括号 \`[]\` 和索引来取字符串的一部分。

\`\`\`python
text = "Python"
print(text[0])     # → P (第一个字符)
print(text[0:3])   # → Pyt (索引0到2)
print(text[-1])    # → n (最后一个字符)
\`\`\`

> 💡 Python 索引从 0 开始！\`-1\` 表示最后一个字符。

### 📝 任务
从 \`"Hello, World!"\` 中切出并打印 \`"World"\`。
`,
        contentEn: `
## String Slicing

Use square brackets \`[]\` and indices to get parts of a string.

\`\`\`python
text = "Python"
print(text[0])     # → P (first char)
print(text[0:3])   # → Pyt (index 0 to 2)
print(text[-1])    # → n (last char)
\`\`\`

> 💡 Python indices start at 0! \`-1\` means the last character.

### 📝 Task
Slice and print \`"World"\` from \`"Hello, World!"\`.
`,
        starterCode: '',
        answer: 'text = "Hello, World!"\nprint(text[7:12])',
        hints: ['W 的索引是7', 'W is at index 7'],
        testCases: [{ input: '', expected: 'World' }]
      },
      {
        id: 'ch3_04',
        title: '字符串格式化',
        titleEn: 'String Formatting',
        xp: 50,
        content: `
## 字符串格式化

用 f-string（格式化字符串）可以方便地嵌入变量。

\`\`\`python
name = "Alice"
age = 25
print(f"我叫{name}，今年{age}岁")
\`\`\`

用 \`f\` 前缀和花括号 \`{}\` 包裹变量。

### 📝 任务
用 f-string 打印 \`"My name is Python"\`（创建 \`name = "Python"\`）。
`,
        contentEn: `
## String Formatting

Use f-strings to easily embed variables in strings.

\`\`\`python
name = "Alice"
age = 25
print(f"My name is {name}")
\`\`\`

Add \`f\` prefix and use curly braces \`{}\` for variables.

### 📝 Task
Use f-string to print \`"My name is Python"\` (create \`name = "Python"\`).
`,
        starterCode: '',
        answer: 'name = "Python"\nprint(f"My name is {name}")',
        hints: ['用 f 前缀和 {}', 'Use f prefix and {}'],
        testCases: [{ input: '', expected: 'My name is Python' }]
      },
      {
        id: 'ch3_05',
        title: '字符串方法实战',
        titleEn: 'String Methods Challenge',
        xp: 100,
        content: `
## 字符串方法实战

常用字符串方法：

\`\`\`python
text = "  hello world  "
print(text.strip())      # 去除空格 → "hello world"
print(text.replace("world", "Python"))  # 替换
print(text.split())      # 分割 → ["hello", "world"]
\`\`\`


方法可以**链式调用**，一个接一个执行：

\`\`\`python
msg = "  Hello World  "
result = msg.strip().upper()
print(result)  # → "HELLO WORLD"
\`\`\`

先用 \`.strip()\` 去除空格，再用 \`.upper()\` 转大写。

### 📝 挑战
创建 \`msg = "  learn python " \`，先去除空格（\`.strip()\`），然后转换为大写（\`.upper()\`），最后打印结果。
`,
        contentEn: `
## String Methods Challenge

Common string methods:

\`\`\`python
text = "  hello world  "
print(text.strip())      # Remove spaces → "hello world"
print(text.replace("world", "Python"))  # Replace
print(text.split())      # Split → ["hello", "world"]
\`\`\`


Methods can be **chained** together, one after another:

\`\`\`python
msg = "  Hello World  "
result = msg.strip().upper()
print(result)  # → "HELLO WORLD"
\`\`\`

First \`.strip()\` removes spaces → \`"Hello World"\`, then \`.upper()\` makes uppercase → \`"HELLO WORLD"\`.

### 📝 Challenge
Create \`msg = "  learn python "\`, strip it (\`.strip()\`), then uppercase it (\`.upper()\`), then print.
`,
        starterCode: '',
        answer: 'msg = "  learn python "\nresult = msg.strip().upper()\nprint(result)',
        hints: ['可以先 strip 再 upper', 'Chain strip() then upper()'],
        testCases: [{ input: '', expected: 'LEARN PYTHON' }]
      }
    ]
  },
  {
    id: 'ch4',
    title: 'Chapter 4: 数字王国',
    titleEn: 'Chapter 4: Number Kingdom',
    description: '深入探索数字类型和运算',
    descriptionEn: 'Deep dive into numbers and operations',
    icon: '🔢',
    lessons: [
      {
        id: 'ch4_01',
        title: '数字类型转换',
        titleEn: 'Type Conversion',
        xp: 50,
        content: `
## 数字类型转换

Python 中可以在不同类型之间转换：

\`\`\`python
# 字符串 → 整数
num = int("42")
print(num + 8)  # → 50

# 整数 → 字符串
text = str(100)
print("Number: " + text)
\`\`\`

### 📝 任务
将字符串 \`"15"\` 转为整数，加 \`10\`，然后打印结果。
`,
        contentEn: `
## Type Conversion

Convert between types in Python:

\`\`\`python
# String → Integer
num = int("42")
print(num + 8)  # → 50

# Integer → String
text = str(100)
print("Number: " + text)
\`\`\`

### 📝 Task
Convert string \`"15"\` to integer, add \`10\`, then print.
`,
        starterCode: '',
        answer: 'num = int("15")\nprint(num + 10)',
        hints: ['先转换再运算', 'Convert first then calculate'],
        testCases: [{ input: '', expected: '25' }]
      },
      {
        id: 'ch4_02',
        title: '幂运算',
        titleEn: 'Exponents',
        xp: 50,
        content: `
## 幂运算

用 \`**\` 做幂运算（乘方）。

\`\`\`python
print(2 ** 3)   # 2³ = 8
print(5 ** 2)   # 5² = 25
print(10 ** 4)  # 10⁴ = 10000
\`\`\`

### 📝 任务
计算 \`3 ** 4\` 并打印结果。
`,
        contentEn: `
## Exponents

Use \`**\` for exponentiation.

\`\`\`python
print(2 ** 3)   # 2³ = 8
print(5 ** 2)   # 5² = 25
print(10 ** 4)  # 10⁴ = 10000
\`\`\`

### 📝 Task
Calculate \`3 ** 4\` and print the result.
`,
        starterCode: '',
        answer: 'print(3 ** 4)',
        hints: ['用 ** 表示乘方', 'Use ** for power'],
        testCases: [{ input: '', expected: '81' }]
      },
      {
        id: 'ch4_03',
        title: '取模运算',
        titleEn: 'Modulo',
        xp: 50,
        content: `
## 取模运算

\`%\` 是取模运算符，返回除法的余数。

\`\`\`python
print(10 % 3)  # → 1 (10 ÷ 3 = 3 余 1)
print(7 % 2)   # → 1 (奇数)
print(8 % 2)   # → 0 (偶数)
\`\`\`

取模常用于判断奇偶数！

### 📝 任务
计算 \`27 % 5\` 并打印结果。
`,
        contentEn: `
## Modulo

\`%\` is the modulo operator, returns the remainder of division.

\`\`\`python
print(10 % 3)  # → 1 (10 ÷ 3 = 3 remainder 1)
print(7 % 2)   # → 1 (odd)
print(8 % 2)   # → 0 (even)
\`\`\`

Modulo is often used to check odd/even numbers!

### 📝 Task
Calculate \`27 % 5\` and print the result.
`,
        starterCode: '',
        answer: 'print(27 % 5)',
        hints: ['% 是取余数', '% gives remainder'],
        testCases: [{ input: '', expected: '2' }]
      },
      {
        id: 'ch4_04',
        title: '综合运算挑战',
        titleEn: 'Math Challenge',
        xp: 100,
        content: `
## 综合运算挑战

结合多种运算：

\`\`\`python
# 计算圆的面积（半径=5）
radius = 5
area = 3.14 * radius ** 2
print(area)
\`\`\`

### 📝 挑战
计算一个长方形的面积。长 \`length = 12\`，宽 \`width = 8\`，面积 = 长 × 宽。打印结果。
`,
        contentEn: `
## Math Challenge

Combine multiple operations:

\`\`\`python
# Calculate circle area (radius=5)
radius = 5
area = 3.14 * radius ** 2
print(area)
\`\`\`

### 📝 Challenge
Calculate rectangle area. \`length = 12\`, \`width = 8\`, area = length × width. Print result.
`,
        starterCode: '',
        answer: 'length = 12\nwidth = 8\narea = length * width\nprint(area)',
        hints: ['面积 = 长 × 宽', 'area = length × width'],
        testCases: [{ input: '', expected: '96' }]
      }
    ]
  },
  {
    id: 'ch5',
    title: 'Chapter 5: 条件迷宫',
    titleEn: 'Chapter 5: Conditional Maze',
    description: '用 if/else 让代码做决策',
    descriptionEn: 'Make decisions with if/else',
    icon: '⚖️',
    lessons: [
      {
        id: 'ch5_01',
        title: 'if 语句',
        titleEn: 'If Statements',
        xp: 50,
        content: `
## if 语句

\`if\` 让代码根据条件做决策。条件为 \`True\` 时执行缩进的代码块。

\`\`\`python
age = 18
if age >= 18:
    print("你已经成年了！")
\`\`\`

> ⚠️ **注意缩进！** Python 用缩进来表示代码块，通常用 4 个空格。

### 📝 任务
创建 \`score = 85\`，如果 \`score >= 60\`，打印 \`"Pass"\`。
`,
        contentEn: `
## If Statements

\`if\` lets code make decisions. When condition is \`True\`, the indented block runs.

\`\`\`python
age = 18
if age >= 18:
    print("You are an adult!")
\`\`\`

> ⚠️ **Indentation matters!** Python uses indentation for code blocks, usually 4 spaces.

### 📝 Task
Create \`score = 85\`, if \`score >= 60\`, print \`"Pass"\`.
`,
        starterCode: '',
        answer: 'score = 85\nif score >= 60:\n    print("Pass")',
        hints: ['if 后面要加冒号', 'Add colon after if condition', 'print 前面要缩进 4 个空格', 'Indent print with 4 spaces'],
        testCases: [{ input: '', expected: 'Pass' }]
      },
      {
        id: 'ch5_02',
        title: 'if-else 语句',
        titleEn: 'If-Else Statements',
        xp: 50,
        content: `
## if-else 语句

\`else\` 在条件为 \`False\` 时执行。

\`\`\`python
age = 16
if age >= 18:
    print("成年人")
else:
    print("未成年人")
\`\`\`

### 📝 任务
创建 \`num = 7\`，如果 \`num % 2 == 0\` 打印 \`"Even"\`，否则打印 \`"Odd"\`。
`,
        contentEn: `
## If-Else Statements

\`else\` runs when condition is \`False\`.

\`\`\`python
age = 16
if age >= 18:
    print("Adult")
else:
    print("Minor")
\`\`\`

### 📝 Task
Create \`num = 7\`, if \`num % 2 == 0\` print \`"Even"\`, otherwise \`"Odd"\`.
`,
        starterCode: '',
        answer: 'num = 7\nif num % 2 == 0:\n    print("Even")\nelse:\n    print("Odd")',
        hints: ['% 2 == 0 判断偶数', '% 2 == 0 checks if even'],
        testCases: [{ input: '', expected: 'Odd' }]
      },
      {
        id: 'ch5_03',
        title: 'elif 多重条件',
        titleEn: 'Elif Conditions',
        xp: 50,
        content: `
## elif 多重条件

用 \`elif\` 检查多个条件。

\`\`\`python
score = 85
if score >= 90:
    print("A")
elif score >= 80:
    print("B")
elif score >= 70:
    print("C")
else:
    print("D")
\`\`\`

### 📝 任务
创建 \`temp = 30\`，根据温度打印描述：
- \`temp > 30\`: "Hot"
- \`temp > 20\`: "Warm"
- 其他: "Cool"
`,
        contentEn: `
## Elif Conditions

Use \`elif\` to check multiple conditions.

\`\`\`python
score = 85
if score >= 90:
    print("A")
elif score >= 80:
    print("B")
elif score >= 70:
    print("C")
else:
    print("D")
\`\`\`

### 📝 Task
Create \`temp = 30\`, print based on temperature:
- \`temp > 30\`: "Hot"
- \`temp > 20\`: "Warm"
- else: "Cool"
`,
        starterCode: '',
        answer: 'temp = 30\nif temp > 30:\n    print("Hot")\nelif temp > 20:\n    print("Warm")\nelse:\n    print("Cool")',
        hints: ['注意条件的顺序', 'Watch the order of conditions'],
        testCases: [{ input: '', expected: 'Warm' }]
      },
      {
        id: 'ch5_04',
        title: '逻辑运算符',
        titleEn: 'Logical Operators',
        xp: 50,
        content: `
## 逻辑运算符

用 \`and\`, \`or\`, \`not\` 组合多个条件。

\`\`\`python
age = 25
has_id = True

if age >= 18 and has_id:
    print("可以进入")

# or: 至少一个为 True
# not: 取反
\`\`\`

### 📝 任务
创建 \`x = 10\`，如果 \`x > 5 and x < 20\` 打印 \`"In range"\`。
`,
        contentEn: `
## Logical Operators

Use \`and\`, \`or\`, \`not\` to combine conditions.

\`\`\`python
age = 25
has_id = True

if age >= 18 and has_id:
    print("Can enter")

# or: at least one is True
# not: negates
\`\`\`

### 📝 Task
Create \`x = 10\`, if \`x > 5 and x < 20\` print \`"In range"\`.
`,
        starterCode: '',
        answer: 'x = 10\nif x > 5 and x < 20:\n    print("In range")',
        hints: ['用 and 连接两个条件', 'Use and to join two conditions'],
        testCases: [{ input: '', expected: 'In range' }]
      },
      {
        id: 'ch5_05',
        title: '条件挑战',
        titleEn: 'Condition Challenge',
        xp: 100,
        content: `
## 条件挑战

综合运用条件判断！

### 📝 挑战
创建 \`year = 2024\`，判断是否为闰年：
- 能被 400 整除 → 闰年
- 能被 4 整除但不能被 100 整除 → 闰年
- 其他 → 不是闰年

如果是闰年打印 \`"Leap year"\`，否则打印 \`"Not leap year"\`。

> 💡 提示：year % 400 == 0 或者 (year % 4 == 0 and year % 100 != 0)
`,
        contentEn: `
## Condition Challenge

Comprehensive condition practice!

### 📝 Challenge
Create \`year = 2024\`, check if it's a leap year:
- Divisible by 400 → Leap year
- Divisible by 4 but not by 100 → Leap year
- Otherwise → Not leap year

Print \`"Leap year"\` or \`"Not leap year"\`.
`,
        starterCode: '',
        answer: 'year = 2024\nif year % 400 == 0:\n    print("Leap year")\nelif year % 4 == 0 and year % 100 != 0:\n    print("Leap year")\nelse:\n    print("Not leap year")',
        hints: [
          // 偶数索引 = 显示给用户的步骤 (Step 1-4)
          // 奇数索引 = 备用/英文版（不显示）
          '【解释】先定义变量 year，赋值为 2024\n【代码】year = 2024',
          '【解释】Assign year = 2024 first\n【代码】year = 2024',
          '【解释】用 if 判断 year 是否能被 400 整除。% 是取模运算符，余数为 0 表示能整除\n【代码】if year % 400 == 0:\n    print("Leap year")',
          '【解释】Use if to check if divisible by 400 (remainder 0)\n【代码】if year % 400 == 0:\n    print("Leap year")',
          '【解释】用 elif 判断能被 4 整除但不能被 100 整除的情况。两个条件用 and 连接\n【代码】elif year % 4 == 0 and year % 100 != 0:\n    print("Leap year")',
          '【解释】Use elif for divisible by 4 but NOT by 100, join with and\n【代码】elif year % 4 == 0 and year % 100 != 0:\n    print("Leap year")',
          '【解释】其他情况都不是闰年，用 else 处理\n【代码】else:\n    print("Not leap year")',
          '【解释】All other cases → not leap year, use else\n【代码】else:\n    print("Not leap year")'
        ],
        testCases: [{ input: '', expected: 'Leap year' }]
      }
    ]
  },
  {
    id: 'ch6',
    title: 'Chapter 6: 循环森林',
    titleEn: 'Chapter 6: Loop Forest',
    description: '用循环重复执行代码',
    descriptionEn: 'Repeat code with loops',
    icon: '🔄',
    lessons: [
      {
        id: 'ch6_01',
        title: 'for 循环基础',
        titleEn: 'For Loop Basics',
        xp: 50,
        content: `
## for 循环基础

\`for\` 循环可以遍历一个范围内的数字。

\`\`\`python
# range(5) → 0, 1, 2, 3, 4
for i in range(5):
    print(i)
\`\`\`

\`range(n)\` 生成从 0 到 n-1 的数字序列。

### 📝 任务
用 for 循环打印数字 0 到 3。
`,
        contentEn: `
## For Loop Basics

\`for\` loop iterates over a sequence of numbers.

\`\`\`python
# range(5) → 0, 1, 2, 3, 4
for i in range(5):
    print(i)
\`\`\`

\`range(n)\` generates numbers from 0 to n-1.

### 📝 Task
Use a for loop to print numbers 0 to 3.
`,
        starterCode: '',
        answer: 'for i in range(4):\n    print(i)',
        hints: ['range(4) 生成0,1,2,3', 'range(4) gives 0,1,2,3'],
        testCases: [{ input: '', expected: '0\n1\n2\n3' }]
      },
      {
        id: 'ch6_02',
        title: '遍历列表',
        titleEn: 'Loop Through List',
        xp: 50,
        content: `
## 遍历列表

用 \`for\` 循环遍历列表中的每个元素。

\`\`\`python
fruits = ["苹果", "香蕉", "橘子"]
for fruit in fruits:
    print(fruit)
\`\`\`

### 📝 任务
创建列表 \`colors = ["red", "green", "blue"]\`，用 for 循环遍历并打印每个颜色。
`,
        contentEn: `
## Loop Through List

Use \`for\` loop to iterate through list items.

\`\`\`python
fruits = ["apple", "banana", "orange"]
for fruit in fruits:
    print(fruit)
\`\`\`

### 📝 Task
Create list \`colors = ["red", "green", "blue"]\`, loop and print each color.
`,
        starterCode: '',
        answer: 'colors = ["red", "green", "blue"]\nfor color in colors:\n    print(color)',
        hints: ['for 变量 in 列表:', 'for variable in list:'],
        testCases: [{ input: '', expected: 'red\ngreen\nblue' }]
      },
      {
        id: 'ch6_03',
        title: 'while 循环',
        titleEn: 'While Loop',
        xp: 50,
        content: `
## while 循环

\`while\` 循环在条件为 True 时持续执行。

\`\`\`python
count = 0
while count < 3:
    print(count)
    count = count + 1
\`\`\`

> ⚠️ 小心无限循环！确保条件最终会变为 False。

### 📝 任务
用 \`while\` 循环从 1 打印到 5。
`,
        contentEn: `
## While Loop

\`while\` loop runs as long as condition is True.

\`\`\`python
count = 0
while count < 3:
    print(count)
    count = count + 1
\`\`\`

> ⚠️ Beware of infinite loops! Make sure the condition eventually becomes False.

### 📝 Task
Use \`while\` loop to print 1 to 5.
`,
        starterCode: '',
        answer: 'i = 1\nwhile i <= 5:\n    print(i)\n    i = i + 1',
        hints: ['i <= 5 作为条件', 'Use i <= 5 as condition'],
        testCases: [{ input: '', expected: '1\n2\n3\n4\n5' }]
      },
      {
        id: 'ch6_04',
        title: 'break 和 continue',
        titleEn: 'Break and Continue',
        xp: 50,
        content: `
## break 和 continue

- \`break\`: 立刻结束循环
- \`continue\`: 跳过本次循环剩余部分

\`\`\`python
for i in range(10):
    if i == 3:
        continue  # 跳过3
    if i == 7:
        break     # 到7结束
    print(i)
# → 0, 1, 2, 4, 5, 6
\`\`\`

### 📝 任务
用 for 循环打印 0 到 9，当 \`i == 5\` 时用 \`break\` 退出。
`,
        contentEn: `
## Break and Continue

- \`break\`: Exit the loop immediately
- \`continue\`: Skip the rest of current iteration

\`\`\`python
for i in range(10):
    if i == 3:
        continue  # skip 3
    if i == 7:
        break     # end at 7
    print(i)
# → 0, 1, 2, 4, 5, 6
\`\`\`

### 📝 Task
Loop from 0 to 9, \`break\` when \`i == 5\`.
`,
        starterCode: '',
        answer: 'for i in range(10):\n    if i == 5:\n        break\n    print(i)',
        hints: ['在 i==5 时 break', 'break when i==5'],
        testCases: [{ input: '', expected: '0\n1\n2\n3\n4' }]
      },
      {
        id: 'ch6_05',
        title: '循环挑战',
        titleEn: 'Loop Challenge',
        xp: 100,
        content: `
## 循环挑战

用循环计算 1 到 100 的和！

### 📝 挑战
创建变量 \`total = 0\`，然后用 for 循环计算 \`1 + 2 + 3 + ... + 100\`，最后打印 \`total\`。

> 💡 提示：\`range(1, 101)\` 生成 1 到 100。
`,
        contentEn: `
## Loop Challenge

Use a loop to calculate the sum from 1 to 100!

### 📝 Challenge
Create \`total = 0\`, then use a for loop to calculate \`1 + 2 + 3 + ... + 100\`, finally print \`total\`.

> 💡 Hint: \`range(1, 101)\` generates 1 to 100.
`,
        starterCode: '',
        answer: 'total = 0\nfor i in range(1, 101):\n    total = total + i\nprint(total)',
        hints: ['每次循环用 total += i 把 i 累加到 total', 'Use total += i to add i to total each iteration'],
        testCases: [{ input: '', expected: '5050' }]
      }
    ]
  },
  {
    id: 'ch7',
    title: 'Chapter 7: 函数神殿',
    titleEn: 'Chapter 7: Function Temple',
    description: '用函数组织和复用代码',
    descriptionEn: 'Organize code with functions',
    icon: '⚡',
    lessons: [
      {
        id: 'ch7_01',
        title: '定义函数',
        titleEn: 'Define Functions',
        xp: 50,
        content: `
## 定义函数

用 \`def\` 关键字定义函数。函数是一段可复用的代码块。

\`\`\`python
def greet():
    print("Hello!")

# 调用函数
greet()
\`\`\`

### 📝 任务
定义一个函数 \`say_hi()\`，功能是打印 \`"Hi there!"\`，然后调用它。
`,
        contentEn: `
## Define Functions

Use \`def\` keyword to define functions. A function is a reusable code block.

\`\`\`python
def greet():
    print("Hello!")

# Call the function
greet()
\`\`\`

### 📝 Task
Define a function \`say_hi()\` that prints \`"Hi there!"\`, then call it.
`,
        starterCode: '',
        answer: 'def say_hi():\n    print("Hi there!")\n\nsay_hi()',
        hints: ['def 函数名():', 'def function_name():', '定义后记得调用函数: say_hi()', 'Don\'t forget to call the function: say_hi()'],
        testCases: [{ input: '', expected: 'Hi there!' }]
      },
      {
        id: 'ch7_02',
        title: '函数参数',
        titleEn: 'Function Parameters',
        xp: 50,
        content: `
## 函数参数

函数可以接收参数（输入值）。

\`\`\`python
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")  # → Hello, Alice!
greet("Bob")    # → Hello, Bob!
\`\`\`

### 📝 任务
定义函数 \`square(n)\`，打印 \`n * n\` 的结果。调用 \`square(4)\`。
`,
        contentEn: `
## Function Parameters

Functions can accept parameters (input values).

\`\`\`python
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")  # → Hello, Alice!
greet("Bob")    # → Hello, Bob!
\`\`\`

### 📝 Task
Define \`square(n)\` that prints \`n * n\`. Call \`square(4)\`.
`,
        starterCode: '',
        answer: 'def square(n):\n    print(n * n)\n\nsquare(4)',
        hints: ['函数体内计算 n*n', 'Calculate n*n inside the function', '定义后记得调用: square(4)', 'Don\'t forget to call: square(4)'],
        testCases: [{ input: '', expected: '16' }]
      },
      {
        id: 'ch7_03',
        title: '返回值',
        titleEn: 'Return Values',
        xp: 50,
        content: `
## 返回值

函数用 \`return\` 返回值，调用者可以接收并使用这个值。

\`\`\`python
def add(a, b):
    return a + b

result = add(3, 5)
print(result)  # → 8
\`\`\`

### 📝 任务
定义函数 \`multiply(x, y)\`，返回 \`x * y\`。调用并打印 \`multiply(6, 7)\` 的结果。
`,
        contentEn: `
## Return Values

Functions use \`return\` to send back a value.

\`\`\`python
def add(a, b):
    return a + b

result = add(3, 5)
print(result)  # → 8
\`\`\`

### 📝 Task
Define \`multiply(x, y)\` that returns \`x * y\`. Call and print \`multiply(6, 7)\`.
`,
        starterCode: '',
        answer: 'def multiply(x, y):\n    return x * y\n\nprint(multiply(6, 7))',
        hints: ['用 return 返回值', 'Use return to send back value'],
        testCases: [{ input: '', expected: '42' }]
      },
      {
        id: 'ch7_04',
        title: '默认参数',
        titleEn: 'Default Parameters',
        xp: 50,
        content: `
## 默认参数

函数参数可以有默认值。如果不传入该参数，就使用默认值。

\`\`\`python
def multiply(a, b=2):
    return a * b

print(multiply(5))     # → 10 （使用默认 b=2）
print(multiply(5, 3))  # → 15
\`\`\`

### 📝 任务
定义函数 \`power(base, exp=2)\`，返回 \`base ** exp\`。调用 \`power(5)\`（使用默认exp=2）并打印结果。
`,
        contentEn: `
## Default Parameters

Function parameters can have default values.

\`\`\`python
def multiply(a, b=2):
    return a * b

print(multiply(5))     # → 10 (uses default b=2)
print(multiply(5, 3))  # → 15
\`\`\`

### 📝 Task
Define \`power(base, exp=2)\` returning \`base ** exp\`. Call \`power(5)\` (using default exp=2) and print.
`,
        starterCode: '',
        answer: 'def power(base, exp=2):\n    return base ** exp\n\nprint(power(5))',
        hints: ['exp=2 设置默认值', 'exp=2 sets default value', '用 return 返回结果，再用 result = power(5) 接收', 'Use return, then result = power(5) to store the value'],
        testCases: [{ input: '', expected: '25' }]
      },
      {
        id: 'ch7_05',
        title: '函数挑战',
        titleEn: 'Function Challenge',
        xp: 100,
        content: `
## 函数挑战

综合运用函数！

### 📝 挑战
定义函数 \`is_even(n)\`，如果 n 是偶数返回 \`True\`，奇数返回 \`False\`。
然后调用 \`is_even(7)\` 和 \`is_even(10)\`，分别打印结果。

> 💡 提示：n % 2 == 0 判断偶数
`,
        contentEn: `
## Function Challenge

Comprehensive function practice!

### 📝 Challenge
Define \`is_even(n)\`, return \`True\` if n is even, \`False\` if odd.
Then call \`is_even(7)\` and \`is_even(10)\`, print results.

> 💡 Hint: n % 2 == 0 checks if even
`,
        starterCode: '',
        answer: 'def is_even(n):\n    return n % 2 == 0\n\nprint(is_even(7))\nprint(is_even(10))',
        hints: ['返回 n % 2 == 0', 'Return n % 2 == 0'],
        testCases: [{ input: '', expected: 'False\nTrue' }]
      }
    ]
  },
  {
    id: 'ch8',
    title: 'Chapter 8: 数据结构城',
    titleEn: 'Chapter 8: Data Structure City',
    description: '学习列表、元组、字典和集合',
    descriptionEn: 'Learn lists, tuples, dicts and sets',
    icon: '🏗️',
    lessons: [
      {
        id: 'ch8_01',
        title: '列表操作',
        titleEn: 'List Operations',
        xp: 50,
        content: `
## 列表操作

列表是最常用的数据结构，可以存储多个值。

\`\`\`python
fruits = ["apple", "banana", "cherry"]

print(fruits[0])     # 访问 → apple
fruits.append("date") # 添加
fruits.remove("banana") # 删除
print(len(fruits))   # 长度
\`\`\`

### 📝 任务
创建列表 \`nums = [10, 20, 30]\`，添加 40，然后打印整个列表。
`,
        contentEn: `
## List Operations

Lists are the most common data structure, storing multiple values.

\`\`\`python
fruits = ["apple", "banana", "cherry"]

print(fruits[0])     # Access → apple
fruits.append("date") # Add
fruits.remove("banana") # Remove
print(len(fruits))   # Length
\`\`\`

### 📝 Task
Create list \`nums = [10, 20, 30]\`, append 40, then print the whole list.
`,
        starterCode: '',
        answer: 'nums = [10, 20, 30]\nnums.append(40)\nprint(nums)',
        hints: ['用 .append() 添加', 'Use .append() to add'],
        testCases: [{ input: '', expected: '[10, 20, 30, 40]' }]
      },
      {
        id: 'ch8_02',
        title: '字典',
        titleEn: 'Dictionaries',
        xp: 50,
        content: `
## 字典

字典用键值对存储数据，用 \`{}\` 创建。

\`\`\`python
student = {
    "name": "Alice",
    "age": 20,
    "grade": "A"
}

print(student["name"])   # → Alice
student["city"] = "Beijing"  # 添加新键
\`\`\`

### 📝 任务
创建字典 \`person = {"name": "Bob", "age": 25}\`，然后打印 \`person["name"]\`。
`,
        contentEn: `
## Dictionaries

Dictionaries store key-value pairs, created with \`{}\`.

\`\`\`python
student = {
    "name": "Alice",
    "age": 20,
    "grade": "A"
}

print(student["name"])   # → Alice
student["city"] = "Beijing"  # Add new key
\`\`\`

### 📝 Task
Create dict \`person = {"name": "Bob", "age": 25}\`, then print \`person["name"]\`.
`,
        starterCode: '',
        answer: 'person = {"name": "Bob", "age": 25}\nprint(person["name"])',
        hints: ['用 [] 访问字典值', 'Use [] to access dict values'],
        testCases: [{ input: '', expected: 'Bob' }]
      },
      {
        id: 'ch8_03',
        title: '元组',
        titleEn: 'Tuples',
        xp: 50,
        content: `
## 元组

元组与列表类似，但**创建后不可修改**。用 \`()\` 创建。

\`\`\`python
point = (3, 7)
x, y = point       # 解包
print(x, y)        # → 3 7
print(point[0])    # → 3  用索引访问第一个元素

# point[0] = 10   # ❌ 错误！元组不可变
\`\`\`

元组适合存储不应改变的数据，如坐标、配置等。

### 📝 任务
创建元组 \`rgb = (255, 128, 0)\`，打印第一个元素（红色值）。
`,
        contentEn: `
## Tuples

Tuples are like lists but **immutable** (can't be changed). Created with \`()\`.

\`\`\`python
point = (3, 7)
x, y = point       # Unpacking
print(x, y)        # → 3 7
print(point[0])    # → 3  Access first element by index

# point[0] = 10   # ❌ Error! Tuples are immutable
\`\`\`

### 📝 Task
Create tuple \`rgb = (255, 128, 0)\`, print the first element (red value).
`,
        starterCode: '',
        answer: 'rgb = (255, 128, 0)\nprint(rgb[0])',
        hints: ['用索引访问元组元素', 'Access tuple elements by index'],
        testCases: [{ input: '', expected: '255' }]
      },
      {
        id: 'ch8_04',
        title: '数据结构综合',
        titleEn: 'Data Structure Project',
        xp: 100,
        content: `
## 数据结构综合

组合使用列表和字典！

\`\`\`python
# 学生成绩管理系统
students = [
    {"name": "Alice", "score": 95},
    {"name": "Bob", "score": 82},
    {"name": "Charlie", "score": 78}
]

for s in students:
    print(f"{s['name']}: {s['score']}")
\`\`\`

### 📝 挑战
创建列表 \`inventory\`，包含三个字典：
- \`{"item": "sword", "qty": 1}\`
- \`{"item": "shield", "qty": 2}\`
- \`{"item": "potion", "qty": 5}\`

然后遍历并打印每个物品。
`,
        contentEn: `
## Data Structure Project

Combine lists and dictionaries!

\`\`\`python
# Student grade management
students = [
    {"name": "Alice", "score": 95},
    {"name": "Bob", "score": 82},
    {"name": "Charlie", "score": 78}
]

for s in students:
    print(f"{s['name']}: {s['score']}")
\`\`\`

### 📝 Challenge
Create \`inventory\` list with three dicts, then loop and print each item.
`,
        starterCode: '',
        answer: 'inventory = [\n    {"item": "sword", "qty": 1},\n    {"item": "shield", "qty": 2},\n    {"item": "potion", "qty": 5}\n]\n\nfor item in inventory:\n    print(item["item"])',
        hints: ['遍历列表，打印每个字典的item键', 'Loop the list, print item key of each dict'],
        testCases: [{ input: '', expected: 'sword\nshield\npotion' }]
      }
    ]
  },
  {
    id: 'ch9',
    title: '最终项目',
    titleEn: 'Final Project',
    description: '综合运用所学知识构建项目',
    descriptionEn: 'Build projects using everything you learned',
    icon: '🏆',
    lessons: [
      {
        id: 'ch9_01',
        title: '猜数字游戏',
        titleEn: 'Number Guessing Game',
        xp: 200,
        content: `
## 猜数字游戏

恭喜你走到了这里！让我们做一个完整的猜数字游戏。

游戏规则：
1. 程序设定一个 1-100 的秘密数字
2. 玩家猜数字，程序提示"高了"或"低了"
3. 猜中后显示猜的次数

\`\`\`python
import random

secret = random.randint(1, 100)
guess = 0
attempts = 0

while guess != secret:
    guess = int(input("猜一个数字(1-100): "))
    attempts += 1
    if guess < secret:
        print("低了！")
    elif guess > secret:
        print("高了！")

print(f"恭喜！你猜了{attempts}次！")
\`\`\`

### 📝 挑战
用 \`while\` 循环实现猜数字游戏。先创建 \`secret = 42\`（简化版），然后让用户猜，直到猜对为止。

> 💡 **完整代码：**
>
> \`\`\`python
> secret = 42
> guess = 0
> attempts = 0
>
> while guess != secret:
>     guess = int(input("猜一个数字(1-100): "))
>     attempts += 1
>     if guess < secret:
>         print("低了！")
>     elif guess > secret:
>         print("高了！")
>
> print(f"恭喜！你猜了{attempts}次！")
> \`\`\`
>
> 缩进规则：
> \`\`\`
> while guess != secret:     ← 不缩进
>     ...                     ← 缩进 4 格（属于 while）
>     ...                     ← 缩进 4 格
>                             ← while 结束
> print(...)                  ← 不缩进（和 while 对齐，在循环外面）
> \`\`\`
`,
        contentEn: `
## Number Guessing Game

Congratulations on making it this far! Let's build a complete number guessing game.

### 📝 Challenge
Implement a number guessing game. Create \`secret = 42\`, let user guess until correct.

> 💡 Hint: Plan your loop condition first (when to stop), then inside the loop: read input, compare, count attempts.
`,
        starterCode: '',
        answer: 'secret = 42\nprint("Guess the number!")\n\nwhile True:\n    guess = int(input())\n    if guess < secret:\n        print("Too low!")\n    elif guess > secret:\n        print("Too high!")\n    else:\n        print("Correct!")\n        break',
        hints: [
          '先定义 secret = 42，再初始化 guess = 0 和 attempts = 0',
          'First define secret = 42, then init guess = 0 and attempts = 0',
          '用 while guess != secret: 做循环条件，注意冒号和缩进',
          'Use while guess != secret: as loop condition, watch colon and indent',
          '循环内用 int(input()) 获取玩家输入，每次 attempts += 1',
          'Use int(input()) for player input inside loop, increment attempts',
          '用 if guess < secret 提示"低了！"，elif guess > secret 提示"高了！"',
          'Use if guess < secret for "Too low", elif guess > secret for "Too high"',
          '循环结束后用 f-string 打印 print(f"恭喜！你猜了{attempts}次！")',
          'After loop, use f-string: print(f"You got it in {attempts} tries!")'
        ],
        testCases: [
          { input: '50\n42', expected: '猜一个数字(1-100): 50\n高了！\n猜一个数字(1-100): 42\n恭喜！你猜了2次！' },
          { input: '30\n42', expected: '猜一个数字(1-100): 30\n低了！\n猜一个数字(1-100): 42\n恭喜！你猜了2次！' },
          { input: '42', expected: '猜一个数字(1-100): 42\n恭喜！你猜了1次！' }
        ]
      },
      {
        id: 'ch9_02',
        title: '毕业项目',
        titleEn: 'Graduation Project',
        xp: 200,
        content: `
## 🏆 毕业项目：简单计算器

创建自己的函数库！用学过的函数知识，实现一个简单计算器。

### 📝 最终挑战

定义以下四个函数，每个都接收 \`a\` 和 \`b\` 两个参数：
1. \`add(a, b)\` - 返回 a + b
2. \`sub(a, b)\` - 返回 a - b
3. \`mul(a, b)\` - 返回 a * b
4. \`div(a, b)\` - 返回 a / b（如果 b=0，返回 "Error"）

然后依次用 \`a=10, b=5\` 调用它们并打印结果。

> 🎉 完成后恭喜你毕业了！
`,
        contentEn: `
## 🏆 Graduation Project: Simple Calculator

Create your own function library! Use what you've learned about functions.

### 📝 Final Challenge

Define four functions:
1. \`add(a, b)\` - return a + b
2. \`sub(a, b)\` - return a - b
3. \`mul(a, b)\` - return a * b
4. \`div(a, b)\` - return a / b (if b=0, return "Error")

Then call them with \`a=10, b=5\` and print results.

> 🎉 Complete this to graduate!
`,
        starterCode: '',
        answer: 'def add(a, b):\n    return a + b\n\ndef sub(a, b):\n    return a - b\n\ndef mul(a, b):\n    return a * b\n\ndef div(a, b):\n    if b == 0:\n        return "Error"\n    return a / b\n\nprint(add(10, 5))\nprint(sub(10, 5))\nprint(mul(10, 5))\nprint(div(10, 5))',
        hints: ['定义所有4个函数', 'Define all 4 functions', 'div 函数要处理 b=0', 'div needs to handle b=0'],
        testCases: [{ input: '', expected: '15\n5\n50\n2.0' }]
      }
    ]
  },
  {
    id: 'ch10',
    title: 'Chapter 10: 快捷键大师',
    titleEn: 'Chapter 10: Shortcut Master',
    description: '用快捷键让编程效率翻倍，支持 macOS / Win / Linux / HarmonyOS',
    descriptionEn: 'Double your coding speed with shortcuts, supports macOS / Win / Linux / HarmonyOS',
    icon: '⌨️',
    lessons: [
      {
        id: 'ch10_01',
        title: '认识快捷键',
        titleEn: 'Know Your Shortcuts',
        xp: 50,
        content: `
## 认识快捷键

快捷键是提升编程效率的"秘密武器"！记住一组按键就能代替鼠标点来点去。

### ⌨️ 核心按键对照

| macOS | Windows / Linux / HarmonyOS | 含义 |
|-------|------|------|
| \`⌘\` (Command) | \`Ctrl\` | 主要修饰键 |
| \`⌥\` (Option) | \`Alt\` | 辅助修饰键 |
| \`⇧\` (Shift) | \`Shift\` | 大写切换 |
| \`⌃\` (Control) | \`Ctrl\`（部分场景） | 终端控制 |

> 💡 在你的 Mac 上：\`⌘ = Command 键\`，大部分编辑操作都用它。

### 📝 任务
先热热身！下面代码分别打印了不同系统的快捷键符号，补全代码让它输出 Mac 的快捷键符号：
\`"⌘"\`
`,
        contentEn: `
## Know Your Shortcuts

Hotkeys are the "secret weapons" of coding efficiency! A single key combo replaces multiple mouse clicks.

### ⌨️ Key Reference

| macOS | Windows / Linux / HarmonyOS | Meaning |
|-------|------|------|
| \`⌘\` (Command) | \`Ctrl\` | Primary modifier |
| \`⌥\` (Option) | \`Alt\` | Secondary modifier |
| \`⇧\` (Shift) | \`Shift\` | Capitalize |
| \`⌃\` (Control) | \`Ctrl\` | Terminal control |

> 💡 On your Mac: \`⌘ = Command key\`, used for most editing operations.

### 📝 Task
Warm up! The code below prints shortcut symbols for different systems. Complete it to output the Mac shortcut symbol:
\`"⌘"\`
`,
        starterCode: '# 不同系统的快捷键符号\nwin = "Ctrl"\nlin = "Ctrl"\nmac = ""\n\nprint(mac)',
        answer: 'win = "Ctrl"\nlin = "Ctrl"\nmac = "⌘"\n\nprint(mac)',
        hints: ['macOS 的快捷键符号是 ⌘', 'The macOS shortcut symbol is ⌘'],
        testCases: [{ input: '', expected: '⌘' }]
      },
      {
        id: 'ch10_02',
        title: '运行代码',
        titleEn: 'Run Your Code',
        xp: 50,
        content: `
## 运行代码

最常用的快捷键就是**运行代码**！

### ▶️ 运行快捷键

| 系统 | 快捷键 |
|------|--------|
| macOS | \`⌘ + Enter\` 或 \`⌃ + F5\` |
| Windows | \`Ctrl + Enter\` 或 \`Ctrl + F5\` |
| Linux | \`Ctrl + Enter\` 或 \`Ctrl + F5\` |
| HarmonyOS | \`Ctrl + Enter\` 或 \`Ctrl + F5\` |

> 💡 当前页面右上角就显示了运行快捷键，每次写完代码按一下就能看到结果。

### 📝 任务
用 \`print()\` 输出 macOS 的运行快捷键文本 \`"Cmd+Enter"\`。
`,
        contentEn: `
## Run Your Code

The most used shortcut is **Run Code**!

### ▶️ Run Shortcuts

| System | Shortcut |
|--------|----------|
| macOS | \`⌘ + Enter\` or \`⌃ + F5\` |
| Windows | \`Ctrl + Enter\` or \`Ctrl + F5\` |
| Linux | \`Ctrl + Enter\` or \`Ctrl + F5\` |
| HarmonyOS | \`Ctrl + Enter\` or \`Ctrl + F5\` |

> 💡 The run shortcut is displayed in the top-right corner of this page. Use it after writing code.

### 📝 Task
Use \`print()\` to output the macOS run shortcut text \`"Cmd+Enter"\`.
`,
        starterCode: '# 输出你的系统的运行快捷键\nprint()',
        answer: 'print("Cmd+Enter")',
        hints: ['在 print() 的括号里输入文本', 'Put text inside print() parentheses'],
        testCases: [{ input: '', expected: 'Cmd+Enter' }]
      },
      {
        id: 'ch10_03',
        title: '注释与反注释',
        titleEn: 'Comment & Uncomment',
        xp: 50,
        content: `
## 注释与反注释

注释是给代码写"便签"，帮助自己和他人理解代码。快捷键一键添加/移除注释！

### 💬 注释快捷键

| 系统 | 快捷键 |
|------|--------|
| macOS | \`⌘ + /\` |
| Windows | \`Ctrl + /\` |
| Linux | \`Ctrl + /\` |
| HarmonyOS | \`Ctrl + /\` |

选中一行或多行代码，按快捷键即可添加注释（\`#\`）；再次按则取消注释。

> 💡 代码中的 \`#\` 是 Python 注释符号，\`#\` 后面的内容不会被运行。

### 📝 任务
下面代码中有一行被注释掉了。取消注释它（删除 \`#\`），让程序输出正确的结果。
`,
        contentEn: `
## Comment & Uncomment

Comments are "sticky notes" for your code. Use shortcuts to toggle them instantly!

### 💬 Comment Shortcuts

| System | Shortcut |
|--------|----------|
| macOS | \`⌘ + /\` |
| Windows | \`Ctrl + /\` |
| Linux | \`Ctrl + /\` |
| HarmonyOS | \`Ctrl + /\` |

Select one or more lines and press the shortcut to add comments (\`#\`); press again to remove.

> 💡 \`#\` is the Python comment symbol. Everything after it is ignored when running.

### 📝 Task
One line below is commented out. Remove the \`#\` to make the program output correctly.
`,
        starterCode: '# msg = "Python Shortcuts"\nprint(msg)',
        answer: 'msg = "Python Shortcuts"\nprint(msg)',
        hints: ['删除 #msg 前面的 # 符号', 'Remove the # before msg', '确保 msg 的值为 "Python Shortcuts"', 'Make sure msg = "Python Shortcuts"'],
        testCases: [{ input: '', expected: 'Python Shortcuts' }]
      },
      {
        id: 'ch10_04',
        title: '代码格式化',
        titleEn: 'Code Formatting',
        xp: 50,
        content: `
## 代码格式化

整洁的代码不仅好看，而且更容易发现 bug。一键格式化让代码自动对齐！

### ✨ 格式化快捷键

| 系统 | 快捷键 |
|------|--------|
| macOS | \`⇧ + ⌥ + F\` |
| Windows | \`Shift + Alt + F\` |
| Linux | \`Shift + Alt + F\` |
| HarmonyOS | \`Shift + Alt + F\` |

格式化会自动处理：缩进对齐、多余空格、空行等。

> 💡 Python 用缩进（4个空格）表示代码块，格式化快捷键确保缩进始终正确。

### 📝 任务
下面代码的缩进乱了。在代码编辑器中修复缩进，让函数能正确运行并输出 \`"20"\`。
`,
        contentEn: `
## Code Formatting

Clean code is easier to read and debug. One shortcut auto-formats your code!

### ✨ Format Shortcuts

| System | Shortcut |
|--------|----------|
| macOS | \`⇧ + ⌥ + F\` |
| Windows | \`Shift + Alt + F\` |
| Linux | \`Shift + Alt + F\` |
| HarmonyOS | \`Shift + Alt + F\` |

Formatting handles: indentation, extra spaces, blank lines, and more.

> 💡 Python uses indentation (4 spaces) for code blocks. The format shortcut keeps indentation perfect.

### 📝 Task
The indentation below is broken. Fix the indentation so the function runs correctly and outputs \`"20"\`.
`,
        starterCode: 'def add(a, b):\nresult = a + b\nreturn result\n\nprint(add(8, 12))',
        answer: 'def add(a, b):\n    result = a + b\n    return result\n\nprint(add(8, 12))',
        hints: ['函数体内的代码需要缩进4个空格', 'Code inside functions needs 4-space indentation', 'print() 不需要缩进，它在函数外面', 'print() should not be indented, it is outside the function'],
        testCases: [{ input: '', expected: '20' }]
      },
      {
        id: 'ch10_05',
        title: '快捷键终极挑战',
        titleEn: 'Shortcut Final Challenge',
        xp: 100,
        content: `
## 🔥 快捷键终极挑战

你已经学会了常用的编程快捷键！现在来做一个快捷键速查表。

### 📖 本课学到的快捷键

| 操作 | macOS | Win / Linux / HarmonyOS |
|------|-------|-------------------------|
| 运行代码 | \`⌘ + Enter\` | \`Ctrl + Enter\` |
| 注释/反注释 | \`⌘ + /\` | \`Ctrl + /\` |
| 格式化代码 | \`⇧ + ⌥ + F\` | \`Shift + Alt + F\` |
| 保存文件 | \`⌘ + S\` | \`Ctrl + S\` |
| 撤销 | \`⌘ + Z\` | \`Ctrl + Z\` |

> 💡 不止这章学到的，你可以在主菜单的「快捷键」页面查看全部快捷键。

### 📝 挑战
用 \`print()\` 输出以下内容（每行一个，共三行）：
- \`"Mac: ⌘+Enter"\`
- \`"Win: Ctrl+Enter"\`
- \`"Linux: Ctrl+Enter"\`

> 💡 提示：用三个 \`print()\`，每个输出一行。
`,
        contentEn: `
## 🔥 Shortcut Final Challenge

You've learned the essential coding shortcuts! Now create a shortcut reference chart.

### 📖 Shortcuts You've Learned

| Action | macOS | Win / Linux / HarmonyOS |
|--------|-------|-------------------------|
| Run Code | \`⌘ + Enter\` | \`Ctrl + Enter\` |
| Toggle Comment | \`⌘ + /\` | \`Ctrl + /\` |
| Format Code | \`⇧ + ⌥ + F\` | \`Shift + Alt + F\` |
| Save File | \`⌘ + S\` | \`Ctrl + S\` |
| Undo | \`⌘ + Z\` | \`Ctrl + Z\` |

> 💡 Check the "Shortcuts" page in the main menu for the full reference.

### 📝 Challenge
Use \`print()\` to output (one per line, three lines total):
- \`"Mac: ⌘+Enter"\`
- \`"Win: Ctrl+Enter"\`
- \`"Linux: Ctrl+Enter"\`

> 💡 Hint: Use three \`print()\` calls, one per line.
`,
        starterCode: '# 快捷键速查表\n# 用 print() 输出三个系统的运行快捷键\n\n',
        answer: 'print("Mac: ⌘+Enter")\nprint("Win: Ctrl+Enter")\nprint("Linux: Ctrl+Enter")',
        hints: ['用三个 print() 各输出一行', 'Use three print() calls, one per line', '字符串需要用引号包裹', 'Strings need to be wrapped in quotes'],
        testCases: [{ input: '', expected: 'Mac: ⌘+Enter\nWin: Ctrl+Enter\nLinux: Ctrl+Enter' }]
      }
    ]
  },
{
    id: 'ch11',
    title: 'Chapter 11: 文件探险',
    titleEn: 'Chapter 11: File Adventure',
    description: '学习读写文件，让数据持久化',
    descriptionEn: 'Learn to read/write files, make data persistent',
    icon: '📂',
    lessons: [
      {
        id: 'ch11_01',
        title: '打开文件',
        titleEn: 'Opening Files',
        xp: 50,
        content: `
## 打开文件

用 \`open()\` 函数可以打开文件。第一个参数是文件名，第二个参数是模式。

常见模式：
- \`"r"\` - 读取（默认）
- \`"w"\` - 写入（会覆盖原有内容）
- \`"a"\` - 追加（在末尾添加）

打开文件后可以用 \`.write()\` 写入内容，用 \`.read()\` 读取内容。**记得用 \`.close()\` 关闭文件！**

\`\`\`python
file = open("test.txt", "w")  # 写模式
file.write("Hello!")
file.close()                  # 关闭文件

file = open("test.txt", "r")  # 读模式
content = file.read()
file.close()
print(content)
\`\`\`

> 💡 这个关卡中，文件操作会用模拟方式运行，让你学习基本概念。

### 📝 任务
打开文件写入 "Welcome!" 后，再读取并打印文件内容。

**补全代码：** 在代码编辑器中已经写好了打开和写入的部分，请在注释下方补充读取和打印的代码。
`,
        contentEn: `
## Opening Files

Use \`open()\` to open files. First argument is filename, second is mode.

Common modes:
- \`"r"\` - Read (default)
- \`"w"\` - Write (overwrites)
- \`"a"\` - Append (adds to end)

Use \`.write()\` to write data and \`.read()\` to read. **Always \`.close()\` the file!**

\`\`\`python
file = open("test.txt", "w")
file.write("Hello!")
file.close()

file = open("test.txt", "r")
content = file.read()
file.close()
print(content)
\`\`\`

> 💡 File operations are simulated in this game to teach basic concepts.

### 📝 Task
Write "Welcome!" to a file, then read it back and print the content.

**Complete the code:** The writing part is already in the editor. Add code to read and print below the comment.
`,
        starterCode: `file = open("notes.txt", "w")
file.write("Welcome!")
file.close()

# 读取文件并打印内容
`,
        answer: `file = open("notes.txt", "w")
file.write("Welcome!")
file.close()

file = open("notes.txt", "r")
content = file.read()
file.close()
print(content)`,
        hints: [
          '用 `open("notes.txt", "r")` 以读取模式打开文件',
          'Use `open("notes.txt", "r")` to open the file in read mode',
          '用 `file.read()` 读取内容存入变量，如 `content = file.read()`',
          'Use `file.read()` to read content into a variable like `content = file.read()`',
          '关闭文件后用 `print(content)` 输出读取的内容',
          'Close the file, then use `print(content)` to print the content'
        ],
        testCases: [{ input: '', expected: 'Welcome!' }]
      },
      {
        id: 'ch11_02',
        title: '写入文件',
        titleEn: 'Writing Files',
        xp: 50,
        content: `
## 写入与覆盖

用 \`"w"\` 模式打开文件可以写入内容。**注意：** \`"w"\` 模式会**覆盖**文件原有内容！

\`\`\`python
file = open("test.txt", "w")
file.write("第一行内容")
file.close()
\`\`\`

写完后用 \`.close()\` 关闭文件很重要，否则数据可能没有真正保存。

### 📝 任务
下面的代码先写入了 "旧数据"，然后用 \`"w"\` 模式重新打开文件。请在 \`"w"\` 模式下写入新内容 "新数据"，然后读取并打印文件内容。

> 💡 操作步骤：
> 1. 在第 2 个 \`open("data.txt", "w")\` 下面写 \`file.write("新数据")\`
> 2. 关闭文件：\`file.close()\`
> 3. 以 "r" 模式打开文件：\`file = open("data.txt", "r")\`
> 4. 读取并打印：\`print(file.read())\`
> 5. 关闭文件：\`file.close()\`
`,
        contentEn: `
## Writing & Overwriting

Open with \`"w"\` mode to write content. **Important:** \`"w"\` mode **overwrites** the file!

\`\`\`python
file = open("test.txt", "w")
file.write("First line")
file.close()
\`\`\`

Always \`.close()\` the file after writing — otherwise data may not be saved.

### 📝 Task
The code first writes "旧数据" (old data), then opens the file again in \`"w"\` mode. Write the new content "新数据" (new data), then read and print the file.

> 💡 Steps:
> 1. After the 2nd \`open("data.txt", "w")\`, write \`file.write("新数据")\`
> 2. Close: \`file.close()\`
> 3. Open in "r" mode: \`file = open("data.txt", "r")\`
> 4. Read and print: \`print(file.read())\`
> 5. Close: \`file.close()\`
`,
        starterCode: `file = open("data.txt", "w")
file.write("旧数据")
file.close()

# 用 "w" 模式重新打开（会覆盖旧数据）
file = open("data.txt", "w")
`,
        answer: `file = open("data.txt", "w")
file.write("旧数据")
file.close()

file = open("data.txt", "w")
file.write("新数据")
file.close()

file = open("data.txt", "r")
print(file.read())
file.close()`,
        hints: [
          '在 `file = open("data.txt", "w")` 下一行用 `file.write("新数据")` 写入',
          'After `file = open("data.txt", "w")`, add `file.write("新数据")` to write new content',
          '写入后关闭文件，再用 "r" 模式打开读取',
          'Close after writing, then open with "r" mode to read',
          '用 `print(file.read())` 输出文件内容',
          'Use `print(file.read())` to output the file content'
        ],
        testCases: [{ input: '', expected: '新数据' }]
      },
      {
        id: 'ch11_03',
        title: '追加内容',
        titleEn: 'Appending Content',
        xp: 50,
        content: `
## 追加内容

用 \`"a"\` 模式可以在文件末尾**添加**内容，不会覆盖原有数据。

对比以下两种模式：
- \`"w"\` - **覆盖**（清空文件再写入）
- \`"a"\` - **追加**（在末尾继续添加）

\`\`\`python
file = open("log.txt", "a")
file.write("新的日志条目\n")
file.close()
\`\`\`

> \`\\n\` 是换行符！

### 📝 任务
下面的代码已经创建了一个文件并写入了第一条日志。请在 \`"a"\` 模式下追加第二条日志，然后读取并打印文件的**全部**内容。

> 💡 操作步骤：
> 1. 在 \`open("log.txt", "a")\` 下面写 \`file.write("日志2: 用户登录\\n")\`
> 2. 关闭文件：\`file.close()\`
> 3. 用 "r" 模式打开并读取：\`file = open("log.txt", "r")\`
> 4. 打印内容：\`print(file.read())\`
> 5. 关闭文件：\`file.close()\`
`,
        contentEn: `
## Appending Content

Use \`"a"\` mode to **add** content at the end of a file, preserving existing data.

Compare:
- \`"w"\` - **Overwrite** (clear then write)
- \`"a"\` - **Append** (add to end)

\`\`\`python
file = open("log.txt", "a")
file.write("New log entry\n")
file.close()
\`\`\`

> \`\\n\` is the newline character!

### 📝 Task
A file was already created with the first log entry. Use \`"a"\` mode to append a second log entry, then read and print the **entire** file content.

> 💡 Steps:
> 1. After \`open("log.txt", "a")\`, write \`file.write("日志2: 用户登录\\n")\`
> 2. Close: \`file.close()\`
> 3. Open in "r" mode: \`file = open("log.txt", "r")\`
> 4. Print: \`print(file.read())\`
> 5. Close: \`file.close()\`
`,
        starterCode: 'file = open("log.txt", "w")\nfile.write("日志1: 程序启动\\n")\nfile.close()\n\n# 用 "a" 模式追加第二条日志\nfile = open("log.txt", "a")\n',
        answer: 'file = open("log.txt", "w")\nfile.write("日志1: 程序启动\\n")\nfile.close()\n\nfile = open("log.txt", "a")\nfile.write("日志2: 用户登录\\n")\nfile.close()\n\nfile = open("log.txt", "r")\nprint(file.read())\nfile.close()',
        hints: [
          '在 `file = open("log.txt", "a")` 后用 `file.write("日志2: 用户登录\\n")` 追加',
          'After `file = open("log.txt", "a")`, use `file.write("日志2: 用户登录\\n")` to append',
          '追加后关闭文件，再用 "r" 模式打开读取全部内容',
          'Close after appending, then open with "r" mode to read everything',
          '使用 `print(file.read())` 输出读取的内容',
          'Use `print(file.read())` to output the content'
        ],
        testCases: [{ input: '', expected: '日志1: 程序启动\n日志2: 用户登录' }]
      },
      {
        id: 'ch11_04',
        title: '文件操作挑战',
        titleEn: 'File Challenge',
        xp: 100,
        content: `
## 文件操作挑战

现在把学到的文件操作综合运用起来。

完整的文件操作流程：
1. 用 \`open()\` 打开文件（指定模式）
2. 用 \`.write()\` 写入或用 \`.read()\` 读取
3. 用 \`.close()\` 关闭文件

### 📝 任务
创建一个"备忘录"程序：

1. 用 \`"w"\` 模式创建 \`memo.txt\`，写入标题 \`"TODO List\\n"\`
2. 用 \`"a"\` 模式追加两个事项：\`"- Learn Python\\n"\` 和 \`"- Master files\\n"\`
3. 用 \`"r"\` 模式读取全部内容并打印

> 💡 操作步骤：
> 1. 第 2 步：用 \`open("memo.txt", "a")\` 以追加模式打开文件
> 2. 分两次 \`file.write()\` 写入两条事项：\`file.write("- Learn Python\\n")\` 和 \`file.write("- Master files\\n")\`
> 3. 关闭文件：\`file.close()\`
> 4. 第 3 步：用 \`open("memo.txt", "r")\` 打开读取
> 5. 用 \`print(file.read())\` 输出内容
> 6. 关闭文件：\`file.close()\`
>
> ⚠️ 注意：每条事项需要用单独一行 \`file.write()\`，不要用 \`and\` 连接！
`,
        contentEn: `
## File Challenge

Now combine everything you've learned about file operations.

Complete file workflow:
1. Use \`open()\` to open a file (specify mode)
2. Use \`.write()\` to write or \`.read()\` to read
3. Use \`.close()\` to close the file

### 📝 Task
Create a "memo" program:

1. Open \`memo.txt\` in \`"w"\` mode, write the title \`"TODO List\\n"\`
2. Use \`"a"\` mode to append two items: \`"- Learn Python\\n"\` and \`"- Master files\\n"\`
3. Use \`"r"\` mode to read everything and print it

> 💡 Steps:
> 1. Step 2: Open with \`open("memo.txt", "a")\` in append mode
> 2. Write each item with separate \`file.write()\` calls: \`file.write("- Learn Python\\n")\` and \`file.write("- Master files\\n")\`
> 3. Close: \`file.close()\`
> 4. Step 3: Open with \`open("memo.txt", "r")\` in read mode
> 5. Print: \`print(file.read())\`
> 6. Close: \`file.close()\`
>
> ⚠️ Each item needs its own \`file.write()\` line — don't use \`and\` to combine them!
`,
        starterCode: '# 第1步：用 "w" 创建文件并写入标题\nfile = open("memo.txt", "w")\nfile.write("TODO List\\n")\nfile.close()\n\n# 第2步：用 "a" 追加事项\n\n\n# 第3步：用 "r" 读取并打印\n',
        answer: 'file = open("memo.txt", "w")\nfile.write("TODO List\\n")\nfile.close()\n\nfile = open("memo.txt", "a")\nfile.write("- Learn Python\\n")\nfile.write("- Master files\\n")\nfile.close()\n\nfile = open("memo.txt", "r")\nprint(file.read())\nfile.close()',
        hints: [
          '第2步：用 `open("memo.txt", "a")` 以追加模式打开，然后用 `file.write()` 写入两条事项',
          'Step 2: Use `open("memo.txt", "a")` to open in append mode, then `file.write()` for each item',
          '每条事项都需要 `\\n` 换行符，如 `file.write("- Learn Python\\n")`',
          'Each item needs a `\\n` newline, e.g. `file.write("- Learn Python\\n")`',
          '第3步：用 `open("memo.txt", "r")` 读取，然后用 `print(file.read())` 输出',
          'Step 3: Use `open("memo.txt", "r")` to read, then `print(file.read())` to output'
        ],
        testCases: [{ input: '', expected: 'TODO List\n- Learn Python\n- Master files' }]
      }
    ]
  },
  {
    id: 'ch12',
    title: 'Chapter 12: 异常处理',
    titleEn: 'Chapter 12: Exception Handling',
    description: '学会优雅地处理程序错误',
    descriptionEn: 'Learn to handle errors gracefully',
    icon: '🛡️',
    lessons: [
      {
        id: 'ch12_01',
        title: 'try-except',
        titleEn: 'Try-Except',
        xp: 50,
        content: `
## try-except

程序运行时会出错。用 \`try-except\` 可以捕获并处理错误，防止程序崩溃。

\`\`\`python
try:
    num = int("abc")  # 这会出错！
except:
    print("转换失败了！")
\`\`\`

> 💡 即使出错，程序也会继续执行。

### 📝 任务

下面的代码在执行时，\`int("abc")\` 会引发 \`ValueError\` 导致程序崩溃。
请用 \`try-except\` 包裹它，让程序在出错时打印 \`"Error handled gracefully"\`。

💡 Step 1：在 \`num = int("abc")\` 上面加一行 \`try:\`
💡 Step 2：记住 \`try:\` 下面的代码需要缩进 4 个空格
💡 Step 3：在最后加一行 \`except:\`，下面缩进 4 个空格写 \`print("Error handled gracefully")\`
`,
        contentEn: `
## Try-Except

Programs can have errors. Use \`try-except\` to catch and handle them.

\`\`\`python
try:
    num = int("abc")  # This will error!
except:
    print("Conversion failed!")
\`\`\`

> 💡 The program continues even after an error.

### 📝 Task

The code below crashes because \`int("abc")\` raises a \`ValueError\`.
Wrap it with \`try-except\` so the program prints \`"Error handled gracefully"\` when the error occurs.

💡 Step 1: Add \`try:\` above \`num = int("abc")\`
💡 Step 2: Indent \`num = int("abc")\` by 4 spaces under \`try:\`
💡 Step 3: Add \`except:\` after the indented line, then indent \`print("Error handled gracefully")\` by 4 spaces under \`except:\`
`,
        starterCode: 'num = int("abc")',
        answer: 'try:\n    num = int("abc")\nexcept:\n    print("Error handled gracefully")',
        hints: [
          '在 num = int("abc") 上面加一行 try:，然后把 num = int("abc") 缩进 4 个空格',
          'Add try: above num = int("abc"), then indent num = int("abc") by 4 spaces',
          '缩进完后，在最后加一行 except:，再缩进 4 个空格写 print("Error handled gracefully")',
          'Then add except: after it, and indent print("Error handled gracefully") by 4 spaces under except:'
        ],
        testCases: [{ input: '', expected: 'Error handled gracefully' }]
      },
      {
        id: 'ch12_02',
        title: '捕获特定异常',
        titleEn: 'Catch Specific Exceptions',
        xp: 50,
        content: `
## 捕获特定异常

可以指定捕获特定类型的错误。

\`\`\`python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("不能除以零！")
except ValueError:
    print("数值错误！")
\`\`\`

常见的异常类型：
- \`ZeroDivisionError\`: 除以零
- \`ValueError\`: 无效值
- \`TypeError\`: 类型错误
- \`FileNotFoundError\`: 文件未找到

### 📝 任务
把下面的 \`except:\` 改为捕获特定异常类型，输出 \`"Specific exception caught"\`。

💡 \`int("abc")\` 会引发哪种异常？
`,
        contentEn: `
## Catch Specific Exceptions

You can catch specific error types.

\`\`\`python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Can't divide by zero!")
except ValueError:
    print("Invalid value!")
\`\`\`

Common exception types:
- \`ZeroDivisionError\`: Divide by zero
- \`ValueError\`: Invalid value
- \`TypeError\`: Wrong type
- \`FileNotFoundError\`: File not found

### 📝 Task
Change \`except:\` to catch a specific exception type, then print \`"Specific exception caught"\`.

💡 What exception does \`int("abc")\` raise?
`,
        starterCode: 'try:\n    num = int("abc")\nexcept:\n    print("Caught by generic except")',
        answer: 'try:\n    num = int("abc")\nexcept ValueError:\n    print("Specific exception caught")',
        hints: [
          'int("abc") 会引发 ValueError，用 except ValueError: 捕获',
          '把 except: 改为 except ValueError:，然后改输出文本',
          'Int("abc") raises ValueError — use except ValueError: to catch it',
          'Change except: to except ValueError:, then change the print message'
        ],
        testCases: [{ input: '', expected: 'Specific exception caught' }]
      },
      {
        id: 'ch12_03',
        title: '异常处理挑战',
        titleEn: 'Exception Challenge',
        xp: 100,
        content: `
## 异常处理挑战

\`try-except-else-finally\` 完整结构：
- \`try\`: 可能出错的代码
- \`except\`: 出错时执行
- \`else\`: 没出错时执行
- \`finally\`: 无论是否出错都执行

\`\`\`python
try:
    num = int("42")
except:
    print("Error!")
else:
    print(f"Number: {num}")
finally:
    print("Done!")
\`\`\`

### 📝 任务
定义一个函数 \`safe_divide(a, b)\`，用 \`try-except\` 处理除以零。如果 b=0 返回 \`"Cannot divide"\`，否则返回 a/b。

💡 Step 1：用 \`def safe_divide(a, b):\` 定义函数
💡 Step 2：在函数内加 \`try:\`，缩进里面写 \`return a / b\`
💡 Step 3：加 \`except ZeroDivisionError:\`，缩进里面写 \`return "Cannot divide"\`
💡 Step 4：函数外用 \`print(safe_divide(10, 2))\` 和 \`print(safe_divide(5, 0))\` 测试
`,
        contentEn: `
## Exception Challenge

Complete \`try-except-else-finally\` structure:
- \`try\`: Potentially error-prone code
- \`except\`: Runs on error
- \`else\`: Runs if no error
- \`finally\`: Always runs

\`\`\`python
try:
    num = int("42")
except:
    print("Error!")
else:
    print(f"Number: {num}")
finally:
    print("Done!")
\`\`\`

### 📝 Task
Define \`safe_divide(a, b)\` using \`try-except\` to handle division by zero. Return \`"Cannot divide"\` if b=0, otherwise return a/b.

💡 Step 1: Define \`def safe_divide(a, b):\`
💡 Step 2: Add \`try:\`, indent \`return a / b\` under it
💡 Step 3: Add \`except ZeroDivisionError:\`, indent \`return "Cannot divide"\` under it
💡 Step 4: Test with \`print(safe_divide(10, 2))\` and \`print(safe_divide(5, 0))\`
`,
        starterCode: 'def safe_divide(a, b):\n    # 在这里写代码\n    pass\n\nprint(safe_divide(10, 2))\nprint(safe_divide(5, 0))',
        answer: 'def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return "Cannot divide"\n\nprint(safe_divide(10, 2))\nprint(safe_divide(5, 0))',
        hints: [
          '用 def safe_divide(a, b): 定义函数，try 里写 return a / b',
          'except ZeroDivisionError: 里写 return "Cannot divide"',
          'Define def safe_divide(a, b): with try: return a / b',
          'In except ZeroDivisionError: write return "Cannot divide"'
        ],
        testCases: [{ input: '', expected: '5.0\nCannot divide' }]
      }
    ]
  },
  {
    id: 'ch13',
    title: 'Chapter 13: 面向对象',
    titleEn: 'Chapter 13: Object-Oriented Programming',
    description: '学习类与对象，构建更大的程序',
    descriptionEn: 'Learn classes and objects to build larger programs',
    icon: '🏗️',
    lessons: [
      {
        id: 'ch13_01',
        title: '定义类',
        titleEn: 'Defining Classes',
        xp: 50,
        content: `
## 定义类

类（Class）是创建对象的"蓝图"。用 \`class\` 关键字定义。

\`\`\`python
class Dog:
    def bark(self):
        print("Woof!")

# 创建对象
my_dog = Dog()
my_dog.bark()  # → Woof!
\`\`\`

> \`self\` 指向当前对象实例，定义方法时第一个参数必须是 \`self\`。

### 📝 任务
下面的代码中，Dog 类的 \`bark()\` 方法体是空的（\`pass\` 表示占位）。
请把 \`pass\` 替换为打印 \`"Woof!"\` 的代码，让小狗叫出来！
`,
        contentEn: `
## Defining Classes

A class is a "blueprint" for creating objects. Use \`class\` keyword.

\`\`\`python
class Dog:
    def bark(self):
        print("Woof!")

# Create object
my_dog = Dog()
my_dog.bark()  # → Woof!
\`\`\`

> \`self\` refers to the current object instance. The first parameter of every method must be \`self\`.

### 📝 Task
The \`bark()\` method below uses \`pass\` as a placeholder.
Replace \`pass\` with code that prints \`"Woof!"\` so the dog can bark!
`,
        starterCode: 'class Dog:\n    def bark(self):\n        pass\n\nmy_dog = Dog()\nmy_dog.bark()',
        answer: 'class Dog:\n    def bark(self):\n        print("Woof!")\n\nmy_dog = Dog()\nmy_dog.bark()',
        hints: [
          '方法体要用缩进，把 pass 替换为 print("Woof!")',
          'Methods need indented body — replace pass with print("Woof!")',
          'self 是方法的第一个参数，在方法内部可以通过 self 访问对象属性',
          'self is the first parameter of every method — it refers to the object instance'
        ],
        testCases: [{ input: '', expected: 'Woof!' }]
      },
      {
        id: 'ch13_02',
        title: '构造方法',
        titleEn: 'Constructor',
        xp: 50,
        content: `
## 构造方法

\`__init__\` 是构造方法，在创建对象时自动调用，用于初始化属性。

\`\`\`python
class Student:
    def __init__(self, name):
        self.name = name

    def introduce(self):
        print(f"Hi, I'm {self.name}")

s = Student("Alice")
s.introduce()  # → Hi, I'm Alice
\`\`\`

> \`self.name = name\` 将参数 \`name\` 保存到对象上，之后其他方法可通过 \`self.name\` 访问。

### 📝 任务
下面的 \`__init__\` 是空的（\`pass\` 占位）。
补全构造方法，把传入的 \`name\` 参数保存到 \`self.name\` 上。
`,
        contentEn: `
## Constructor

\`__init__\` is the constructor, called automatically when creating an object.

\`\`\`python
class Student:
    def __init__(self, name):
        self.name = name

    def introduce(self):
        print(f"Hi, I'm {self.name}")

s = Student("Alice")
s.introduce()  # → Hi, I'm Alice
\`\`\`

> \`self.name = name\` saves the parameter to the object so other methods can access it via \`self.name\`.

### 📝 Task
The \`__init__\` method below is empty (\`pass\` placeholder).
Complete it by saving the \`name\` parameter to \`self.name\`.
`,
        starterCode: 'class Dog:\n    def __init__(self, name):\n        pass\n    def greet(self):\n        print(f"Woof! I\'m {self.name}")\n\nmy_dog = Dog("Buddy")\nmy_dog.greet()',
        answer: 'class Dog:\n    def __init__(self, name):\n        self.name = name\n    def greet(self):\n        print(f"Woof! I\'m {self.name}")\n\nmy_dog = Dog("Buddy")\nmy_dog.greet()',
        hints: [
          '__init__ 中通过 self.name = name 把参数保存为对象属性',
          'In __init__, use self.name = name to store the parameter as an attribute',
          'Dog("Buddy") 会调用 __init__("Buddy")，name 参数的值是 "Buddy"',
          'Dog("Buddy") calls __init__("Buddy") — the name parameter gets "Buddy"'
        ],
        testCases: [{ input: '', expected: "Woof! I'm Buddy" }]
      },
      {
        id: 'ch13_03',
        title: '继承',
        titleEn: 'Inheritance',
        xp: 50,
        content: `
## 继承

类可以继承另一个类，获得它的所有方法和属性。

\`\`\`python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        print("...")

class Cat(Animal):
    def speak(self):
        print("Meow!")

cat = Cat("Kitty")
cat.speak()  # → Meow!
\`\`\`

> **💡 在下方 \`Animal\` 类后面，添加以下代码：**
> 
> \`\`\`python
> class Cat(Animal):
>     def speak(self):
>         print("Meow!")
> 
> cat = Cat("Kitty")
> cat.speak()
> \`\`\`
> 
> ⚠️ 注意缩进：\`class Cat(Animal):\` 顶格写，\`def speak(self):\` 缩进 4 空格，\`print("Meow!")\` 缩进 8 空格。

### 📝 任务
请在下面已有的 \`Animal\` 类基础上，添加一个 \`Cat\` 类继承 \`Animal\` 并覆写 \`speak()\` 方法输出 \`"Meow!"\`，然后创建 \`cat = Cat("Kitty")\` 并调用 \`cat.speak()\`。
`,
        contentEn: `
## Inheritance

A class can inherit from another class, getting all its methods and attributes.

\`\`\`python
class Animal:
    def __init__(self, name):
        self.name = name
    def speak(self):
        print("...")

class Cat(Animal):
    def speak(self):
        print("Meow!")

cat = Cat("Kitty")
cat.speak()  # → Meow!
\`\`\`

> **💡 Add the following code after the \`Animal\` class below:**
> 
> \`\`\`python
> class Cat(Animal):
>     def speak(self):
>         print("Meow!")
> 
> cat = Cat("Kitty")
> cat.speak()
> \`\`\`
> 
> ⚠️ Indentation: \`class Cat(Animal):\` at column 0, \`def speak(self):\` 4 spaces in, \`print("Meow!")\` 8 spaces in.

### 📝 Task
Below is the \`Animal\` base class. Add a \`Cat\` class that inherits from \`Animal\` and overrides \`speak()\` to print \`"Meow!"\`. Then create \`cat = Cat("Kitty")\` and call \`cat.speak()\`.
`,
        starterCode: 'class Animal:\n    def __init__(self, name):\n        self.name = name\n    def speak(self):\n        print("...")',
        answer: 'class Animal:\n    def __init__(self, name):\n        self.name = name\n    def speak(self):\n        print("...")\n\nclass Cat(Animal):\n    def speak(self):\n        print("Meow!")\n\ncat = Cat("Kitty")\ncat.speak()',
        hints: [
          '用 class Cat(Animal): 声明继承，覆写 speak() 方法',
          'Use class Cat(Animal): to inherit, then override speak()',
          '子类方法名和父类相同就是覆写（override）',
          'Same method name in child = override — the child\'s version runs instead'
        ],
        testCases: [{ input: '', expected: 'Meow!' }]
      },
      {
        id: 'ch13_04',
        title: 'OOP挑战',
        titleEn: 'OOP Challenge',
        xp: 100,
        content: `
## OOP 挑战

定义一个 \`BankAccount\` 类：
- \`__init__(self, owner, balance=0)\` — 保存 \`owner\` 和 \`balance\`
- \`deposit(self, amount)\` — 存钱，打印新余额
- \`withdraw(self, amount)\` — 取钱（余额不足时打印 \`"Insufficient funds"\`）

\`\`\`python
account = BankAccount("Alice", 100)
account.deposit(50)   # → "Deposited 50. Balance: 150"
account.withdraw(200) # → "Insufficient funds"
\`\`\`

> **💡 把三个 \`pass\` 分别替换为以下代码：**
> 
> \`\`\`python
>     def __init__(self, owner, balance=0):
>         self.owner = owner
>         self.balance = balance
> 
>     def deposit(self, amount):
>         self.balance += amount
>         print(f"Deposited {amount}. Balance: {self.balance}")
> 
>     def withdraw(self, amount):
>         if self.balance >= amount:
>             self.balance -= amount
>             print(f"Withdrew {amount}. Balance: {self.balance}")
>         else:
>             print("Insufficient funds")
> \`\`\`

### 📝 任务
补全下面的 \`BankAccount\` 类，实现构造方法、存钱和取钱方法。
`,
        contentEn: `
## OOP Challenge

Define a \`BankAccount\` class:
- \`__init__(self, owner, balance=0)\` — save \`owner\` and \`balance\`
- \`deposit(self, amount)\` — deposit money, print new balance
- \`withdraw(self, amount)\` — withdraw money (print \`"Insufficient funds"\` if not enough)

\`\`\`python
account = BankAccount("Alice", 100)
account.deposit(50)   # → "Deposited 50. Balance: 150"
account.withdraw(200) # → "Insufficient funds"
\`\`\`

> **💡 Replace each \`pass\` with the code below:**
> 
> \`\`\`python
>     def __init__(self, owner, balance=0):
>         self.owner = owner
>         self.balance = balance
> 
>     def deposit(self, amount):
>         self.balance += amount
>         print(f"Deposited {amount}. Balance: {self.balance}")
> 
>     def withdraw(self, amount):
>         if self.balance >= amount:
>             self.balance -= amount
>             print(f"Withdrew {amount}. Balance: {self.balance}")
>         else:
>             print("Insufficient funds")
> \`\`\`

### 📝 Task
Complete the \`BankAccount\` class below: implement the constructor, deposit, and withdraw methods.
`,
        starterCode: 'class BankAccount:\n    def __init__(self, owner, balance=0):\n        pass\n    def deposit(self, amount):\n        pass\n    def withdraw(self, amount):\n        pass\n\naccount = BankAccount("Alice", 100)\naccount.deposit(50)\naccount.withdraw(200)',
        answer: 'class BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n    def deposit(self, amount):\n        self.balance += amount\n        print(f"Deposited {amount}. Balance: {self.balance}")\n    def withdraw(self, amount):\n        if self.balance >= amount:\n            self.balance -= amount\n            print(f"Withdrew {amount}. Balance: {self.balance}")\n        else:\n            print("Insufficient funds")\n\naccount = BankAccount("Alice", 100)\naccount.deposit(50)\naccount.withdraw(200)',
        hints: [
          '__init__ 中用 self.owner = owner 和 self.balance = balance 保存属性',
          'In __init__, use self.owner = owner and self.balance = balance to store attributes',
          'deposit 中用 self.balance += amount 增加余额，再 print() 输出',
          'In deposit, use self.balance += amount to add money, then print() the result',
          'withdraw 中先判断余额：if self.balance >= amount:，充足则 -=，否则打印 Insufficient',
          'In withdraw, check if self.balance >= amount:, if so -=, else print "Insufficient funds"',
          '输出格式参考：print(f"Deposited {amount}. Balance: {self.balance}")',
          'Format example: print(f"Deposited {amount}. Balance: {self.balance}")'
        ],
        testCases: [{ input: '', expected: 'Deposited 50. Balance: 150\nInsufficient funds' }]
      }
    ]
  },

  {
    id: 'ch14',
    title: 'Chapter 14: 集合与推导式',
    titleEn: 'Chapter 14: Sets & Comprehensions',
    description: '掌握集合操作和Python推导式',
    descriptionEn: 'Master set operations and Python comprehensions',
    icon: '🧩',
    lessons: [
      {
        id: 'ch14_01',
        title: '集合的定义与操作',
        titleEn: 'Set Basics',
        xp: 50,
        content: `
## 集合的定义与操作

集合（set）是Python中一种**无序、不重复**的数据容器。

用 \`set()\` 创建集合：
\`\`\`python
empty_set = set()              # 空集合
numbers = set([1, 2, 3])      # 从列表创建
\`\`\`

常用操作：
- \`add(x)\`：添加元素
- \`discard(x)\`：删除元素（不存在不报错）
- \`x in s\`：判断 x 是否在集合 s 中

\`\`\`python
s = set([1, 2, 3])
s.add(4)
print(4 in s)  # True
s.discard(2)
print(2 in s)  # False
\`\`\`

### 📝 任务
创建集合 \`{1, 2, 3, 4, 5}\`，添加 6，检查 6 是否在集合中并打印结果。
`,
        contentEn: `
## Set Definition & Operations

A set is an **unordered, unique** container in Python.

Create with \`set()\`:
\`\`\`python
empty_set = set()
numbers = set([1, 2, 3])
\`\`\`

Common operations:
- \`add(x)\`: Add element
- \`discard(x)\`: Remove (no error)
- \`x in s\`: Check membership

\`\`\`python
s = set([1, 2, 3])
s.add(4)
print(4 in s)  # True
s.discard(2)
print(2 in s)  # False
\`\`\`

### 📝 Task
Create the set \`{1, 2, 3, 4, 5}\`, add 6, check if 6 is in the set and print the result.
`,
        starterCode: 's = set([1, 2, 3, 4, 5])\n# 用 add() 添加 6\n\n# 检查 6 是否在集合中并打印\n',
        answer: 's = set([1, 2, 3, 4, 5])\ns.add(6)\nprint(6 in s)',
        hints: [
          '用 `s.add(6)` 将 6 添加到集合中',
          'Use `s.add(6)` to add 6 to the set',
          '用 `print(6 in s)` 检查 6 是否在集合中，会输出 True',
          'Use `print(6 in s)` to check membership — it will print True'
        ],
        testCases: [{ input: '', expected: 'True' }]
      },
      {
        id: 'ch14_02',
        title: '集合运算',
        titleEn: 'Set Operations',
        xp: 50,
        content: `
## 集合运算

集合支持数学中的集合运算：

\`\`\`python
a = set([1, 2, 3, 4])
b = set([3, 4, 5, 6])

# 交集（共有的元素）
c = a.intersection(b)
print(c)  # {3, 4}

# 并集（全部元素）
d = a.union(b)
print(d)  # {1, 2, 3, 4, 5, 6}

# 差集（a有但b没有的）
e = a.difference(b)
print(e)  # {1, 2}
\`\`\`

### 📝 任务
创建集合 \`a = {1, 2, 3, 4, 5}\` 和 \`b = {4, 5, 6, 7, 8}\`，找出**交集**并打印。
`,
        contentEn: `
## Set Operations

Sets support mathematical operations:

\`\`\`python
a = set([1, 2, 3, 4])
b = set([3, 4, 5, 6])

# Intersection
c = a.intersection(b)
print(c)  # {3, 4}

# Union
d = a.union(b)
print(d)  # {1, 2, 3, 4, 5, 6}

# Difference
e = a.difference(b)
print(e)  # {1, 2}
\`\`\`

### 📝 Task
Create sets \`a = {1, 2, 3, 4, 5}\` and \`b = {4, 5, 6, 7, 8}\`, find their **intersection** and print it.
`,
        starterCode: 'a = set([1, 2, 3, 4, 5])\nb = set([4, 5, 6, 7, 8])\n\n# 找出交集并打印\n',
        answer: 'a = set([1, 2, 3, 4, 5])\nb = set([4, 5, 6, 7, 8])\nc = a.intersection(b)\nprint(c)',
        hints: [
          '交集用 `.intersection()` 方法：`c = a.intersection(b)`',
          'Intersection: `c = a.intersection(b)`',
          '用 `print(c)` 输出交集结果',
          'Use `print(c)` to output the intersection'
        ],
        testCases: [{ input: '', expected: '{4, 5}' }]
      },
      {
        id: 'ch14_03',
        title: '列表去重',
        titleEn: 'List Dedup',
        xp: 60,
        content: `
## 集合去重

集合的**不重复**特性非常适合**去重**。

用 \`set()\` 快速去除列表中的重复元素：

\`\`\`python
lst = [1, 2, 2, 3, 3, 3]
unique = set(lst)
print(unique)  # {1, 2, 3}
\`\`\`

需要**检查是否有重复元素**时，可以比较原列表和去重后的长度：

\`\`\`python
print(len(lst) == len(unique))  # True 表示有重复
\`\`\`

> 提示：\`len(set)\` 可以获取集合中元素的数量。

### 📝 任务
列表 \`lst = [1, 2, 2, 3, 3, 3, 4, 5, 5]\` 有重复项，用 \`set()\` 去重后打印**去重后的集合**。
`,
        contentEn: `
## List Dedup

Sets are perfect for **removing duplicates**.

Use \`set()\` to quickly deduplicate a list:

\`\`\`python
lst = [1, 2, 2, 3, 3, 3]
unique = set(lst)
print(unique)  # {1, 2, 3}
\`\`\`

Check for duplicates by comparing lengths:

\`\`\`python
print(len(lst) == len(unique))  # True means duplicates found
\`\`\`

> Tip: \`len(set)\` gives the number of elements in a set.

### 📝 Task
The list \`lst = [1, 2, 2, 3, 3, 3, 4, 5, 5]\` has duplicates. Use \`set()\` to deduplicate and **print the resulting set**.
`,
        starterCode: 'lst = [1, 2, 2, 3, 3, 3, 4, 5, 5]\n\n# 用 set() 去重并打印\n',
        answer: 'lst = [1, 2, 2, 3, 3, 3, 4, 5, 5]\nunique = set(lst)\nprint(unique)',
        hints: [
          '用 `set(lst)` 创建集合，它会自动去除重复元素',
          'Use `set(lst)` to create a set — duplicates are automatically removed',
          '把结果存到变量：`unique = set(lst)`，然后打印',
          'Store the result: `unique = set(lst)`, then print it'
        ],
        testCases: [{ input: '', expected: '{1, 2, 3, 4, 5}' }]
      },
      {
        id: 'ch14_04',
        title: '集合与去重挑战',
        titleEn: 'Sets & Dedup Challenge',
        xp: 100,
        content: `
## 集合与去重挑战

综合运用集合操作解决实际问题。

> 💡 操作步骤：
> 1. 创建集合 \`a = set(["苹果", "香蕉", "橘子", "葡萄", "西瓜"])\` — **每个名字要加引号！**
> 2. 创建集合 \`b = set(["橘子", "葡萄", "草莓", "蓝莓", "芒果"])\`
> 3. 用 \`a.difference(b)\` 计算差集，存到变量：\`only_a = a.difference(b)\`
> 4. 打印结果：\`print(only_a)\`
>
> ⚠️ 注意：\`.difference()\` 返回**新集合**，不会修改原集合。记得把结果存到变量再打印！

### 📝 任务
两个仓库有商品库存：

\`\`\`
仓库A：苹果, 香蕉, 橘子, 葡萄, 西瓜
仓库B：橘子, 葡萄, 草莓, 蓝莓, 芒果
\`\`\`

用集合的**差集**找出**只在仓库A**有的商品，并打印结果。
`,
        contentEn: `
## Sets & Dedup Challenge

Combine set operations to solve a real problem.

> 💡 Steps:
> 1. Create \`a = set(["apple", "banana", "orange", "grape", "watermelon"])\` — **quotes around each item!**
> 2. Create \`b = set(["orange", "grape", "strawberry", "blueberry", "mango"])\`
> 3. Compute difference & store: \`only_a = a.difference(b)\`
> 4. Print: \`print(only_a)\`
>
> ⚠️ \`.difference()\` returns a **new set** — don't forget to store the result before printing!

### 📝 Task
Two warehouses have inventory:

\`\`\`
Warehouse A: apple, banana, orange, grape, watermelon
Warehouse B: orange, grape, strawberry, blueberry, mango
\`\`\`

Use **set difference** to find items **only in Warehouse A** and print the result.
`,
        starterCode: '# 仓库A的商品\n\n# 仓库B的商品\n\n# 找出只在仓库A的商品并打印\n',
        answer: 'a = set(["苹果", "香蕉", "橘子", "葡萄", "西瓜"])\nb = set(["橘子", "葡萄", "草莓", "蓝莓", "芒果"])\nonly_a = a.difference(b)\nprint(only_a)',
        hints: [
          '用 `set(["苹果", "香蕉", ...])` 创建集合，每个商品名用引号括起来',
          'Create sets with `set(["apple", "banana", ...])`, each item in quotes',
          '差集用 `a.difference(b)`，会返回只在 a 中的元素',
          'Use `a.difference(b)` to get elements only in a',
          '把结果打印出来检查',
          'Print the result to check'
        ],
        testCases: [{ input: '', expected: '{苹果, 西瓜, 香蕉}' }]
      }
    ]
  },
  {
    id: 'ch15',
    title: 'Chapter 15: 函数进阶',
    titleEn: 'Chapter 15: Advanced Functions',
    description: '掌握可变参数、lambda和高阶函数',
    descriptionEn: 'Master *args, lambda, and higher-order functions',
    icon: '🎯',
    lessons: [
      {
        id: 'ch15_01',
        title: '*args 和 **kwargs',
        titleEn: '*args and **kwargs',
        xp: 60,
        content: `
## *args 和 **kwargs

当你不确定函数会接收多少参数时，使用**可变参数**。

**\\*args**：接收任意数量的位置参数，打包为**元组**。

\`\`\`python
def sum_all(*args):
    total = 0
    for num in args:
        total += num
    return total

print(sum_all(1, 2, 3))       # 6
print(sum_all(1, 2, 3, 4, 5)) # 15
\`\`\`

**\\*\\*kwargs**：接收任意数量的关键字参数，打包为**字典**。

\`\`\`python
def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="张三", age=25, city="北京")
# name: 张三
# age: 25
# city: 北京
\`\`\`

### 📝 任务
写一个函数 \`multiply_all(*args)\`，把接收到的所有数字相乘并返回结果。然后调用 \`multiply_all(2, 3, 4)\` 并打印返回值。

预期输出：\`24\`
`,
        contentEn: `
## *args and **kwargs

**\\*args**: Receive any number of positional args as a **tuple**.
**\\*\\*kwargs**: Receive any number of keyword args as a **dict**.

### 📝 Task
Write a function \`multiply_all(*args)\` that multiplies all received numbers and returns the result. Then call \`multiply_all(2, 3, 4)\` and print the result.

Expected output: \`24\`
`,
        starterCode: '',
        answer: 'def multiply_all(*args):\n    result = 1\n    for num in args:\n        result *= num\n    return result\n\nprint(multiply_all(2, 3, 4))',
        hints: ['【解释】\n第一步：定义 multiply_all 函数，使用 *args 接收任意数量的参数。\n\n关键语法：\n- \`def multiply_all(*args):\` — \`*args\` 把所有传入的位置参数打包成一个**元组**\n  • 调用 \`multiply_all(2, 3, 4)\` 时，args 就是 \`(2, 3, 4)\`\n  • 你可以在函数体内像遍历普通元组一样遍历 args\n- \`result = 1\` — 初始化结果为 1（不要用 0，因为 0 乘任何数都是 0）\n- \`for num in args:\` — 遍历元组中的每个数字\n- \`result *= num\` — 等价于 \`result = result * num\`，累乘\n- \`return result\` — 返回最终的累乘结果\n\n完整流程（以 multiply_all(2, 3, 4) 为例）：\n① args = (2, 3, 4)，result = 1\n② 第 1 轮：num = 2，result = 1 * 2 = 2\n③ 第 2 轮：num = 3，result = 2 * 3 = 6\n④ 第 3 轮：num = 4，result = 6 * 4 = 24\n⑤ return 24\n\n【代码】\ndef multiply_all(*args):\n    result = 1\n    for num in args:\n        result *= num\n    return result', '【解释】\nStep 1: Define multiply_all using *args to accept any number of arguments.\n\nKey syntax:\n- \`*args\` collects all positional arguments into a **tuple**\n  • \`multiply_all(2, 3, 4)\` → args = (2, 3, 4)\n- \`result = 1\`: initialize to 1 (not 0, since 0×anything = 0)\n- \`for num in args:\`: iterate through each number in the tuple\n- \`result *= num\`: shorthand for result = result * num\n- \`return result\`: return the final product\n\n【代码】\ndef multiply_all(*args):\n    result = 1\n    for num in args:\n        result *= num\n    return result', '【解释】\n第二步：调用函数并打印结果。\n\n\`print(multiply_all(2, 3, 4))\`\n- \`multiply_all(2, 3, 4)\` 把 2, 3, 4 打包成 \`(2, 3, 4)\`\n- 函数内部累乘：1 × 2 × 3 × 4 = 24\n- 返回 24，被 print() 输出到屏幕\n\n验证：\n- \`multiply_all(1, 2, 3, 4)\` → 1×2×3×4 = 24\n- \`multiply_all(5)\` → 5\n- \`multiply_all()\` → 1（没有参数时，不进入循环，直接返回初始值 1）\n\n【代码】\ndef multiply_all(*args):\n    result = 1\n    for num in args:\n        result *= num\n    return result\n\nprint(multiply_all(2, 3, 4))\n\n预期输出：\n24', '【解释】\nStep 2: Call the function and print the result.\n\n\`multiply_all(2, 3, 4)\` → args = (2, 3, 4)\nInside function: 1 × 2 × 3 × 4 = 24\nReturns 24, which print() displays.\n\n【代码】\ndef multiply_all(*args):\n    result = 1\n    for num in args:\n        result *= num\n    return result\n\nprint(multiply_all(2, 3, 4))\n\nExpected output:\n24'],
        testCases: [{ input: '', expected: '24' }]
      },
      {
        id: 'ch15_02',
        title: 'Lambda 表达式',
        titleEn: 'Lambda Expressions',
        xp: 60,
        content: `
## Lambda 表达式

Lambda 是一种**匿名函数**，可以在一行内定义简单函数。

\`\`\`python
# 传统函数
def add(a, b):
    return a + b

# Lambda（一行搞定！）
add = lambda a, b: a + b
print(add(3, 5))  # 8
\`\`\`

Lambda 的适用场景：

\`\`\`python
# 配合sorted()排序
students = [
    {"name": "张三", "score": 95},
    {"name": "李四", "score": 87},
    {"name": "王五", "score": 92}
]
# 按分数排序
sorted_students = sorted(students, key=lambda s: s["score"], reverse=True)
print(sorted_students[0]["name"])  # 张三
\`\`\`

> 💡 Lambda 适合简单逻辑，复杂逻辑还是用 def。

### 📝 任务
用 lambda 重写下面的函数：

\`\`\`python
def double(x):
    return x * 2
\`\`\`

练习：将上面的传统函数改写成 **lambda 表达式**并调用 \`double(7)\` 打印结果。

\`\`\`python
# 你的代码从这里开始
\`\`\`
`,
        contentEn: `
## Lambda Expressions

Lambda is an **anonymous function** defined in one line.

\`\`\`python
add = lambda a, b: a + b
print(add(3, 5))  # 8
\`\`\`

### 📝 Task
Rewrite the function below using a **lambda expression**, then call it with 7 and print the result.

\`\`\`python
def double(x):
    return x * 2
\`\`\`

\`\`\`python
# Your code starts here
\`\`\`
`,
        starterCode: '',
        answer: 'double = lambda x: x * 2\nprint(double(7))',
        hints: ['lambda 参数: 表达式', 'lambda params: expression', 'double = lambda x: x * 2'],
        testCases: [{ input: '', expected: '14' }]
      },
      {
        id: 'ch15_03',
        title: '高阶函数',
        titleEn: 'Higher-Order Functions',
        xp: 60,
        content: `
## 高阶函数

高阶函数是指**接收函数作为参数**或**返回函数**的函数。

**map()**：对每个元素应用函数。

\`\`\`python
nums = [1, 2, 3, 4, 5]
doubled = list(map(lambda x: x * 2, nums))
print(doubled)  # [2, 4, 6, 8, 10]
\`\`\`

**filter()**：筛选满足条件的元素。

\`\`\`python
nums = [1, 2, 3, 4, 5, 6]
evens = list(filter(lambda x: x % 2 == 0, nums))
print(evens)  # [2, 4, 6]
\`\`\`

**将函数作为参数传递**：

\`\`\`python
def apply(func, x, y):
    return func(x, y)

print(apply(lambda a, b: a + b, 3, 5))  # 8
print(apply(lambda a, b: a * b, 3, 5))  # 15
\`\`\`

### 📝 任务
补全下面的代码：定义 \`process\` 函数使其接收一个函数和一个数，调用该函数并返回结果。
然后用 **lambda** 计算 10 的平方（10×10=100）。

\`\`\`python
# 补全 process：接收 func 和 x，调用 func(x) 并返回
def process(func, x):
    ______  # 补全这行

# 用 lambda 计算平方，调用 process 并打印结果
print(process(_______, 10))
\`\`\`
`,
        contentEn: `
## Higher-Order Functions

Functions that take/return other functions.

- **map()**: Apply function to each element
- **filter()**: Filter elements by condition

### 📝 Task
Complete the code: define a \`process\` function that takes a function and a value, calls the function, and prints the result. Then use **lambda** to calculate 10 squared (10×10=100).

\`\`\`python
# Complete process: accept func and x, call func(x) and return
def process(func, x):
    ______  # complete this line

# Use lambda to square the number, call process and print
print(process(_______, 10))
\`\`\`
`,
        starterCode: '# 补全 process：接收 func 和 x，调用 func(x) 并返回\ndef process(func, x):\n    pass  # 把 pass 改成 return func(x)\n\n# 用 lambda 计算平方，调用 process 并打印结果\nprint(process(lambda x: x * x, 10))',
        answer: 'def process(func, x):\n    return func(x)\n\nprint(process(lambda n: n * n, 10))',
        hints: [
          '【解释】第1步：理解 process 函数的作用。它接收两个参数：\n- func：一个函数（如平方、加倍等）\n- x：要传进去的值\n\nprocess 的任务是：调用 func(x) 并把结果 return 回去。\n\n先看看它被调用的方式：\nprint(process(_______, 10))\n这里 process 会把 10 传给 x，并把计算结果打印出来。',
          '【解释】Step 1: Understand what process(func, x) does.\n- func: a function (e.g. squaring, doubling)\n- x: the value to pass in\n\nprocess must call func(x) and return the result.\n\nSee how it is called:\nprint(process(_______, 10))\nprocess will pass 10 to x and print the result.',
          '【解释】第2步：填第一个空 —— return func(x)\n在 process 函数体中，需要调用传进来的 func，并把 x 作为参数传给它，然后返回结果。\n\n【代码】def process(func, x):\n    return func(x)  # 调用 func(x) 并返回结果',
          '【解释】Step 2: Fill in the first blank — return func(x)\nInside process, you call the passed-in func with x and return the result.\n\n【代码】def process(func, x):\n    return func(x)  # Call func(x) and return the result',
          '【解释】第3步：填第二个空 —— lambda x: x * x\n题目要求用 lambda 计算 10 的平方（10×10=100）。\nlambda 的写法：\n- 参数写在冒号前（这里需要接受一个数 x）\n- 返回值表达式写在冒号后（平方就是 x * x）\n\n【代码】# lambda 参数: 返回值表达式\nlambda x: x * x  # 接收 x，返回 x 的平方',
          '【解释】Step 3: Fill in the second blank — lambda x: x * x\nThe task is to calculate 10 squared (10×10=100) using lambda.\nLambda syntax:\n- Parameters before the colon (here: one parameter x)\n- Return expression after the colon (squaring is x * x)\n\n【代码】# lambda params: return_expression\nlambda x: x * x  # Takes x, returns x squared',
          '【解释】第4步：完整代码参考\n把两步结合起来，调用 process(lambda x: x * x, 10)：\n- func = lambda x: x * x（平方函数）\n- x = 10\n- process 内部执行 return 10 * 10 → 返回 100\n\n【代码】def process(func, x):\n    return func(x)\n\nprint(process(lambda x: x * x, 10))  # 输出 100',
          '【解释】Step 4: Full code reference\nCombine both parts — process(lambda x: x * x, 10):\n- func = lambda x: x * x (squaring function)\n- x = 10\n- process runs return 10 * 10 → returns 100\n\n【代码】def process(func, x):\n    return func(x)\n\nprint(process(lambda x: x * x, 10))  # Output: 100',
        ],
        testCases: [{ input: '', expected: '100' }],
      },
      {
        id: 'ch15_04',
        title: '递归函数',
        titleEn: 'Recursive Functions',
        xp: 70,
        content: `
## 递归函数

递归是指**函数调用自身**的编程技巧。

**经典案例：阶乘**

\`\`\`python
def factorial(n):
    # 基准条件（停止递归）
    if n <= 1:
        return 1
    # 递归调用
    return n * factorial(n - 1)

print(factorial(5))  # 120 (5×4×3×2×1)
\`\`\`

**经典案例：斐波那契数列**

\`\`\`python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# 斐波那契：0, 1, 1, 2, 3, 5, 8, 13, 21, ...
print(fibonacci(7))  # 13
\`\`\`

> ⚠️ 递归必须有基准条件，否则会无限递归导致栈溢出！

### 📝 任务
用递归实现阶乘函数，计算 \`6!\` 并打印结果。

\`\`\`python
# 参考上面的 factorial(n) 阶乘函数
# 6! = 6 × 5 × 4 × 3 × 2 × 1 = 720
# 补全代码，计算并打印 factorial(6)
\`\`\`
`,
        contentEn: `
## Recursive Functions

Recursion is a technique where a function **calls itself**.

**Classic example: Factorial**

\`\`\`python
def factorial(n):
    if n <= 1:  # Base case (stop recursion)
        return 1
    return n * factorial(n - 1)  # Recursive call

print(factorial(5))  # 120
\`\`\`

> ⚠️ Recursion must have a base case, or it will cause a stack overflow!

### 📝 Task
Implement factorial using recursion. Calculate \`6!\` and print the result.

\`\`\`python
# Refer to the factorial(n) example above
# 6! = 6 × 5 × 4 × 3 × 2 × 1 = 720
# Complete the code and print factorial(6)
\`\`\`
`,
        starterCode: 'def factorial(n):\n    # 补全阶乘函数\n    pass\n\nprint(factorial(6))',
        answer: 'def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(6))',
        hints: ['基准条件：if n <= 1: return 1', 'Base case: if n <= 1: return 1', '递归：return n * factorial(n - 1)', 'Recursion: return n * factorial(n - 1)'],
        testCases: [{ input: '', expected: '720' }]
      },
    ]
  },
  {
    id: 'ch16',
    title: 'Chapter 16: 循环进阶',
    titleEn: 'Chapter 16: Advanced Loops',
    description: '掌握嵌套循环和经典算法模式',
    descriptionEn: 'Master nested loops and classic algorithms',
    icon: '🔄',
    lessons: [
      {
        id: 'ch16_01',
        title: '嵌套循环',
        titleEn: 'Nested Loops',
        xp: 50,
        content: `
## 嵌套循环

嵌套循环是指**一个循环内部包含另一个循环**。

\`\`\`python
# 打印 3×3 的星号矩阵
for i in range(3):        # 外层：控制行
    for j in range(3):    # 内层：控制列
        print("*", end=" ")
    print()  # 每行结束后换行
\`\`\`

输出：
\`\`\`
* * *
* * *
* * *
\`\`\`

**直角三角形**：

\`\`\`python
# 打印直角三角形
for i in range(1, 6):     # 第1行1个星，第5行5个星
    for j in range(i):
        print("*", end="")
    print()
\`\`\`

> 💡 外层循环执行1次，内层循环执行**完整一轮**。

### 📝 任务
用嵌套循环打印**数字三角形**，输出如下：
\`\`\`
1
12
123
1234
12345
\`\`\`

在下方编辑器中，已经写好了外层循环 \`for i in range(1, 6):\`，请在它的内部补全：

1. 写一个内层循环: \`for j in range(1, i+1):\`
2. 在内层循环里用 \`print(j, end="")\` 输出数字
3. 在内层循环**外面**加 \`print()\` 换行

> 小贴士：把直角三角形的 \`"*"\` 换成 \`j\`，内层 \`range(i)\` 改成 \`range(1, i+1)\` 就是答案了。
`,
        contentEn: `
## Nested Loops

A loop inside another loop.

\`\`\`python
for i in range(3):        # Outer: rows
    for j in range(3):    # Inner: columns
        print("*", end=" ")
    print()
\`\`\`

### 📝 Task
Use nested loops to print a **number triangle**:
\`\`\`
1
12
123
1234
12345
\`\`\`

In the editor below, the outer loop \`for i in range(1, 6):\` is already there. Fill in:

1. Write an inner loop: \`for j in range(1, i+1):\`
2. Inside it: \`print(j, end="")\` to output numbers
3. After the inner loop: \`print()\` to newline

> Tip: Replace \`"*"\` with \`j\` and change \`range(i)\` to \`range(1, i+1)\`.
`,
        starterCode: 'for i in range(1, 6):\n    # 在下面写内层循环\n    ',
        answer: 'for i in range(1, 6):\n    for j in range(1, i + 1):\n        print(j, end="")\n    print()',
        hints: ['先写内层循环：for j in range(1, i+1): 注意 range 从 1 到 i', '然后在 for j 里添加 print(j, end="") 不换行输出数字', '最后在 for j 外面（仍缩进在 for i 里面）加 print() 换行'],
        testCases: [{ input: '', expected: '1\n12\n123\n1234\n12345\n' }]
      },
                  {
        id: 'ch16_02',
        title: '九九乘法表',
        titleEn: 'Multiplication Table',
        xp: 60,
        content: `
## 九九乘法表

使用嵌套循环打印经典的**九九乘法表**。

观察规律，第 i 行有 i 个算式：
\`\`\`
1*1=1                          ← 第1行，1个算式
1*2=2  2*2=4                  ← 第2行，2个算式
1*3=3  2*3=6  3*3=9           ← 第3行，3个算式
...                            ...
1*9=9  2*9=18  3*9=27  ...  9*9=81
\`\`\`

**结构分析**：
- 外层循环 \`i\` 从 1 到 9，控制行数
- 内层循环 \`j\` 从 1 到 \`i\`，控制每行的算式数量
- 每个算式格式：\`{j}*{i}={i*j}\`

> 💡 结合上两关的知识，一步步分析：

**第 1 步**：先不管 * 号，像数字三角形一样输出 j：
\`\`\`python
for i in range(1, 10):
    for j in range(1, i + 1):
        print(j, end=" ")
    print()
\`\`\`
输出（每行数字到行号为止）：
\`\`\`
1
1 2
1 2 3
...
1 2 3 4 5 6 7 8 9
\`\`\`

**第 2 步**：把 \`print(j, end=" ")\` 扩展成算式格式 \`{j}*{i}={i*j}\`：
\`\`\`python
print(f"{j}*{i}={i*j}", end=" ")
\`\`\`
第 i=2 行时：j=1 → "1*2=2"  j=2 → "2*2=4"

组合起来就是完整的乘法表了。

### 📝 任务
用嵌套循环打印 9*9 乘法表。
`,
        contentEn: `
## Multiplication Table

Print the classic 9*9 multiplication table using nested loops.

\`\`\`
1*1=1
1*2=2  2*2=4
1*3=3  2*3=6  3*3=9
...
1*9=9  2*9=18  3*9=27  ...  9*9=81
\`\`\`

**Structure**:
- Outer \`i\` from 1 to 9 (rows)
- Inner \`j\` from 1 to \`i\` (expressions per row)
- Each cell: \`{j}*{i}={i*j}\`

> 💡 Build it step by step:

**Step 1**: Like the number triangle, print j first:
\`\`\`python
for i in range(1, 10):
    for j in range(1, i + 1):
        print(j, end=" ")
    print()
\`\`\`

**Step 2**: Expand \`print(j, end=" ")\` into the full expression:
\`\`\`python
print(f"{j}*{i}={i*j}", end=" ")
\`\`\`

### 📝 Task
Print the 9*9 multiplication table using nested loops.
`,
        starterCode: 'for i in range(1, 10):\n    # 补全内层循环\n    ',
        answer: 'for i in range(1, 10):\n    for j in range(1, i + 1):\n        print(f"{j}*{i}={i*j}", end=" ")\n    print()',
        hints: ['外层 range(1, 10) 控制 9 行', '内层循环用 for j in range(1, i+1)，用 j 遍历每行', 'print(f"{j}*{i}={i*j}", end=" ") 内层输出算式，print() 换行'],
        testCases: [{ input: '', expected: '1*1=1 \n1*2=2 2*2=4 \n1*3=3 2*3=6 3*3=9 \n1*4=4 2*4=8 3*4=12 4*4=16 \n1*5=5 2*5=10 3*5=15 4*5=20 5*5=25 \n1*6=6 2*6=12 3*6=18 4*6=24 5*6=30 6*6=36 \n1*7=7 2*7=14 3*7=21 4*7=28 5*7=35 6*7=42 7*7=49 \n1*8=8 2*8=16 3*8=24 4*8=32 5*8=40 6*8=48 7*8=56 8*8=64 \n1*9=9 2*9=18 3*9=27 4*9=36 5*9=45 6*9=54 7*9=63 8*9=72 9*9=81 \n' }]
      },
      {
        id: 'ch16_03',
        title: '循环进阶挑战',
        titleEn: 'Advanced Loop Challenge',
        xp: 100,
        content: `
## 循环进阶挑战

综合运用循环技巧解决实际问题。

**打印菱形**：

\`\`\`python
n = 5
# 上半部分
for i in range(1, n + 1):
    print(" " * (n - i) + "*" * (2 * i - 1))
# 下半部分
for i in range(n - 1, 0, -1):
    print(" " * (n - i) + "*" * (2 * i - 1))
\`\`\`

### 📝 任务
用嵌套循环打印一个**反转数字三角形**：

\`\`\`
12345
1234
123
12
1
\`\`\`

**💡 一步步来，回顾 ch16_01 是怎么写的：**

先看原来的**数字三角形**（ch16_01）：
\`\`\`python
for i in range(1, 6):        # i = 1, 2, 3, 4, 5
    for j in range(1, i+1):  # j 从 1 到 i
        print(j, end="")
    print()
\`\`\`
第1行: i=1 → range(1, 2) → 打印 "1"
第2行: i=2 → range(1, 3) → 打印 "12"
...
第5行: i=5 → range(1, 6) → 打印 "12345"

**现在要把顺序反过来**，第1行最长的，最后一行最短。只需要改外层循环！

\`\`\`python
# range(开始, 结束前停止, 步长)
range(5, 0, -1)   # 生成：5, 4, 3, 2, 1
range(1, 6)       # 生成：1, 2, 3, 4, 5（原来的）
\`\`\`

**组合起来**：
\`\`\`
i = 5 → range(1, 6)  → 打印 "12345"
i = 4 → range(1, 5)  → 打印 "1234"
i = 3 → range(1, 4)  → 打印 "123"
i = 2 → range(1, 3)  → 打印 "12"
i = 1 → range(1, 2)  → 打印 "1"
\`\`\`

> 内层完全不用改，依然是 \`range(1, i+1)\` 和 \`print(j, end="")\`。
`,
        contentEn: `
## Advanced Loop Challenge

Use loops to solve real problems like printing diamonds and finding primes.

\`\`\`python
# Diamond pattern
n = 5
for i in range(1, n + 1):
    print(" " * (n - i) + "*" * (2 * i - 1))
for i in range(n - 1, 0, -1):
    print(" " * (n - i) + "*" * (2 * i - 1))
\`\`\`

### 📝 Task
Print a **reversed number triangle**:

\`\`\`
12345
1234
123
12
1
\`\`\`

**💡 Step by step, compare with ch16_01:**

The original **number triangle** (ch16_01):
\`\`\`python
for i in range(1, 6):        # i = 1, 2, 3, 4, 5
    for j in range(1, i+1):  # j from 1 to i
        print(j, end="")
    print()
\`\`\`
Row 1: i=1 → range(1, 2) → prints "1"
Row 2: i=2 → range(1, 3) → prints "12"
...
Row 5: i=5 → range(1, 6) → prints "12345"

**Now reverse the order. Only the outer loop needs to change!**

\`\`\`python
range(5, 0, -1)   # generates: 5, 4, 3, 2, 1
range(1, 6)       # generates: 1, 2, 3, 4, 5 (original)
\`\`\`

**Combined**:
\`\`\`
i = 5 → range(1, 6)  → prints "12345"
i = 4 → range(1, 5)  → prints "1234"
i = 3 → range(1, 4)  → prints "123"
i = 2 → range(1, 3)  → prints "12"
i = 1 → range(1, 2)  → prints "1"
\`\`\`
`,
        starterCode: '# 和 ch16_01 一样，只是外层从 range(1,6) 改成 range(5,0,-1)\nfor i in range(5, 0, -1):\n    # 补全内层循环（和 ch16_01 一样）\n    ',
        answer: 'for i in range(5, 0, -1):\n    for j in range(1, i + 1):\n        print(j, end="")\n    print()',
        hints: [
          '和 ch16_01 的代码几乎一样，只需要把外层 range(1, 6) 改成 range(5, 0, -1)',
          'range(5, 0, -1) 生成 5,4,3,2,1 逐次减 1，所以第一行最长，最后一行最短',
          '内层完全不用动：for j in range(1, i+1): 和 print(j, end="")，再加 print() 换行'
        ],
        testCases: [{ input: '', expected: '12345\n1234\n123\n12\n1\n' }]
      }
    ],
  },  {
    id: 'ch17',
    title: 'Chapter 17: 模块管理',
    titleEn: 'Chapter 17: Module Management',
    description: '学会导入和使用Python模块与包',
    descriptionEn: 'Learn to import and use Python modules and packages',
    icon: '📦',
    lessons: [
      {
        id: 'ch17_01',
        title: '导入模块',
        titleEn: 'Importing Modules',
        xp: 50,
        content: `
## 导入模块

模块就是一个**.py文件**，里面包含函数、类和变量。

**三种导入方式**：

\`\`\`python
# 方式1：导入整个模块
import math
print(math.pi)       # 3.14159...
print(math.sqrt(16)) # 4.0

# 方式2：导入特定函数
from random import randint, choice
print(randint(1, 6))               # 随机1-6
print(choice(["A", "B", "C"]))     # 随机选一个

# 方式3：使用别名
import datetime as dt
print(dt.datetime.now())  # 当前时间
\`\`\`

**常用标准库**：
- \`math\`：数学函数
- \`random\`：随机数
- \`datetime\`：日期时间
- \`os\`：操作系统接口
- \`json\`：JSON处理

### 📝 任务
导入 \`math\` 模块，使用 \`math.ceil()\` 计算 \`4.2\` 的向上取整值并打印结果。
`,
        contentEn: `
## Importing Modules

A module is a **.py file** with functions, classes and variables.

\`\`\`python
import math
print(math.pi)       # 3.14159...

from random import randint
print(randint(1, 6)) # Random 1-6

import datetime as dt
print(dt.datetime.now())
\`\`\`

### 📝 Task
Import the \`math\` module and use \`math.ceil()\` to round \`4.2\` **up** to the nearest integer, then print the result.
`,
        starterCode: '',
        answer: 'import math\nprint(math.ceil(4.2))',
        hints: ['import math 导入数学模块', 'math.ceil() 向上取整，如 math.ceil(4.2) → 5'],
        testCases: [{ input: '', expected: '5' }]
      },
      {
        id: 'ch17_02',
        title: '自定义模块',
        titleEn: 'Custom Modules',
        xp: 60,
        content: `
## 自定义模块

你可以创建自己的模块并在其他文件中导入使用。

**创建模块**（如 my_utils.py）：

\`\`\`python
# my_utils.py 内容
def greet(name):
    return f"你好，{name}！"

PI = 3.14159

# 测试代码（只在直接运行时执行）
if __name__ == "__main__":
    print(greet("测试"))
    print(f"PI = {PI}")
\`\`\`

**在其他文件中导入**：

\`\`\`python
# 导入自定义模块
import my_utils

print(my_utils.greet("张三"))  # 你好，张三！
print(my_utils.PI)              # 3.14159
\`\`\`

> 💡 \`if __name__ == "__main__"\` 确保测试代码只在直接运行时执行，被导入时不执行。

### 📝 任务
补全下面的代码：定义 \`double(x)\` 函数（返回 \`x * 2\`），然后在 \`if __name__ == "__main__":\` 下调用 \`double(21)\` 并打印结果。

\`\`\`python
# 定义 double 函数


if __name__ == "__main__":
    # 调用 double(21) 并打印结果

\`\`\`
`,
        contentEn: `
## Custom Modules

Create your own .py files and import them.

\`\`\`python
# my_utils.py
def greet(name):
    return f"Hello, {name}!"

if __name__ == "__main__":
    print(greet("test"))
\`\`\`

### 📝 Task
Complete the code: define \`double(x)\` (return \`x * 2\`), then call it under \`if __name__ == "__main__":\` and print the result.

\`\`\`python
# Define double function


if __name__ == "__main__":
    # Call double(21) and print the result

\`\`\`
`,
        starterCode: '',
        answer: 'def double(x):\n    return x * 2\n\nif __name__ == "__main__":\n    print(double(21))',
        hints: ['def double(x): 函数体里写 return x * 2', 'if __name__ == "__main__": 里写 print(double(21))'],
        testCases: [{ input: '', expected: '42' }]
      },
      {
        id: 'ch17_03',
        title: '模块管理挑战',
        titleEn: 'Module Challenge',
        xp: 100,
        content: `
## 模块管理挑战

综合运用标准库和自定义模块。

**实用案例：计算直角三角形斜边**

\`\`\`python
import math

# 已知两条直角边
a = 3
b = 4
# 计算斜边长度 c = √(a² + b²)
c = math.sqrt(a**2 + b**2)
print(f"斜边长度 = {c}")  # 5.0
\`\`\`

**实用案例：数字舍入处理**

\`\`\`python
import math

price = 49.7
people = 3
# 每人应付（向上取整，收整）
each = math.ceil(price / people)
print(f"每人应付：{each}元")  # 17元
\`\`\`

### 📝 任务
同时使用 \`import math\` 和 \`from math import sqrt\` 两种方式导入。然后：
- 用 \`sqrt(49)\` 计算平方根
- 用 \`math.ceil(2.3)\` 向上取整
分两行打印结果。
`,
        contentEn: `
## Module Challenge

Build practical tools using Python's standard library.

**Practical: Right Triangle Hypotenuse**

\`\`\`python
import math

a = 3
b = 4
c = math.sqrt(a**2 + b**2)
print(f"Hypotenuse = {c}")  # 5.0
\`\`\`

**Practical: Rounding Numbers**

\`\`\`python
import math

price = 49.7
people = 3
each = math.ceil(price / people)
print(f"Each pays: {each} yuan")  # 17
\`\`\`

### 📝 Task
Use both \`import math\` and \`from math import sqrt\`.
1. Print \`sqrt(49)\` (from from-import)
2. Print \`math.ceil(2.3)\` (from import math)
Print the results on separate lines.
`,
        starterCode: '# 请填写两条导入语句\n\n\n# 打印结果\nprint(sqrt(49))\nprint(math.ceil(2.3))',
        answer: 'from math import sqrt\nimport math\nprint(sqrt(49))\nprint(math.ceil(2.3))',
        hints: ['from math import sqrt → 直接用 sqrt(49) 就能调用', 'import math → 需要用 math.ceil(2.3) 带上前缀', '第一行输出 sqrt(49)=7，第二行输出 math.ceil(2.3)=3'],
        testCases: [{ input: '', expected: '7\n3' }]
      }
    ]
  },
  {
    id: 'ch18',
    title: 'Chapter 18: 闭包与装饰器',
    titleEn: 'Chapter 18: Closures & Decorators',
    description: '掌握闭包原理和装饰器模式',
    descriptionEn: 'Master closures and the decorator pattern',
    icon: '🎭',
    lessons: [
      {
        id: 'ch18_01',
        title: '函数多返回值',
        titleEn: 'Multiple Return Values',
        xp: 50,
        content: `
## 函数多返回值

Python 函数可以**一次返回多个值**，用逗号分隔即可。

\`\`\`python
def get_user_info():
    name = "张三"
    age = 25
    city = "北京"
    return name, age, city  # 返回多个值

# 接收多个返回值
n, a, c = get_user_info()
print(n)  # 张三
print(a)  # 25
print(c)  # 北京
\`\`\`

> 💡 实际上多返回值被自动打包成**元组**：\`return a, b\` 等同于 \`return (a, b)\`

**实用案例**：

\`\`\`python
def divide(a, b):
    """返回商和余数"""
    quotient = a // b
    remainder = a % b
    return quotient, remainder

q, r = divide(17, 5)
print(f"商={q}, 余数={r}")  # 商=3, 余数=2
\`\`\`

### 📝 任务
补全下面的函数，让它返回 \`a + b\` 的和与 \`a * b\` 的积。
然后解包两个返回值，分别打印到两行。

\`\`\`python
def calculate(a, b):
    total = a + b
    product = a * b
    # 请在下方返回 total 和 product


s, p = calculate(5, 3)
print(s)
print(p)
\`\`\`
`,
        contentEn: `
## Multiple Return Values

Python functions can return multiple values at once.

\`\`\`python
def get_info():
    return "Alice", 25, "Beijing"

name, age, city = get_info()
print(name)  # Alice
\`\`\`

### 📝 Task
Complete the function to return the sum (\`a + b\`) and product (\`a * b\`).
Then unpack the two returned values and print each on a new line.

\`\`\`python
def calculate(a, b):
    total = a + b
    product = a * b
    # return total and product below


s, p = calculate(5, 3)
print(s)
print(p)
\`\`\`
`,
        starterCode: 'def calculate(a, b):\n    total = a + b\n    product = a * b\n    # 返回 total 和 product\n\n\ns, p = calculate(5, 3)\nprint(s)\nprint(p)',
        answer: 'def calculate(a, b):\n    return a + b, a * b\n\ns, p = calculate(5, 3)\nprint(s)\nprint(p)',
        hints: ['参考上面的 divide()：return quotient, remainder 一次返回商和余数 → 同理，你的函数也要用 return 返回 total 和 product', 's, p 分别接收 total 和 product，顺序要一一对应', 'total = a + b = 5 + 3 = 8，product = a * b = 5 * 3 = 15'],
        testCases: [{ input: '', expected: '8\n15' }]
      },
      {
        id: 'ch18_02',
        title: '闭包',
        titleEn: 'Closures',
        xp: 70,
        content: `
## 闭包 (Closure)

闭包是指**内部函数引用了外部函数的变量，并返回内部函数**。

**三要素**：函数嵌套、内部引用外部变量、外部函数返回内部函数。

\`\`\`python
def outer(x):
    def inner(y):
        return x + y  # inner 使用了 outer 的变量 x
    return inner       # 返回内部函数

add5 = outer(5)       # 创建一个"加了5"的函数
print(add5(3))         # 8
print(add5(10))        # 15
\`\`\`

**闭包的实用案例 — 计数器**：

\`\`\`python
def make_counter(start=0):
    count = start
    def counter():
        nonlocal count  # 声明要修改外部变量
        count += 1
        return count
    return counter

cnt = make_counter()
print(cnt())  # 1
print(cnt())  # 2
print(cnt())  # 3
\`\`\`

> 💡 闭包可以"记住"外部变量的状态，是装饰器的基础！

### 📝 任务
用闭包实现计数器 \`make_counter()\`，每次调用返回递增数字。
创建 \`cnt = make_counter()\`，打印三次调用结果。
`,
        contentEn: `
## Closures

A closure is an inner function that remembers variables from its outer function.

\`\`\`python
def outer(x):
    def inner(y):
        return x + y
    return inner

add5 = outer(5)
print(add5(3))  # 8
\`\`\`

**A counter using closure**:

\`\`\`python
def make_counter(start=0):
    count = start
    def counter():
        nonlocal count
        count += 1
        return count
    return counter

cnt = make_counter()
print(cnt())  # 1
print(cnt())  # 2
print(cnt())  # 3
\`\`\`

### 📝 Task
Write a \`make_counter()\` closure that returns incrementing numbers.
Create \`cnt = make_counter()\` and print three consecutive calls.
`,
        starterCode: '# 用闭包实现 Counter 计数器',
        answer: 'def make_counter(start=0):\n    count = start\n    def counter():\n        nonlocal count\n        count += 1\n        return count\n    return counter\n\ncnt = make_counter()\nprint(cnt())\nprint(cnt())\nprint(cnt())',
        hints: ['定义一个 make_counter(start=0) 外层函数', '在外层函数里定义一个内层函数做递增', 'Define an outer function make_counter(start=0)', 'Define a nested function inside it to increment'],
        testCases: [{ input: '', expected: '1\n2\n3' }]
      },
      {
        id: 'ch18_03',
        title: '装饰器',
        titleEn: 'Decorators',
        xp: 80,
        content: `
## 装饰器 (Decorator)

装饰器是一种**在不修改原函数的情况下，为函数添加新功能**的方式。

\`\`\`python
def log_decorator(func):
    """装饰器：在调用前后打印日志"""
    def wrapper(*args, **kwargs):
        print(f"调用 {func.__name__}...")
        result = func(*args, **kwargs)
        print(f"{func.__name__} 执行完毕")
        return result
    return wrapper

@log_decorator   # 使用 @ 语法糖
def say_hello(name):
    print(f"你好，{name}！")

say_hello("张三")
# 输出：
# 调用 say_hello...
# 你好，张三！
# say_hello 执行完毕
\`\`\`

**什么是 @ 语法糖？**

\`\`\`python
# 下面两种写法是等价的：
@log_decorator
def greet(): ...

# 等价于：
greet = log_decorator(greet)
\`\`\`

**实用的计时装饰器**：

\`\`\`python
import time

def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} 耗时 {end-start:.2f}秒")
        return result
    return wrapper
\`\`\`

### 📝 任务
现在轮到你了！实现一个 \`log_call\` 装饰器。

它应该：
1. 在调用原函数前，打印 \`"开始执行"\`
2. 执行原函数
3. 在原函数执行后，打印 \`"执行完毕"\`

完成后用 \`@log_call\` 装饰 \`hello\` 函数并测试。
`,
        contentEn: `
## Decorators

A decorator adds functionality to a function without modifying it.

\`\`\`python
def log(func):
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}...")
        return func(*args, **kwargs)
    return wrapper

@log
def greet(name):
    print(f"Hello, {name}!")
\`\`\`

### 📝 Task
Now it's your turn! Implement the \`log_call\` decorator.

It should:
1. Print \`"开始执行"\` before calling the function
2. Call the function
3. Print \`"执行完毕"\` after the call

Then apply \`@log_call\` to \`hello\` and test it.
`,
        starterCode: 'def log_call(func):\n    # 请在此实现装饰器\n\n\n@log_call\ndef hello():\n    print("Hello!")\n\nhello()',
        answer: 'def log_call(func):\n    def wrapper():\n        print("开始执行")\n        result = func()\n        print("执行完毕")\n        return result\n    return wrapper\n\n@log_call\ndef hello():\n    print("Hello!")\n\nhello()',
        hints: [
          // Step 1: 装饰器骨架
          '【解释】定义 log_call 函数，接收一个函数 func 作为参数。在内部定义一个 wrapper 函数（暂时用 pass 占位），最后 return wrapper（不加括号）\n【代码】def log_call(func):\n    def wrapper():\n        pass\n    return wrapper',
          '【解释】Define log_call(func), create inner wrapper() with pass, return wrapper (no parentheses)\n【代码】def log_call(func):\n    def wrapper():\n        pass\n    return wrapper',
          // Step 2: wrapper 内部逻辑
          '【解释】在 wrapper 里先 print("开始执行")，然后调用原函数 func() 并将结果存入 result，再 print("执行完毕")，最后 return result。注意：这里 func() 括号里不写参数，因为转译器不支持 *args\n【代码】def wrapper():\n    print("开始执行")\n    result = func()\n    print("执行完毕")\n    return result',
          '【解释】Inside wrapper: print("开始执行"), call func() and save to result, print("执行完毕"), return result. No arguments in func() — transpiler limitation\n【代码】def wrapper():\n    print("开始执行")\n    result = func()\n    print("执行完毕")\n    return result',
          // Step 3: 应用装饰器
          '【解释】用 @log_call 装饰 hello 函数，然后调用 hello()。记得单独定义 hello 函数，打印 "Hello!"\n【代码】@log_call\ndef hello():\n    print("Hello!")\n\nhello()',
          '【解释】Apply @log_call to hello(), then call hello(). Define hello() to print "Hello!"\n【代码】@log_call\ndef hello():\n    print("Hello!")\n\nhello()',
          // Step 4: 完整代码
          '【解释】完整代码结构：外层 def log_call(func)，内层 def wrapper() 实现核心逻辑，最后 return wrapper。用 @log_call 装饰 hello 后调用\n【代码】def log_call(func):\n    def wrapper():\n        print("开始执行")\n        result = func()\n        print("执行完毕")\n        return result\n    return wrapper\n\n@log_call\ndef hello():\n    print("Hello!")\n\nhello()',
          '【解释】Full structure: outer log_call(func) → inner wrapper() with core logic → return wrapper. Then apply with @log_call and call hello()\n【代码】def log_call(func):\n    def wrapper():\n        print("开始执行")\n        result = func()\n        print("执行完毕")\n        return result\n    return wrapper\n\n@log_call\ndef hello():\n    print("Hello!")\n\nhello()'
        ],
        testCases: [{ input: '', expected: '开始执行\nHello!\n执行完毕' }]
      },
      {
        id: 'ch18_04',
        title: '闭包与装饰器挑战',
        titleEn: 'Closure & Decorator Challenge',
        xp: 100,
        content: `
## 闭包与装饰器挑战

综合运用闭包和装饰器解决实际问题。

**挑战1：带参数的装饰器**

\`\`\`python
def repeat(n):
    """让函数重复执行 n 次的装饰器"""
    def decorator(func):
        def wrapper(*args, **kwargs):
            for i in range(n):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def say_hi():
    print("Hi!")
# say_hi() 会打印三次 "Hi!"
\`\`\`

**挑战2：缓存装饰器（闭包应用）**

\`\`\`python
def memoize(func):
    """缓存函数结果，避免重复计算"""
    cache = {}  # 闭包保存缓存字典
    def wrapper(n):
        if n not in cache:
            cache[n] = func(n)
        return cache[n]
    return wrapper

@memoize
def fibonacci(n):
    if n <= 1: return n
    return fibonacci(n-1) + fibonacci(n-2)
# 加了缓存后，fibonacci(40) 秒出结果！
\`\`\`

### 📝 任务
轮到你了！实现 \`count_calls\` 装饰器，它利用闭包来追踪函数被调用的次数。

每次调用被装饰函数时，应该打印当前是第几次调用，然后执行原函数。

完成后用 \`@count_calls\` 装饰 \`say_hi\` 函数，调用 3 次验证。
`,
        contentEn: `
## Closure & Decorator Challenge

Build parameterized decorators and caching decorators.

### 📝 Task
Your turn! Implement the \`count_calls\` decorator that uses a closure to track how many times a function is called.

Each time the decorated function is called, print the call count, then execute the original function.

Then apply \`@count_calls\` to \`say_hi\` and call it 3 times.
`,
        starterCode: '# 实现 count_calls 装饰器\n# 每次调用函数时打印当前是第几次调用\n\n@count_calls\ndef say_hi():\n    print("Hi!")\n\nsay_hi()\nsay_hi()\nsay_hi()',
        answer: 'def count_calls(func):\n    count = 0\n    def wrapper():\n        nonlocal count\n        count += 1\n        print(f"第{count}次调用")\n        return func()\n    return wrapper\n\n@count_calls\ndef say_hi():\n    print("Hi!")\n\nsay_hi()\nsay_hi()\nsay_hi()',
        hints: ['【解释】\n装饰器 count_calls 接收一个函数 func 作为参数。count = 0 是闭包变量，存在外层函数的局部作用域中，wrapper 内部可以访问它。\n\n先写出骨架：外层函数接收 func，内层函数 wrapper 最终要替代原函数，最后 return wrapper 返回新函数。\n注意：wrapper 目前用 pass 占位，后续步骤会替换为完整代码。\n\n【代码】\ndef count_calls(func):\n    count = 0\n    def wrapper():\n        pass\n    return wrapper', '【解释】\nThe decorator count_calls takes a function func as its parameter. count = 0 is a closure variable stored in the outer function\'s local scope, accessible from inside wrapper.\n\nFirst write the skeleton: the outer function receives func, the inner wrapper will eventually replace the original function, and return wrapper returns the new function.\nNote: wrapper currently uses pass as a placeholder — it will be replaced with real code in the next step.\n\n【代码】\ndef count_calls(func):\n    count = 0\n    def wrapper():\n        pass\n    return wrapper', '【解释】\nnonlocal count 是 Python 的关键语法：它告诉解释器"我要修改的 count 不是本地变量，而是外层函数的 count"。如果没有 nonlocal，count += 1 会报错，因为 Python 认为你在内层函数中创建了一个新的局部变量。\n\n然后：\n• count += 1：每次调用累加计数\n• print(f"第{count}次调用")：用 f-string 输出当前是第几次调用\n• return func()：执行并返回原始函数的运行结果\n\n【代码】\ndef count_calls(func):\n    count = 0\n    def wrapper():\n        nonlocal count\n        count += 1\n        print(f"第{count}次调用")\n        return func()\n    return wrapper', '【解释】\nnonlocal count is the key Python syntax: it tells the interpreter "I\'m modifying the count variable from the outer function, not creating a new local variable." Without nonlocal, count += 1 would raise an error because Python would think you\'re creating a new local variable.\n\nThen:\n• count += 1: increment the counter on each call\n• print(f"第{count}次调用"): use f-string to output the current call number\n• return func(): execute and return the original function\'s result\n\n【代码】\ndef count_calls(func):\n    count = 0\n    def wrapper():\n        nonlocal count\n        count += 1\n        print(f"第{count}次调用")\n        return func()\n    return wrapper', '【解释】\n完整流程解析：\n1. @count_calls 等价于 say_hi = count_calls(say_hi)，Python 会自动把 say_hi 函数传给 count_calls\n2. count_calls 返回 wrapper 函数，所以后续 say_hi() 实际执行的是 wrapper()\n3. 每次调用 wrapper：count 加 1 → 打印"第X次调用" → 执行原始的 say_hi（打印 "Hi!"）\n4. 调用 3 次，所以依次输出：第1次调用 → Hi! → 第2次调用 → Hi! → 第3次调用 → Hi!\n\n关键概念：闭包（closure）——wrapper 内部引用了外层函数的 count 变量，即使 count_calls 执行完毕，count 仍然被保留在内存中，不会被回收。\n\n【代码】\ndef count_calls(func):\n    count = 0\n    def wrapper():\n        nonlocal count\n        count += 1\n        print(f"第{count}次调用")\n        return func()\n    return wrapper\n\n@count_calls\ndef say_hi():\n    print("Hi!")\n\nsay_hi()\nsay_hi()\nsay_hi()\n\n预期输出：\n第1次调用\nHi!\n第2次调用\nHi!\n第3次调用\nHi!', '【解释】\nFull flow explanation:\n1. @count_calls is equivalent to say_hi = count_calls(say_hi) — Python automatically passes say_hi to count_calls\n2. count_calls returns the wrapper function, so say_hi() now actually runs wrapper()\n3. Each call to wrapper: increment count → print "第X次调用" → execute the original say_hi (prints "Hi!")\n4. 3 calls are made, so the output is: 第1次调用 → Hi! → 第2次调用 → Hi! → 第3次调用 → Hi!\n\nKey concept: closure — wrapper references the count variable from the outer function. Even after count_calls finishes executing, count remains in memory and won\'t be garbage collected.\n\n【代码】\ndef count_calls(func):\n    count = 0\n    def wrapper():\n        nonlocal count\n        count += 1\n        print(f"第{count}次调用")\n        return func()\n    return wrapper\n\n@count_calls\ndef say_hi():\n    print("Hi!")\n\nsay_hi()\nsay_hi()\nsay_hi()\n\nExpected output:\n第1次调用\nHi!\n第2次调用\nHi!\n第3次调用\nHi!'],
        testCases: [{ input: '', expected: '第1次调用\nHi!\n第2次调用\nHi!\n第3次调用\nHi!' }]
      }
    ]
  },
  {
    id: 'ch19',
    title: 'Chapter 19: 正则表达式',
    titleEn: 'Chapter 19: Regular Expressions',
    description: '用正则表达式高效处理文本',
    descriptionEn: 'Process text efficiently with regex',
    icon: '🔍',
    lessons: [
      {
        id: 'ch19_01',
        title: 're模块基础',
        titleEn: 're Module Basics',
        xp: 60,
        content: `
## re 模块基础

正则表达式（Regex）是一种**文本模式匹配**工具，用于搜索、替换、提取文本。

Python 使用 \`re\` 模块处理正则表达式。

**常用方法**：

| 方法 | 用途 |
|------|------|
| \`re.match(pattern, text)\` | 从开头匹配 |
| \`re.search(pattern, text)\` | 搜索任意位置 |
| \`re.findall(pattern, text)\` | 返回所有匹配列表 |
| \`re.sub(pattern, repl, text)\` | 替换匹配内容 |
| \`re.split(pattern, text)\` | 按模式分割 |

**示例：用 \`re.findall\` 提取所有数字**：

\`\`\`python
import re

text = "价格：100元，折扣：20元"
nums = re.findall(r"\\d+", text)
print(nums)  # ['100', '20']
\`\`\`

> 💡 \`\\d\` 代表数字，\`+\` 表示一个或多个。
> \`re.findall\` 返回所有匹配的**列表**。

### 📝 任务
参考上面的示例，自己编写代码从文本中提取所有数字，并打印结果列表。

**在右侧编辑器中按步骤编写**：
1. \`import re\` — 导入正则模块
2. \`text = "苹果8元, 香蕉5元, 橙子6元"\` — 给定文本
3. \`prices = re.findall(r"\\d+", text)\` — 提取所有数字
4. \`print(prices)\` — 打印结果

> 💡 \`\\d\` 匹配数字，\`+\` 表示一个或多个。完整代码共 4 行。
`,
        contentEn: `
## re Module Basics

Regex is a pattern-matching tool for searching, replacing, and extracting text.

Python uses the \`re\` module for regular expressions.

**Common methods**:

| Method | Description |
|--------|-------------|
| \`re.match(pattern, text)\` | Match from beginning |
| \`re.search(pattern, text)\` | Search anywhere |
| \`re.findall(pattern, text)\` | Return all matches as a list |
| \`re.sub(pattern, repl, text)\` | Replace matches |
| \`re.split(pattern, text)\` | Split by pattern |

**Example**:

\`\`\`python
import re
text = "价格：100元，折扣：20元"
nums = re.findall(r"\\d+", text)
print(nums)  # ['100', '20']
\`\`\`

### 📝 Task
Write code to extract all numbers from the text and print the result list.

1. \`import re\`
2. \`text = "苹果8元, 香蕉5元, 橙子6元"\`
3. \`prices = re.findall(r"\\d+", text)\`
4. \`print(prices)\`

> 💡 \`\\d\` matches digits, \`+\` means one or more. 4 lines total.
`,
        starterCode: '# 导入 re 模块\n\n# 给定文本\ntext = "苹果8元, 香蕉5元, 橙子6元"\n\n# 用 re.findall 提取所有数字\n\n\n# 打印结果\n',
        answer: 'import re\ntext = "苹果8元, 香蕉5元, 橙子6元"\nprices = re.findall(r"\\d+", text)\nprint(prices)',
        hints: ['第1步：用 import re 导入正则模块。这是使用正则表达式前必须做的第一步。', 'Step 1: Use import re to import the regex module. This is required before using any regex functions.', '第2步：想想用什么方法可以提取所有匹配。\n从上面表格中找：要返回所有匹配的列表，应该用 re.findall(pattern, text)。\n第一个参数填正则模式 r"\\d+"（\d 匹配数字，+ 表示一个或多个），第二个参数填 text。\n把结果保存到变量 prices 中。', 'Step 2: Think about which method to use.\nFrom the table above: to return all matches as a list, use re.findall(pattern, text).\nFirst argument is the pattern r"\\d+"（\\d matches digits, + means one or more）, second is text.\nSave the result to variable prices.', '第3步：用 print(prices) 打印结果。运行后应该看到 [8, 5, 6]', 'Step 3: Use print(prices) to print the result. Expected output: [8, 5, 6]'],
        testCases: [{ input: '', expected: '[8, 5, 6]' }]
      },
      {
        id: 'ch19_02',
        title: '元字符与量词',
        titleEn: 'Metacharacters & Quantifiers',
        xp: 70,
        content: `
## 元字符与量词

正则表达式通过**元字符**和**量词**构建匹配规则。

**常用元字符**：

| 元字符 | 含义 | 示例 |
|--------|------|------|
| \\d | 数字 | \\\\d+ 匹配 "123" |
| \\w | 字母/数字/下划线 | \\\\w+ 匹配 "hello_123" |
| \\s | 空白符 | \\\\s+ 匹配空格 |
| . | 任意字符(除换行) | h.t 匹配 "hat" |
| ^ | 行开头 | ^Hello |
| $ | 行结尾 | end$ |

**量词**：

| 量词 | 含义 |
|------|------|
| * | 0次或多次 |
| + | 1次或多次 |
| ? | 0次或1次 |
| {n} | 精确n次 |
| {n,} | 至少n次 |
| {n,m} | n到m次 |

**示例：提取所有单词**：

\`\`\`python
import re

text = "apple, banana; cherry | date"
words = re.findall(r"\\w+", text)
print(words)  # ['apple', 'banana', 'cherry', 'date']
\`\`\`

> 💡 \`\\w\` 匹配字母、数字、下划线。
> \`+\` 表示一个或多个，所以 \`\\w+\` 匹配连续的单词。

### 📝 任务
用 \`re.findall(r"\\w+", text)\` 从文本中提取所有单词，然后打印结果列表。

\`\`\`python
text = "apple, banana; cherry | date"
# 用 re.findall(r"\\w+", text) 提取所有单词
\`\`\`
`,
        contentEn: `
## Metacharacters & Quantifiers

Metacharacters define character types, quantifiers control repetition.

**Common metacharacters**:

| Char | Meaning | Example |
|------|---------|---------|
| \\d | Digit | matches "123" |
| \\w | Word char (letter, digit, _) | matches "hello_123" |
| \\s | Whitespace | matches space |
| . | Any char (except newline) | h.t matches "hat" |
| ^ | Start of line | ^Hello |
| $ | End of line | end$ |

**Quantifiers**:

| Symbol | Meaning |
|--------|---------|
| * | 0 or more |
| + | 1 or more |
| ? | 0 or 1 |
| {n} | Exactly n |

**Example: Extract all words**:

\`\`\`python
import re

text = "apple, banana; cherry | date"
words = re.findall(r"\\w+", text)
print(words)  # ['apple', 'banana', 'cherry', 'date']
\`\`\`

> 💡 \`\\w\` matches letters, digits, and underscores.
> \`+\` means one or more, so \`\\w+\` matches whole words.

### 📝 Task
Use \`re.findall(r"\\w+", text)\` to extract all words, then print the result list.

\`\`\`python
text = "apple, banana; cherry | date"
# Use re.findall(r"\\w+", text) to extract words
\`\`\`
`,
        starterCode: 'import re\ntext = "apple, banana; cherry | date"\n# 用 re.findall 提取所有单词\nwords = \nprint(words)',
        answer: 'import re\ntext = "apple, banana; cherry | date"\nwords = re.findall(r"\\w+", text)\nprint(words)',
        hints: ['用 re.findall(r"\\w+", text) 查找所有单词，\w 匹配字母数字下划线，+ 表示一个或多个', 'Use re.findall(r"\\w+", text) to find all words, \\w matches letters/digits/underscores, + means one or more'],
        testCases: [{ input: '', expected: '[apple, banana, cherry, date]' }]
      },
      {
        id: 'ch19_03',
        title: '正则表达式实战',
        titleEn: 'Regex Practice',
        xp: 80,
        content: `
## 正则表达式实战

**1. 提取所有URL**

\`\`\`python
import re

text = "访问 https://www.python.org 和 http://github.com"
urls = re.findall(r"https?://[\\w.]+", text)
print(urls)  # ['https://www.python.org', 'http://github.com']
\`\`\`

**2. 清洗文本中的HTML标签**

\`\`\`python
html = "<p>Hello <b>World</b></p>"
clean = re.sub(r"<[^>]+>", "", html)
print(clean)  # "Hello World"
\`\`\`

**3. 密码强度验证**

\`\`\`python
def check_password(password):
    \"\"\"密码必须：至少8位、包含大写/小写/数字\"\"\"
    if len(password) < 8:
        return "密码至少8位"
    if not re.search(r"[A-Z]", password):
        return "需要大写字母"
    if not re.search(r"[a-z]", password):
        return "需要小写字母"
    if not re.search(r"\\d", password):
        return "需要数字"
    return "密码合格！"

print(check_password("Abc12345"))  # 密码合格！
\`\`\`

**4. 分组提取**

\`\`\`python
# 从日期字符串中提取年、月、日
date = "2024-08-15"
match = re.match(r"(\\d{4})-(\\d{2})-(\\d{2})", date)
if match:
    year, month, day = match.groups()
    print(f"年={year}, 月={month}, 日={day}")
\`\`\`

### 📝 任务
用 \`re.findall(r"\\w+@\\w+\\.\\w+", text)\` 从文本中提取所有邮箱地址，然后打印结果列表。

\`\`\`python
text = "联系邮箱: alice@gmail.com, 客服: bob@web.com"
# 用 re.findall 提取所有邮箱
\`\`\`
`,
        contentEn: `
## Regex Practice

Real-world regex applications: URL extraction, HTML cleaning, password validation, group extraction.

**Example: Extract emails**

\`\`\`python
import re

text = "联系邮箱: alice@gmail.com, 客服: bob@web.com"
emails = re.findall(r"\\w+@\\w+\\.\\w+", text)
print(emails)
\`\`\`

### 📝 Task
Use \`re.findall(r"\\w+@\\w+\\.\\w+", text)\` to extract all email addresses from the text, then print the result list.
`,
        starterCode: 'import re\ntext = "联系邮箱: alice@gmail.com, 客服: bob@web.com"\n# 用 re.findall 提取所有邮箱\nemails = \nprint(emails)',
        answer: 'import re\ntext = "联系邮箱: alice@gmail.com, 客服: bob@web.com"\nemails = re.findall(r"\\w+@\\w+\\.\\w+", text)\nprint(emails)',
        hints: ['用 re.findall(r"\\w+@\\w+\\.\\w+", text) 提取邮箱，\w+匹配用户名/域名，\.匹配点号', 'Use re.findall(r"\\w+@\\w+\\.\\w+", text) — \\w+ matches usernames/domains, \\. matches the dot'],
        testCases: [{ input: '', expected: '[alice@gmail.com, bob@web.com]' }]
      }
    ]
  },
  {
    id: 'ch20',
    title: 'Chapter 20: 多线程与网络编程',
    titleEn: 'Chapter 20: Threading & Networking',
    description: '了解多线程并发和Socket网络通信',
    descriptionEn: 'Learn multithreading and Socket networking',
    icon: '🌐',
    lessons: [
      {
        id: 'ch20_01',
        title: '多线程概念',
        titleEn: 'Threading Concepts',
        xp: 60,
        content: `
## 多线程概念

**进程 vs 线程**：
- **进程**（Process）：操作系统分配资源的单位，每个进程有独立内存
- **线程**（Thread）：CPU调度的最小单位，同一进程的线程共享内存

在代码中，线程通过 \`threading.Thread(函数, [参数列表])\` 创建，用 \`.start()\` 启动，用 \`.join()\` 等待完成。

\`\`\`python
import threading

def worker(name):
    """定义线程要执行的任务"""
    print(f"工人 {name} 开始工作")
    print(f"工人 {name} 完成")

# 创建两个线程
t1 = threading.Thread(worker, ["A"])
t2 = threading.Thread(worker, ["B"])

t1.start()  # 启动线程 A
t2.start()  # 启动线程 B
t1.join()   # 等待 A 结束
t2.join()   # 等待 B 结束
print("所有线程执行完毕")
\`\`\`

> ⚠️ **GIL（全局解释器锁）**：CPython中同一时刻只有一个线程执行Python代码。多线程适合**I/O密集型**任务（网络请求、文件读写），CPU密集型用多进程。

### 📝 任务
定义 \`worker(name)\` 函数，打印开始和完成信息。然后用 \`threading.Thread\` 创建两个线程分别执行 \`worker("A")\` 和 \`worker("B")\`，启动并等待它们完成，最后打印 \`"所有线程执行完毕"\`。
`,
        contentEn: `
## Threading Concepts

**Process vs Thread**:
- **Process**: OS resource unit, each has independent memory
- **Thread**: Smallest CPU scheduling unit, threads in same process share memory

In code, threads are created with \`threading.Thread(func, [args])\`, started with \`.start()\`, and waited on with \`.join()\`.

\`\`\`python
import threading

def worker(name):
    """Define the task for the thread"""
    print(f"Worker {name} starts")
    print(f"Worker {name} done")

t1 = threading.Thread(worker, ["A"])
t2 = threading.Thread(worker, ["B"])

t1.start()
t2.start()
t1.join()
t2.join()
print("All threads done")
\`\`\`

> ⚠️ **GIL**: In CPython, only one thread executes Python code at a time. Multithreading suits **I/O-bound** tasks (network, file I/O); use multiprocessing for CPU-bound tasks.

### 📝 Task
Define a \`worker(name)\` function that prints start and done messages. Then create two threads with \`threading.Thread\` to run \`worker("A")\` and \`worker("B")\`, start and join them, and print \`"All threads done"\`.
`,
        starterCode: 'import threading\n\ndef worker(name):\n    # 打印开始信息\n    # 打印完成信息\n\n# 创建两个线程\n\n# 启动线程\n\n# 等待线程结束\n\n# 打印完成',
        answer: 'import threading\n\ndef worker(name):\n    print(f"工人 {name} 开始工作")\n    print(f"工人 {name} 完成")\n\nt1 = threading.Thread(worker, ["A"])\nt2 = threading.Thread(worker, ["B"])\nt1.start()\nt2.start()\nt1.join()\nt2.join()\nprint("所有线程执行完毕")',
        hints: ['【解释】\n第一步：导入 threading 模块，定义 worker 函数。\n- \`import threading\` 导入线程模块\n- \`worker(name)\` 接收一个名字参数\n- 函数体内用两个 print 分别打印开始和完成信息\n\n注意：print 中使用 f-string 格式化字符串，如 \`f"工人 {name} 开始工作"\`\n\n【代码】\nimport threading\n\ndef worker(name):\n    print(f"工人 {name} 开始工作")\n    print(f"工人 {name} 完成")', '【解释】\nStep 1: Import threading and define the worker function.\n- \`import threading\` loads the threading module\n- \`worker(name)\` takes a name parameter\n- Use two print statements for start and done messages\n\n【代码】\nimport threading\n\ndef worker(name):\n    print(f"Worker {name} starts")\n    print(f"Worker {name} done")', '【解释】\n第二步：使用 threading.Thread 创建并管理线程。\n\n关键语法：\n- \`threading.Thread(worker, ["A"])\`\n  • 第一个参数：要执行的函数（**不加括号**，只传函数引用）\n  • 第二个参数：参数列表（用方括号包裹，如 \`["A"]\`）\n- \`.start()\`：启动线程，开始执行函数\n- \`.join()\`：等待线程执行完毕\n\n执行流程：\n① t1.start() → worker("A") 执行\n② t2.start() → worker("B") 执行\n③ t1.join() / t2.join() 等待完成\n④ 最后打印 "所有线程执行完毕"\n\n【代码】\nimport threading\n\ndef worker(name):\n    print(f"工人 {name} 开始工作")\n    print(f"工人 {name} 完成")\n\nt1 = threading.Thread(worker, ["A"])\nt2 = threading.Thread(worker, ["B"])\nt1.start()\nt2.start()\nt1.join()\nt2.join()\nprint("所有线程执行完毕")\n\n预期输出：\n工人 A 开始工作\n工人 A 完成\n工人 B 开始工作\n工人 B 完成\n所有线程执行完毕', '【解释】\nStep 2: Use threading.Thread to create and manage threads.\n\nKey syntax:\n- \`threading.Thread(worker, ["A"])\`\n  • 1st argument: function reference — **no parentheses**\n  • 2nd argument: argument list (use square brackets)\n- \`.start()\`: begin thread execution\n- \`.join()\`: wait for thread to finish\n\n【代码】\nimport threading\n\ndef worker(name):\n    print(f"Worker {name} starts")\n    print(f"Worker {name} done")\n\nt1 = threading.Thread(worker, ["A"])\nt2 = threading.Thread(worker, ["B"])\nt1.start()\nt2.start()\nt1.join()\nt2.join()\nprint("All threads done")\n\nExpected output:\nWorker A starts\nWorker A done\nWorker B starts\nWorker B done\nAll threads done'],
        testCases: [{ input: '', expected: '工人 A 开始工作\n工人 A 完成\n工人 B 开始工作\n工人 B 完成\n所有线程执行完毕' }]
      },
      {
        id: 'ch20_02',
        title: '多线程实战',
        titleEn: 'Threading Practice',
        xp: 70,
        content: `
## 多线程实战

**场景：多线程操作共享数据**

多个线程同时修改同一个变量时，必须用锁保护，否则数据会错乱。

- \`threading.Lock()\` 创建锁
- \`with lock:\` 自动获取和释放锁

\`\`\`python
import threading

counter = 0
lock = threading.Lock()  # 创建锁

def safe_worker():
    global counter
    for _ in range(1000):
        with lock:  # 加锁保护
            counter += 1  # 这段代码一次只有一个线程能执行
        # 退出 with 自动释放锁

# 启动5个线程
for i in range(5):
    t = threading.Thread(target=safe_worker)
    t.start()

# 等待所有线程结束（实际需要存储线程引用）
print(f"Result: {counter}")
\`\`\`

> ⚠️ 不加锁的话，多个线程同时修改同一变量会导致数据错乱！

### 📝 任务
定义 \`worker(n)\` 函数：将全局变量 \`counter\` 增加 \`n\` 次（每次 +1）。
然后用循环模拟5个"工人"，每人加200次，最后打印 \`"Result: {counter}"\`。

\`\`\`
预期输出：
Result: 1000
\`\`\`
`,
        contentEn: `
## Threading Practice

**Scenario: Thread-safe shared data**

When multiple threads modify the same variable, use a lock (\`threading.Lock()\`) to prevent data races.

\`\`\`python
import threading

counter = 0
lock = threading.Lock()

def safe_worker():
    global counter
    for _ in range(1000):
        with lock:
            counter += 1

# Start 5 threads
for i in range(5):
    t = threading.Thread(target=safe_worker)
    t.start()

print(f"Result: {counter}")
\`\`\`

> ⚠️ Without a lock, concurrent writes corrupt shared data!

### 📝 Task
Define a \`worker(n)\` function that increments global \`counter\` \`n\` times (by 1 each).
Then loop 5 times calling \`worker(200)\`, and finally print \`"Result: {counter}"\`.

\`\`\`
Expected output:
Result: 1000
\`\`\`
`,
        starterCode: '',
        answer: 'counter = 0\n\ndef worker(n):\n    global counter\n    for _ in range(n):\n        counter += 1\n\nfor i in range(5):\n    worker(200)\n\nprint(f"Result: {counter}")',
        hints: ['【解释】\n第一步：定义全局变量 counter 和 worker 函数。\n\n关键语法：\n- \`counter = 0\`：在函数外定义的变量是全局变量\n- \`def worker(n)\`：接收一个参数 n，表示要加多少次\n- \`global counter\`：在函数内部声明要使用全局变量 counter（不加 global 的话，counter += 1 会报错！）\n- \`for _ in range(n): counter += 1\`：循环 n 次，每次让 counter 加 1\n\n注意：循环变量用 \`_\` 表示"我们不在乎这个变量的值"，只需要循环次数。\n\n【代码】\ncounter = 0\n\ndef worker(n):\n    global counter\n    for _ in range(n):\n        counter += 1', '【解释】\nStep 1: Define the global counter and worker function.\n\nKey syntax:\n- \`counter = 0\`: variable defined outside a function = global\n- \`def worker(n)\`: takes param n = how many times to increment\n- \`global counter\`: declare intent to use the global counter (without this, \`counter += 1\` fails!)\n- \`for _ in range(n): counter += 1\`: loop n times, incrementing each time\n\nNote: \`_\` as loop variable means "we don\'t care about the value" — just need the loop count.\n\n【代码】\ncounter = 0\n\ndef worker(n):\n    global counter\n    for _ in range(n):\n        counter += 1', '【解释】\n第二步：调用 worker 函数 5 次，每人加 200 次，然后打印结果。\n\n关键逻辑：\n- \`for i in range(5):\` 循环 5 次\n- \`worker(200)\` 每次调用让 counter 加 200\n- 5 个工人 × 每人 200 次 = 1000\n- 最后用 \`print(f"Result: {counter}")\` 输出最终结果\n\n执行流程：\n① 初始 counter = 0\n② 第 1 次 worker(200) → counter 变成 200\n③ 第 2 次 worker(200) → counter 变成 400\n④ ...以此类推...\n⑤ 第 5 次 worker(200) → counter 变成 1000\n⑥ print(f"Result: {counter}") → 输出 Result: 1000\n\n【代码】\ncounter = 0\n\ndef worker(n):\n    global counter\n    for _ in range(n):\n        counter += 1\n\nfor i in range(5):\n    worker(200)\n\nprint(f"Result: {counter}")\n\n预期输出：\nResult: 1000', '【解释】\nStep 2: Call worker 5 times (each adds 200), then print the result.\n\nLogic:\n- \`for i in range(5):\` loop 5 times\n- \`worker(200)\` adds 200 to counter per call\n- 5 workers × 200 each = 1000\n- Print with \`print(f"Result: {counter}")\`\n\nExpected output:\nResult: 1000'],
        testCases: [{ input: '', expected: 'Result: 1000' }]
      },
      {
        id: 'ch20_03',
        title: 'Socket 网络编程',
        titleEn: 'Socket Programming',
        xp: 80,
        content: `
## Socket 网络编程

Socket（套接字）是网络通信的端点，由 **IP地址 + 端口号** 组成。

**服务端流程**：socket() → bind() → listen() → accept() → recv()/send() → close()

\`\`\`python
import socket

# 创建 TCP Socket
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(("127.0.0.1", 8888))
server.listen(5)
client_socket, addr = server.accept()

data = client_socket.recv(1024).decode("utf-8")
print(f"收到：{data}")
client_socket.send("你好，客户端！".encode("utf-8"))

client_socket.close()
server.close()
\`\`\`

**客户端流程**：

\`\`\`python
client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client.connect(("127.0.0.1", 8888))

client.send("Hello Server!".encode("utf-8"))
response = client.recv(1024).decode("utf-8")
print(f"服务端回复：{response}")

client.close()
\`\`\`

> 💡 \`AF_INET\` = IPv4, \`SOCK_STREAM\` = TCP协议
> 网络传输的是**字节**（bytes），所以发送前要 \`.encode()\`，接收后要 \`.decode()\`

### 📝 任务
定义 \`send_message(msg)\` 函数，将消息 \`msg\` 编码为字节，统计字节数，然后模拟服务器回复格式。
然后依次发送 "Hello" 和 "你好" 两条消息，最后打印完成提示。

\`\`\`
预期输出：
[Hello] 5 bytes → 已发送
[你好] 6 bytes → 已发送
All messages sent
\`\`\`

> 💡 中文每个字符占3字节（UTF-8），所以"你好"是6字节
`,
        contentEn: `
## Socket Programming

Socket = IP + Port. Data is sent as **bytes** over the network.

**Server**: socket() → bind() → listen() → accept() → recv()/send() → close()
**Client**: socket() → connect() → send()/recv() → close()

> 💡 Always \`.encode()\` before sending, \`.decode()\` after receiving.

### 📝 Task
Define \`send_message(msg)\` that encodes \`msg\` to bytes, counts the bytes, and formats server reply.
Then define \`server_process(msg1, msg2)\` that calls \`send_message()\` twice and combines results.

\`\`\`
Input: server_process("Hello", "你好")
Output:
[Hello] 5 bytes → 已发送
[你好] 6 bytes → 已发送
\`\`\`
`,
        starterCode: '',
        answer: 'def send_message(msg):\n    data = msg.encode("utf-8")\n    return f"[{msg}] {len(data)} bytes → 已发送"\n\nprint(send_message("Hello"))\nprint(send_message("你好"))\nprint("All messages sent")',
        hints: ['【解释】\n第一步：定义 send_message(msg) 函数。\n\n需求拆解：\n- 用 \`.encode("utf-8")\` 把字符串转成字节对象\n- 用 \`len(data)\` 统计字节长度\n- 用 f-string 返回格式化的结果\n\n关键语法：\n- \`str.encode("utf-8")\`：字符串 → 字节（网络传输需要字节）\n- \`len(字节对象)\`：统计字节数量\n  - 英文字母："Hello" = 5 字节（每个字母 1 字节）\n  - 中文字："你好" = 6 字节（每个汉字 3 字节）\n- \`f"[{msg}] {len(data)} bytes → 已发送"\`：格式化输出\n\n注意：函数用 \`return\` 返回结果，print 在外部调用时执行。\n\n【代码】\ndef send_message(msg):\n    data = msg.encode("utf-8")\n    return f"[{msg}] {len(data)} bytes → 已发送"', '【解释】\nStep 1: Define the send_message(msg) function.\n\nRequirements:\n- Use \`.encode("utf-8")\` to convert string to bytes\n- Use \`len(data)\` to get byte count\n- Return a formatted string with f-string\n\nKey syntax:\n- \`str.encode("utf-8")\`: string → bytes (network sends bytes)\n- \`len(bytes_obj)\`: count the bytes\n- \`f"[{msg}] {len(data)} bytes → 已发送"\`: format the output\n\n【代码】\ndef send_message(msg):\n    data = msg.encode("utf-8")\n    return f"[{msg}] {len(data)} bytes → 已发送"', '【解释】\n第二步：调用函数并打印结果。\n\n三步走：\n① \`print(send_message("Hello"))\` → 编码 "Hello"，5 字节 → \`[Hello] 5 bytes → 已发送\`\n② \`print(send_message("你好"))\` → 编码 "你好"，6 字节 → \`[你好] 6 bytes → 已发送\`\n③ \`print("All messages sent")\` → 直接打印完成提示\n\n执行流程详解（以 "Hello" 为例）：\n1. send_message("Hello") 被调用，msg = "Hello"\n2. \`msg.encode("utf-8")\` → b"Hello"（5 字节）\n3. \`len(data)\` → 5\n4. \`return f"[Hello] 5 bytes → 已发送"\` → 返回字符串\n5. \`print(返回的字符串)\` → 输出 [Hello] 5 bytes → 已发送\n\n【代码】\ndef send_message(msg):\n    data = msg.encode("utf-8")\n    return f"[{msg}] {len(data)} bytes → 已发送"\n\nprint(send_message("Hello"))\nprint(send_message("你好"))\nprint("All messages sent")\n\n预期输出：\n[Hello] 5 bytes → 已发送\n[你好] 6 bytes → 已发送\nAll messages sent', '【解释】\nStep 2: Call the function and print the results.\n\n① \`print(send_message("Hello"))\` → "Hello" encoded to 5 bytes\n② \`print(send_message("你好"))\` → "你好" encoded to 6 bytes\n③ \`print("All messages sent")\` → final message\n\n【代码】\ndef send_message(msg):\n    data = msg.encode("utf-8")\n    return f"[{msg}] {len(data)} bytes → 已发送"\n\nprint(send_message("Hello"))\nprint(send_message("你好"))\nprint("All messages sent")\n\nExpected output:\n[Hello] 5 bytes → 已发送\n[你好] 6 bytes → 已发送\nAll messages sent'],
        testCases: [{ input: '', expected: '[Hello] 5 bytes → 已发送\n[你好] 6 bytes → 已发送\nAll messages sent' }]

      }
    ]
  },
  {
    id: 'ch21',
    title: 'Chapter 21: 设计模式与高级特性',
    titleEn: 'Chapter 21: Design Patterns & Advanced Features',
    description: '学习设计模式、类型注解和实用工具函数',
    descriptionEn: 'Learn design patterns, type hints, and utility functions',
    icon: '🏗️',
    lessons: [
      {
        id: 'ch21_01',
        title: '类型注解',
        titleEn: 'Type Hints',
        xp: 60,
        content: `
## 类型注解 (Type Hints)

类型注解为变量和函数标注**期望的数据类型**，提高代码可读性。

\`\`\`python
from typing import List, Dict, Optional, Union

# 变量注解
name: str = "张三"
age: int = 25
scores: List[int] = [95, 88, 92]
info: Dict[str, str] = {"city": "北京", "job": "工程师"}

# Optional：可以是类型或None
def find_user(user_id: int) -> Optional[dict]:
    """找到返回dict，找不到返回None"""
    if user_id == 1:
        return {"name": "张三", "age": 25}
    return None

# Union：多种类型之一
def double(x: Union[int, float]) -> Union[int, float]:
    return x * 2
\`\`\`

**函数注解完整示例**：

\`\`\`python
def greet(name: str, age: int, height: float = 1.75) -> str:
    """返回格式化的问候语"""
    return f"你好{name}，{age}岁，身高{height:.2f}米"

result: str = greet("张三", 25)
print(result)
\`\`\`

> 💡 类型注解**不会强制检查**类型，是给开发者和IDE看的提示。

### 📝 任务

定义一个 \`summary\` 函数，接收两个参数：
- \`name\`（字符串类型）：学生姓名
- \`scores\`（整数列表）：各科成绩

函数计算总分和平均分，然后用 f-string 按格式打印。
先把 \`len(scores)\` 存到变量 \`n\` 里，再用 \`total / n\` 计算平均分。

最后调用 \`summary("小明", [85, 92, 78])\` 测试。
`,
        contentEn: `
## Type Hints

Type hints annotate expected data types for variables and functions.

\`\`\`python
name: str = "Alice"
age: int = 25

def greet(name: str) -> str:
    return f"Hello, {name}"
\`\`\`

### 📝 Task

Define a \`summary\` function that takes two parameters:
- \`name\` (string): student name
- \`scores\` (list of integers): exam scores

Calculate total and average, then print using f-strings.
Store \`len(scores)\` in a variable \`n\` first, then use \`total / n\` for the average.

Call \`summary("Xiao Ming", [85, 92, 78])\` to test.
`,
        starterCode: 'def summary(name, scores):\n    # 补全函数：计算总分和平均分\n    # 提示：用 for 循环累加，先把 len(scores) 存到 n 里\n    pass\n\nsummary("小明", [85, 92, 78])',
        answer: 'def summary(name, scores):\n    total = 0\n    for s in scores:\n        total += s\n    n = len(scores)\n    avg = total / n\n    print(f"{name} 总分: {total}")\n    print(f"平均分: {avg}")\n\nsummary("小明", [85, 92, 78])',
        hints: [
          '【解释】\n写一个函数叫 summary，参数 name 是字符串类型（学生姓名），scores 是整数列表（各科成绩）。\n先用 total = 0 初始化总分变量。\n最后别忘了在函数外调用 summary("小明", [85, 92, 78]) 来测试。\n\n提示：函数写完后要记得在外部调用它，Python 才会执行函数里的代码。\n\n【代码】\ndef summary(name: str, scores: list[int]) -> None:\n    total = 0\n    # 在这里补全函数\n\nsummary("小明", [85, 92, 78])',
          '',
          '【解释】\n用 for s in scores: 遍历分数列表，total += s 把每个分数累加到 total 上。\n这步之后 total 就是所有分数的总和。\n循环结束后用 n = len(scores) 获取科目数量。\n\n注意：total += s 等价于 total = total + s。len(scores) 返回列表长度，比如 [85, 92, 78] 的长度是 3。\n\n【代码】\ndef summary(name: str, scores: list[int]) -> None:\n    total = 0\n    for s in scores:\n        total += s\n    n = len(scores)\n    # 接下来算平均分并输出\n\nsummary("小明", [85, 92, 78])',
          '',
          '【解释】\n用 avg = total / n 计算平均分。注意先把 len(scores) 存到变量 n 再除，避免 total / len(scores) 直接写在代码里（transpiler 不支持这种写法）。\n用 f-string 格式化输出：print(f"{name} 总分: {total}") 和 print(f"平均分: {avg}")。\nf-string 里的大括号 {} 会被替换成变量的值，"总分"和"平均分"这些中文直接保留。\n\n【代码】\ndef summary(name: str, scores: list[int]) -> None:\n    total = 0\n    for s in scores:\n        total += s\n    n = len(scores)\n    avg = total / n\n    print(f"{name} 总分: {total}")\n    print(f"平均分: {avg}")\n\nsummary("小明", [85, 92, 78])\n\n预期输出：\n小明 总分: 255\n平均分: 85.0'
        ],
        testCases: [{ input: '', expected: '小明 总分: 255\n平均分: 85.0' }]
      },
      {
        id: 'ch21_02',
        title: 'enumerate 和 zip',
        titleEn: 'enumerate & zip',
        xp: 60,
        content: `
## enumerate 和 zip

这两个内置函数让循环更加Pythonic。

**enumerate()**：同时获取索引和元素。

\`\`\`python
fruits = ["苹果", "香蕉", "橘子"]

for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")
# 0: 苹果
# 1: 香蕉
# 2: 橘子

# 指定起始索引
for i, fruit in enumerate(fruits, start=1):
    print(f"第{i}个：{fruit}")
\`\`\`

**zip()**：将多个序列"拉链"合并。

\`\`\`python
names = ["张三", "李四", "王五"]
ages = [25, 26, 24]

for name, age in zip(names, ages):
    print(f"{name}，{age}岁")
\`\`\`

**实战：配对数据**

\`\`\`python
keys = ["name", "age", "city"]
values = ["张三", 25, "北京"]
person = dict(zip(keys, values))
print(person)
\`\`\`

### 📝 任务

有 \`names\` 和 \`scores\` 两个列表，用 \`zip\` 把它们配对，再用 \`enumerate\` 从1开始编号，打印成绩排名。

输出的文件名和分数之间用 \` - \` 分隔。
`,
        contentEn: `
## enumerate & zip

**enumerate()**: Loop with index and value simultaneously.

\`\`\`python
for i, val in enumerate(["a", "b", "c"]):
    print(f"{i}: {val}")

# start=1 to begin at 1 instead of 0
for i, val in enumerate(["a", "b"], start=1):
    print(f"{i}: {val}")
\`\`\`

**zip()**: Combine multiple sequences element-wise.

\`\`\`python
names = ["Alice", "Bob"]
ages = [25, 30]
for n, a in zip(names, ages):
    print(f"{n}: {a}")
\`\`\`

### 📝 Task

Given \`names\` and \`scores\` lists, use \`zip\` to pair them, then \`enumerate\` starting from 1 to print a ranked list.

Use \` - \` between name and score.
`,
        starterCode: 'names = ["张三", "李四", "王五"]\nscores = [85, 92, 78]\n# 用 zip 和 enumerate 打印排名\n',
        answer: 'names = ["张三", "李四", "王五"]\nscores = [85, 92, 78]\nzipped = list(zip(names, scores))\nfor i, pair in enumerate(zipped, start=1):\n    print(f"第{i}名: {pair[0]} - {pair[1]}分")',
        hints: [
          '【解释】\n用 list(zip(names, scores)) 把两个列表配对成一个新列表，每个元素是一对 (name, score)。\nzip 把两个列表按位置一一组合。\n\n【代码】\nnames = ["张三", "李四", "王五"]\nscores = [85, 92, 78]\nzipped = list(zip(names, scores))\n# zipped 现在是 [("张三", 85), ("李四", 92), ("王五", 78)]',
          '',
          '【解释】\n用 enumerate(zipped, start=1) 遍历，同时获得序号 i 和每一对 pair。\npair[0] 是姓名，pair[1] 是分数。\n用 f-string 格式化输出：print(f"第{i}名: {pair[0]} - {pair[1]}分")\n\n【代码】\nnames = ["张三", "李四", "王五"]\nscores = [85, 92, 78]\nzipped = list(zip(names, scores))\nfor i, pair in enumerate(zipped, start=1):\n    print(f"第{i}名: {pair[0]} - {pair[1]}分")\n\n预期输出：\n第1名: 张三 - 85分\n第2名: 李四 - 92分\n第3名: 王五 - 78分',
        ],
        testCases: [{ input: '', expected: '第1名: 张三 - 85分\n第2名: 李四 - 92分\n第3名: 王五 - 78分' }]
      },
      {
        id: 'ch21_03',
        title: '单例模式',
        titleEn: 'Singleton Pattern',
        xp: 70,
        content: `
## 单例模式 (Singleton)

单例模式确保一个类**只有一个实例**，常用于数据库连接、日志记录器等。

\`\`\`python
class Singleton:
    _instance = None  # 保存唯一实例

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

# 测试：无论创建多少次，都是同一个实例
a = Singleton()
b = Singleton()
print(a is b)  # True — 同一个对象！
\`\`\`

**实用案例：配置管理器**

\`\`\`python
class ConfigManager:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._config = {}
        return cls._instance

    def set(self, key, value):
        self._config[key] = value

    def get(self, key):
        return self._config.get(key)

# 任何地方获取的都是同一个配置实例
config1 = ConfigManager()
config1.set("theme", "dark")

config2 = ConfigManager()  # 实际上是同一个对象
print(config2.get("theme"))  # "dark"
\`\`\`

### 📝 任务

实现一个类 \`Settings\`，用 \`__init__\` 初始化 \`self.data = {}\`。
写 \`set(key, val)\` 方法存储配置，\`get(key)\` 方法读取（如果键不存在返回 \`"未设置"\`）。
最后调用测试代码输出主题和语言设置。
`,
        contentEn: `
## Singleton Pattern

Ensures a class has only one instance. Used for config managers, DB connections, loggers.

\`\`\`python
class Singleton:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

a = Singleton()
b = Singleton()
print(a is b)  # True
\`\`\`

### 📝 Task

Create a \`Settings\` class with \`__init__\` that sets \`self.data = {}\`.
Write \`set(key, val)\` to store and \`get(key)\` to read (return \`"unset"\` if key not found).
Call the test code to print theme and language settings.
`,
        starterCode: 'class Settings:\n    def __init__(self):\n        self.data = {}\n    # 补全 set 和 get 方法\n\ns = Settings()\ns.set("theme", "深色")\ns.set("language", "中文")\nprint(s.get("theme"))\nprint(s.get("language"))\nprint(s.get("font"))',
        answer: 'class Settings:\n    def __init__(self):\n        self.data = {}\n    def set(self, key, val):\n        self.data[key] = val\n    def get(self, key):\n        if key in self.data:\n            return self.data[key]\n        return "未设置"\n\ns = Settings()\ns.set("theme", "深色")\ns.set("language", "中文")\nprint(s.get("theme"))\nprint(s.get("language"))\nprint(s.get("font"))',
        hints: [
          '【解释】\n在 __init__ 中用 self.data = {} 初始化存储字典。\n这是类的构造函数，会在创建对象时自动执行。\n\n【代码】\nclass Settings:\n    def __init__(self):\n        self.data = {}',
          '',
          '【解释】\nset 方法接收 key 和 val，存入字典：self.data[key] = val。\nget 方法用 if key in self.data: 检查键是否存在。\n存在则 return self.data[key]，否则 return "未设置"。\n注意：判断键是否存在时要用 in 操作符，不是用 .get() 方法。\n\n【代码】\nclass Settings:\n    def __init__(self):\n        self.data = {}\n    def set(self, key, val):\n        self.data[key] = val\n    def get(self, key):\n        if key in self.data:\n            return self.data[key]\n        return "未设置"\n\ns = Settings()\ns.set("theme", "深色")\ns.set("language", "中文")\nprint(s.get("theme"))\nprint(s.get("language"))\nprint(s.get("font"))\n\n预期输出：\n深色\n中文\n未设置',
        ],
        testCases: [{ input: '', expected: '深色\n中文\n未设置' }]
      },
      {
        id: 'ch21_04',
        title: '工厂模式',
        titleEn: 'Factory Pattern',
        xp: 70,
        content: `
## 工厂模式 (Factory)

工厂模式**将对象的创建和使用分离**，根据参数创建不同的对象。

\`\`\`python
class Car:
    def drive(self):
        pass

class SUV(Car):
    def drive(self):
        return "🚙 驾驶SUV越野"

class Sedan(Car):
    def drive(self):
        return "🚗 驾驶轿车通勤"

class SportsCar(Car):
    def drive(self):
        return "🏎️ 驾驶跑车飞驰"

# 工厂函数
class CarFactory:
    @staticmethod
    def create_car(car_type):
        if car_type == "suv":
            return SUV()
        elif car_type == "sedan":
            return Sedan()
        elif car_type == "sports":
            return SportsCar()
        else:
            raise ValueError(f"未知车型：{car_type}")

# 使用工厂创建对象
factory = CarFactory()
car1 = factory.create_car("suv")
car2 = factory.create_car("sports")

print(car1.drive())  # 🚙 驾驶SUV越野
print(car2.drive())  # 🏎️ 驾驶跑车飞驰
\`\`\`

> 💡 工厂模式让新增车型只需修改工厂，不影响使用方代码。

### 📝 任务

定义两个类 \`Dog\`（speak 返回 "汪汪"）和 \`Cat\`（speak 返回 "喵喵"）。
再写一个 \`create_pet\` 函数，根据参数 \`"dog"\` 返回 Dog 实例，\`"cat"\` 返回 Cat 实例。
最后用给定的测试代码打印结果。
`,
        contentEn: `
## Factory Pattern

Factory separates object creation from usage, creating different objects based on parameters.

\`\`\`python
class Car:
    def drive(self): pass

class SUV(Car):
    def drive(self):
        return "SUV cruising"

class Sedan(Car):
    def drive(self):
        return "Sedan commuting"

def create_car(car_type):
    if car_type == "suv": return SUV()
    elif car_type == "sedan": return Sedan()

car = create_car("suv")
print(car.drive())
\`\`\`

### 📝 Task

Define two classes \`Dog\` (speak returns "Woof") and \`Cat\` (speak returns "Meow").
Write a \`create_pet\` function that returns the right instance based on \`"dog"\` or \`"cat"\`.
Use the test code to print results.
`,
        starterCode: '# 定义 Dog 和 Cat 类，各有一个 speak 方法\n# 定义 create_pet 函数\n\np1 = create_pet("dog")\np2 = create_pet("cat")\nprint(p1.speak())\nprint(p2.speak())',
        answer: 'class Dog:\n    def speak(self):\n        return "汪汪"\n\nclass Cat:\n    def speak(self):\n        return "喵喵"\n\ndef create_pet(animal_type):\n    if animal_type == "dog":\n        return Dog()\n    elif animal_type == "cat":\n        return Cat()\n\np1 = create_pet("dog")\np2 = create_pet("cat")\nprint(p1.speak())\nprint(p2.speak())',
        hints: [
          '【解释】\n先定义两个类，每个类都有 speak 方法。\nDog 的 speak 返回 "汪汪"，Cat 的 speak 返回 "喵喵"。\n类可以有 return 的方法，不一定要 print。\n\n【代码】\nclass Dog:\n    def speak(self):\n        return "汪汪"\n\nclass Cat:\n    def speak(self):\n        return "喵喵"',
          '',
          '【解释】\n定义一个普通函数 create_pet(animal_type)，用 if/elif 判断参数。\n参数是 "dog" 就 return Dog()，是 "cat" 就 return Cat()。\n这就是"工厂"的核心思想：根据输入返回不同的对象。\n\n【代码】\nclass Dog:\n    def speak(self):\n        return "汪汪"\n\nclass Cat:\n    def speak(self):\n        return "喵喵"\n\ndef create_pet(animal_type):\n    if animal_type == "dog":\n        return Dog()\n    elif animal_type == "cat":\n        return Cat()\n\np1 = create_pet("dog")\np2 = create_pet("cat")\nprint(p1.speak())\nprint(p2.speak())\n\n预期输出：\n汪汪\n喵喵',
        ],
        testCases: [{ input: '', expected: '汪汪\n喵喵' }]
      }
    ]
  },
  {
    id: 'ch22',
    title: 'Chapter 22: 高级特性补完',
    titleEn: 'Chapter 22: Advanced Python Features',
    description: '文档字符串、作用域、魔术方法、封装、多态等核心高级特性',
    descriptionEn: 'Docstrings, scoping, magic methods, encapsulation, polymorphism, and more',
    icon: '⭐',
    lessons: [
      {
        id: 'ch22_01',
        title: '文档字符串',
        titleEn: 'Docstrings',
        xp: 50,
        content: `
## 文档字符串 (Docstring)

文档字符串是函数的**内置说明文档**，写在函数内的第一行，用三引号包裹。

\`\`\`python
def add(a, b):
    """
    计算两个数的和

    Parameters:
        a (int): 第一个数
        b (int): 第二个数

    Returns:
        int: 两个数的和
    """
    return a + b
\`\`\`

**查看文档的两种方式**：

\`\`\`python
# 方式1：help() 函数
help(add)
# 输出：函数的完整文档信息

# 方式2：.__doc__ 属性
print(add.__doc__)
# 输出：文档字符串内容
\`\`\`

**为什么要写 Docstring？**
- 📖 让他人（和未来的自己）快速理解函数功能
- 🔧 IDE 可以自动显示文档提示
- 📋 可以使用工具自动生成API文档

### 📝 任务
写一个函数 \`multiply(a, b)\`，计算两个数的乘积。
在函数体内用三引号写一行文档字符串，然后用 \`return\` 返回结果。

最后调用 \`print(multiply(5, 3))\` 输出结果。
`,
        contentEn: `
## Docstrings

Docstrings are built-in documentation for functions, written as the first line inside a function using triple quotes.

\`\`\`python
def add(a, b):
    """Return the sum of a and b."""
    return a + b

help(add)      # View full docs
print(add.__doc__)  # View docstring
\`\`\`

### 📝 Task
Write a function \`multiply(a, b)\` that returns the product of two numbers.
Add a single-line docstring using triple quotes inside the function body.

Then call \`print(multiply(5, 3))\` to see the result.
`,
        starterCode: '# 写一个 multiply 函数，包含文档字符串\n# 调用 print(multiply(5, 3)) 输出结果',
        answer: 'def multiply(a, b):\n    """返回 a 乘以 b 的结果"""\n    return a * b\n\nprint(multiply(5, 3))',
        hints: ['【解释】\n先定义 multiply 函数，接收两个参数 a 和 b。\n函数体第一行用三个双引号写出文档字符串，描述函数功能。\n最后用 return a * b 返回乘积。\n\n注意：文档字符串写在函数体的第一行，作为函数的说明。\n\n【代码】\ndef multiply(a, b):\n    """返回 a 乘以 b 的结果"""\n    return a * b', '【解释】\nDefine multiply with two parameters a and b.\nOn the first line of the function body, write a docstring in triple quotes.\nUse return a * b to return the product.\n\nNote: The docstring must be the very first line inside the function.\n\n【代码】\ndef multiply(a, b):\n    """Return the product of a and b"""\n    return a * b', '【解释】\n函数定义好后，在外部调用 print(multiply(5, 3)) 来测试。\n\n执行流程：\n① multiply(5, 3) 进入函数体，a=5, b=3\n② """返回 a 乘以 b 的结果""" 是文档字符串，不执行任何操作\n③ return a * b 计算 5 * 3 = 15 并返回\n④ print() 将 15 输出到屏幕\n\n文档字符串不会影响程序的运行结果，它是给开发者看的说明文档。\n你也可以用 print(multiply.__doc__) 来查看文档字符串内容。\n\n【代码】\ndef multiply(a, b):\n    """返回 a 乘以 b 的结果"""\n    return a * b\n\nprint(multiply(5, 3))\n\n预期输出：\n15', '【解释】\nAfter defining multiply, call print(multiply(5, 3)) to test it.\n\nExecution flow:\n① multiply(5, 3) enters the function with a=5, b=3\n② """Return the product of a and b""" is a docstring — it does nothing\n③ return a * b calculates 5 * 3 = 15 and returns it\n④ print() outputs 15 to the screen\n\nThe docstring doesn\'t affect execution — it documents the function for developers.\nYou can also view it with print(multiply.__doc__).\n\n【代码】\ndef multiply(a, b):\n    """Return the product of a and b"""\n    return a * b\n\nprint(multiply(5, 3))\n\nExpected output:\n15'],
        testCases: [{ input: '', expected: '15' }]
      },
      {
        id: 'ch22_02',
        title: '变量作用域',
        titleEn: 'Variable Scope',
        xp: 60,
        content: `
## 变量作用域 (Scope)

Python 变量有不同的"可见范围"，称为**作用域**。

**局部变量**：在函数内部定义的变量，只能在函数内访问。

\`\`\`python
def show():
    x = 10  # 局部变量
    print(f"内部: {x}")

show()
# print(x)  # ❌ 错误！x 在函数外不存在
\`\`\`

**全局变量**：在函数外部定义的变量，整个文件都能读取。

\`\`\`python
name = "张三"  # 全局变量

def greet():
    print(f"你好，{name}")  # 可以读取全局变量

greet()  # 你好，张三
\`\`\`

**global 关键字**：在函数内修改全局变量。

\`\`\`python
count = 0

def increment():
    global count  # 声明要修改全局变量
    count += 1

increment()
print(count)  # 1
\`\`\`

**nonlocal 关键字**：在嵌套函数中修改外层函数的变量。

\`\`\`python
def outer():
    x = 0
    def inner():
        nonlocal x  # 修改外层（非全局）变量
        x += 1
        return x
    return inner

counter = outer()
print(counter())  # 1
print(counter())  # 2
\`\`\`

> 💡 LEGB 规则：Local → Enclosing → Global → Built-in

### 📝 任务
写一个 \`make_counter()\` 函数，内部包含一个嵌套函数 \`counter()\`。

要求：
- 在 \`make_counter\` 中定义变量 \`count = 0\`
- 嵌套函数 \`counter\` 用 \`nonlocal count\` 声明修改外层变量
- 每次调用 \`counter()\` 时 \`count += 1\`，然后 \`return count\`
- \`make_counter\` 返回 \`counter\`

完成后调用 \`c = make_counter()\`，调用 3 次 \`c()\` 并打印结果。
`,
        contentEn: `
## Variable Scope

Variables have different visibility ranges called scope.

- **Local**: Defined inside a function, only visible inside
- **Global**: Defined outside functions, visible everywhere (read-only in functions)
- **global** keyword: Modify global variables inside functions
- **nonlocal** keyword: Modify outer (non-global) variables in nested functions

LEGB Rule: Local → Enclosing → Global → Built-in

### 📝 Task
Write a \`make_counter()\` function containing a nested \`counter()\` function.

Requirements:
- Declare \`count = 0\` inside \`make_counter\`
- Use \`nonlocal count\` inside \`counter\` to modify the outer variable
- On each \`counter()\` call, \`count += 1\`, then \`return count\`
- \`make_counter\` returns \`counter\`

Then call \`c = make_counter()\`, call \`c()\` 3 times and print each result.
`,
        starterCode: '# 实现 make_counter 闭包计数器\n# 用 nonlocal 修改外层函数的变量\n\ndef make_counter():\n    # 在这里写你的代码\n    pass\n\nc = make_counter()\nprint(c())\nprint(c())\nprint(c())',
        answer: 'def make_counter():\n    count = 0\n    def counter():\n        nonlocal count\n        count += 1\n        return count\n    return counter\n\nc = make_counter()\nprint(c())\nprint(c())\nprint(c())',
        hints: ['【解释】\n先写出 make_counter 的骨架：外层函数 count = 0 初始化变量，内层函数 counter 返回 count 的值。\n最后 return counter 返回内层函数本身（不是调用它）。\n注意：pass 先占位，下一步替换。\n\n【代码】\ndef make_counter():\n    count = 0\n    def counter():\n        pass\n    return counter', '【解释】\n在 counter 内用 nonlocal count 声明要修改外层变量。\n然后 count += 1 递增，return count 返回当前值。\n\n关键概念：nonlocal 告诉 Python"我要修改的不是本地变量，而是外层函数 make_counter 的 count"。\n没有 nonlocal，count += 1 会报错（Python 认为你在创建新局部变量）。\n\n【代码】\ndef make_counter():\n    count = 0\n    def counter():\n        nonlocal count\n        count += 1\n        return count\n    return counter', '【解释】\nmake_counter 返回 counter 函数本身（注意没有括号）。\nc = make_counter() 得到 counter 函数，c() 每次调用执行 counter()。\n\n执行流程：\n① c = make_counter()：创建闭包，count = 0\n② c()：count 变为 1，返回 1\n③ c()：count 变为 2，返回 2\n④ c()：count 变为 3，返回 3\n\n这就是闭包的核心——count 被保留在内存中，不会被回收。\n\n【代码】\ndef make_counter():\n    count = 0\n    def counter():\n        nonlocal count\n        count += 1\n        return count\n    return counter\n\nc = make_counter()\nprint(c())\nprint(c())\nprint(c())\n\n预期输出：\n1\n2\n3', '【解释】\nmake_counter returns the counter function itself (no parentheses).\nc = make_counter() gets the counter function, and c() calls it.\n\nExecution flow:\n① c = make_counter(): creates closure, count = 0\n② c(): count becomes 1, returns 1\n③ c(): count becomes 2, returns 2\n④ c(): count becomes 3, returns 3\n\nThis is the essence of closures — count stays in memory.\n\n【代码】\ndef make_counter():\n    count = 0\n    def counter():\n        nonlocal count\n        count += 1\n        return count\n    return counter\n\nc = make_counter()\nprint(c())\nprint(c())\nprint(c())\n\nExpected output:\n1\n2\n3'],
        testCases: [{ input: '', expected: '1\n2\n3' }]
      },
      {
        id: 'ch22_03',
        title: '魔术方法',
        titleEn: 'Magic Methods',
        xp: 70,
        content: `
## 魔术方法 (Magic Methods)

魔术方法是以**双下划线**开头和结尾的特殊方法，让自定义类支持 Python 内置操作。

\`\`\`python
class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages

    def __str__(self):
        """定义 print() 的输出"""
        return f"《{self.title}》作者：{self.author}"

    def __repr__(self):
        """定义对象的"官方"字符串表示"""
        return f"Book('{self.title}', '{self.author}', {self.pages})"

    def __eq__(self, other):
        """定义 == 比较逻辑"""
        return self.title == other.title and self.author == other.author

    def __len__(self):
        """定义 len() 的行为"""
        return self.pages

    def __lt__(self, other):
        """定义 < 比较（用于排序）"""
        return self.pages < other.pages

# 使用魔术方法
book1 = Book("Python入门", "张三", 300)
book2 = Book("Python入门", "张三", 500)

print(str(book1))   # 《Python入门》作者：张三
print(book1 == book2)  # True（标题和作者相同）
print(len(book1))      # 300
print(book1 < book2)   # True（页数更少）
\`\`\`

| 魔术方法 | 触发操作 |
|----------|---------|
| \`__str__\` | \`print(obj)\`, \`str(obj)\` |
| \`__repr__\` | \`repr(obj)\`, 交互式直接输入 |
| \`__eq__\` | \`obj1 == obj2\` |
| \`__len__\` | \`len(obj)\` |
| \`__lt__\` | \`obj1 < obj2\`, \`sorted()\` |

### 📝 任务
写一个 \`Student\` 类，包含魔术方法 \`__init__\` 和一个普通方法 \`info()\`。

要求：
- \`__init__(self, name, score)\`：保存姓名和分数
- \`info(self)\`：返回 \`self.name + "：" + str(self.score)\`

然后创建学生对象，用 \`same_score(other)\` 方法比较两个学生的分数是否相等。
`,
        contentEn: `
## Magic Methods

Magic methods are special double-underscore methods that let custom classes support Python's built-in operations.

| Method | Triggered by |
|--------|-------------|
| \`__str__\` | \`print(obj)\`, \`str(obj)\` |
| \`__repr__\` | \`repr(obj)\` |
| \`__eq__\` | \`obj1 == obj2\` |
| \`__len__\` | \`len(obj)\` |
| \`__lt__\` | \`obj1 < obj2\` |

### 📝 Task
Write a \`Student\` class with magic method \`__init__\` and a regular \`info()\` method.

Requirements:
- \`__init__(self, name, score)\`: save name and score
- \`info(self)\`: return \`self.name + ": " + str(self.score)\`

Create student objects and use a \`same_score(other)\` method to compare scores.
`,
        starterCode: '# 创建 Student 类，包含 __init__、info 和 same_score 方法\n\nclass Student:\n    # 在此写你的代码\n    pass\n\ns1 = Student("张三", 85)\ns2 = Student("李四", 92)\ns3 = Student("王五", 85)\n\nprint(s1.info())\nprint(s2.info())\nprint(s1.same_score(s2))\nprint(s1.same_score(s3))',
        answer: 'class Student:\n    def __init__(self, name, score):\n        self.name = name\n        self.score = score\n    def same_score(self, other):\n        return self.score == other.score\n    def info(self):\n        return self.name + "：" + str(self.score)\n\ns1 = Student("张三", 85)\ns2 = Student("李四", 92)\ns3 = Student("王五", 85)\n\nprint(s1.info())\nprint(s2.info())\nprint(s1.same_score(s2))\nprint(s1.same_score(s3))',
        hints: ['【解释】\n先用 __init__ 构造方法：保存 name 和 score 到 self。\n__init__ 是创建对象时自动调用的魔术方法。\n\ninfo 方法用 + 拼接字符串：self.name、"："、str(self.score)。\n注意：str() 把数字转成字符串才能和文字拼接。\n\n【代码】\nclass Student:\n    def __init__(self, name, score):\n        self.name = name\n        self.score = score\n    def info(self):\n        return self.name + "：" + str(self.score)', '【解释】\nAdd same_score method: receives other Student object,\ncompares self.score == other.score, and returns True/False.\nThis is a regular method, not magic method.\n\n【代码】\nclass Student:\n    def __init__(self, name, score):\n        self.name = name\n        self.score = score\n    def same_score(self, other):\n        return self.score == other.score\n    def info(self):\n        return self.name + "：" + str(self.score)', '【解释】\n完整代码。创建 3 个学生对象，测试 info() 和 same_score()。\n\n执行流程：\n① s1 = Student("张三", 85)：name="张三", score=85\n② s1.info() → "张三：85"\n③ s1.same_score(s2)：85 == 92 → False\n④ s1.same_score(s3)：85 == 85 → True\n\n【代码】\nclass Student:\n    def __init__(self, name, score):\n        self.name = name\n        self.score = score\n    def same_score(self, other):\n        return self.score == other.score\n    def info(self):\n        return self.name + "：" + str(self.score)\n\ns1 = Student("张三", 85)\ns2 = Student("李四", 92)\ns3 = Student("王五", 85)\n\nprint(s1.info())\nprint(s2.info())\nprint(s1.same_score(s2))\nprint(s1.same_score(s3))\n\n预期输出：\n张三：85\n李四：92\nFalse\nTrue', '【解释】\nFull code with 3 student objects.\n\nExecution flow:\n① s1 = Student("张三", 85): name="张三", score=85\n② s1.info() → "张三：85"\n③ s1.same_score(s2): 85 == 92 → False\n④ s1.same_score(s3): 85 == 85 → True\n\n【代码】\nclass Student:\n    def __init__(self, name, score):\n        self.name = name\n        self.score = score\n    def same_score(self, other):\n        return self.score == other.score\n    def info(self):\n        return self.name + "：" + str(self.score)\n\ns1 = Student("张三", 85)\ns2 = Student("李四", 92)\ns3 = Student("王五", 85)\n\nprint(s1.info())\nprint(s2.info())\nprint(s1.same_score(s2))\nprint(s1.same_score(s3))\n\nExpected output:\n张三：85\n李四：92\nFalse\nTrue'],
        testCases: [{ input: '', expected: '张三：85\n李四：92\nFalse\nTrue' }]
      },
      {
        id: 'ch22_04',
        title: '封装与@property',
        titleEn: 'Encapsulation & @property',
        xp: 70,
        content: `
## 封装与 @property

**封装**是 OOP 的核心特性之一：将数据隐藏在类内部，只通过方法访问。

**私有属性**：以双下划线开头的属性，外部无法直接访问。

\`\`\`python
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner           # 公开属性
        self.__balance = balance     # 私有属性（双下划线）

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            print(f"存入 {amount}，余额 {self.__balance}")
        else:
            print("存款金额必须大于0")

    def withdraw(self, amount):
        if amount <= self.__balance:
            self.__balance -= amount
            print(f"取出 {amount}，余额 {self.__balance}")
        else:
            print("余额不足")

acc = BankAccount("张三", 1000)
acc.deposit(500)    # ✅ 通过方法修改
# print(acc.__balance)  # ❌ 外部无法直接访问！
\`\`\`

**@property 装饰器**：更优雅的 getter/setter。

\`\`\`python
class Temperature:
    def __init__(self, celsius=0):
        self._celsius = celsius  # 单下划线=约定私有

    @property
    def celsius(self):
        """获取摄氏温度"""
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        """设置摄氏温度，带验证"""
        if value < -273.15:
            raise ValueError("温度不能低于绝对零度！")
        self._celsius = value

    @property
    def fahrenheit(self):
        """计算华氏温度（只读）"""
        return self._celsius * 9 / 5 + 32

t = Temperature(25)
print(t.celsius)      # 25（像属性一样访问）
print(t.fahrenheit)   # 77.0
t.celsius = 30        # 像赋值一样设置（触发验证）
\`\`\`

### 📝 任务
写一个 \`BankAccount\` 类，使用封装保护余额。

要求：
- \`__init__(self, owner, balance=0)\`：保存户主，\`self.__balance = balance\`（双下划线=私有属性）
- \`deposit(self, amount)\`：如果 amount > 0，\`self.__balance += amount\`
- \`withdraw(self, amount)\`：如果余额足够，扣除并返回 \`True\`，否则返回 \`False\`
- \`get_balance(self)\`：返回 \`self.__balance\`

完成后创建账户，存款、取款，打印余额。
`,
        contentEn: `
## Encapsulation & @property

**Private attributes** (double underscore \`__\`) cannot be accessed from outside the class.

**@property** provides elegant getter/setter with validation.

\`\`\`python
class Temperature:
    def __init__(self, celsius=0):
        self._celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Below absolute zero!")
        self._celsius = value
\`\`\`

### 📝 Task
Write a \`BankAccount\` class with encapsulation.

Requirements:
- \`__init__(self, owner, balance=0)\`: save owner, \`self.__balance = balance\` (double underscore = private)
- \`deposit(self, amount)\`: if amount > 0, \`self.__balance += amount\`
- \`withdraw(self, amount)\`: if sufficient balance, deduct and return \`True\`, else \`False\`
- \`get_balance(self)\`: return \`self.__balance\`

Create an account, deposit, withdraw, and print the balance.
`,
        starterCode: '# 创建 BankAccount 类，使用私有属性 __balance\n\nclass BankAccount:\n    # 在此写你的代码\n    pass\n\nacc = BankAccount("小明", 1000)\nacc.deposit(500)\nprint(acc.get_balance())\nacc.withdraw(200)\nprint(acc.get_balance())',
        answer: 'class BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.__balance = balance\n    def deposit(self, amount):\n        if amount > 0:\n            self.__balance += amount\n    def withdraw(self, amount):\n        if amount > 0 and amount <= self.__balance:\n            self.__balance -= amount\n            return True\n        return False\n    def get_balance(self):\n        return self.__balance\n\nacc = BankAccount("小明", 1000)\nacc.deposit(500)\nprint(acc.get_balance())\nacc.withdraw(200)\nprint(acc.get_balance())',
        hints: ['【解释】\n先写出空类骨架。__init__ 构造函数接收 owner 和 balance，\nself.owner = owner 存户主名，self.__balance = balance 存余额（双下划线=私有）。\n\n先实现 get_balance 方法，直接返回 self.__balance。\n\n【代码】\nclass BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.__balance = balance\n    def get_balance(self):\n        return self.__balance', '【解释】\nNow add deposit and withdraw methods.\ndeposit: if amount > 0, self.__balance += amount\nwithdraw: if amount > 0 and amount <= self.__balance, deduct and return True; else return False\n\nThe private __balance can only be modified through these methods — this is encapsulation.\n\n【代码】\nclass BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.__balance = balance\n    def deposit(self, amount):\n        if amount > 0:\n            self.__balance += amount\n    def withdraw(self, amount):\n        if amount > 0 and amount <= self.__balance:\n            self.__balance -= amount\n            return True\n        return False\n    def get_balance(self):\n        return self.__balance', '【解释】\n完整代码。创建账户 → 存款 500 → 输出余额 → 取款 200 → 输出余额。\n\n执行流程：\n① acc = BankAccount("小明", 1000)：初始化 balance=1000\n② acc.deposit(500)：1000 + 500 = 1500\n③ acc.get_balance() → 1500\n④ acc.withdraw(200)：1500 - 200 = 1300，返回 True\n⑤ acc.get_balance() → 1300\n\n注意：外部无法直接访问 acc.__balance，必须通过方法操作。\n\n【代码】\nclass BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.__balance = balance\n    def deposit(self, amount):\n        if amount > 0:\n            self.__balance += amount\n    def withdraw(self, amount):\n        if amount > 0 and amount <= self.__balance:\n            self.__balance -= amount\n            return True\n        return False\n    def get_balance(self):\n        return self.__balance\n\nacc = BankAccount("小明", 1000)\nacc.deposit(500)\nprint(acc.get_balance())\nacc.withdraw(200)\nprint(acc.get_balance())\n\n预期输出：\n1500\n1300', '【解释】\nFull code with encapsulation.\n\nExecution flow:\n① acc = BankAccount("小明", 1000): balance=1000\n② acc.deposit(500): 1000 + 500 = 1500\n③ acc.get_balance() → 1500\n④ acc.withdraw(200): 1500 - 200 = 1300, returns True\n⑤ acc.get_balance() → 1300\n\nNote: acc.__balance cannot be accessed from outside — must use methods.\n\n【代码】\nclass BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.__balance = balance\n    def deposit(self, amount):\n        if amount > 0:\n            self.__balance += amount\n    def withdraw(self, amount):\n        if amount > 0 and amount <= self.__balance:\n            self.__balance -= amount\n            return True\n        return False\n    def get_balance(self):\n        return self.__balance\n\nacc = BankAccount("小明", 1000)\nacc.deposit(500)\nprint(acc.get_balance())\nacc.withdraw(200)\nprint(acc.get_balance())\n\nExpected output:\n1500\n1300'],
        testCases: [{ input: '', expected: '1500\n1300' }]
      },
      {
        id: 'ch22_05',
        title: '多态',
        titleEn: 'Polymorphism',
        xp: 70,
        content: `
## 多态 (Polymorphism)

多态是 OOP 三大特性之一：**不同对象对同一消息做出不同响应**。

\`\`\`python
class Animal:
    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        return "汪汪！🐶"

class Cat(Animal):
    def speak(self):
        return "喵喵！🐱"

class Duck(Animal):
    def speak(self):
        return "嘎嘎！🦆"

# 多态：同一接口，不同行为
def animal_sound(animal):
    print(animal.speak())

animals = [Dog(), Cat(), Duck()]
for a in animals:
    animal_sound(a)
# 汪汪！🐶
# 喵喵！🐱
# 嘎嘎！🦆
\`\`\`

**鸭子类型 (Duck Typing)**：Python 特有的多态方式。

> "如果它走起来像鸭子，叫起来像鸭子，那它就是鸭子。"

\`\`\`python
# 不需要继承同一个基类也能"多态"
class Car:
    def move(self):
        return "🚗 汽车在公路上行驶"

class Plane:
    def move(self):
        return "✈️ 飞机在天空中飞行"

class Boat:
    def move(self):
        return "🚢 轮船在海洋中航行"

def travel(vehicle):
    print(vehicle.move())

# 只要有 move() 方法，都可以传入！
travel(Car())    # 🚗 汽车在公路上行驶
travel(Plane())  # ✈️ 飞机在天空中飞行
travel(Boat())   # 🚢 轮船在海洋中航行
\`\`\`

> 💡 Python 的鸭子类型比严格继承更灵活——只要对象有需要的方法，就能用。

### 📝 任务
用"鸭子类型"实现多态。写 3 个乐器类，每个类都有 \`play()\` 方法。

要求：
- \`Guitar\` 类：\`play()\` 返回 \`"🎸 弹吉他"\`
- \`Piano\` 类：\`play()\` 返回 \`"🎹 弹钢琴"\`
- \`Drum\` 类：\`play()\` 返回 \`"🥁 打鼓"\`
- 写 \`perform(instrument)\` 函数，调用 \`instrument.play()\` 并打印

注意：三个类不需要继承同一个基类，只要有 \`play()\` 方法就能传入 \`perform\`。
`,
        contentEn: `
## Polymorphism

Different objects respond differently to the same message — the third pillar of OOP.

**Duck Typing**: "If it walks like a duck and quacks like a duck, it's a duck."

In Python, as long as an object has the required method, it works — no strict inheritance needed.

### 📝 Task
Implement polymorphism with duck typing. Write 3 instrument classes, each with a \`play()\` method.

Requirements:
- \`Guitar\`: \`play()\` returns \`"🎸 弹吉他"\`
- \`Piano\`: \`play()\` returns \`"🎹 弹钢琴"\`
- \`Drum\`: \`play()\` returns \`"🥁 打鼓"\`
- Write \`perform(instrument)\` that calls \`instrument.play()\` and prints it

Note: No inheritance needed — any object with \`play()\` works.
`,
        starterCode: '# 用鸭子类型实现多态\n# 不同乐器类，相同的 play() 方法名\n\nclass Guitar:\n    # 在此写你的代码\n    pass\n\nclass Piano:\n    # 在此写你的代码\n    pass\n\nclass Drum:\n    # 在此写你的代码\n    pass\n\ndef perform(instrument):\n    # 在此写你的代码\n    pass\n\nperform(Guitar())\nperform(Piano())\nperform(Drum())',
        answer: 'class Guitar:\n    def play(self):\n        return "🎸 弹吉他"\n\nclass Piano:\n    def play(self):\n        return "🎹 弹钢琴"\n\nclass Drum:\n    def play(self):\n        return "🥁 打鼓"\n\ndef perform(instrument):\n    print(instrument.play())\n\nperform(Guitar())\nperform(Piano())\nperform(Drum())',
        hints: ['【解释】\n先写出 Guitar 类的骨架。每个类只需要一个 play 方法，\n用 return 返回字符串即可，不需要 __init__。\n另外两个类结构一样，只是返回不同的字符串。\n\n【代码】\nclass Guitar:\n    def play(self):\n        return "🎸 弹吉他"\n\nclass Piano:\n    def play(self):\n        return "🎹 弹钢琴"\n\nclass Drum:\n    def play(self):\n        return "🥁 打鼓"', '【解释】\nNow write perform function that accepts any instrument object\nand calls its play() method. Duck typing = no inheritance needed.\n\n【代码】\nclass Guitar:\n    def play(self):\n        return "🎸 弹吉他"\n\nclass Piano:\n    def play(self):\n        return "🎹 弹钢琴"\n\nclass Drum:\n    def play(self):\n        return "🥁 打鼓"\n\ndef perform(instrument):\n    print(instrument.play())', '【解释】\n完整代码。调用 perform(Guitar()) 时，传入的对象有 play() 方法，\n所以可以正确处理。这就是鸭子类型——"只要有 play() 方法，它就是乐器"。\n\n执行流程：\n① perform(Guitar()) → Guitar().play() → "🎸 弹吉他"\n② perform(Piano()) → Piano().play() → "🎹 弹钢琴"\n③ perform(Drum()) → Drum().play() → "🥁 打鼓"\n\n【代码】\nclass Guitar:\n    def play(self):\n        return "🎸 弹吉他"\n\nclass Piano:\n    def play(self):\n        return "🎹 弹钢琴"\n\nclass Drum:\n    def play(self):\n        return "🥁 打鼓"\n\ndef perform(instrument):\n    print(instrument.play())\n\nperform(Guitar())\nperform(Piano())\nperform(Drum())\n\n预期输出：\n🎸 弹吉他\n🎹 弹钢琴\n🥁 打鼓', '【解释】\nFull code with duck typing.\n\nExecution flow:\n① perform(Guitar()) → Guitar().play() → "🎸 弹吉他"\n② perform(Piano()) → Piano().play() → "🎹 弹钢琴"\n③ perform(Drum()) → Drum().play() → "🥁 打鼓"\n\n【代码】\nclass Guitar:\n    def play(self):\n        return "🎸 弹吉他"\n\nclass Piano:\n    def play(self):\n        return "🎹 弹钢琴"\n\nclass Drum:\n    def play(self):\n        return "🥁 打鼓"\n\ndef perform(instrument):\n    print(instrument.play())\n\nperform(Guitar())\nperform(Piano())\nperform(Drum())\n\nExpected output:\n🎸 弹吉他\n🎹 弹钢琴\n🥁 打鼓'],
        testCases: [{ input: '', expected: '🎸 弹吉他\n🎹 弹钢琴\n🥁 打鼓' }]
      },
      {
        id: 'ch22_06',
        title: '实用内置函数',
        titleEn: 'Useful Built-in Functions',
        xp: 60,
        content: `
## 实用内置函数

Python 有许多非常方便的**内置函数**，能让代码更简洁高效。

**sorted()**：返回排序后的新列表（原列表不变）。

\`\`\`python
nums = [3, 1, 4, 1, 5, 9, 2]
print(sorted(nums))              # [1, 1, 2, 3, 4, 5, 9]
print(sorted(nums, reverse=True)) # [9, 5, 4, 3, 2, 1, 1]

# 按自定义键排序
students = [
    {"name": "张三", "score": 95},
    {"name": "李四", "score": 87},
    {"name": "王五", "score": 92}
]
sorted_students = sorted(students, key=lambda s: s["score"], reverse=True)
print(sorted_students[0]["name"])  # 张三
\`\`\`

**reversed()**：反转序列（返回迭代器）。

\`\`\`python
nums = [1, 2, 3, 4, 5]
print(list(reversed(nums)))  # [5, 4, 3, 2, 1]

# 字符串反转
text = "Python"
print("".join(reversed(text)))  # "nohtyP"
\`\`\`

**ord() 和 chr()**：字符与 Unicode 码点互转。

\`\`\`python
print(ord('A'))   # 65（A 的码点）
print(ord('中'))  # 20013（中文的码点）
print(chr(65))    # 'A'（码点转字符）
print(chr(97))    # 'a'

# 生成字母表
alphabet = [chr(i) for i in range(65, 91)]
print(alphabet)  # ['A','B','C',...,'Z']
\`\`\`

**max() / min() / sum()**：

\`\`\`python
nums = [3, 1, 4, 1, 5, 9]
print(max(nums))   # 9
print(min(nums))   # 1
print(sum(nums))   # 23
\`\`\`

### 📝 任务
有一组学生成绩数据，用内置函数 \`sorted()\` 和 \`len()\` 处理。

要求：
1. 创建学生列表（每个学生是字典：\`{"name": 姓名, "score": 分数}\`）
2. 用 \`sorted(students, key=lambda s: s["score"], reverse=True)\` 按分数从高到低排序
3. 打印排名前 3 的学生姓名（\`ranked[0]["name"]\` 等）
4. 用 \`len(students)\` 打印总人数

提示：lambda 语法 \`lambda s: s["score"]\` 表示"取每个学生的 score 字段"。
`,
        contentEn: `
## Useful Built-in Functions

- **sorted()**: Returns a new sorted list
- **reversed()**: Returns a reversed iterator
- **ord()/chr()**: Convert between characters and Unicode code points
- **max()/min()/sum()**: Statistics on iterables

### 📝 Task
Given student score data, use \`sorted()\` and \`len()\` to process it.

Requirements:
1. Create a list of student dicts (\`{"name": name, "score": score}\`)
2. Sort by score descending: \`sorted(students, key=lambda s: s["score"], reverse=True)\`
3. Print the top 3 names (\`ranked[0]["name"]\`, etc.)
4. Print the total count with \`len(students)\`
`,
        starterCode: '# 用 sorted() 和 lambda 对学生成绩排序\n\nstudents = [\n    {"name": "张三", "score": 78},\n    {"name": "李四", "score": 92},\n    {"name": "王五", "score": 85},\n    {"name": "赵六", "score": 96}\n]\n\n# 用 sorted() 按分数降序排列\n# 打印前三名\n# 打印总人数',
        answer: 'students = [\n    {"name": "张三", "score": 78},\n    {"name": "李四", "score": 92},\n    {"name": "王五", "score": 85},\n    {"name": "赵六", "score": 96}\n]\n\nranked = sorted(students, key=lambda s: s["score"], reverse=True)\n\nprint(ranked[0]["name"])\nprint(ranked[1]["name"])\nprint(ranked[2]["name"])\nprint(len(students))',
        hints: ['【解释】\nsorted() 的基本用法：\nsorted(列表) 返回从小到大排序的新列表。\nsorted(列表, reverse=True) 从大到小。\nsorted(列表, key=lambda...) 按自定义规则排序。\n\n先用 sorted() 加 reverse=True 对学生数据排序。\n注意：sorted() 不会修改原列表，而是返回新列表。\n\n【代码】\nstudents = [\n    {"name": "张三", "score": 78},\n    {"name": "李四", "score": 92},\n    {"name": "王五", "score": 85},\n    {"name": "赵六", "score": 96}\n]\n\nranked = sorted(students, key=lambda s: s["score"], reverse=True)', '【解释】\n排序后，ranked 列表中第 0 个是分数最高的学生。\n用 ranked[0]["name"] 获取第一名的姓名。\nlen(students) 返回学生总数。\n\n【代码】\nstudents = [\n    {"name": "张三", "score": 78},\n    {"name": "李四", "score": 92},\n    {"name": "王五", "score": 85},\n    {"name": "赵六", "score": 96}\n]\n\nranked = sorted(students, key=lambda s: s["score"], reverse=True)\n\nprint(ranked[0]["name"])\nprint(ranked[1]["name"])\nprint(ranked[2]["name"])\nprint(len(students))\n\n预期输出：\n赵六\n李四\n王五\n4', '【解释】\nSorted basic usage:\nsorted(list) returns ascending new list.\nsorted(list, reverse=True) returns descending.\nsorted(list, key=lambda...) sorts by custom rule.\n\nranked[0] is the highest score student at index 0.\nlen(students) returns total student count.\n\n【代码】\nstudents = [\n    {"name": "张三", "score": 78},\n    {"name": "李四", "score": 92},\n    {"name": "王五", "score": 85},\n    {"name": "赵六", "score": 96}\n]\n\nranked = sorted(students, key=lambda s: s["score"], reverse=True)\n\nprint(ranked[0]["name"])\nprint(ranked[1]["name"])\nprint(ranked[2]["name"])\nprint(len(students))\n\nExpected output:\n赵六\n李四\n王五\n4'],
        testCases: [{ input: '', expected: '赵六\n李四\n王五\n4' }]
      }
    ]
  }
];