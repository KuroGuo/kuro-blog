!function(e,r,t){"use strict";var n=(r.marked,r.CodeMirror),o=t.querySelector("#form_create"),a=o.querySelector(".markdown-editor"),c=o.querySelector(".textarea-content"),i=(o.querySelector(".preview"),n.fromTextArea(c,{mode:"markdown",keyMap:"sublime",autoCloseBrackets:!0,matchBrackets:!0,showCursorWhenSelecting:!0,extraKeys:{Enter:"newlineAndIndentContinueMarkdownList"},lineWrapping:!0}));a.addEventListener("mousedown",function(e){e.preventDefault(),i.focus()})}(kuroBlogAdmin.article.create={},window,document);