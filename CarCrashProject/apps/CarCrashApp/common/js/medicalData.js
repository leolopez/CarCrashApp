		$(document).on('pagebeforeshow','#DatosMedicos',function(e,data){   		    		
		
			initMedicalDataInfo(); 	 				  
		});			
		
		function saveUserMedicalData(){			
			setMedicalDataTransaction();				
		}
		