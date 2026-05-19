// ============================================================
// Game Data - All Python Course Content (40 Lessons)
// ============================================================

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
greeting = "Hello"
name = "Tom"
message = greeting + ", " + name
print(message)
\`\`\`

> ⚠️ 注意：字符串 + 数字会报错！需要用 \`str()\` 转换。

### 📝 任务
拼接 \`"My name is "\` 和 \`"Python"\`，然后打印结果。
`,
        contentEn: `
## String Concatenation

Use \`+\` to join strings together.

\`\`\`python
greeting = "Hello"
name = "Tom"
message = greeting + ", " + name
print(message)
\`\`\`

> ⚠️ Note: string + number will cause an error! Use \`str()\` to convert.

### 📝 Task
Concatenate \`"My name is "\` and \`"Python"\`, then print the result.
`,
        starterCode: '',
        answer: 'result = "My name is " + "Python"\nprint(result)',
        hints: ['用 + 连接', 'Use + to concatenate'],
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
创建变量 \`lang = "Python"\`，打印它的长度。
`,
        contentEn: `
## String Length

Use \`len()\` function to get the length of a string.

\`\`\`python
text = "Python"
print(len(text))  # → 6
\`\`\`

### 📝 Task
Create \`lang = "Python"\`, print its length.
`,
        starterCode: '',
        answer: 'lang = "Python"\nprint(len(lang))',
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
        hints: ['每次循环把 i 加到 total', 'Add i to total each iteration'],
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
        hints: ['def 函数名():', 'def function_name():'],
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
        hints: ['函数体内计算 n*n', 'Calculate n*n inside the function'],
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
def greet(name="World"):
    print(f"Hello, {name}!")

greet()        # → Hello, World!
greet("Python")  # → Hello, Python!
\`\`\`

### 📝 任务
定义函数 \`power(base, exp=2)\`，返回 \`base ** exp\`。调用 \`power(5)\`（使用默认exp=2）并打印结果。
`,
        contentEn: `
## Default Parameters

Function parameters can have default values.

\`\`\`python
def greet(name="World"):
    print(f"Hello, {name}!")

greet()        # → Hello, World!
greet("Python")  # → Hello, Python!
\`\`\`

### 📝 Task
Define \`power(base, exp=2)\` returning \`base ** exp\`. Call \`power(5)\` (using default exp=2) and print.
`,
        starterCode: '',
        answer: 'def power(base, exp=2):\n    return base ** exp\n\nprint(power(5))',
        hints: ['exp=2 设置默认值', 'exp=2 sets default value'],
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
1. 程序生成一个 1-100 的随机数
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

> 💡 提示：用 \`guess = int(input())\` 获取用户输入
`,
        contentEn: `
## Number Guessing Game

Congratulations on making it this far! Let's build a complete number guessing game.

### 📝 Challenge
Implement a number guessing game. Create \`secret = 42\`, let user guess until correct.

> 💡 Hint: Use \`guess = int(input())\` for user input
`,
        starterCode: '',
        answer: 'secret = 42\nprint("Guess the number!")\n\nwhile True:\n    guess = int(input())\n    if guess < secret:\n        print("Too low!")\n    elif guess > secret:\n        print("Too high!")\n    else:\n        print("Correct!")\n        break',
        hints: ['用 while True 循环', 'Use while True loop', '猜对时用 break 退出', 'Use break when correct'],
        testCases: [
          { input: '50', expected: 'Guess the number!\nToo high!' },
          { input: '30', expected: 'Guess the number!\nToo low!' },
          { input: '42', expected: 'Guess the number!\nCorrect!' }
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
  }
];
