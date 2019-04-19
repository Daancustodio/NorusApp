/*global QUnit*/

sap.ui.require(
	[
		"app/model/formatter"
	],
	function (formatter) {
		"use strict";

		QUnit.module("Format Number to Icon Tab Colors");

		function formaterIconColor(assert, iValue, fExpectedNumber) {
			// Act
			var sIconColor = formatter.formatIconColor(iValue);

			// Assert
			assert.strictEqual(sIconColor, fExpectedNumber, "a cor está correta");
		}

		QUnit.test("Positivo para valor inferior a 50", function (assert) {
			formaterIconColor.call(this, assert, 49, "Positive");			
		});

		QUnit.test("Neutro para valor superior 49 e inferior a 100", function (assert) {
			formaterIconColor.call(this, assert, 50, "Neutral");
			formaterIconColor.call(this, assert, 99, "Neutral");
		});

		QUnit.test("Critico para valor superior a 100 e inferior a 151", function (assert) {
			formaterIconColor.call(this, assert, 101, "Critical");
			formaterIconColor.call(this, assert, 150, "Critical");
		});
		QUnit.test("Negativo para valor superior a 150", function (assert) {
			formaterIconColor.call(this, assert, 151, "Negative");
			formaterIconColor.call(this, assert, 300, "Negative");
		});
		

		
	}
);
