'use strict';

var _ = require('lodash');
var util = require('util');
var errorCodeFormatter = require('./errorCodeFormatter');
var successfulMsgTypes = ['success', 'warning', 'info', 'debug'];
var unsuccessfulMsgTypes = ['error', 'warning', 'debug'];
var moment = require('moment');

// OperationResult(err)
// OperationResult(err, descript)
// OperationResult(err, data)
// OperationResult(err, descript, data)
// OperationResult(err, descript, data, msgType)

function OperationResult(err, descript, data, msgType) {

  this.isErrorString = false;
  if (_.isString(err)) {
    this.isErrorString = true;
    err = new Error(err);
  };

  this._succeeded = !util.isError(err);

  if (this._succeeded) {
    this._msgType = successfulMsgTypes.indexOf(msgType) >= 0 ?
      msgType : successfulMsgTypes[0];
  } else {
    this._msgType = unsuccessfulMsgTypes.indexOf(msgType) >= 0 ?
      msgType : unsuccessfulMsgTypes[0];
  }

  this._descript = typeof(descript) === "string" ? descript : null;

  if (!!data && typeof(data) === "object") {
    this._data = data;
  } else if (!this._descript && typeof(descript) === "object") {
    this._data = descript;
  }

  if (!this._succeeded) {
    this._errCode = '0x000000';
    this._errType = err.name;
    switch (err.name) {
      case 'ValidationError':
        this._errCode = errorCodeFormatter.format(0x0001);
        var msgs = [];
        var errData = [];
        var idx = 0;
        for (var objName in err.errors) {
          idx++;
          msgs.push(idx + ": " + err.errors[objName].message);
          errData.push(err.errors[objName]);
        }
        this._errDescript = '数据校验异常';
        if (!this._data) {
          this._data = errData;
        }
        if (!this._descript) {
          this._descript = "数据校验出错: " + msgs.join(' ')
        }

        break;
      case 'OperationError':
        this._errCode = err.errCode;
        if (!!err.innerError) {
          this._errDescript = err.innerError.message;
        } else {
          this._errDescript = err.message;
        }
        this._descript = err.message;
        break;
      default:
        this._errDescript = err.message;
        break;
    }
  }
}

OperationResult.prototype.withErrCode = function(errCode) {
  if (!this._succeeded) {
    this._errCode = errorCodeFormatter.format(errCode);
  }
  return this;
};

var formatDate = function(jsonResult, names) {
  jsonResult = JSON.stringify(jsonResult);
  _.map(names, function(name, index) {
    var reg = new RegExp('"' + name + '":\s*"[^\"]*"', "ig");
    jsonResult = jsonResult.replace(reg, function(item) {
      var newItem = JSON.parse("{" + item + "}");
      // var formatTime = moment(_.values(newItem)[0]).format('YYYY-MM-DD HH:mm:ss');
      var formatTime = moment(_.values(newItem)[0])._d.getTime();
      return '"' + name + '":' + formatTime;
    });
  });
  return JSON.parse(jsonResult);
};

OperationResult.prototype.toJson = function(dateFilter) {
  var error = null;
  var that = this;
  if (!!that._errCode) {
    if (that.isErrorString) {
      that._descript = that._errDescript;
    }
    if (!that._descript && that._descript != '') {
      that._descript = that._errDescript ? that._errDescript : "系统发生了一个异常";
    }
    if (!that._errDescript) {
      that._errDescript = that._descript;
    }
    error = {
      code: that._errCode,
      type: that._errType,
      descript: that._errDescript
    }
  }

  var result = {
    succeeded: that._succeeded,
    error: error,
    message: {
      type: that._msgType,
      descript: that._descript
    }
  }
  if (!!this._data) {
    var newResult;
    if (dateFilter) {
      var filterArray = ['createdAt', 'updatedAt'];
      newResult = formatDate(this._data, _.union(filterArray, dateFilter));
    } else {
      newResult = formatDate(this._data, ['createdAt', 'updatedAt']);
    }
    result.data = newResult;
  }
  return result;
}

module.exports = OperationResult;
