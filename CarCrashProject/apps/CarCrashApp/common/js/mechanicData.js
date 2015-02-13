		var vMechanicName;
			var vMechanicFirstName;
			var vMechanicLastName;
			var vMechanicCellPhone;		
			var vMechanicAddress;
			
		$(document).on('pagebeforeshow','#DatosMecanico',function(e,data){   		    			
			getMechanicValues();
			initMechanicDataInfo(vMechanicName,vMechanicFirstName,vMechanicLastName,vMechanicCellPhone,vMechanicAddress); 
			 basicPersonFiltersNumber("txtMechanicCellPhone");        	 
        	 basicPersonNameFilters("txtMechanicFirstName");
        	 basicPersonNameFilters("txtMechanicLastName");
        	 $('#txtMechanicName').keypress(function(key) {        		
        		 if((key.charCode < 97 || key.charCode > 122) && (key.charCode < 65 || key.charCode > 90) && (key.charCode != 32)
        				 && (key.charCode != 225)&& (key.charCode != 233)&& (key.charCode != 237)&& (key.charCode != 243)&& (key.charCode != 250)&& (key.charCode != 241)
        	   				&& (key.charCode != 193)&& (key.charCode != 201)&& (key.charCode != 205)&& (key.charCode != 211)&& (key.charCode != 218)&&  (key.charCode != 209) 
        		 ){
            		 return false;
            	 }else{             		
            	        return true;
            	    }
 			});
		});			
		
		function saveMechanicData(){	
			getMechanicValues();
			setMechanicDataTransaction(vMechanicName,vMechanicFirstName,vMechanicLastName,vMechanicCellPhone,vMechanicAddress);						
		}
		
		function getMechanicValues(){
			 vMechanicName =	$("#txtMechanicName");
			 vMechanicFirstName=	$("#txtMechanicFirstName");
			 vMechanicLastName=	$("#txtMechanicLastName");
			 vMechanicCellPhone=$("#txtMechanicCellPhone");		
			 vMechanicAddress=$("#txtMechanicAddress");			
		}