
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


function setMechanicDataTransaction(MechanicNameParam, MechanicFirstNameParam, MechanicLastNameParam, MechanicCellPhoneParam,MechanicAddressParam){
	
	var collectionName = 'MechanicData';    

    	    var collections = {
    	    		MechanicData : {
    	                searchFields: {mobileId: 'string', MechanicName: 'string',  MechanicFirstName: 'string', MechanicLastName: 'string', MechanicCellPhone: 'string',
    	                	MechanicAddress: 'string'}
    	            } 
    	    };   
    	    
    	    WL.JSONStore.init(collections).then(function () {   			
   			   WL.JSONStore.get(collectionName).clear(); 
   		}).fail(function (errorObject) {		   			   			
   			
   		});
	  
     WL.JSONStore.init(collections)	 	  
	.then(function () {

		return WL.JSONStore.startTransaction();
	})

	.then(function () {

		// Handle startTransaction success.
		// You can call every JSONStore API method except:
		// init, destroy, removeCollection, and closeAll.
		
		// Data to add, you probably want to get
		// this data from a network call (e.g. Adapter).
		var data = [{mobileId: device.uuid.trim(),MechanicName: MechanicNameParam.val().trim(), MechanicFirstName: MechanicFirstNameParam.val().trim(), MechanicLastName: MechanicLastNameParam.val().trim(), MechanicCellPhone: MechanicCellPhoneParam.val().trim(),
			MechanicAddress: MechanicAddressParam.val().trim()}];

		// Optional options for add.
		var addOptions = {

				// Mark data as dirty (true = yes, false = no), default true.
				markDirty: true
		};

		// Get an accessor to the people collection and add data.
		return WL.JSONStore.get(collectionName).add(data,addOptions);
	})
	.then(function () {
		alert(Messages.msgDataSaved);
		return WL.JSONStore.commitTransaction();
	})
	.then(function () {
     	
       
     })
	.fail(function (errorObject) {		
		// Handle failure for any of the previous JSONStore operation.
		//(startTransaction, add, remove).
		alert("Error: "+errorObject.msg);
		WL.JSONStore.rollbackTransaction()

		.always(function () {
			
		});
				
	});


}

function setMedicalDataTransaction(imssp, bloodTypep, alergicsp, clinicalConditionsp){
	
	var collectionName = 'MedicalData';    

    	    var collections = {
    	    		MedicalData : {
    	                searchFields: {mobileId: 'string',IMSS: 'string', bloodType: 'string', alergics: 'string', clinicalConditions: 'string'
    	                	}
    	            } 
    	    };   
    	    
    	    WL.JSONStore.init(collections).then(function () {   			
   			   WL.JSONStore.get(collectionName).clear(); 
   		}).fail(function (errorObject) {		   			   			
   			
   		});
	  
     WL.JSONStore.init(collections)	 	  
	.then(function () {

		return WL.JSONStore.startTransaction();
	})

	.then(function () {

		// Handle startTransaction success.
		// You can call every JSONStore API method except:
		// init, destroy, removeCollection, and closeAll.
		
		// Data to add, you probably want to get
		// this data from a network call (e.g. Adapter).
		var data = [{mobileId: device.uuid.trim(),IMSS: imssp.val().trim(), bloodType: bloodTypep.val().trim(), alergics: alergicsp.val().trim(), clinicalConditions: clinicalConditionsp.val().trim()
        	}];

		// Optional options for add.
		var addOptions = {

				// Mark data as dirty (true = yes, false = no), default true.
				markDirty: true
		};

		// Get an accessor to the people collection and add data.
		return WL.JSONStore.get(collectionName).add(data,addOptions);
	})
	.then(function () {
		alert(Messages.msgDataSaved);
		return WL.JSONStore.commitTransaction();
	})
	.fail(function (errorObject) {		
		// Handle failure for any of the previous JSONStore operation.
		//(startTransaction, add, remove).
		alert("Error: "+errorObject.msg);
		WL.JSONStore.rollbackTransaction()

		.always(function () {
			
		});
			
	});


}

function setPolicyVehicleDataTransaction(policyNoParam,
		policyDateParam, insuranceParam, platesParam,serieParam,vehicleTypeParam,markParam,
subMarkParam,modelParam,colorParam, carPictureParam,holderParam,OwnerCellPhonePrm,policyContactName,policyContactFirstName,policyContactLastName,
policyContactCellPhone){ 
	var collectionName = 'PolicyVehicle';    
	jsonstoreResultsWrapper("false");
    	    var collections = {
    	    		PolicyVehicle : {
    	                searchFields: {mobileId: 'string',PolicyNo: 'string', PolicyDate: 'string', insurance: 'string', Plates: 'string', Serie: 'string'
    	                	, VehicleType: 'string', Mark: 'string', SubMark: 'string', Model: 'string', Color: 'string'
    	                		, carPicture: 'string', Holder: 'string', OwnerCellPhone: 'string',PolicyContactName:'string',
    	    					PolicyContactFirstName:'string', PolicyContactLastName:'string',
    	    					PolicyContactCellPhon:'string'
    	                	}
    	            } 
    	    };       	        	 	   
    	    
     WL.JSONStore.init(collections)	 	  
	.then(function () {
		
		var queryPart1 = WL.JSONStore.QueryPart()
		.equal('PolicyNo', policyNoParam.val().trim())
        .equal('PolicyDate',policyDateParam.val().trim())
        .equal('insurance', insuranceParam.text().trim())
        .equal('Plates',platesParam.val().trim())
        .equal('Serie', serieParam.val().trim())
        .equal('VehicleType',vehicleTypeParam.val().trim())
        .equal('Mark', markParam.val().trim())
        .equal('SubMark', subMarkParam.val().trim())
        .equal('Model',modelParam.val().trim())
        .equal('Color', colorParam.val().trim())
        .equal('carPicture',carPictureParam.trim())
        .equal('Holder',holderParam.val().trim())
		.equal('OwnerCellPhone',OwnerCellPhonePrm.val().trim())
		.equal('PolicyContactName', policyContactName.val().trim())
        .equal('PolicyContactFirstName',policyContactFirstName.val().trim())
        .equal('PolicyContactLastName',policyContactLastName.val().trim())
		.equal('PolicyContactCellPhon',policyContactCellPhone.val().trim());
		
		isJSONStoreDocRegistered(collectionName,collections,queryPart1);
		
		setTimeout( function (){
		var exists=getJsonstoreResultsWrapperObject();
		
		if(exists==undefined||exists.length==0){ 

		 WL.JSONStore.startTransaction().then(function () {

				// Handle startTransaction success.
				// You can call every JSONStore API method except:
				// init, destroy, removeCollection, and closeAll.
				
				// Data to add, you probably want to get
				// this data from a network call (e.g. Adapter).
				var data = [{mobileId: device.uuid.trim(),PolicyNo: policyNoParam.val().trim(), PolicyDate: policyDateParam.val().trim(), insurance: insuranceParam.text().trim(),
					Plates: platesParam.val().trim(),Serie: serieParam.val().trim(),VehicleType: vehicleTypeParam.val().trim(),Mark: markParam.val().trim(),
					SubMark: subMarkParam.val().trim(),Model: modelParam.val().trim(),Color: colorParam.val().trim(),carPicture: carPictureParam.trim(),
					Holder: holderParam.val().trim(), OwnerCellPhone: OwnerCellPhonePrm.val().trim(),
					PolicyContactName:policyContactName.val().trim(),
					PolicyContactFirstName:policyContactFirstName.val().trim(), PolicyContactLastName:policyContactLastName.val().trim(),
					PolicyContactCellPhon:policyContactCellPhone.val().trim()
		        	}];

				// Optional options for add.
				var addOptions = {

						// Mark data as dirty (true = yes, false = no), default true.
						markDirty: true
				};

				// Get an accessor to the people collection and add data.
				return WL.JSONStore.get(collectionName).add(data,addOptions);
			})
			.then(function () {		
				//addPolicyToList(serieParam.val().trim(),insuranceParam.text().trim(),policyDateParam.val().trim());															
				finAllPolicies();	
				alert(Messages.msgDataSaved);
				jsonstoreResultsWrapper("true");
				return WL.JSONStore.commitTransaction();				 
			})
			.fail(function (errorObject) {		
				// Handle failure for any of the previous JSONStore operation.
				//(startTransaction, add, remove).
				
				alert("Error: "+errorObject.msg);
				WL.JSONStore.rollbackTransaction()

				.always(function () {
					
				});
				
			});
		
		
			}else{								
				alert(Messages.dataExist);			
			}
		}
		 , 300);
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

