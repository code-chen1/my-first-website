var themeBtn = document.getElementById('themeBtn');
themeBtn.addEventListener('click', function () {
  var dark = document.body.classList.toggle('dark');
  themeBtn.textContent = dark ? '☀️ 切换浅色模式' : '🌙 切换深色模式';
});

var calcBtn = document.getElementById('calcBtn');
calcBtn.addEventListener('click', function () {
  var u = parseFloat(document.getElementById('volt').value);
  var r = parseFloat(document.getElementById('ohm').value);
  var out = document.getElementById('calcResult');
  if (!r) { out.textContent = '电阻不能是 0'; return; }
  out.textContent = '电流 I = ' + (u / r).toFixed(2) + ' 安，功率 P = ' + (u * u / r).toFixed(2) + ' 瓦';
});
function tick() {
  var el = document.getElementById('clock');
  if (el) el.textContent = new Date().toLocaleString('zh-CN');
}
tick();
setInterval(tick, 1000);

var helloBtn = document.getElementById('helloBtn');
var helloMsg = document.getElementById('helloMsg');
var hellos = ['你好呀，欢迎来到我的主页！', '我是陈，正在学编程，欢迎常来看看。', '这个网站是我自己做的，还会继续升级。'];
var i = 0;
helloBtn.addEventListener('click', function () {
  helloMsg.textContent = hellos[i % hellos.length];
  i += 1;
});

var TODO_KEY = 'chen_study_todos';
var todoList = document.getElementById('todoList');
var todoInput = document.getElementById('todoInput');
var addTodoBtn = document.getElementById('addTodoBtn');
var todoStats = document.getElementById('todoStats');

function loadTodos() {
  try {
    var saved = JSON.parse(localStorage.getItem(TODO_KEY));
    if (Array.isArray(saved)) return saved;
  } catch (e) {}
  return [
    { text: '搭建并上线我的第一个个人主页', done: true },
    { text: '复习欧姆定律与功率计算公式', done: false },
    { text: '学习 JavaScript 本地存储 localStorage', done: false }
  ];
}

var todos = loadTodos();

function saveTodos() {
  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = '';
  var doneCount = 0;
  todos.forEach(function (todo, index) {
    if (todo.done) doneCount += 1;
    var li = document.createElement('li');
    li.className = 'todo-item' + (todo.done ? ' done' : '');
    var left = document.createElement('label');
    left.className = 'todo-left';
    var box = document.createElement('input');
    box.type = 'checkbox';
    box.checked = todo.done;
    box.addEventListener('change', function () {
      todos[index].done = box.checked;
      saveTodos();
      renderTodos();
    });
    var text = document.createElement('span');
    text.className = 'todo-text';
    text.textContent = todo.text;
    left.appendChild(box);
    left.appendChild(text);
    var del = document.createElement('button');
    del.type = 'button';
    del.className = 'todo-del';
    del.textContent = '删除';
    del.addEventListener('click', function () {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });
    li.appendChild(left);
    li.appendChild(del);
    todoList.appendChild(li);
  });
  todoStats.textContent = '已完成 ' + doneCount + ' / ' + todos.length + ' 项';
}

function addTodo() {
  var text = todoInput.value.trim();
  if (!text) return;
  todos.push({ text: text, done: false });
  todoInput.value = '';
  saveTodos();
  renderTodos();
  todoInput.focus();
}

addTodoBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') addTodo();
});

renderTodos();
