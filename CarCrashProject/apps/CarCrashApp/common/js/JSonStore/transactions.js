
var initPass =0;
function setDataToTransaction(){				 
	
	  WL.JSONStore.init(getCollections()).then(function () {   			
			   WL.JSONStore.get("profile").clear(); 
		})
		.then(function (errorObject) {	
							
			var jsonStore = new clsJsonStoreHelper();
			jsonStore.collectionName="profile";
			jsonStore.document=
				 [{mobileId: device.uuid.trim(),name: $("#txtProfileName").val().trim(), firstname: $("#txtFirstName").val().trim(), lastname: $("#txtLastName").val().trim(), cellPhone: $("#txtCellPhone").val().trim(),
		        	city: $("#searchCity").val().trim(), enterprise: $("#txtEmpresa").val().trim(), birthDate: '',email: '',pass: ''}];
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


function setMechanicDataTransaction(){
	
	 WL.JSONStore.init(getCollections()).then(function () {   			
		   WL.JSONStore.get("MechanicData").clear(); 
	})
	.then(function (errorObject) {	
						
		var jsonStore = new clsJsonStoreHelper();
		jsonStore.collectionName="MechanicData";
		jsonStore.document=
			 [{MechanicName: $("#txtMechanicName").val().trim(), MechanicFirstName: $("#txtMechanicFirstName").val().trim(), MechanicLastName: $("#txtMechanicLastName").val().trim(),
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

