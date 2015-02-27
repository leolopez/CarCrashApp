
var initPass =0;
function setDataToTransaction(){				 
							
			var jsonStore = new clsJsonStoreHelper();
			jsonStore.collectionName="perfil";
			jsonStore.document=
				 {firstName: $("#txtProfileName").val().trim(), lastName: $("#txtFirstName").val().trim(), secondLastName: $("#txtLastName").val().trim(), cellPhone: $("#txtCellPhone").val().trim(),
		        	city: $('input[sel="pCity"]').val().trim(), enterprise: $("#txtEmpresa").val().trim(),
		        	streetNumber:$('input[sel="pStreetNumber"]').val().trim(),street:$('input[sel="pStreet"]').val().trim(),State:$('input[sel="pState"]').val().trim(),
		        	postalCode:$('input[sel="pPostalCode"]').val().trim(),Country:$('input[sel="pCountry"]').val().trim()
				 };
			jsonStore.id=getProfileId();
			jsonStore.fnSuccess=function (succes) {			
				alert(Messages.msgDataSaved);
			};
			jsonStore.fnFail=function (errorObject) {			
				alert("Error: "+errorObject.msg);
			};
			jsonStore.save();			
			
}


function setMechanicDataTransaction(){
	
	 WL.JSONStore.init(getCollections()).then(function () {   			
		   WL.JSONStore.get("MechanicData").clear(); 
	})
	.then(function (errorObject) {	
						
		var jsonStore = new clsJsonStoreHelper();
		jsonStore.collectionName="MechanicData";
		jsonStore.document=
			 [{MechanicFirstName: $("#txtMechanicName").val().trim(), MechanicLastName: $("#txtMechanicFirstName").val().trim(), MechanicSecondLastName: $("#txtMechanicLastName").val().trim(),
				 MechanicCellPhone: $("#txtMechanicCellPhone").val().trim(),
					MechanicAddress: $("#txtMechanicAddress").val().trim()}];
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

function setMedicalDataTransaction(){
	
	 WL.JSONStore.init(getCollections()).then(function () {   			
		   WL.JSONStore.get("MedicalData").clear(); 
	})
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

function encripData(){	
	
	return options = { 
			   username: 'solutia', //default: 'jsonstore'
			   password: 'sol12', //default: no encryption
				   localKeyGen : false
			};
}

function cleaningData(){
	WL.JSONStore.closeAll()

	.then(function () {
	  // Handle success.
	})

	.fail(function (errorObject) {
	  // Handle failure.
	});
	
}

