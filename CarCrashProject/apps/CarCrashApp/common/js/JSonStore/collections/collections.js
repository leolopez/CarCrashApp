;(function () {

	WL.JSONStore.init({
		perfil : {
			searchFields: {email:"string", password:"string"}
		},
		Contacts:{
			searchFields:{UserContactName:'string',		
				UserContactFirstName:'string',UserContactLastName:'string',
				UserContactCellPhon:'string' }
		},
		reports:{
			searchFields:{
				identifier:'integer', email:'string', idPolicy:'string', date:'string', status:'boolean', type:'string'
			}
		},
		/*reportExtras:{
			searchFields:{
				idReport:"integer"
			}
		},*/
		profile : {
	        searchFields: {mobileId: 'string', name: 'string', firstname: 'string', lastname: 'string', cellPhone: 'string',
	        	city: 'string', enterprise: 'string',birthDate: 'string',email: 'string',password: 'string'}
	    },
	    PolicyVehicle : {
	        searchFields: {identifier: 'integer',PolicyNo: 'string', PolicyDate: 'string', insurance: 'string', Plates: 'string', Serie: 'string'
	        	, VehicleType: 'string', Mark: 'string', SubMark: 'string', Model: 'string', Color: 'string'
	         		, carPicture: 'string', Holder: 'string', OwnerCellPhone: 'string', PolicyContactName:'string',
						PolicyContactFirstName:'string', PolicyContactLastName:'string',
						PolicyContactCellPhon:'string'
	         	}
	     },
	     MedicalData : {
	         searchFields: {IMSS: 'string', bloodType: 'string', alergics: 'string', clinicalConditions: 'string'
	         	}
	     },
	     MechanicData : {
	         searchFields: { MechanicName: 'string',  MechanicFirstName: 'string', MechanicLastName: 'string', MechanicCellPhone: 'string',
	         	MechanicAddress: 'string'}
	     }
	}, {
		// password : 'PleaseChangeThisPassword'
	})

	.then(function () {
		WL.Logger.debug(['All collections was loaded successfully'].join('\n'));
	})

	.fail(function (errObj) {
		WL.Logger.ctx({pretty: true}).error(errObj);
	});

}());