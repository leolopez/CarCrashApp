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
			var v=	JSON.stringify(arrayResults).split("{");		 
		var t=v[2].split(":");    
		
		setData(t[0].replace('"','').replace('"',''),t[1].split(",")[0].replace('"','').replace('"',''),namep,firstnamep,lastnamep,cellPhonep,cityp,enterprisep);
		setData(t[1].split(",")[1].replace('"','').replace('"',''),t[2].split(",")[0].replace('"','').replace('"',''),namep,firstnamep,lastnamep,cellPhonep,cityp,enterprisep);
		setData(t[2].split(",")[1].replace('"','').replace('"',''),t[3].split(",")[0].replace('"','').replace('"',''),namep,firstnamep,lastnamep,cellPhonep,cityp,enterprisep);
		setData(t[3].split(",")[1].replace('"','').replace('"',''),t[4].split(",")[0].replace('"','').replace('"',''),namep,firstnamep,lastnamep,cellPhonep,cityp,enterprisep);
		setData(t[4].split(",")[1].replace('"','').replace('"',''),t[5].split(",")[0].replace('"','').replace('"',''),namep,firstnamep,lastnamep,cellPhonep,cityp,enterprisep);
		setData(t[5].split(",")[1].replace('"','').replace('"',''),t[6].split(",")[0].replace('"','').replace('"','').replace(']','').replace('}}',''),namep,firstnamep,lastnamep,cellPhonep,cityp,enterprisep);			  
		}
		});
	});	
	}

function setData(data,value,namep,firstnamep,lastnamep,cellPhonep,cityp,enterprisep){
	switch(data){
	case "name":		
		
		namep.val(value);
	break;
	case "firstname":		
		firstnamep.val(value);
		break;
	case "lastname":
		lastnamep.val(value);
		break;
	case "city":
		cityp.val(value);
		break;
	case "cellPhone":
		cellPhonep.val(value);
		break;
	case "enterprise":
		enterprisep.val(value);
		break;
	};	
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
			var v=	JSON.stringify(arrayResults).split("{");		 
		var t=v[2].split(":");    
		
		setMedicalData(t[0].replace('"','').replace('"',''),t[1].split(",")[0].replace('"','').replace('"',''),imssp, bloodTypep, alergicsp, clinicalConditionsp);
		setMedicalData(t[1].split(",")[1].replace('"','').replace('"',''),t[2].split(",")[0].replace('"','').replace('"',''),imssp, bloodTypep, alergicsp, clinicalConditionsp);
		setMedicalData(t[2].split(",")[1].replace('"','').replace('"',''),t[3].split(",")[0].replace('"','').replace('"',''),imssp, bloodTypep, alergicsp, clinicalConditionsp);
		setMedicalData(t[3].split(",")[1].replace('"','').replace('"',''),t[4].split(",")[0].replace('"','').replace('"','').replace(']','').replace('}}',''),imssp, bloodTypep, alergicsp, clinicalConditionsp);
		}
		});
	});	
	}

function setMedicalData(data,value,imssp, bloodTypep, alergicsp, clinicalConditionsp){
	switch(data){
	case "IMSS":			
		imssp.val(value);
	break;
	case "bloodType":		
		bloodTypep.val(value);
		break;
	case "alergics":
		alergicsp.val(value);
		break;
	case "clinicalConditions":
		clinicalConditionsp.val(value);
		break;
	};	
}

function initMechanicDataInfo(MechanicNameParam, MechanicFirstNameParam, MechanicLastNameParam, MechanicCellPhoneParam,MechanicAddressParam){
	
	var collectionName = 'MechanicData';    

    var collections = {
    		MechanicData : {
                searchFields: {MechanicName: 'string',  MechanicFirstName: 'string', MechanicLastName: 'string', MechanicCellPhone: 'string',
                	MechanicAddressParam: 'string'}
            } 
    };  
	    
	WL.JSONStore.init(collections).then(function () {
		
		var options = {
				  // Returns a maximum of 1 documents, default no limit.
				  limit: 1
				};
		WL.JSONStore.get(collectionName).findAll(options).then(function (arrayResults) {			
		if(arrayResults.length>0){
			var v=	JSON.stringify(arrayResults).split("{");		 
		var t=v[2].split(":");    
		
		setMechanicData(t[0].replace('"','').replace('"',''),t[1].split(",")[0].replace('"','').replace('"',''),MechanicNameParam, MechanicFirstNameParam, MechanicLastNameParam, MechanicCellPhoneParam,MechanicAddressParam);
		setMechanicData(t[1].split(",")[1].replace('"','').replace('"',''),t[2].split(",")[0].replace('"','').replace('"',''),MechanicNameParam, MechanicFirstNameParam, MechanicLastNameParam, MechanicCellPhoneParam,MechanicAddressParam);
		setMechanicData(t[2].split(",")[1].replace('"','').replace('"',''),t[3].split(",")[0].replace('"','').replace('"',''),MechanicNameParam, MechanicFirstNameParam, MechanicLastNameParam, MechanicCellPhoneParam,MechanicAddressParam);
		setMechanicData(t[3].split(",")[1].replace('"','').replace('"',''),t[4].split(",")[0].replace('"','').replace('"',''),MechanicNameParam, MechanicFirstNameParam, MechanicLastNameParam, MechanicCellPhoneParam,MechanicAddressParam);		
		setMechanicData(t[4].split(",")[1].replace('"','').replace('"',''),t[5].split(",")[0].replace('"','').replace('"','').replace(']','').replace('}}',''),MechanicNameParam, MechanicFirstNameParam, MechanicLastNameParam, MechanicCellPhoneParam,MechanicAddressParam);
		}
		});
	});	
	}

function setMechanicData(data,value,MechanicNameParam, MechanicFirstNameParam, MechanicLastNameParam, MechanicCellPhoneParam,MechanicAddressParam){
	switch(data){
	case "MechanicName":			
		MechanicNameParam.val(value);
	break;
	case "MechanicFirstName":		
		MechanicFirstNameParam.val(value);
		break;
	case "MechanicLastName":
		MechanicLastNameParam.val(value);
		break;
	case "MechanicCellPhone":
		MechanicCellPhoneParam.val(value);
		break;
		case "MechanicAddress":
			MechanicAddressParam.val(value);
			break;
	};	
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
