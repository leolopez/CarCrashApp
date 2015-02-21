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


function removetPolicyVehicleDataInfo(platesParam,insuranceParam,policyDateParam){
	
	var collectionName = 'PolicyVehicle';    

	  var collections = {
	    		PolicyVehicle : {
	                searchFields: {mobileId: 'string',PolicyNo: 'string', PolicyDate: 'string', insurance: 'string', Plates: 'string', Serie: 'string'
	                	, VehicleType: 'string', Mark: 'string', SubMark: 'string', Model: 'string', Color: 'string'
	                		, carPicture: 'string', Holder: 'string',  OwnerCellPhone: 'string'
	                	}
	            } 
	    };   
	    
	  	WL.JSONStore.init(collections).then(function () {		
		
		// Remove all documents that match the queries.
		var queries = [{ insurance:insuranceParam.trim(), PolicyDate:policyDateParam.trim(),Plates:platesParam.trim()}];

		var options = {

				// Exact match (true) or fuzzy search (false), default fuzzy search.
				exact: true,

				// Mark data as dirty (true = yes, false = no), default true.
				markDirty: true
		};

		return WL.JSONStore.get(collectionName).remove(queries, options);
		
	}).fail(function (errorObject) {
		// Handle failure.

		alert("No se ha podido eliminar el registro seleccionado");
	});

	}
