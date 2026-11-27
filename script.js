var themeBtn = document.getElementById('themeBtn');
themeBtn.addEventListener('click', function () {
  var dark = document.body.classList.toggle('dark');
  themeBtn.textContent = dark ? '☀️ 切换浅色模式' : '🌙 切换深色模式';
});

var helloBtn = document.getElementById('helloBtn');
var helloMsg = document.getElementById('helloMsg');
var hellos = ['你好呀，欢迎来到我的主页！', '我是陈，正在学编程，欢迎常来看看。', '这个网站是我自己做的，还会继续升级。'];
var i = 0;
helloBtn.addEventListener('click', function () {
  helloMsg.textContent = hellos[i % hellos.length];
  i += 1;
});
