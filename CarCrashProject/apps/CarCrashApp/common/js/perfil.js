
					
		function initPerfil(){
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
			$("#listCountries").hide();
			$("#perfilCont").show();		
		}
		
		function backPerfilCities(){
			$("#listCities").hide();
			$("#listCountries").show();
		}
		function backPerfilCountries(){
			$("#listCountries").hide();
			$("#perfilCont").show();		
		}
		
		function initCountries(){	
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
			initPerfil();
		var n=	$("#txtProfileName");
		var n1=	$("#txtFirstName");
		var n2=	$("#txtLastName");
		var n3=	$("#txtCellPhone");
		var n4=	$("#searchCity");
		var n5=	$("#txtEmpresa");	
		initPerfilDataInfo(n,n1,n2,n3,n4,n5); 	 				  
		});			
		
		function savePerfil(){
			
			var pname =	$("#txtProfileName");
			var firstName=	$("#txtFirstName");
			var lastName=	$("#txtLastName");
			var cellPhone=$("#txtCellPhone");
			var serachCity=$("#searchCity");
			var empresa=$("#txtEmpresa");						
			setDataToTransaction(pname,firstName,lastName,cellPhone,serachCity,empresa);
			alert('Datos guardados con exito.');
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
		 
         