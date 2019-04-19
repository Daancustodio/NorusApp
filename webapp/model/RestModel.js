jQuery.sap.require("sap.ui.model.json.JSONModel");

sap.ui.model.json.JSONModel.extend("app.model.RestModel", {	
		
	request: function(sRequestType, sURL, fnSuccess, fnError, oBody, sContentType, dataType){	
		
		let that = this;
		jQuery.ajax({
            type : sRequestType || "GET",
            contentType : sContentType ||  "application/json",        
            contentLanguage: "pt-BR",
            acceptLanguage: 'pt-BR',
            url : sURL,
            dataType : dataType || "json",            
            data:oBody,
            
            crossDomain: true,
            success : (oData) => {
            	if(oData && oData.value)
            		that.setData(oData.value);
            	if(fnSuccess) fnSuccess(oData);
            },            
            error: fnError

        });
	},
	
	getOrigData: function(){
		return this.oDataOrig; 
	},
	
	discardChanges: function(){
		this.setData(this.oDataOrig); 
	},
	
	commitChanges: function(){
		this.oDataOrig = this.getData();
    },
    
    post:function(url, fnSuccess, fnError){
		let data = JSON.stringify(this.getData());       	
       	this.request("POST", url, fnSuccess , fnError, data);
    },
    
    put:function(url, fnSuccess, fnError){
    	let data = JSON.stringify(this.getData());       	
       	this.request("PUT", url, fnSuccess , fnError, data);    
	},
	patch:function(url, fnSuccess, fnError){
	    	let data = JSON.stringify(this.getData());       	
	       	this.request("PATCH", url, fnSuccess , fnError, data);    
	},
    get:function(url, fnSuccess, fnError, dataType="json"){
        this.request("GET",url, fnSuccess , fnError, null, null, dataType);        
	},  
	
    delete:function(url, fnSuccess, fnerror, dataType="json"){
		this.request("DELETE",url, fnSuccess , fnerror, null, null, dataType);
	},
	
});