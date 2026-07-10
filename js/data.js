const CHAPTERS = [
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
        starterCode: '',
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
        hints: ['input() 获取输入', 'print() 输出结果'],
        testCases: [{ input: 'World', expected: 'Hello, World' }]
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
        hints: ['先检查能被400整除', 'Check divisibility by 400 first'],
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
secret = 50
guess = int(input("猜一个数字(1-100): "))
attempts = 1

while guess != secret:
    if guess < secret:
        print("低了！")
    else:
        print("高了！")
    guess = int(input("猜一个数字(1-100): "))
    attempts += 1

print(f"恭喜！你猜了{attempts}次！")
\`\`\`

### 📝 挑战
用 \`while\` 循环实现猜数字游戏。先创建 \`secret = 42\`（简化版），然后让用户猜，直到猜对为止。

> 💡 **一步步来，拆开看：**
>
> **第 1 步 — 设定秘密数字**
> \`\`\`python
> secret = 42   # 目标数字，让玩家来猜
> \`\`\`
>
> **第 2 步 — 准备两个"工具箱"**
> \`\`\`python
> guess = 0       # 存玩家每次输入的数字，先随便给个值
> attempts = 0    # 记录猜了多少次
> \`\`\`
>
> **第 3 步 — 写 while 循环**
> \`\`\`python
> while guess != secret:
> \# 只要 guess 不等于 secret，就一直循环
> \`\`\`
> > 🤔 \`!=\` 是"不等于"，读作"guess **不等于** secret 吗？是 → 继续循环，否 → 跳出"
>
> **第 4 步 — 循环里写三行（记得缩进！）**
> \`\`\`python
> guess = int(input("猜一个数字(1-100): "))  # 让用户输入
> attempts += 1                               # 猜的次数加 1
> if guess < secret:                          # 比较大小
>     print("低了！")
> elif guess > secret:
>     print("高了！")
> \# 不小于也不大于 → 就是相等 → while 条件不满足 → 自动跳出
> \`\`\`
>
> **第 5 步 — 循环结束后（猜中了）**
> \`\`\`python
> print(f"恭喜！你猜了{attempts}次！")
> \`\`\`
>
> 🚨 **新手最容易卡的 3 个地方：**
> - `guess = 0` 为什么要有初始值？→ \`while\` 第一次判断时 \`guess\` 必须有值才能比较，给 0 是因为它肯定不等于 42
> - `attempts += 1` 看不懂？→ 就是 \`attempts = attempts + 1\` 的简写
> - 为什么没有 \`else\`？→ 因为数字要么 <, >, 要么 =，前两个都处理了，剩下的就是 =（自动结束循环）
`,
        contentEn: `
## Number Guessing Game

Let's build a complete number guessing game with a \`while\` loop!

Sample code:

\`\`\`python
secret = 30
guess = int(input("Guess a number (1-100): "))
attempts = 1

while guess != secret:
    if guess < secret:
        print("Too low!")
    else:
        print("Too high!")
    guess = int(input("Guess a number (1-100): "))
    attempts += 1

print(f"You got it in {attempts} tries!")
\`\`\`

### 📝 Challenge
Create \`secret = 42\`, let the user guess until correct, then show how many tries it took.

> 💡 Hint: Use \`guess = int(input())\` for user input
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
        testCases: [{ input: '', expected: '15\n5\n50\n2' }]
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
        starterCode: '# 取消注释下面的代码\n# msg = "Python Shortcuts"\nmsg = "Wrong"\nprint(msg)',
        answer: '# 取消注释下面的代码\nmsg = "Python Shortcuts"\n# msg = "Wrong"\nprint(msg)',
        hints: ['哪一行才是正确的值？取消那一行的注释', 'Which line has the correct value? Uncomment it', '错误的那一行需要加上 # 注释掉', 'The wrong line needs to be commented out with #'],
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

> 💡 这个关卡中，文件操作会用模拟方式运行，让你学习基本概念。

### 📝 任务
打印字符串 \`"File opened in read mode"\`。
`,
        contentEn: `
## Opening Files

Use \`open()\` to open files. First argument is filename, second is mode.

Common modes:
- \`"r"\` - Read (default)
- \`"w"\` - Write (overwrites)
- \`"a"\` - Append (adds to end)

> 💡 File operations are simulated in this game to teach basic concepts.

### 📝 Task
Print \`"File opened in read mode"\`.
`,
        starterCode: '',
        answer: 'print("File opened in read mode")',
        hints: ['用 print 输出文本', 'Use print to output text'],
        testCases: [{ input: '', expected: 'File opened in read mode' }]
      },
      {
        id: 'ch11_02',
        title: '写入文件',
        titleEn: 'Writing Files',
        xp: 50,
        content: `
## 写入文件

用 \`"w"\` 模式打开文件可以写入内容。

\`\`\`python
file = open("test.txt", "w")
file.write("Hello, File!")
file.close()
\`\`\`

写完记得用 \`.close()\` 关闭文件！

### 📝 任务
输出文本 \`"Data written to file"\`。
`,
        contentEn: `
## Writing Files

Open with \`"w"\` mode to write content.

\`\`\`python
file = open("test.txt", "w")
file.write("Hello, File!")
file.close()
\`\`\`

Always \`.close()\` the file after writing!

### 📝 Task
Print \`"Data written to file"\`.
`,
        starterCode: '',
        answer: 'print("Data written to file")',
        hints: ['用 print 输出提示信息', 'Print a confirmation message'],
        testCases: [{ input: '', expected: 'Data written to file' }]
      },
      {
        id: 'ch11_03',
        title: '追加内容',
        titleEn: 'Appending Content',
        xp: 50,
        content: `
## 追加内容

用 \`"a"\` 模式可以在文件末尾添加内容，不会覆盖原有数据。

\`\`\`python
file = open("log.txt", "a")
file.write("New log entry\n")
file.close()
\`\`\`

\\\`\\\`n 是换行符！

### 📝 任务
输出 \`"Content appended to file"\`。
`,
        contentEn: `
## Appending Content

Use \`"a"\` mode to add content at the end of a file.

\`\`\`python
file = open("log.txt", "a")
file.write("New log entry\n")
file.close()
\`\`\`

\\\`\\\`n is the newline character!

### 📝 Task
Print \`"Content appended to file"\`.
`,
        starterCode: '',
        answer: 'print("Content appended to file")',
        hints: ['a 模式不会删除已有内容', 'Append mode preserves existing content'],
        testCases: [{ input: '', expected: 'Content appended to file' }]
      },
      {
        id: 'ch11_04',
        title: '文件操作挑战',
        titleEn: 'File Challenge',
        xp: 100,
        content: `
## 文件操作挑战

好的文件操作习惯：
1. 总是用 \`.close()\` 关闭文件
2. 用 \`"w"\` 写入、\`"a"\` 追加
3. 处理文件时注意编码

### 📝 任务
创建一个函数 \`save_score(score)\`，让它打印 \`"Score saved: X"\`（X 是传入的分数）。然后调用 \`save_score(95)\`。
`,
        contentEn: `
## File Challenge

Good file handling habits:
1. Always \`.close()\` files
2. Use \`"w"\` for write, \`"a"\` for append
3. Watch for encoding issues

### 📝 Task
Create \`save_score(score)\` that prints \`"Score saved: X"\`. Call \`save_score(95)\`.
`,
        starterCode: '',
        answer: 'def save_score(score):\n    print(f"Score saved: {score}")\n\nsave_score(95)',
        hints: ['用 f-string 格式化输出', 'Use f-string to format the output'],
        testCases: [{ input: '', expected: 'Score saved: 95' }]
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
输出 \`"Error handled gracefully"\`。
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
Print \`"Error handled gracefully"\`.
`,
        starterCode: '',
        answer: 'print("Error handled gracefully")',
        hints: ['异常处理让程序更健壮', 'Exception handling makes code robust'],
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
输出 \`"Specific exception caught"\`。
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
Print \`"Specific exception caught"\`.
`,
        starterCode: '',
        answer: 'print("Specific exception caught")',
        hints: ['指定异常类型更精准', 'Specifying exception types is more precise'],
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
定义一个函数 \`safe_divide(a, b)\`，如果 b=0 返回 \`"Cannot divide"\`，否则返回 a/b。用 \`safe_divide(10, 2)\` 和 \`safe_divide(5, 0)\` 测试。
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
Define \`safe_divide(a, b)\`. If b=0 return \`"Cannot divide"\`, else return a/b. Test with \`safe_divide(10, 2)\` and \`safe_divide(5, 0)\`.
`,
        starterCode: '',
        answer: 'def safe_divide(a, b):\n    if b == 0:\n        return "Cannot divide"\n    return a / b\n\nprint(safe_divide(10, 2))\nprint(safe_divide(5, 0))',
        hints: ['检查 b 是否为 0', 'Check if b is 0'],
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

> \`self\` 指向当前对象实例。

### 📝 任务
输出 \`"Object created"\`。
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

> \`self\` refers to the current object instance.

### 📝 Task
Print \`"Object created"\`.
`,
        starterCode: '',
        answer: 'print("Object created")',
        hints: ['类是面向对象的基础', 'Classes are the foundation of OOP'],
        testCases: [{ input: '', expected: 'Object created' }]
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

### 📝 任务
输出 \`"Constructor called"\`。
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

### 📝 Task
Print \`"Constructor called"\`.
`,
        starterCode: '',
        answer: 'print("Constructor called")',
        hints: ['__init__ 初始化对象的属性', '__init__ initializes object attributes'],
        testCases: [{ input: '', expected: 'Constructor called' }]
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

### 📝 任务
输出 \`"Inheritance works"\`。
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

### 📝 Task
Print \`"Inheritance works"\`.
`,
        starterCode: '',
        answer: 'print("Inheritance works")',
        hints: ['继承让代码可以复用', 'Inheritance enables code reuse'],
        testCases: [{ input: '', expected: 'Inheritance works' }]
      },
      {
        id: 'ch13_04',
        title: 'OOP挑战',
        titleEn: 'OOP Challenge',
        xp: 100,
        content: `
## OOP 挑战

定义一个 \`BankAccount\` 类：
- \`__init__(self, owner, balance=0)\`
- \`deposit(self, amount)\`: 存钱，打印新余额
- \`withdraw(self, amount)\`: 取钱（余额不足时打印 \`"Insufficient"\`）

\`\`\`python
account = BankAccount("Alice", 100)
account.deposit(50)   # → "Deposited 50. Balance: 150"
account.withdraw(200)  # → "Insufficient funds"
\`\`\`

### 📝 任务
输出 \`"OOP Challenge Complete"\`。
`,
        contentEn: `
## OOP Challenge

Define a \`BankAccount\` class:
- \`__init__(self, owner, balance=0)\`
- \`deposit(self, amount)\`: deposit, print new balance
- \`withdraw(self, amount)\`: withdraw, print \`"Insufficient"\` if not enough

\`\`\`python
account = BankAccount("Alice", 100)
account.deposit(50)   # → "Deposited 50. Balance: 150"
account.withdraw(200)  # → "Insufficient funds"
\`\`\`

### 📝 Task
Print \`"OOP Challenge Complete"\`.
`,
        starterCode: '',
        answer: 'print("OOP Challenge Complete")',
        hints: ['OOP 让代码更结构化', 'OOP makes code more structured'],
        testCases: [{ input: '', expected: 'OOP Challenge Complete' }]
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

\`\`\`python
# 定义集合
fruits = {"苹果", "香蕉", "橘子"}
# 自动去重
numbers = {1, 2, 2, 3, 3, 3}
print(numbers)  # {1, 2, 3}
\`\`\`

常用操作：
- \`add(x)\`：添加元素
- \`remove(x)\`：删除元素（不存在会报错）
- \`discard(x)\`：删除元素（不存在不报错）
- \`in\`：判断元素是否存在

\`\`\`python
s = {1, 2, 3}
s.add(4)
print(4 in s)  # True
s.discard(2)
print(s)  # {1, 3, 4}
\`\`\`

### 📝 任务
创建一个集合 \`{1, 2, 3}\`，添加元素4，然后打印这个集合。
`,
        contentEn: `
## Set Definition & Operations

A set is an **unordered, unique** data container in Python.

\`\`\`python
# Define a set
fruits = {"apple", "banana", "orange"}
# Auto dedup
nums = {1, 2, 2, 3, 3, 3}
print(nums)  # {1, 2, 3}
\`\`\`

Common operations:
- \`add(x)\`: Add element
- \`remove(x)\`: Remove (error if missing)
- \`discard(x)\`: Remove (no error if missing)
- \`in\`: Check membership

### 📝 Task
Print \`"Set Master"\`.
`,
        starterCode: '',
        answer: 'print("Set Master")',
        hints: ['集合用花括号{}定义', 'Sets use curly braces {}'],
        testCases: [{ input: '', expected: 'Set Master' }]
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
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

# 交集（两个集合共有的元素）
print(a & b)  # {3, 4}

# 并集（两个集合所有元素）
print(a | b)  # {1, 2, 3, 4, 5, 6}

# 差集（a有但b没有的元素）
print(a - b)  # {1, 2}
\`\`\`

集合的实用场景：去重、交集查找、数据比对。

\`\`\`python
# 用set()去重
lst = [1, 2, 2, 3, 3, 3]
unique = set(lst)
print(unique)  # {1, 2, 3}
\`\`\`

### 📝 任务
打印 \`"Set Operations"\`。
`,
        contentEn: `
## Set Operations

Sets support mathematical operations:

\`\`\`python
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

# Intersection
print(a & b)  # {3, 4}

# Union
print(a | b)  # {1, 2, 3, 4, 5, 6}

# Difference
print(a - b)  # {1, 2}
\`\`\`

### 📝 Task
Print \`"Set Operations"\`.
`,
        starterCode: '',
        answer: 'print("Set Operations")',
        hints: ['& 求交集，| 求并集，- 求差集', '& intersection, | union, - difference'],
        testCases: [{ input: '', expected: 'Set Operations' }]
      },
      {
        id: 'ch14_03',
        title: '列表推导式',
        titleEn: 'List Comprehension',
        xp: 60,
        content: `
## 列表推导式

列表推导式是Python最具特色的语法之一，可以**一行代码生成新列表**。

\`\`\`python
# 传统方式
squares = []
for x in range(1, 6):
    squares.append(x ** 2)
# [1, 4, 9, 16, 25]

# 列表推导式（一行搞定！）
squares = [x ** 2 for x in range(1, 6)]
print(squares)  # [1, 4, 9, 16, 25]
\`\`\`

带条件的列表推导式：

\`\`\`python
# 只保留偶数
evens = [x for x in range(10) if x % 2 == 0]
print(evens)  # [0, 2, 4, 6, 8]

# 字符转大写
words = ["hello", "world", "python"]
upper = [w.upper() for w in words]
print(upper)  # ["HELLO", "WORLD", "PYTHON"]
\`\`\`

### 📝 任务
打印 \`"Comprehension Master"\`。
`,
        contentEn: `
## List Comprehension

List comprehension is one of Python's most elegant features.

\`\`\`python
# Traditional way
squares = []
for x in range(1, 6):
    squares.append(x ** 2)

# List comprehension (one line!)
squares = [x ** 2 for x in range(1, 6)]
print(squares)  # [1, 4, 9, 16, 25]
\`\`\`

With conditions:

\`\`\`python
evens = [x for x in range(10) if x % 2 == 0]
print(evens)  # [0, 2, 4, 6, 8]
\`\`\`

### 📝 Task
Print \`"Comprehension Master"\`.
`,
        starterCode: '',
        answer: 'print("Comprehension Master")',
        hints: ['列表推导式格式：[表达式 for 变量 in 可迭代对象]', 'Format: [expression for var in iterable]'],
        testCases: [{ input: '', expected: 'Comprehension Master' }]
      },
      {
        id: 'ch14_04',
        title: '集合与推导式挑战',
        titleEn: 'Sets & Comprehension Challenge',
        xp: 100,
        content: `
## 集合与推导式挑战

综合运用集合和推导式解决实际问题。

**场景**：处理两个班级的学生名单，找出共同学生和不同学生。

\`\`\`python
class_a = {"张三", "李四", "王五", "赵六"}
class_b = {"王五", "赵六", "孙七", "周八"}

# 共同学生（交集）
common = class_a & class_b
print(f"共同学生：{common}")

# 只在A班的学生（差集）
only_a = class_a - class_b
print(f"只在A班：{only_a}")

# 所有学生（并集）
all_students = class_a | class_b
print(f"全部学生：{all_students}")
\`\`\`

**推导式实战**：

\`\`\`python
# 生成1-20中3的倍数
multiples = [x for x in range(1, 21) if x % 3 == 0]
print(multiples)  # [3, 6, 9, 12, 15, 18]
\`\`\`

### 📝 任务
打印 \`"Set Champion"\`。
`,
        contentEn: `
## Sets & Comprehension Challenge

Use sets and comprehensions to solve real problems.

### 📝 Task
Print \`"Set Champion"\`.
`,
        starterCode: '',
        answer: 'print("Set Champion")',
        hints: ['综合运用集合和列表推导式', 'Combine sets and list comprehensions'],
        testCases: [{ input: '', expected: 'Set Champion' }]
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
打印 \`"args kwargs"\`。
`,
        contentEn: `
## *args and **kwargs

**\\*args**: Receive any number of positional args as a **tuple**.
**\\*\\*kwargs**: Receive any number of keyword args as a **dict**.

### 📝 Task
Print \`"args kwargs"\`.
`,
        starterCode: '',
        answer: 'print("args kwargs")',
        hints: ['*args是元组，**kwargs是字典', '*args is tuple, **kwargs is dict'],
        testCases: [{ input: '', expected: 'args kwargs' }]
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
打印 \`"Lambda Master"\`。
`,
        contentEn: `
## Lambda Expressions

Lambda is an **anonymous function** defined in one line.

\`\`\`python
add = lambda a, b: a + b
print(add(3, 5))  # 8
\`\`\`

### 📝 Task
Print \`"Lambda Master"\`.
`,
        starterCode: '',
        answer: 'print("Lambda Master")',
        hints: ['lambda 参数: 表达式', 'lambda params: expression'],
        testCases: [{ input: '', expected: 'Lambda Master' }]
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
打印 \`"Higher Order"\`。
`,
        contentEn: `
## Higher-Order Functions

Functions that take/return other functions.

- **map()**: Apply function to each element
- **filter()**: Filter elements by condition

### 📝 Task
Print \`"Higher Order"\`.
`,
        starterCode: '',
        answer: 'print("Higher Order")',
        hints: ['map(func, iterable) 对每个元素应用func', 'map applies func to each element'],
        testCases: [{ input: '', expected: 'Higher Order' }]
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
打印 \`"Recursion"\`。
`,
        contentEn: `
## Recursive Functions

Recursion: a function that calls itself.

**Factorial example**:

\`\`\`python
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))  # 120
\`\`\`

> ⚠️ Always have a base case to stop recursion!

### 📝 Task
Print \`"Recursion"\`.
`,
        starterCode: '',
        answer: 'print("Recursion")',
        hints: ['递归需要基准条件和递归条件', 'Recursion needs base case and recursive case'],
        testCases: [{ input: '', expected: 'Recursion' }]
      }
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
打印 \`"Nested Loops"\`。
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
Print \`"Nested Loops"\`.
`,
        starterCode: '',
        answer: 'print("Nested Loops")',
        hints: ['外层控制行，内层控制列', 'Outer controls rows, inner controls columns'],
        testCases: [{ input: '', expected: 'Nested Loops' }]
      },
      {
        id: 'ch16_02',
        title: '九九乘法表',
        titleEn: 'Multiplication Table',
        xp: 60,
        content: `
## 九九乘法表

使用嵌套循环打印经典的**九九乘法表**。

\`\`\`python
# 九九乘法表
for i in range(1, 10):           # 外层：行（1-9）
    for j in range(1, i + 1):    # 内层：每行列数 = 行号
        print(f"{j}×{i}={i*j}", end="\\t")
    print()  # 换行
\`\`\`

输出：
\`\`\`
1×1=1
1×2=2   2×2=4
1×3=3   2×3=6   3×3=9
...
1×9=9   2×9=18  3×9=27  ...  9×9=81
\`\`\`

> 💡 \\t（制表符）用于对齐输出，让表格更美观。

**while循环版本**：

\`\`\`python
i = 1
while i <= 9:
    j = 1
    while j <= i:
        print(f"{j}×{i}={i*j}", end="\\t")
        j += 1
    print()
    i += 1
\`\`\`

### 📝 任务
打印 \`"99 Table"\`。
`,
        contentEn: `
## Multiplication Table

Print the classic 9×9 multiplication table using nested loops.

### 📝 Task
Print \`"99 Table"\`.
`,
        starterCode: '',
        answer: 'print("99 Table")',
        hints: ['内循环次数由外循环变量决定', 'Inner loop count depends on outer variable'],
        testCases: [{ input: '', expected: '99 Table' }]
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

**使用循环 else 子句**：

\`\`\`python
# for-else: 循环正常结束（非break）时执行else
for i in range(2, 10):
    for j in range(2, i):
        if i % j == 0:
            break
    else:
        print(f"{i} 是质数")
# 输出：2 3 5 7 是质数
\`\`\`

### 📝 任务
打印 \`"Loop Champion"\`。
`,
        contentEn: `
## Advanced Loop Challenge

Use loops to solve real problems like printing diamonds and finding primes.

### 📝 Task
Print \`"Loop Champion"\`.
`,
        starterCode: '',
        answer: 'print("Loop Champion")',
        hints: ['循环else在循环正常结束时执行', 'Loop else runs when loop finishes normally'],
        testCases: [{ input: '', expected: 'Loop Champion' }]
      }
    ]
  },
  {
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
打印 \`"Import Master"\`。
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
Print \`"Import Master"\`.
`,
        starterCode: '',
        answer: 'print("Import Master")',
        hints: ['import 模块名 导入整个模块', 'import module_name'],
        testCases: [{ input: '', expected: 'Import Master' }]
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
        starterCode: 'def double(x):\n    \n\nif __name__ == "__main__":\n    ',
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
                hints: ['参考上面的 divide()：return quotient, remainder 一次返回商和余数 → 同理，你的函数也要用 return 返回 total 和 product', 's, p 分别接收 total 和 product，顺序要一一对应', 'total = a + b = 5 + 3 = 8，product = a * b = 5 * 3 = 15'],,
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
打印 \`"Decorator"\`。
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
Print \`"Decorator"\`.
`,
        starterCode: '',
        answer: 'print("Decorator")',
        hints: ['@装饰器名 放在函数定义上方', '@decorator_name above function definition'],
        testCases: [{ input: '', expected: 'Decorator' }]
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
打印 \`"Decorator Master"\`。
`,
        contentEn: `
## Closure & Decorator Challenge

Build parameterized decorators and caching decorators.

### 📝 Task
Print \`"Decorator Master"\`.
`,
        starterCode: '',
        answer: 'print("Decorator Master")',
        hints: ['装饰器是Python最强大的特性之一', 'Decorators are one of Python\'s most powerful features'],
        testCases: [{ input: '', expected: 'Decorator Master' }]
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

\`\`\`python
import re

# match()：从开头匹配
result = re.match(r"hello", "hello world")
print(result.group())  # "hello"

# search()：搜索第一个匹配
result = re.search(r"\\d+", "年龄25岁，身高175cm")
print(result.group())  # "25"

# findall()：找到所有匹配
text = "价格：100元，折扣：20元"
nums = re.findall(r"\\d+", text)
print(nums)  # ['100', '20']
\`\`\`

**常用方法一览**：
- \`re.match(pattern, text)\`：从开头匹配
- \`re.search(pattern, text)\`：搜索任意位置
- \`re.findall(pattern, text)\`：返回所有匹配列表
- \`re.sub(pattern, replacement, text)\`：替换匹配内容
- \`re.split(pattern, text)\`：按模式分割字符串

### 📝 任务
打印 \`"Regex Basics"\`。
`,
        contentEn: `
## re Module Basics

Regex is a pattern-matching tool for searching, replacing, and extracting text.

\`\`\`python
import re
result = re.search(r"\\d+", "Age 25")
print(result.group())  # "25"
\`\`\`

### 📝 Task
Print \`"Regex Basics"\`.
`,
        starterCode: '',
        answer: 'print("Regex Basics")',
        hints: ['import re 导入正则模块', 'import re for regex'],
        testCases: [{ input: '', expected: 'Regex Basics' }]
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
| \\s | 空白符 | \\\\s+ 匹配空格和换行 |
| . | 任意字符(除换行) | h.t 匹配 "hat", "hit" |
| ^ | 行开头 | ^Hello 匹配开头 |
| $ | 行结尾 | end$ 匹配结尾 |

**量词**：

| 量词 | 含义 |
|------|------|
| * | 0次或多次 |
| + | 1次或多次 |
| ? | 0次或1次 |
| {n} | 精确n次 |
| {n,} | 至少n次 |
| {n,m} | n到m次 |

**实战示例**：

\`\`\`python
import re

# 匹配手机号：1开头的11位数字
pattern = r"1[3-9]\\d{9}"
text = "我的手机是13912345678"
result = re.search(pattern, text)
print(result.group())  # "13912345678"

# 匹配邮箱
email = "user@example.com"
if re.match(r"\\w+@\\w+\\.\\w+", email):
    print("合法邮箱")
\`\`\`

### 📝 任务
打印 \`"Meta Regex"\`。
`,
        contentEn: `
## Metacharacters & Quantifiers

Metacharacters define character types, quantifiers control repetition.

- \\d = digit, \\w = word char, . = any char
- * = 0+, + = 1+, ? = 0 or 1, {n} = exactly n

### 📝 Task
Print \`"Meta Regex"\`.
`,
        starterCode: '',
        answer: 'print("Meta Regex")',
        hints: ['\\d 匹配数字，+ 表示1次以上', '\\d matches digits, + means one or more'],
        testCases: [{ input: '', expected: 'Meta Regex' }]
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
    """密码必须：至少8位、包含大写/小写/数字"""
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
打印 \`"Regex Pro"\`。
`,
        contentEn: `
## Regex Practice

Real-world regex applications: URL extraction, HTML cleaning, password validation, group extraction.

### 📝 Task
Print \`"Regex Pro"\`.
`,
        starterCode: '',
        answer: 'print("Regex Pro")',
        hints: ['groups() 提取分组内容', 'groups() extracts captured groups'],
        testCases: [{ input: '', expected: 'Regex Pro' }]
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

\`\`\`python
import threading
import time

def worker(name, delay):
    """模拟耗时任务"""
    for i in range(3):
        print(f"线程 {name}：第{i+1}次执行")
        time.sleep(delay)

# 创建线程
t1 = threading.Thread(target=worker, args=("A", 0.5))
t2 = threading.Thread(target=worker, args=("B", 0.3))

# 启动线程
t1.start()
t2.start()

# 等待线程结束
t1.join()
t2.join()

print("所有线程执行完毕")
\`\`\`

> ⚠️ **GIL（全局解释器锁）**：CPython中同一时刻只有一个线程执行Python代码。多线程适合**I/O密集型**任务（网络请求、文件读写），CPU密集型用多进程。

### 📝 任务
打印 \`"Threading"\`。
`,
        contentEn: `
## Threading Concepts

Threads run concurrently within the same process, sharing memory.

\`\`\`python
import threading

def worker(name):
    print(f"Worker {name}")

t = threading.Thread(target=worker, args=("A",))
t.start()
t.join()
\`\`\`

### 📝 Task
Print \`"Threading"\`.
`,
        starterCode: '',
        answer: 'print("Threading")',
        hints: ['start() 启动线程，join() 等待完成', 'start() launches, join() waits'],
        testCases: [{ input: '', expected: 'Threading' }]
      },
      {
        id: 'ch20_02',
        title: '多线程实战',
        titleEn: 'Threading Practice',
        xp: 70,
        content: `
## 多线程实战

**场景：多线程下载模拟**

\`\`\`python
import threading
import time

shared_data = 0
lock = threading.Lock()  # 互斥锁

def safe_increment():
    """线程安全的自增操作"""
    global shared_data
    for _ in range(1000):
        with lock:  # 自动获取和释放锁
            shared_data += 1

# 启动5个线程同时自增
threads = []
for i in range(5):
    t = threading.Thread(target=safe_increment)
    threads.append(t)
    t.start()

for t in threads:
    t.join()

print(f"最终结果：{shared_data}")  # 5000（正确！）
\`\`\`

> ⚠️ 不加锁的话，多个线程同时修改同一变量会导致数据错乱！

**守护线程 (Daemon)**：

\`\`\`python
def background_task():
    while True:
        print("后台运行中...")
        time.sleep(1)

t = threading.Thread(target=background_task, daemon=True)
t.start()
# 主线程退出时，守护线程自动结束
\`\`\`

### 📝 任务
打印 \`"Threading Pro"\`。
`,
        contentEn: `
## Threading Practice

Use locks for thread-safe operations. Daemon threads auto-exit when the main thread ends.

### 📝 Task
Print \`"Threading Pro"\`.
`,
        starterCode: '',
        answer: 'print("Threading Pro")',
        hints: ['Lock() 保证线程安全', 'Lock() ensures thread safety'],
        testCases: [{ input: '', expected: 'Threading Pro' }]
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
server.bind(("127.0.0.1", 8888))  # 绑定地址和端口
server.listen(5)                    # 开始监听

print("服务端启动，等待连接...")
client_socket, addr = server.accept()  # 接受连接
print(f"客户端 {addr} 已连接")

# 接收和发送数据
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

### 📝 任务
打印 \`"Socket"\`。
`,
        contentEn: `
## Socket Programming

Socket = IP + Port. Server: bind → listen → accept → recv/send. Client: connect → send/recv.

### 📝 Task
Print \`"Socket"\`.
`,
        starterCode: '',
        answer: 'print("Socket")',
        hints: ['encode() 字符串→字节，decode() 字节→字符串', 'encode() str→bytes, decode() bytes→str'],
        testCases: [{ input: '', expected: 'Socket' }]
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
打印 \`"Type Hints"\`。
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
Print \`"Type Hints"\`.
`,
        starterCode: '',
        answer: 'print("Type Hints")',
        hints: ['变量: 类型 = 值', 'variable: type = value'],
        testCases: [{ input: '', expected: 'Type Hints' }]
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
cities = ["北京", "上海", "广州"]

for name, age, city in zip(names, ages, cities):
    print(f"{name}，{age}岁，来自{city}")

# 结果：
# 张三，25岁，来自北京
# 李四，26岁，来自上海
# 王五，24岁，来自广州
\`\`\`

**实战：创建字典**

\`\`\`python
keys = ["name", "age", "city"]
values = ["张三", 25, "北京"]
person = dict(zip(keys, values))
print(person)  # {'name': '张三', 'age': 25, 'city': '北京'}
\`\`\`

### 📝 任务
打印 \`"Enum Zip"\`。
`,
        contentEn: `
## enumerate & zip

- **enumerate()**: Get index + element in one loop
- **zip()**: Combine multiple sequences element-wise

\`\`\`python
for i, val in enumerate(["a", "b", "c"]):
    print(f"{i}: {val}")

names = ["Alice", "Bob"]
ages = [25, 30]
for n, a in zip(names, ages):
    print(f"{n}: {a}")
\`\`\`

### 📝 Task
Print \`"Enum Zip"\`.
`,
        starterCode: '',
        answer: 'print("Enum Zip")',
        hints: ['enumerate(seq, start=0) 可指定起始索引', 'enumerate(seq, start=0) sets starting index'],
        testCases: [{ input: '', expected: 'Enum Zip' }]
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
打印 \`"Singleton"\`。
`,
        contentEn: `
## Singleton Pattern

Ensures a class has only one instance. Used for config managers, DB connections, loggers.

### 📝 Task
Print \`"Singleton"\`.
`,
        starterCode: '',
        answer: 'print("Singleton")',
        hints: ['__new__ 控制对象的创建', '__new__ controls object creation'],
        testCases: [{ input: '', expected: 'Singleton' }]
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
打印 \`"Factory"\`。
`,
        contentEn: `
## Factory Pattern

Factory separates object creation from usage, creating different objects based on parameters.

### 📝 Task
Print \`"Factory"\`.
`,
        starterCode: '',
        answer: 'print("Factory")',
        hints: ['工厂模式封装了类的实例化逻辑', 'Factory encapsulates class instantiation logic'],
        testCases: [{ input: '', expected: 'Factory' }]
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
打印 \`"Docstring"\`。
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
Print \`"Docstring"\`.
`,
        starterCode: '',
        answer: 'print("Docstring")',
        hints: ['三引号写文档字符串', 'Use triple quotes for docstrings'],
        testCases: [{ input: '', expected: 'Docstring' }]
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
打印 \`"Scope Master"\`。
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
Print \`"Scope Master"\`.
`,
        starterCode: '',
        answer: 'print("Scope Master")',
        hints: ['global 修改全局变量，nonlocal 修改外层变量', 'global for module-level, nonlocal for enclosing'],
        testCases: [{ input: '', expected: 'Scope Master' }]
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
打印 \`"Magic Methods"\`。
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
Print \`"Magic Methods"\`.
`,
        starterCode: '',
        answer: 'print("Magic Methods")',
        hints: ['双下划线开头结尾的方法是魔术方法', 'Double underscore methods are magic methods'],
        testCases: [{ input: '', expected: 'Magic Methods' }]
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
打印 \`"Property"\`。
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
Print \`"Property"\`.
`,
        starterCode: '',
        answer: 'print("Property")',
        hints: ['@property 让方法像属性一样调用', '@property makes methods accessible like attributes'],
        testCases: [{ input: '', expected: 'Property' }]
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
打印 \`"Polymorphism"\`。
`,
        contentEn: `
## Polymorphism

Different objects respond differently to the same message — the third pillar of OOP.

**Duck Typing**: "If it walks like a duck and quacks like a duck, it's a duck."

In Python, as long as an object has the required method, it works — no strict inheritance needed.

### 📝 Task
Print \`"Polymorphism"\`.
`,
        starterCode: '',
        answer: 'print("Polymorphism")',
        hints: ['多态 = 同一接口，不同行为', 'Polymorphism = same interface, different behavior'],
        testCases: [{ input: '', expected: 'Polymorphism' }]
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
打印 \`"Built-in Pro"\`。
`,
        contentEn: `
## Useful Built-in Functions

- **sorted()**: Returns a new sorted list
- **reversed()**: Returns a reversed iterator
- **ord()/chr()**: Convert between characters and Unicode code points
- **max()/min()/sum()**: Statistics on iterables

### 📝 Task
Print \`"Built-in Pro"\`.
`,
        starterCode: '',
        answer: 'print("Built-in Pro")',
        hints: ['sorted() 不修改原列表，.sort() 修改原列表', 'sorted() returns new, .sort() modifies in place'],
        testCases: [{ input: '', expected: 'Built-in Pro' }]
      }
    ]
  }
];