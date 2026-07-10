import { readFileSync, writeFileSync } from 'fs';

let data = readFileSync('./src/data/courses.js', 'utf-8');

// Replace Chinese content
const zhOld = `\`\`\`python
greeting = "Hello"
name = "Tom"
message = greeting + ", " + name
print(message)
\`\`\`

> ⚠️ 注意：字符串 + 数字会报错！需要用 \`str()\` 转换。

### 📝 任务
拼接 \`"My name is "\` 和 \`"Python"\`，然后打印结果。`;

const zhNew = `\`\`\`python
"My name is " + "Python"
\`\`\`

### 📝 任务
拼接 \`"My name is "\` 和 \`"Python"\`，然后打印结果。`;

// Replace English content
const enOld = `\`\`\`python
greeting = "Hello"
name = "Tom"
message = greeting + ", " + name
print(message)
\`\`\`

> ⚠️ Note: string + number will cause an error! Use \`str()\` to convert.

### 📝 Task
Concatenate \`"My name is "\` and \`"Python"\`, then print the result.`;

const enNew = `\`\`\`python
"My name is " + "Python"
\`\`\`

### 📝 Task
Concatenate \`"My name is "\` and \`"Python"\`, then print the result.`;

data = data.replace(zhOld, zhNew);
data = data.replace(enOld, enNew);

if (data.includes('greeting = "Hello"')) {
  console.log('ERROR: Still has greeting example!');
  process.exit(1);
} else {
  writeFileSync('./src/data/courses.js', data, 'utf-8');
  console.log('Replaced successfully!');
}
