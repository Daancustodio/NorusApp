sap.ui.define(
	[
		"app/controller/BaseController",
		"sap/m/MessageToast",	
		"app/model/RestModel",		
	],
	function (BaseController, MessageToast, RestModel) {
	"use strict";

	return BaseController.extend("app.controller.security.Login", {
		onInit : function(){
			
			var that = this;
			this.byId("appLoginPage").attachBrowserEvent("keypress", oEvent =>{
				if(oEvent.keyCode != jQuery.sap.KeyCodes.ENTER) return;				
				that.onLogin();
			});

			this.UserCredentials = {
				UserName: "",
				Password:"",
				grant_type : 'password'
				
			};			
		},	
			
		
		onLogin : function(oEvent){
			this.onFakeLogin(oEvent);
			return;
			
			
		},

		onFakeLogin : function(oEvent){
			let loginButton =this.byId("loginButton");
			if(loginButton.getBusy()) return;				
			
			loginButton.setBusy(true);
			this.UserCredentials.UserName = this.byId("userName").getValue();
			this.UserCredentials.Password = this.byId("userPass").getValue();
			this.UserCredentials.Company = "Norus"
			setTimeout(()=>{

				if(this.UserCredentials.UserName.split(" ").length < 2 )
				{
					MessageToast.show("Informe o nome e sobrenome");										
				} else if(this.UserCredentials.Password.toLowerCase() != "norus")
				{
					MessageToast.show("Senha incorreta");
					
				}else{				
					this.setUserSessionToken("thisIsAFakeToken");										
					this.setUserModel(this.UserCredentials);										
					this.setUserSession(this.UserCredentials);										
					this.setBusyLogin(false);					
					this.redirectIfLogged(); 				
					this.setBusyLogin(false);					
				}

				this.setBusyLogin(false);					
			},1300)
		},

        setUserSession: function (user) {										
			user.Token = this.getAccessToken();
            sessionStorage.setItem('currentUser', JSON.stringify(user));            
		},
		
		setBusyLogin(bBusy){
			this.byId("loginButton").setBusy(bBusy);
		},

		
		setUserSessionToken : function(userAcessToken){
			sessionStorage.setItem('currentUserToken', userAcessToken);
		},
		
		setUserModel : function(user){
			var userModel = new RestModel();
            userModel.setData(user);
            sap.ui.getCore().setModel(userModel, "currentUser");			
		},
					
		
	});

});