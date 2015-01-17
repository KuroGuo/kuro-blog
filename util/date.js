'use strict';

exports.toDateString = function (date, separator) {
  var dateStr = date.getYear() + 1900 + (separator || '年');
  dateStr += date.getMonth() + 1 + (separator || '月');
  dateStr += date.getDate() + (separator ? '' : '日');
  return dateStr;
};

exports.toDateTimeString = function (date, separator) {
  var datetimeStr = exports.toDateString(date, separator) + ' ';
  var hours = date.getHours();
  var minutes = date.getMinutes();

  if (hours < 10)
    hours = '0' + hours;

  if (minutes < 10)
    minutes = '0' + minutes;

  datetimeStr += hours + ':';
  datetimeStr += minutes;

  return datetimeStr;
};