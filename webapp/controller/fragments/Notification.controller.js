sap.ui.define(
	[
		"app/controller/BaseController",		        	
        "sap/m/MessageToast",	
        'app/model/RestModel',	
        'app/model/formatter'	
	],
	function (BaseController,MessageToast, RestModel, formatter) {
	"use strict";

	return BaseController.extend("app.controller.fragment.Notification", {
		
			
		fmt : formatter,		
        onChangeRead : function(oEvent){
			let path = oEvent.getSource().getParent().getParent().getBindingContextPath();
			let ModelRef = this.getModel();
			let index = this.getIndexOfPath(path);
			let item = this.getModel().getData()[index];			
			let serverURL = this.getServeUrl("alertMessages");
			let button = oEvent.getSource();
			button.setBusy(true);
			let modelUpdate = new RestModel();
			modelUpdate.setData(item);
			modelUpdate.put(
				serverURL,
				(data)=>{
					console.log(data);
					ModelRef.getData().splice(index,1, data);
					ModelRef.refresh(true);
					button.setBusy(false);
					this.UpdateNotificationButtonStyle(button, data);
				},
				(err)=> {console.log(err);
					MessageToast.show(err.responseText);					
					button.setBusy(false);
				}
			);
		},	

		UpdateNotificationButtonStyle(button, data){
			if(data.length){
				button.setType(sap.m.ButtonType.Emphatized);
			}else{
				button.setType(sap.m.ButtonType.Transparent);
			}
		}
		
	});
});