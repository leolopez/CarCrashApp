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
var initPass =0;
function setDataToTransaction(namep, firstnamep, lastnamep, cellPhonep,cityp,enterprisep){				 
	
	var collectionName = 'perfil';    

    	    var collections = {
    	            perfil : {
    	                searchFields: {mobileId: 'string',name: 'string', firstname: 'string', lastname: 'string', cellPhone: 'string',
    	                	city: 'string', enterprise: 'string'}
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
		var data = [{mobileId: device.uuid.trim(),name: namep.val().trim(), firstname: firstnamep.val().trim(), lastname: lastnamep.val().trim(), cellPhone: cellPhonep.val().trim(),
        	city: cityp.val().trim(), enterprise: enterprisep.val().trim()}];

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
		 WL.JSONStore.commitTransaction();
	})
	.fail(function (errorObject) {		
		// Handle failure for any of the previous JSONStore operation.
		//(startTransaction, add, remove).
			
		alert("Error: "+errorObject.msg);
		WL.JSONStore.rollbackTransaction()

		.fail(function (errorObjects) {
				
		});		
	
		
	});				

}


function setDataToPolicyTransaction(policyp, seriep, platesp, vehicleTypep,markp,submarkp,modelp,colorp,holderp,conductorp){
	
	var  collectionName = 'poliza'; 
	    
    	    var collections = {
    	            poliza : {
    	                searchFields: {mobileId: 'string',policy: 'string', serie: 'string', plates: 'string', vehicleType: 'string',
    	                	mark: 'string', submark: 'string',model: 'string',color: 'string',holder: 'string',
    	                	conductor: 'string'}
    	            } 
    	    };    
    	    
    	     WL.JSONStore.init(collections,encripData()).then(function () {
    			   WL.JSONStore.get(collectionName).clear(); 
    		}).fail(function (errorObject) {		   			   			
       				
       		});
	  
     WL.JSONStore.init(collections,encripData())	 	  
	.then(function () {
		return WL.JSONStore.startTransaction();
	})
	.then(function () {

		// Handle startTransaction success.
		// You can call every JSONStore API method except:
		// init, destroy, removeCollection, and closeAll.
		
		// Data to add, you probably want to get
		// this data from a network call (e.g. Adapter).
		var data = [{mobileId: device.uuid.trim(),policy: policyp.val().trim(), serie: seriep.val().trim(), plates: platesp.val().trim(),
			vehicleType: vehicleTypep.val().trim(),	mark: markp.val().trim(),	submark: submarkp.val().trim(),			
			model: modelp.val().trim(), color: colorp.val().trim(),
			holder: holderp.val().trim(),conductor: conductorp.val().trim()}];

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
     	WL.Logger.debug("Retrieve success" +  WL.JSONStore.get(collectionName));      
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
subMarkParam,modelParam,colorParam, carPictureParam,holderParam){
	var collectionName = 'PolicyVehicle';    

    	    var collections = {
    	    		PolicyVehicle : {
    	                searchFields: {mobileId: 'string',PolicyNo: 'string', PolicyDate: 'string', insurance: 'string', Plates: 'string', Serie: 'string'
    	                	, VehicleType: 'string', Mark: 'string', SubMark: 'string', Model: 'string', Color: 'string'
    	                		, carPicture: 'string', Holder: 'string'
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
        .equal('carPicture',colorParam.val().trim())
        .equal('Holder',holderParam.val().trim());
		
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
					SubMark: subMarkParam.val().trim(),Model: modelParam.val().trim(),Color: colorParam.val().trim(),carPicture: carPictureParam.val().trim(),
					Holder: holderParam.val().trim()
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
				 WL.JSONStore.commitTransaction();				
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

