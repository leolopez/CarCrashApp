function profile(){
	 this.name="";
	 this.firstname="";
	 this.lastname="";
	 this.cellPhone="";
	 this.city="";
	 this.enterprise="";
	 this.birthDate="";
	 this.email="";
	 this.streetNumber="";
	 this.street="";
	 this.State="";
	 this.postalCode="";
	 this.Country="";
}

var updateProfile=null;

$(
initLeftPanelTranslations()

);
		
		function initPerfil(){
			$('div[id="backPerfilNav"]').hide();
			$("#listCountries").hide();
			$("#listMarks").hide();
			$("#listSubMarks").hide();
			$("#listCities").hide();
			$("#policyCont").hide();												   
			}				
		
		var navigation=0;
		var selectedPolizaData;
		function j(){
		$("#perfilCont").hide();
		}
		
		function backPerfilCont(){			
			$("#policyCont").hide();
		$("#perfilCont").show();		
		}
		function backPerfilCountries(){
			$('div[id="backPerfilNav"]').hide();
			$("#listCountries").hide();
			$("#perfilCont").show();		
		}
		
		function backPerfilCities(){
			$("#listCities").hide();
			$("#listCountries").show();
		}
		function backPerfilCountries(){
			$("#backPerfilNav").hide();
			$("#listCountries").hide();
			$("#perfilCont").show();		
		}
		
		function initCountries(){
			$('div[id="backPerfilNav"]').show();
		$("#perfilCont").hide();
		$("#listCountries").show();
		navigation=4;
		} 
		
		function clearCountries(country){
		$("#listCities").show();
		$("#listCountries").hide();		
		navigation=5;
		}
		
		var cityData;
		function clearCities(city){
			cityData=city;	
			$("#lblCitySelected").text(""+$(cityData).text());			
		}		
				
		$(document).on('pagebeforeshow','#perfil',function(e,data){
			$('div[id="backPerfilNav"]').hide();
			initializeAddress();
			initPerfil();		
		initPerfilDataInfo(); 	 				  
		});			
		
		function savePerfil(){
			if(!checkAddress()){ 
			setDataToTransaction();	
			}else{
				alert("Ingrese "+Messages.streetNumber+" en la busqueda del "+Messages.address);				
			}
		}
		function saveAnyPerfil(){						
			switch(navigation){
			case 0:						
				 savePerfil();
			break;
			case 1:						
				
				break;				
			}			
		}				
		
		function citySelected(){
			$('div[id="backPerfilNav"]').hide();
			$("#perfilCont").show();
			$("#listCities").hide();
			$("#listCountries").hide();					
			$("#searchCity").val(""+$(cityData).text());
			navigation=0;
		}		
		
		function backPerfil(){
			
			switch(navigation){
			case 0:						
				initPerfil();	
			break;
			case 1:
				backPerfilCont();				
				navigation=0;
			break;
			case 2:				
				 backPerfilMarks();
				 navigation=1;
			break;
			case 3:				
				backPerfilSubMarks();
				navigation=2;
			break;
			case 4:				
				backPerfilCountries();
				navigation=0;
			break;
			case 5:					
				 backPerfilCities();
				 navigation=4;
			break;	
			}
		}		 		
		
		  function getTest() {
              var invocationData = {
                      adapter : 'testXML',
                      procedure : 'CreateXML',
                      invocationContext: {}
                  };

              WL.Client.invokeProcedure(invocationData,{
                  onSuccess : successHandler,
                  onFailure : failureHandler,
              });
          }					
          
          function successHandler(result)
          {
          WL.Logger.debug("Retrieve success" +  JSON.stringify(result));
          alert('res '+result.invocationResult.result);  
          }
          
          function failureHandler(result)
          {
          	alert(result.errorMsg);
          }	
		 
         function dataStatus(status){
        	 
        	 var ms=status.trim();
 			
 			if(ms.length>0&&ms=="saved"){
 				alert('Data saved successfully');							
 			}else if(ms.length>0&&ms!="saved"){
 				alert('Error: '+ms);									
 			}
         }
       
         
         $(document).on('pagebeforeshow','#perfil',function(e,data){    			    
        	 $('div[id="backPerfilNav"]').hide();
        	 basicPersonFiltersNumber("txtCellPhone");        	 
        	 basicPersonNameFilters("txtFirstName");
        	 basicPersonNameFilters("txtLastName");
        	 $('#txtProfileName').keypress(function(key) {        		
        		 if((key.charCode < 97 || key.charCode > 122) && (key.charCode < 65 || key.charCode > 90) && (key.charCode != 32)
        				 && (key.charCode != 225)&& (key.charCode != 233)&& (key.charCode != 237)&& (key.charCode != 243)&& (key.charCode != 250)&& (key.charCode != 241)
        	   				&& (key.charCode != 193)&& (key.charCode != 201)&& (key.charCode != 205)&& (key.charCode != 211)&& (key.charCode != 218)&&  (key.charCode != 209) 
        		 ){
            		 return false;
            	 }else{             		
            	        return true;
            	    }
 			});
        	 
        	
        	 
        	 $('#txtEmpresa').keypress(function(key) {        		
        		 if((key.charCode < 97 || key.charCode > 122) && (key.charCode < 65 || key.charCode > 90) && (key.charCode != 32) && (key.charCode != 46)
        				 && (key.charCode != 225)&& (key.charCode != 233)&& (key.charCode != 237)&& (key.charCode != 243)&& (key.charCode != 250)&& (key.charCode != 241)
        	   				&& (key.charCode != 193)&& (key.charCode != 201)&& (key.charCode != 205)&& (key.charCode != 211)&& (key.charCode != 218)&&  (key.charCode != 209)		 
        		 ){
            		 return false;
            	 }else{             		
            	        return true;
            	    }
 			});
         });
        	
        function basicPersonFiltersNumber(cellInput){
        	$('#'+cellInput).keypress(function(key) {        		
  		        if(key.charCode < 48 || key.charCode > 57){ 
  		        	$('#txtCellPhone').val("");
  		        	return false;
  		        	}else{  		        		  		        		
  		        	return true;
  		        	}
  		    });        	         
        	
        }
        
        function basicPersonNameFilters(nameInput){
       
        	 
        	 $('#'+nameInput).keypress(function(key) {        		
        		 if((key.charCode < 97 || key.charCode > 122) && (key.charCode < 65 || key.charCode > 90) && (key.charCode != 32)
        				 && (key.charCode != 225)&& (key.charCode != 233)&& (key.charCode != 237)&& (key.charCode != 243)&& (key.charCode != 250)&& (key.charCode != 241)
        	   				&& (key.charCode != 193)&& (key.charCode != 201)&& (key.charCode != 205)&& (key.charCode != 211)&& (key.charCode != 218)&&  (key.charCode != 209)		 
        		 ){
            		 return false;
            	 }else{             		
            	        return true;
            	    }
 			});
        	
        }
        
        function checkAddress(){
        	if(($('input[sel="pCity"]').val().trim().length>0||$('input[sel="pStreet"]').val().trim().length>0||$('label[id="lblZipCode"]').val().trim().length>0
        			||$('input[sel="pState"]').val().trim().length>0||$('input[sel="pCountry"]').val().trim().length>0)&& $('input[sel="pStreetNumber"]').val().trim().length<1
        			){
        		return true;
        	}else{
        		return false;
        	}        	
        }
        
        function setDataToTransaction(){				 
			
			var jsonStore = new clsJsonStoreHelper();
			jsonStore.collectionName="perfil";
			jsonStore.document=
				 {firstName: $("#txtProfileName").val().trim(), lastName: $("#txtFirstName").val().trim(), secondLastName: $("#txtLastName").val().trim(), cellPhone: $("#txtCellPhone").val().trim(),
		        	city: $('input[sel="pCity"]').val().trim(), enterprise: $("#txtEmpresa").val().trim(),
		        	streetNumber:$('input[sel="pStreetNumber"]').val().trim(),street:$('input[sel="pStreet"]').val().trim(),State:$('input[sel="pState"]').val().trim(),
		        	postalCode:$('input[sel="pPostalCode"]').val().trim(),Country:$('input[sel="pCountry"]').val().trim()
				 };
			jsonStore.id=getProfileId();
			jsonStore.fnSuccess=function (succes) {
				jsonStore.document["email"]=updateProfile[0].json.email;
				
				updateAccount(jsonStore.document);
				alert(Messages.msgDataSaved);
			};
			jsonStore.fnFail=function (errorObject) {			
				alert("Error: "+errorObject.msg);
			};
			jsonStore.save();			
			
}
        var profileId;
        function initPerfilDataInfo(){	
        	var jsonStore = new clsJsonStoreHelper();
        	jsonStore.collectionName="perfil";
        	jsonStore.document=
        			{
        			};
        	jsonStore.id=0;
        	jsonStore.fnSuccess=function (arrayResults) {			
        		if(arrayResults.length>0){
        			updateProfile=arrayResults;
        			profileId=arrayResults[0]._id;
        			  WL.Logger.debug("Retrieve success" +  JSON.stringify(arrayResults));
        			$("#txtProfileName").val(arrayResults[0].json.firstName);
        			$("#txtFirstName").val(arrayResults[0].json.lastName);	
        			$("#txtLastName").val(arrayResults[0].json.secondLastName);
        			$("#txtCellPhone").val(arrayResults[0].json.cellPhone);	
        			$('input[sel="pCity"]').val(arrayResults[0].json.city);
        			$("#txtEmpresa").val(arrayResults[0].json.enterprise);
        			$('input[sel="pStreetNumber"]').val(arrayResults[0].json.streetNumber);
        			$('input[sel="pStreet"]').val(arrayResults[0].json.street);
        			$('input[sel="pState"]').val(arrayResults[0].json.State);
                	$('input[sel="pPostalCode"]').val(arrayResults[0].json.postalCode);
                	$('input[sel="pCountry"]').val(arrayResults[0].json.Country);
        		}
        	};
        	jsonStore.fnFail=function (fail) {			
        		
        	};
        	jsonStore.get();	
        	
        	}
        	
        function getProfileId(){
        	return profileId;
        }
        
        
        function updateAccount(perfil)
        {	
        	var restHelper = new clsRestHelper('account','updateAccount',perfil, updateperfilSuccess, updateperfilFailure);
        	restHelper.callRestAdapter();
        }
        function updateperfilSuccess(result){
        	var oResult = result.invocationResult;
        	if(oResult.isSuccessful)
        	{			
        		
        		
        	}
        	else{
        		alert('Ocurrio un error, por favor intente de nuevo.');
        	}
        }
        function updateperfilFailure(error){
        	alert('Error al actualizar en el servidor, asegurese de contar con conexion a internet.');
        }