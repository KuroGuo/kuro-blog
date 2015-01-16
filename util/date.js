'use strict';

exports.toDateString = function (date) {
  var dateStr = date.getYear() + 1900 + '年';
  dateStr += date.getMonth() + 1 + '月';
  dateStr += date.getDate() + '日';
  return dateStr;
};