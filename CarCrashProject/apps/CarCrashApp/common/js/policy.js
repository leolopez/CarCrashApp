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
				alert("Enter all required data");
			} 
			}
		
		function policiesAlert(){						
				alert(Messages.expiredPolicy+' 3GCEC28K4WG132181');
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
		 var aparent;
		 var seriesSelected;
		 var insuranceSelected;
		 var expirationSelected;
		 
		function initSelectedPolicy(v){
			  listitem = $(v).parent( "li" );	
			   seriesSelected=jQuery(v).find("h2");
				 insuranceSelected=jQuery(v).children("p:first");
				 expirationSelected=jQuery(v).children("p:last");
			findPolicyVehicle(seriesSelected.text(),insuranceSelected.text(),expirationSelected.text().split(":")[1]);
			//alertc();
			popUpListPolicy();		
		}		
				
		function policyDeleted(){	
			
			removetPolicyVehicleDataInfo(seriesSelected.text(),insuranceSelected.text(),expirationSelected.text().split(":")[1]);
			
			
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
		    } else {
		       
		    }		    
		   
		}
		function addPolicyToList(name,insurance,policyDate){			
			initPolicyToList(name,insurance,policyDate);
	        
		}
function initPolicyToList(name,insurance,policyDate){
			
			$('#listPolicy').append('<li class="ui-li-has-thumb ui-last-child" ><a data-rel="popup" data-position-to="window" data-transition="pop" href="#popupShosPolicyDetails" onclick="initSelectedPolicy(this);" class="ui-btn ui-btn-icon-right ui-icon-carat-r" > ' +
			        '<img height="100%" src="http://i.ndtvimg.com/auto/makers/10/63/ferrari-458-italia-01.jpg"> '+
				    '<h2>'+name.trim()+'</h2>'+
				    '<p>'+insurance.trim()+'</p>'+
				    '<p>'+Messages.spnExpiration+policyDate.trim()+'</p>'+
				    ' <input type="hidden" value="2" />'+
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
		var showDate=0;
		
		$(document).on('pagebeforeshow', '#AgregarPoliza', function(){       
		if(showDate==0){
			var now = new Date();
			
		/*	$('#txtPolicyDate').mobiscroll().date({
		        invalid: { daysOfWeek: [0, 6], daysOfMonth: ['5/1', '12/24', '12/25'] },
		        theme: 'ios',
		        display: 'inline',
		        mode: 'scroller',
		        dateOrder: 'dd mm yy',
		        dateFormat : "dd-mm-yy",
		        endYear: now.getFullYear() + 50
		    });
		    */
			showDate=1;
		}
		});
		
		function popUpListPolicy(){
			
			$('.ui-popup-container').css({
		        top: 50,
		          bottom:50
		    }); 
		}					
		
		function initDeletePolicy(){
			$( "#popupShosPolicyDetails" ).popup( "close" );
			setTimeout(function() { $( "#popupDialogEliminar" ).popup( "open" ).attr('data-transition','pop'); }, 300 );
		}
		