/*global QUnit*/

jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;


sap.ui.require([
	"sap/ui/test/Opa5",
	"appUnderTest/test/integration/pages/Common",	
	"appUnderTest/test/integration/pages/Login"	
], function (Opa5,Common,Login) {	
	"use strict";		
	Opa5.extendConfig({			
		arrangements: new Common(),
		viewNamespace: "app.view.",		
	});

	sap.ui.require([
		'appUnderTest/test/integration/SearchJourneys'
	], function () {
		QUnit.start();
	});
});
