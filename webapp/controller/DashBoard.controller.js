sap.ui.define(
	[
		"app/controller/BaseController",
		"sap/m/MessageToast",   
		"sap/ui/model/json/JSONModel",	
		"sap/m/MessageBox",	
		'app/model/formatter'		
	],
	function (BaseController, MessageToast,JSONModel,MessageBox, Formatter) {
	"use strict";

	return BaseController.extend("app.controller.DashBoard", {
				
		onInit : function () {			
			this.setUserTheme();
			this.getRouter()
				.getRoute("dashBoard")
				.attachPatternMatched(this._onRouteMatched, this);

		},
		fmt: Formatter,		

		_loadData : function(){
			let model = new JSONModel();
			model.setData([{
				"icon" : "sap-icon://document",
				"number" :10,
				"title" :"Contratos",
				"info" :"Gerenciar Contratos",
				"infoState" :"None",
				"numberUnit" :"",
				"type":"None",
				"route":"contrato"
			}]);
			this.setModel(model);
		},
		onNavRoute:function(oEvent){
            let Router = oEvent.getSource().data("route");
            this.getRouter().navTo(Router);
		},
		
		onAfterRendering : function(){
			this.redirectIfNotLogged();
		},

		onShowRequestPurchasePress : function(oEvent){
			var oItem = oEvent.getSource().getParent().getParent();		
			this._showResquest(oItem);
		},
		
		_onRouteMatched : function (oEvent) {			
			this.setUserTheme();
			this._loadData();
		},
		
		userSettingPress : function(){
			var usercode = this.getUserSession().USER_CODE;
			this.getRouter().navTo("settings", {
				userName: usercode
			});
		},

		_showResquest : function (oItem) {
			var path = oItem.oBindingContexts.Approvals.sPath;
			var index = this.getIndexOfPath(path);
			var oId = oItem.oBindingContexts.Approvals.oModel.oData.RequestsPurchase[index].Id;
			this.getRouter().navTo("requestPurchaseDetail", {
				id: oId
			});
		},

		
	});

});