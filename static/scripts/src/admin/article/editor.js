;(function (exports, window, document) { 'use strict';
  var marked = window.marked;
  var CodeMirror = window.CodeMirror;

  var $formCreate = document.querySelector('#form_create');
  var $markdownEditor = $formCreate.querySelector('.markdown-editor');
  var $textareaContent = $formCreate.querySelector('.textarea-content');
  var $preview = $formCreate.querySelector('.preview');

  var codeMirror = CodeMirror.fromTextArea($textareaContent, {
    mode: "markdown",
    keyMap: "sublime",
    autoCloseBrackets: true,
    matchBrackets: true,
    showCursorWhenSelecting: true,
    extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"},
    lineWrapping: true
  });

  $markdownEditor.addEventListener('mousedown', function (e) {
    e.preventDefault();
    codeMirror.focus();
  });

})(kuroBlogAdmin.article.create = {}, window, document);