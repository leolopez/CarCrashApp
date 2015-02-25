
function initPerfilDataInfo(){	
	var jsonStore = new clsJsonStoreHelper();
	jsonStore.collectionName="profile";
	jsonStore.document=
			{
			};
	jsonStore.id=0;
	jsonStore.fnSuccess=function (arrayResults) {			
		if(arrayResults.length>0){	
			$("#txtProfileName").val(arrayResults[0].json.name);
			$("#txtFirstName").val(arrayResults[0].json.firstname);	
			$("#txtLastName").val(arrayResults[0].json.lastname);
			$("#txtCellPhone").val(arrayResults[0].json.cellPhone);	
			$("#searchCity").val(arrayResults[0].json.city);
			$("#txtEmpresa").val(arrayResults[0].json.enterprise);	
		}
	};
	jsonStore.fnFail=function (fail) {			
		
	};
	jsonStore.get();	
	
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



function initMechanicDataInfo(){
	
	var jsonStore = new clsJsonStoreHelper();
	jsonStore.collectionName="MechanicData";
	jsonStore.document=
			{
			};
	jsonStore.id=0;
	jsonStore.fnSuccess=function (arrayResults) {			
		if(arrayResults.length>0){	
			$("#txtMechanicName").val(arrayResults[0].json.MechanicName);
			$("#txtMechanicFirstName").val(arrayResults[0].json.MechanicFirstName);
			$("#txtMechanicLastName").val(arrayResults[0].json.MechanicLastName);
			$("#txtMechanicCellPhone").val(arrayResults[0].json.MechanicCellPhone);
			$("#txtMechanicAddress").val(arrayResults[0].json.MechanicAddress);
		}
	};
	jsonStore.fnFail=function (fail) {			
		
	};
	jsonStore.get();		
	}




function initPolicyVehicleDataInfo(){  
	var jsonStore = new clsJsonStoreHelper();
	jsonStore.collectionName="PolicyVehicle";
	jsonStore.document=
			{
			};
	jsonStore.id=0;
	jsonStore.fnSuccess=function initSuccess(arrayResults){
		
		if(arrayResults.length>0){
			var index;
			$('#listPolicy').empty();
			for (index = 0; index < arrayResults.length; ++index) {				   
				
				initPolicyToList(arrayResults[index].json.Plates,arrayResults[index].json.insurance,
						arrayResults[index].json.PolicyDate, arrayResults[index]._id, arrayResults[index].json.carPicture);
			}														
	} 
	};
	jsonStore.fnFail=function initFail(result){
		
	};
	jsonStore.get();
	}


var jsonstoreResultsWrapperObject;


function jsonstoreResultsWrapper(result){
	
	jsonstoreResultsWrapperObject=result;
}

function getJsonstoreResultsWrapperObject(){
	
	return jsonstoreResultsWrapperObject;
}

function updateJsonCollection(collectionName, docs){
	

	// Documents will be located with their '_id' field 
	// and replaced with the data in the 'json' field.
	

	var options = {

	  // Mark data as dirty (true = yes, false = no), default true.
	  markDirty: true
	};

	WL.JSONStore.get(collectionName)

	.replace(docs, options)

	.then(function (numberOfDocumentsReplaced) {
	  // Handle success.
		alert(Messages.dataUpdate);
	})

	.fail(function (errorObject) {
	  // Handle failure.
	});
	
}

function isJSONStoreDocRegistered(collectionName,collections,queryPart1){
	//use this function inside   WL.JSONStore.init(collections);	 
	
	
	var options = {
			  // Returns a maximum of 1 documents, default no limit.
			  limit: 1,

			  // Skip 0 documents, default no offset.
			  offset: 0
			  
			};													
				
				WL.JSONStore.get(collectionName)
			// Alternatives:
			// - findById(1, options) which locates documents by their _id field
			// - findAll(options) which returns all documents
			// - find({'name': 'carlos', age: 10}, options) which finds all documents
			// that match the query.
			.advancedFind([queryPart1], options)

			.then(function (arrayResults) {							  				
				jsonstoreResultsWrapperObject=null;
				jsonstoreResultsWrapper(arrayResults);	
			})

			.fail(function (errorObject) {
			  // Handle failure.
			});
					
			
}

