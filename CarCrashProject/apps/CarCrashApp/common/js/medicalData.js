		var noImss;
			var vBloodType;
			var vAlergics;
			var vClinicalConditions;	
			
		$(document).on('pagebeforeshow','#DatosMedicos',function(e,data){   		    		
			getMedicalValues();
			initMedicalDataInfo(noImss,vBloodType,vAlergics,vClinicalConditions); 	 				  
		});			
		
		function saveUserMedicalData(){
			getMedicalValues();
			setMedicalDataTransaction(noImss,vBloodType,vAlergics,vClinicalConditions);	
			alert('Datos guardados con exito.');
		}
		function getMedicalValues(){
			noImss =	$("#txtNoIMSS");
			vBloodType=	$("#txtBloodType");
			vAlergics=	$("#txtAlergics");
			vClinicalConditions=$("#txtClinicalConditions");			
		}