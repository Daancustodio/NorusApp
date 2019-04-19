sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel'
], function(jQuery, Controller, JSONModel) {
	"use strict";


	return Controller.extend("app.controller.fragments.Exeption", {
		connectionError : function(){
			return [{
				ExceptionType: 'Error',
				Message: 'Erro ao acessar o servidor' ,
				Description: 'Tente novamente mais tarde',
				Subtitle: 'Tente novamente mais tarde'				
			}];
		},

		generalException : function(msg,sub){
			console.log(msg)
			return [{
				ExceptionType: 'Error',
				Message: msg,
			}];
		},
		show: function (exeption, sContentDensityClass) {
			
			console.log(exeption);
			exeption = exeption.responseJSON;
			var that = this;			
			var oModel = new JSONModel();

			var oMessageTemplate = new sap.m.MessageItem({
				type: '{ExceptionType}',
				title: '{Message}',
				description: '{Description}',
				subtitle: '{Subtitle}',
				counter: '{Counter}',
				markupDescription: "{markupDescription}",
				
			});

			
				var msg;
				var sub; 

				msg = exeption.Message;	
				sub = exeption.StackTraceString;	
				
				let messageBulding = this.generalException(msg,sub);
				
				oModel.setData(messageBulding);
			

			let oMessageView = new sap.m.MessageView({
					showDetailsPageHeader: false,
					itemSelect: function () {
						oBackButton.setVisible(true);
					},
					items: {
						path: "/",
						template: oMessageTemplate
					}
				});
			let oBackButton = new sap.m.Button({
					icon: sap.ui.core.IconPool.getIconURI("nav-back"),
					visible: false,
					press: function () {
						oMessageView.navigateBack();
						this.setVisible(false);
					}
				});

            oMessageView.setModel(oModel);
            
            
			let oCloseButton =  new sap.m.Button({
				icon: sap.ui.core.IconPool.getIconURI("decline"),
				tooltip : "Fechar",
                press: function () {
						that._oPopover.close();
					}
				});
				
				
				
			let oPopoverBar = new sap.m.Bar({
					contentLeft: [oBackButton],
					contentMiddle: [						
						new sap.m.Text({
							text: "Messages"
						})
					]
			});

			this._oPopover = new sap.m.Dialog({
				customHeader: oPopoverBar,
				contentWidth: "440px",
				contentHeight: "440px",
				stretchOnPhone:true,
				verticalScrolling: false,
				modal: true,
				content: [oMessageView],
				beginButton: oCloseButton
            });
            
			this._oPopover.addStyleClass(sContentDensityClass);
			this._oPopover.open();            
		},
	});



});
