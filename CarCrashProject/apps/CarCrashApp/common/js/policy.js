	var policyNavigation=0;
	
		function initPolicyPage(){
			$("#listCountries").hide();
			$("#listMarks").hide();
			$("#listSubMarks").hide();
			$("#listCities").hide();
			$("#policyCont").show();
			$("#vehicleCont").hide();
			policyNavigation=0;			   
			}
		var policy;
		var policyDate;
		var aseg;
		
		function initVehicle(){			  	
	 policy=	 $("#txtPolicyNo");
		 policyDate=	 $("#txtPolicyDate");
		 aseg=$('#selectInsurance option:selected');
		if(policyDate.val().trim().length>0&&policy.val().trim().length>0&&aseg.text().trim().length>0){ 
			$("#listMarks").hide();
			$("#listSubMarks").hide();
			$("#policyCont").hide();
			$("#vehicleCont").show();
			policyNavigation=0;
			}else{				
				alert("Ingrese todos los datos");
			} 
			}
		
		function policiesAlert(){						
				alert('La poliza 3GCEC28K4WG132181 esta por caducar.');
		}
		
		
		var selectedPolizaData;
		function j(){
		$("#perfilCont").hide();
		}
		function backPolicyCont(){
			$("#policyCont").show();
		$("#vehicleCont").hide();		
		}
		function backVehicleCont(){
			$("#policyCont").hide();
		$("#vehicleCont").show();		
		}										
		
		function initMarks(){
		$("#vehicleCont").hide();
		$("#listMarks").show();
		policyNavigation=2;
		}
		var markData;
		function clearMarks(mark){
			$("#listMarks").hide();
			$("#listSubMarks").show();			
			markData=mark;
			policyNavigation=3;
		}		
		         
		var submarkData;
		function clearSubMarks(submark){
			submarkData=submark;
			$("#lblMarkSelected").text(""+$(markData).text());
			$("#lblSubMarkSelected").text(""+$(submarkData).text());
		}
		
		function addPolicy(){
			var value ="sss";
			var listItem = "<li>" + value + "</li>";
			$("#listPolicy").append(listItem);			
		}
		 var listitem;
		function initSelectedPolicy(v){
			  listitem = $(v).parent( "li" );				
			selectedPolizaData=$(listitem).text();
			
			//$("#lblPolicySelected").text(""+$(listitem).text());
		}		
				
		function policyDeleted(){			
			 var item2 = $("#listPolicy").find(listitem);
			    item2.remove();			    	
			    ondeletedUpdatePolicy();
			    
		}					
		
		function markSelected(){			
			$("#vehicleCont").show();
			$("#listSubMarks").hide();
			$("#searchSubMark").val(""+$(submarkData).html());
			$("#searchMark").val(""+$(markData).html());
			policyNavigation=0;
		}		
		$(document).on('pagebeforeshow','#AgregarPoliza',function(e,data){    			    
		initPolicyPage();		
		});	
		
		$(document).on('pagebeforeshow','#poliza',function(e,data){    			    
			initPolicyVehicleDataInfo();		
			});	
		
		
		function savePolicy(){						
			
		var serie=	$("#txtSeries");
		var plates=	$("#txtPlates");
		var vehicleType=$("#txtVehicleType");
		var mark=$("#searchMark");
		var subMark=$("#searchSubMark");
		var model=$("#txtModel");
		var color=$("#txtColor");
		var holder=$("#txtHolder");		
		
		
		if(policyDate.val().trim().length>0&&policy.val().trim().length>0&&aseg.text().trim().length>0){ 				    	
		    	setPolicyVehicleDataTransaction(policy,policyDate,aseg,plates,serie,vehicleType,mark,subMark,model,color,color,holder);
		    	 addPolicyToList(serie.val(),aseg.text(),policyDate.val());
		    	 alert('Datos guardados con exito.');
		    } else {
		       
		    }		    
		   
		}
		function addPolicyToList(name,insurance,policyDate){			
			initPolicyToList(name,insurance,policyDate);
	        
		}
function initPolicyToList(name,insurance,policyDate){
			
			$('#listPolicy').append('<li class="ui-li-has-thumb ui-last-child" ><a data-transition="slide" onclick="initSelectedPolicy(this);" class="ui-btn ui-btn-icon-right ui-icon-carat-r" href=""> ' +
			        '<img height="100%" src="http://i.ndtvimg.com/auto/makers/10/63/ferrari-458-italia-01.jpg"> '+
				    '<h2>'+name.trim()+'</h2>'+
				    '<p>'+insurance.trim()+'</p>'+
				    '<p>'+policyDate.trim()+'</p>'+
				   ' </a>'+
				   ' </li>');		
		}
		
	function ondeletedUpdatePolicy(){
		try{
			$('#listPolicy').listview('refresh');	        			
		}catch(err){
			
		}
	}
		function backPerfilMarks(){
			$("#listMarks").hide();
			$("#vehicleCont").show();
			
		}
		
		function backPerfilSubMarks(){
			$("#listSubMarks").hide();
			$("#listMarks").show();
		}
		
		function backPolicy(){
			  
			switch(policyNavigation){
			case 0:
				backPolicyCont();						
			break;
			case 1:
				backVehicleCont();	
				policyNavigation=0;
			break;
			case 2:				
				 backPerfilMarks();
				 policyNavigation=0;
			break;
			case 3:			 	
				backPerfilSubMarks();
			break;
				policyNavigation=2;
			}
		}
		
		function takeCarPicture()
		{
			navigator.camera.getPicture(
			        function(data) {
			        	$('#carPhotoCube').hide();
			        	var div = "<div style=\"width: 65px; height: 65px; border: thin; border-style: dashed; display: inline-block; padding: 5px 5px 5px 5px;\">";
			        	var img = "<img src=\"" + data + "\" width=\"100%\" height=\"100%\" /></div>";
			            $('#carPhotos').append(div + img);
			        },
			        function(e) {
			            console.log("Error getting picture: " + e);
			        },
			        { quality: 50, destinationType: navigator.camera.DestinationType.FILE_URI, sourceType : navigator.camera.PictureSourceType.CAMERA});
		}