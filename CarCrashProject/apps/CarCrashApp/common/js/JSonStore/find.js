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
	                searchFields: {name: 'string', firstname: 'string', lastname: 'string', cellPhone: 'string',
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
	            	 searchFields: {policy: 'string', serie: 'string', plates: 'string', vehicleType: 'string',
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
                searchFields: {IMSS: 'string', bloodType: 'string', alergics: 'string', clinicalConditions: 'string'
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
                searchFields: {MechanicName: 'string',  MechanicFirstName: 'string', MechanicLastName: 'string', MechanicCellPhone: 'string',
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
	
	var collectionName = 'PolicyVehicle';    

	  var collections = {
	    		PolicyVehicle : {
	                searchFields: {PolicyNo: 'string', PolicyDate: 'string', insurance: 'string', Plates: 'string', Serie: 'string'
	                	, VehicleType: 'string', Mark: 'string', SubMark: 'string', Model: 'string', Color: 'string'
	                		, carPicture: 'string', Holder: 'string'
	                	}
	            } 
	    };   
	    
	WL.JSONStore.init(collections).then(function () {		
		
		WL.JSONStore.get(collectionName).findAll().then(function (arrayResults) {			
			 WL.Logger.debug("Retrieve success" +  JSON.stringify(arrayResults));
			if(arrayResults.length>0){
				var index;
				
				for (index = 0; index < arrayResults.length; ++index) {				   
					
					initPolicyToList(arrayResults[index].json.Serie,arrayResults[index].json.insurance,
							arrayResults[index].json.PolicyDate);
				}														
		} 
		});
	});	
	}
