sap.ui.define([
    "app/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device",
    "sap/m/MessageToast",	
    "sap/m/MessageBox",
    "sap/ui/core/BusyIndicator",
    "app/model/formatter",
    "app/model/RestModel",
    'sap/ui/model/Filter',
    "sap/ui/model/resource/ResourceModel"	
], 

function (BaseController, JSONModel, Device, MessageToast, MessageBox, BusyIndicator, formatter, RestModel, Filter,ResourceModel) {
    "use strict";

    return BaseController.extend("app.controller.contratos.Edit", {

        onInit : function () {							
            
            this
            .getRouter()
            .getRoute('contrato')
            .attachPatternMatched(this._onRouteMatched, this);          
            this.load()
            
        }, 
        formatter : formatter,  
        emptyContract : {
            id:"",
            clientName : "",
            value : 0,
            quantity : 0,
            startMonth : "",
            months : 0
        },
        //contractURL: "http://localhost:5000/api/contract",       
        //rootApi: "http://localhost:5000/api/",        
        rootApi: "https://norusserver.azurewebsites.net/api/",       
        contractURL: "https://norusserver.azurewebsites.net/api/contract",       
        _onRouteMatched : function(oEvent){ 
            this.setModel(new RestModel(this.emptyContract
            ), "Contract") ;         
            this.setModel(new JSONModel([
                {Id: 0, Description: "Compra"},
                {Id: 1, Description: "Venda"}
            ]), "oContractTypes") ;  
        
            this.setModel(new JSONModel({FilterLabel: "Criar", pdfUrl : ""}), "oView");  
           
            
        },
        onSelectionChange(oEvent){
            this.enableExpordAndExclude();                  
            this.updatePdfLink();
        },

        exportHTML(oEvent){
            let button = oEvent.getSource();
            let id = "#" + this.getView().getId()+"--htmlRelatoio";
            let htmlDoc = document.querySelector(id);
            button.setBusy(true);
            html2canvas(htmlDoc, {
                width : 700
            }).then((canvas) => {
                button.setBusy(false);
                var img=canvas.toDataURL("image/png");
                var doc = new jsPDF({
                    unit: 'px',
                });
                doc.addImage(img,'JPEG',20,20);
                doc.save('RelatorioContratosNorus.pdf');
                }
            ).catch(err =>{
                button.setBusy(false)
            });
        },

        onExportHTML(){
            jQuery.ajax({
                url: this.pdfUrl,
                success : (data)=>{
                    let id = "#" + this.getView().getId()+"--htmlRelatoio";
                    let htmlDoc = document.querySelector(id);
                    htmlDoc.innerHTML = "";
                    htmlDoc.innerHTML = data;                    
                }

            })
            
        },
        enableExpordAndExclude(){
            let selectionCount =this.byId("idList").getSelectedContexts().length;
            let enable = (selectionCount > 0)
            this.byId("excluir").setEnabled(enable);
            this.byId("exportar").setEnabled(enable);
            this.byId("edit").setEnabled(selectionCount == 1)
        },
       
        
        load(){
            
            let model = new RestModel();
            let list = this.byId("idList");
            list.setBusy(true);            
            this.setModel(model,"Contracts")            
            model.get(this.contractURL, data =>{
                list.setBusy(false);            
                model.setData(data)
            },
            err =>{
                this.load();
            })
        },
        log(){
            console.log(this.getModel("Contracts").getData())
        },

        onEdit(oEvent){
            let selection =this.byId("idList").getSelectedContexts().map(x => x.getObject())[0];
            if(!selection)
                return;
            
            let model = this.getModel("Contract");
            model.setData(selection);
            this.byId("idIconTabBar").setSelectedKey("add")
            this.byId("cancelButton").setVisible(true);
            this.byId("saveButton").setVisible(true);
            this.getModel("oView").setProperty('/FilterLabel', "Criar");
            
            let icon = this.byId("tabFilterAdd").setIcon("sap-icon://request");
            this.updateButtons(true);
        },

        updateButtons(edit){
            let filter = this.byId("filterAdd");
            this.getModel("oView").setProperty('/FilterLabel', "Editar");
            console.log(filter)
        },
        onCancel(){
            let model = this.getModel("Contract");
            this.byId("cancelButton").setVisible(false);
            
            model.setData(this.emptyContract);
            this.getModel("oView").setProperty('/FilterLabel', "Criar");
            this.byId("cancelButton").setVisible(false);
            this.byId("tabFilterAdd").setIcon("sap-icon://add-document");

        },
        onCreate(){
            let model = this.getModel("Contract");
            let inputValue = this.byId("value").getValue();
            console.log(model.getData())
            model.setProperty("/value", parseFloat(inputValue))
            
            if(this.getModel("oView").getProperty("/FilterLabel") == "Editar")
                this.sendPut(model);
            else
                this.sendPost(model);
            
        },
        sendPost(model){
            model.post(this.contractURL, 
                data =>{
                    this.successPost(model, "Contrado adicionado com sucesso.");
                },
                err =>{
                    if(err.statusCode == 200) 
                    this.successPost(model);
                    else{
                        this.showExeption(err)
                    }
                })
        },
        sendPut(model){
            let url = this.contractURL + "/edit";
            model.post(url, 
                data =>{
                    this.successPost(model, "Contrado atualizado com sucesso.");
                },
                err =>{
                    if(err.statusCode == 200) 
                    this.successPost(model);
                    else{
                        this.showExeption(err)
                    }
                })
        },
        successPost(model, msg){
            MessageToast.show(msg);
            model.setData({});
            this.load();           
            this.byId("idIconTabBar").setSelectedKey("list")
            this.getModel("oView").setProperty('/FilterLabel', "Criar");
            this.byId("cancelButton").setVisible(false);
            this.byId("tabFilterAdd").setIcon("sap-icon://add-document");

            return;
        },

        onChangeTab(oEvent){                
            let key = oEvent.getParameters().key;                
            let isListTab = (key == "list");  
            this.byId("saveButton").setVisible(!isListTab);
            let mode =  this.getModel("oView").getProperty('/FilterLabel');
            var enableCancel = (!isListTab && mode == "Editar")
            this.byId("cancelButton").setVisible(enableCancel);
            
            if(key == "relatorio")
            this.onExportHTML();
            
            if(!isListTab) return;
            
            let buttonSelectAll = this.byId("buttonSelectAll");
            this.selectAll(false);
            buttonSelectAll.setSelected(false)
            
            this.byId("cancelButton").setVisible(false);
            
            this.load()
        
        },

        onValueChange(oEvent){
            let value = parseFloat(oEvent.getParameters().value).toFixed(2);
            console.log(value)
            oEvent.getSource().setValue(value)
        },

        onDelete(oEvent){
            let list = this.byId("idList");
            let selection = list.getSelectedContexts();
            let model = new RestModel();
            let url = this.contractURL + "/delete"
            let contractsToRemove = selection.map(x => x.getObject().id);
            if(contractsToRemove.length < 1){
                MessageToast.show("Selecione um ou mais contratos para remover");
                return;
            }
            model.setData(contractsToRemove);
            model.post(url,
                ()=>{
                    MessageToast.show("Contratos: [" + contractsToRemove.join(",") + "] Removido(s)");
                    this.load();
                },err =>{
                    this.showExeption(err)
                })
            

        },

        updatePdfLink(){            
            let list = this.byId("idList");
            let selection = list.getSelectedContexts();
            let data = selection.map(x=> x.getObject().id).join(";");
            let enableRelatorio = (selection.length > 0);
            let relatiorioTab=this.byId("tabFilterRelatorio");
            relatiorioTab.setEnabled(enableRelatorio)
            this.pdfUrl = this.rootApi + "html/" + data + "/"+ this.getUserSession().UserName;            
        },

        onSelectAll: function(oEvent) {            
            var bSelected = oEvent.getParameter('selected'); 
            this.selectAll(bSelected);            
        },
        
        selectAll(selected){
            var otab = this.byId("idList"); 
            otab.getItems().forEach(function(item) { 
                if(!item.getSelected())
                    item.setSelected(selected); 
            });
            
            this.enableExpordAndExclude();
            this.updatePdfLink();

        }
        
        
    });
});