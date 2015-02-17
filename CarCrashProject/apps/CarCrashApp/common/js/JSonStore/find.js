/*
 *
    COPYRIGHT LICENSE: This information contains sample code provided in source code form. You may copy, modify, and distribute
    these sample programs in any form without payment to IBM® for the purposes of developing, using, marketing or distributing
    application programs conforming to the application programming interface for the operating platform for which the sample code is written.
    Notwithstanding anything to the contrary, IBM PROVIDES THE SAMPLE SOURCE CODE ON AN "AS IS" BASIS AND IBM DISCLAIMS ALL WARRANTIES,
    EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, ANY IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, SATISFACTORY QUALITY,
    FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND ANY WARRANTY OR CONDITION OF NON-INFRINGEMENT. IBM SHALL NOT BE LIABLE FOR ANY DIRECT,
    INDIRECT, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR OPERATION OF THE SAMPLE SOURCE CODE.
    IBM HAS NO OBLIGATION TO PROVIDE MAINTENANCE, SUPPORT, UPDATES, ENHANCEMENTS OR MODIFICATIONS TO THE SAMPLE SOURCE CODE.

 */ 
function initPerfilDataInfo(namep, firstnamep, lastnamep, cellPhonep,cityp,enterprisep){
	
	
	
	 var collections = {
	            perfil : {
	                searchFields: {mobileId: 'string', name: 'string', firstname: 'string', lastname: 'string', cellPhone: 'string',
	                	city: 'string', enterprise: 'string'}
	            } 
	    };
	    
	WL.JSONStore.init(collections).then(function () {
		var collectionName = 'perfil';
		var options = {
				  // Returns a maximum of 1 documents, default no limit.
				  limit: 1
				};
		WL.JSONStore.get(collectionName).findAll(options).then(function (arrayResults) {			
		if(arrayResults.length>0){			
			namep.val(arrayResults[0].json.name);								
				firstnamep.val(arrayResults[0].json.firstname);				
				lastnamep.val(arrayResults[0].json.lastname);				
				cityp.val(arrayResults[0].json.city);				
				cellPhonep.val(arrayResults[0].json.cellPhone);				
				enterprisep.val(arrayResults[0].json.enterprise);			
		}
		});
	});	
	}



function initPolicyDataInfo(namep, firstnamep, lastnamep, cellPhonep,cityp,enterprisep){
	
	 var collections = {
	            poliza : {
	            	 searchFields: {mobileId: 'string',policy: 'string', serie: 'string', plates: 'string', vehicleType: 'string',
 	                	mark: 'string', submark: 'string',model: 'string',color: 'string',holder: 'string',
 	                	conductor: 'string'}
	            } 
	    };
	    
	WL.JSONStore.init(collections).then(function () {
		var collectionName = 'poliza';
		var options = {
				  // Returns a maximum of 1 documents, default no limit.
				  limit: 1
				};
		WL.JSONStore.get(collectionName).findAll(options).then(function (arrayResults) {
			
				
		}); 
		
	});
	
	}	

	
function initMedicalDataInfo(imssp, bloodTypep, alergicsp, clinicalConditionsp){
	
	var collectionName = 'MedicalData';    

    var collections = {
    		MedicalData : {
                searchFields: {mobileId: 'string',IMSS: 'string', bloodType: 'string', alergics: 'string', clinicalConditions: 'string'
                	}
            } 
    }; 
	    
	WL.JSONStore.init(collections).then(function () {
		
		var options = {
				  // Returns a maximum of 1 documents, default no limit.
				  limit: 1
				};
		WL.JSONStore.get(collectionName).findAll(options).then(function (arrayResults) {			
		if(arrayResults.length>0){
			imssp.val(arrayResults[0].json.IMSS);
			bloodTypep.val(arrayResults[0].json.bloodType);
			alergicsp.val(arrayResults[0].json.alergics);
			clinicalConditionsp.val(arrayResults[0].json.clinicalConditions);
		}
		});
	});	
	}



function initMechanicDataInfo(MechanicNameParam, MechanicFirstNameParam, MechanicLastNameParam, MechanicCellPhoneParam,MechanicAddressParam){
	
	var collectionName = 'MechanicData';    

    var collections = {
    		MechanicData : {
                searchFields: {mobileId: 'string',MechanicName: 'string',  MechanicFirstName: 'string', MechanicLastName: 'string', MechanicCellPhone: 'string',
                	MechanicAddress: 'string'}
            } 
    };  
	    
	WL.JSONStore.init(collections).then(function () {
		
		var options = {
				  // Returns a maximum of 1 documents, default no limit.
				  limit: 1
				};
		WL.JSONStore.get(collectionName).findAll(options).then(function (arrayResults) {			
		if(arrayResults.length>0){
			MechanicNameParam.val(arrayResults[0].json.MechanicName);
			MechanicFirstNameParam.val(arrayResults[0].json.MechanicFirstName);
			MechanicLastNameParam.val(arrayResults[0].json.MechanicLastName);
			MechanicCellPhoneParam.val(arrayResults[0].json.MechanicCellPhone);
			MechanicAddressParam.val(arrayResults[0].json.MechanicAddress);
			
		}
		});
	});	
	}




function initPolicyVehicleDataInfo(){
	
	  

	  var collections = {
	    		PolicyVehicle : {
	                searchFields: {mobileId: 'string',PolicyNo: 'string', PolicyDate: 'string', insurance: 'string', Plates: 'string', Serie: 'string'
	                	, VehicleType: 'string', Mark: 'string', SubMark: 'string', Model: 'string', Color: 'string'
	                		, carPicture: 'string', Holder: 'string'
	                	}
	            } 
	    };   
	    
	WL.JSONStore.init(collections).then(function () {						 
		finAllPolicies();	
	});	
	}

function finAllPolicies(){
	var collectionName = 'PolicyVehicle';  
	
	WL.JSONStore.get(collectionName).findAll().then(function (arrayResults) {			
		 WL.Logger.debug("Retrieve success" +  JSON.stringify(arrayResults));
		if(arrayResults.length>0){
			var index;
			$('#listPolicy').empty();
			for (index = 0; index < arrayResults.length; ++index) {				   
				
				initPolicyToList(arrayResults[index].json.Serie,arrayResults[index].json.insurance,
						arrayResults[index].json.PolicyDate, arrayResults[index]._id);
			}														
	} 
	});
}

var jsonstoreResultsWrapperObject;

function findPolicyVehicle(serieParam,insuranceParam,policyDateParam){
	var collectionName = 'PolicyVehicle';

	  var collections = {
	    		PolicyVehicle : {
	                searchFields: {mobileId: 'string',PolicyNo: 'string', PolicyDate: 'string', insurance: 'string', Plates: 'string', Serie: 'string'
	                	, VehicleType: 'string', Mark: 'string', SubMark: 'string', Model: 'string', Color: 'string'
	                		, carPicture: 'string', Holder: 'string'
	                	}
	            } 
	    }; 
	// Find all documents that match the queries.
	var queryPart1 = WL.JSONStore.QueryPart()
	                   .equal('Serie', serieParam.trim())
	                   .equal('PolicyDate',policyDateParam.trim())
	                   .equal('insurance',insuranceParam.trim() );

	var options = {
	  // Returns a maximum of 1 documents, default no limit.
	  limit: 1,

	  // Skip 0 documents, default no offset.
	  offset: 0
	  
	};
	
	
	 WL.JSONStore.init(collections).then(function () {
		
		
		WL.JSONStore.get(collectionName)

	// Alternatives:
	// - findById(1, options) which locates documents by their _id field
	// - findAll(options) which returns all documents
	// - find({'name': 'carlos', age: 10}, options) which finds all documents
	// that match the query.
	.advancedFind([queryPart1], options)

	.then(function (arrayResults) {
		
	  // arrayResults = [{_id: 1, json: {name: 'carlos', age: 99}}]
		//$('#lblPolicyDetalis').text(arrayResults[0].json.Serie);
		
	
	})

	.fail(function (errorObject) {
	  // Handle failure.
	});
	
	
	
	});
	
}

function jsonstoreResultsWrapper(result){
	
	jsonstoreResultsWrapperObject=result;
}


function findByIdPolicyVehicle(id){
	var collectionName = 'PolicyVehicle';

	  var collections = {
	    		PolicyVehicle : {
	                searchFields: {mobileId: 'string',PolicyNo: 'string', PolicyDate: 'string', insurance: 'string', Plates: 'string', Serie: 'string'
	                	, VehicleType: 'string', Mark: 'string', SubMark: 'string', Model: 'string', Color: 'string'
	                		, carPicture: 'string', Holder: 'string'
	                	}
	            } 
	    }; 
	

	var options = {
	  // Returns a maximum of 1 documents, default no limit.
	  limit: 1,

	  // Skip 0 documents, default no offset.
	  offset: 0
	  
	};
	
	
	 WL.JSONStore.init(collections).then(function () {
		
		
		WL.JSONStore.get(collectionName)

	// Alternatives:
	// - findById(1, options) which locates documents by their _id field
	// - findAll(options) which returns all documents
	// - find({'name': 'carlos', age: 10}, options) which finds all documents
	// that match the query.
	.findById(parseInt(id), options)

	.then(function (arrayResults) {		
		jsonstoreResultsWrapperObject=null;
		jsonstoreResultsWrapper(arrayResults);	  	
	})

	.fail(function (errorObject) {
	  // Handle failure.
	});		
	
	});
	
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