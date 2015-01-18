;(function (exports, window, document) { 'use strict';
  var marked = window.marked;
  var CodeMirror = window.CodeMirror;

  var $form = document.querySelector('#form');
  var $markdownEditor = $form.querySelector('.markdown-editor');
  var $textareaContent = $form.querySelector('.textarea-content');
  var $preview = $form.querySelector('.preview');

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
})(kuroBlogAdmin.editor= {}, window, document);
