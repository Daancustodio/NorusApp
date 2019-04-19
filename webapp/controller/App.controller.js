sap.ui.define(
	[
		"app/controller/BaseController",
		"sap/m/MessageToast",	
		"sap/ui/model/json/JSONModel",	
		"app/model/RestModel",
		"app/model/formatter",
        "app/controller/fragments/Notification.controller",

	],
	function (BaseController, MessageToast, JSONModel, RestModel, formatter,NotificationController) {
	"use strict";

	return BaseController.extend("app.controller.App", {
		fmt:formatter,

		onInit : function(){			
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
				
		},		
		
		onHome : function(){
			if(this.getUserSession())
				this.getRouter().navTo('dashBoard');
			else
				this.getRouter().navTo('login');
			
		},

		//Interceptar Chamadas a API para alterar ou abortar se necessário
	
		

		
		//Session Logout
		onLoginPopOver : function(oEvent){
			if(!this.getUserSession()){
				MessageToast.show(this.getText("Commom.NoLoggedUser"));				
				this.getRouter().navTo('login');
			}
			else
				this.loggedPopOver(oEvent);		
		},
		
		onLogOut : function (){
			this.destroyUserSession();
			this.redirectIfNotLogged();						
			this.setModel(new JSONModel(), "currentUser");
		},	

		setUserModelFromSession(){
			var user = this.getUserSession();
			if(user)
				this.setModel(new JSONModel(user), 'currentUser');
		},

		loggedPopOver : function(oEvent){
			
			if (!this._oPopoverLogged) {
			    this._oPopoverLogged = sap.ui.xmlfragment("app.view.fragments.Logged", this);
			    this.getView().addDependent(this._oPopoverLogged);
			}
			
			this._oPopoverLogged.setModel(new JSONModel(this.getUserSession()), 'currentUser');
			var oButton = oEvent.getSource();
			jQuery.sap.delayedCall(0, this, function () {
			    this._oPopoverLogged.openBy(oButton);
			});
		},


		isOnLogginPage : function(){
			return window.location.hash == "";
		},
		
	});
});