function MedicalData(){
	this.IMSS="";
	this.bloodType="";
	this.alergics="";
	this.clinicalConditions="";
}		

$(document).on('pagebeforeshow','#DatosMedicos',function(e,data){   		    		
	basicPersonFiltersNumber("txtNoIMSS");
			initMedicalDataInfo(); 	 				  
		});			
		
		function saveUserMedicalData(){			
			setMedicalDataTransaction();				
		}
		
		function setMedicalDataTransaction(){						  			
				   WL.JSONStore.get("MedicalData").clear() 
			
			.then(function (errorObject) {	
								
				var jsonStore = new clsJsonStoreHelper();
				jsonStore.collectionName="MedicalData";
				jsonStore.document=
					 {IMSS: $("#txtNoIMSS").val().trim(), bloodType: $("#txtBloodType").val().trim(), 
						 alergics: $("#txtAlergics").val().trim(), clinicalConditions: $("#txtClinicalConditions").val().trim()
			        	};
				jsonStore.id=0;
				jsonStore.fnSuccess=function (succes) {
					
					var jsonStore = new clsJsonStoreHelper();
					jsonStore.collectionName="MedicalData";
					jsonStore.document=
							{
							};
					jsonStore.id=0;
					jsonStore.fnSuccess=function (arrayResults) {
						 WL.Logger.debug(">> medical data local: " + JSON.stringify(arrayResults));
						if(arrayResults.length>0){	
							saveMedicalData(arrayResults[0].json);
						}
					};
					jsonStore.fnFail=function (fail) {			
						
					};
					jsonStore.get();
					
					alert(Messages.msgDataSaved);
				};
				jsonStore.fnFail=function (errorObject) {			
					alert("Error: "+errorObject.msg);
				};
				jsonStore.save();			
			})
			.fail(function (errorObject) {		   			   			
				
				
			});	
				
		}
		
		function initMedicalDataInfo(){
			var jsonStore = new clsJsonStoreHelper();
			jsonStore.collectionName="MedicalData";
			jsonStore.document=
					{
					};
			jsonStore.id=0;
			jsonStore.fnSuccess=function (arrayResults) {			
				if(arrayResults.length>0){	
					$("#txtNoIMSS").val(arrayResults[0].json.IMSS);
					$("#txtBloodType").val(arrayResults[0].json.bloodType);
					$("#txtAlergics").val(arrayResults[0].json.alergics);
					$("#txtClinicalConditions").val(arrayResults[0].json.clinicalConditions);	
				}
			};
			jsonStore.fnFail=function (fail) {			
				
			};
			jsonStore.get();	
			}
		
		function saveMedicalData(pMedicalData)
		{	WL.Logger.debug(">> medical data send server: " + JSON.stringify(pMedicalData));
			var restHelper = new clsRestHelper('medicalData','saveProcedure',pMedicalData, saveMedicalDataSuccess, saveMedicalDataFailure);
			restHelper.callRestAdapter();
		}
		function saveMedicalDataSuccess(result){
			var oResult = result.invocationResult;
			 WL.Logger.debug(">> medical data: " + JSON.stringify(result));
			if(oResult.isSuccessful)
			{							
				
			}
			else{
				alert('Ocurrio un error, por favor intente de nuevo.');
			}
		}
		function saveMedicalDataFailure(error){
			 WL.Logger.debug(">> medical data fail: " + error);
			alert('Error al enviar al servidor, asegurese de contar con conexion a internet.');
		}