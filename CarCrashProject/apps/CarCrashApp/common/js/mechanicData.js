		var vMechanicName;
			var vMechanicFirstName;
			var vMechanicLastName;
			var vMechanicCellPhone;		
			var vMechanicAddress;
			
		$(document).on('pagebeforeshow','#DatosMecanico',function(e,data){   		    			
			getMechanicValues();
			initMechanicDataInfo(vMechanicName,vMechanicFirstName,vMechanicLastName,vMechanicCellPhone,vMechanicAddress); 	 				  
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