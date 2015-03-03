		$(document).on('pagebeforeshow','#DatosMedicos',function(e,data){   		    		
		
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
					 [{IMSS: $("#txtNoIMSS").val().trim(), bloodType: $("#txtBloodType").val().trim(), 
						 alergics: $("#txtAlergics").val().trim(), clinicalConditions: $("#txtClinicalConditions").val().trim()
			        	}];
				jsonStore.id=0;
				jsonStore.fnSuccess=function (succes) {			
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