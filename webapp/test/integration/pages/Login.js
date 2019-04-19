sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/test/actions/Press",
	"sap/ui/test/actions/EnterText",
	"sap/ui/test/matchers/Properties"
], function(Opa5, Press, EnterText, Properties) {
	"use strict";

	Opa5.createPageObjects({
		onLoginViewTest: {
			actions: {
				iEnterTextInput_userName: function(sUserLogin) {
					return this.waitFor({
						id: "userName",						
						viewName: "security.Login",
						actions: new EnterText({
							text: sUserLogin
						}),
						errorMessage: "Was not able to find the control with the id userName"
					});
				},
				iEnterTextInput_userPass: function(sUserPass) {
					return this.waitFor({
						id: "userPass",
						viewName: "security.Login",
						actions: new EnterText({
							text: sUserPass
						}),
						errorMessage: "Was not able to find the control with the id userPass"
					});
				},
				iPressButton_loginButton: function() {
					return this.waitFor({
						id: "loginButton",
						viewName: "security.Login",
						actions: new Press(),
						errorMessage: "Was not able to find the control with the id loginButton"
					});
				},
				iPressButton_UserLoggedPopOverButton: function() {
					return this.waitFor({
						id: "userLoggedPopOver",
						viewName: "App",
						actions: new Press(),
						errorMessage: "Was not able to find the control with the id loginButton"
					});
				},
				iPressButton_loginOutButton: function() {
					return this.waitFor({
						id: "userLogOutButton",						
						actions: new Press(),
						errorMessage: "Was not able to find the control with the id loginButton"
					});
				}
			},
			assertions: {
				isOnDashBoard: function (sUserLogin) {
					return this.waitFor({
						timeout: 10,
						id: "idApprovalsRequestPurchaseHeader",
						viewName: "Master",
						matchers: new Properties({
							objectTitle: sUserLogin
						}),
						success: function (oPage) {
							Opa5.assert.ok(true, "Login efetuado com sucesso. Usuário:"+ sUserLogin);
						},
						errorMessage: "Error "
					});
				},			
				isOnLoginPage: function () {
					return this.waitFor({						
						id: "loginButton",
						viewName: "security.Login",
						matchers: new Properties({
							type: "Accept"
						}),
						success: function (oPage) {							
							Opa5.assert.ok(true, "Retorno a tela de login efetuado com sucesso:");
						},
						errorMessage: "Error "
					});
				}		
			}
		}
	});
});