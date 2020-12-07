"use strict";

//何回ボタンを押したかカウント
let count = 1;

function add() {
  //現在のカウントを格納する
  let current_count = count;
  let container_id = `container${count}`;

  //ボタンを押した回数+1
  count = count + 1;

  /*挿入する文字列
	　<p id=${count}>とすることで、次にボタン押した時、
	  このidの後ろに文字列が挿入される*/

  //挿入するテキスト
  var container = [
    `<div class="container" name="container" id="container${count}" data-count=${count}>`,
    `  <div class="item">    `,
    `    <select name="type" id="type${count}">`,
    `      <option value="段落"></option>`,
    `      <option value="command">コマンド</option>`,
    `      <option value="link">リンク</option>`,
    `      <option value="h3">見出し</option>`,
    `      <option value="text" selected>テキスト</option>`,
    `  </select>`,
    `</div>`,
    `<div class="item"><textarea id="textarea${count}" name=textarea>メッセージを入力</textarea></div>`,
    `<div class="item">リンク用</div>`,
    `<div class="item"><input type="button" value="削除" onClick="del(${count})" /></div>`,
    `</div>`
  ].join("");

  //htmlを挿入
  console.log(count);
  document
    .getElementById("end_container")
    .insertAdjacentHTML("beforeend", container);
}

function del(i) {
  // count -= 1;
  var container_id = `container${i}`;
  document.getElementById(container_id).remove();
  // document.getElementById(container_id).textContent="";
  console.log(count);
}

// 追記ボタンを押した数だけ繰り返す
function make() {
  // htmlの元なる変数
  var html = "";
  var js = "";
  // 追記ボタンを押した数だけ繰り返す
  var j = document.getElementsByName("container").length;

  for (let i = 0; i < j; i++) {
    // htmlを作成する関数を呼び出す
    html = make_html(i, html);
    // js = make_js(step, js);
  }
  js = make_js(js);
  var over_js = [
    `function copyOverrideOnce(s){\n`,
    `  document.addEventListener('copy', function(e){\n`,
    `    e.clipboardData.setData('text/plain', s);\n`,
    `    e.preventDefault();\n`,
    `  },\n`,
    `  {once:true}\n`,
    `  );\n`,
    `}\n`
  ].join("");

  var js_arry = [`<script>\n`, `${over_js}`, `${js}`, `</script>`].join("");

  html += js_arry;

  return html;
}

function preview() {
  var html = make();
  // html = html.split("<script>");
  // console.log(html[0]);
  document.getElementById("end").textContent = "";
  document.getElementById("end").insertAdjacentHTML("afterbegin", html);
}

function dl() {
  var html = make();
  let blob = new Blob([html], { type: "text/plan" });
  let link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "作ったファイル.html";
  link.click();
}

function tcopy(i) {
  var messages = document.getElementsByName("pre");
  messages[i];
  for (var message in messages) {
    console.log(message);
    console.log(message.dataset.pre);
  }
}

function make_js(js) {
  js += [
    `function copy(i){\n`,
    `var pre ="pre" + i;\n`,
    `var text = document.getElementById(pre).textContent;\n`,
    `  copyOverrideOnce(text);\n`,
    `  document.execCommand("copy");\n`,
    `}\n`
  ].join("");
  return js;
}

// htmlの元を作成する関数
function make_html(i, html) {
  // 各idに挿入する数値を宣言。stepは0からなので+1している
  //idを作成
  var type_id = `type${i}`;
  var textarea_id = `textarea${i}`;

  //htmlのタグを判断する値を取得
  var type = document.getElementsByName("type")[i].value;

  // テキストエリアの値を取得
  var textarea = document.getElementsByName("textarea")[i].value;

  if (type === "br") {
    html += `<pre>${textarea}</pre><br>\n`;
  }

  if (type === "text") {
    html += `<p><pre>${textarea}</pre></p>\n`;
  }

  if (type === "h3") {
    html += `<h3><pre>${textarea}</pre></h3>\n`;
  }

  if (type === "command") {
    html += `<input type="button" value="copy" data-count="${i}" onclick="copy(${i});">\n<div class="code" style=".code {width: 500px; overflow-x: scroll; white-space: nowrap; border: blue 0.5px solid;}">\n  <pre name="pre" id="pre${i}" data-pre="${i}" >${textarea}</pre>\n</div>\n`;
  }

  return html;
}

