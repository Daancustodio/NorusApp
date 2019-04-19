sap.ui.define([
    "sap/m/SearchField",
    "app/model/formatter"
], function (SearchField, formatter) {
	"use strict";
	return SearchField.extend("app.controls.CenterCostsSearch", {
		metadata : {
            properties : {
				dimension: 	{type : "int", defaultValue :-1}
			}
        },

		init : function () {
            
        },
        renderer : {}
	});
});