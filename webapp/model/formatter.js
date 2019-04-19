sap.ui.define([
  "app/controller/BaseController",
], function (BaseController) {
	"use strict";
  return {


    toDecimal : function(d){
      d = d || 0;
      return d.toFixed(2);// if value is string
      // if number use below statement
      // return d.toFixed(2)
  }
  };


}, true);