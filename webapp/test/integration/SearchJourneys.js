sap.ui.require([
	"sap/ui/test/opaQunit"
], function () {
	"use strict";
 
	QUnit.module("Segurança ");
 
	opaTest("Efetuar Login", function (Given, When, Then) {
 
		// Arrangements
		Given.iStartMyApp();
		When.onLoginViewTest.iEnterTextInput_userName("manager");
		When.onLoginViewTest.iEnterTextInput_userPass("sap@123");
		When.onLoginViewTest.iPressButton_loginButton();
		Then.onLoginViewTest.isOnDashBoard("manager");
	});
	opaTest("Efetuar LogOut", function (Given, When, Then) { 
		When.onLoginViewTest.iPressButton_UserLoggedPopOverButton();
		When.onLoginViewTest.iPressButton_loginOutButton();
		Then.onLoginViewTest.isOnLoginPage();	
		
	});
});