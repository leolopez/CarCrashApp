	var policyNavigation=0;
	var policySaved=false;
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
		
		var next=false;
		
		function initVehicle(){			  	
	 policy=	 $("#txtPolicyNo");
		 policyDate=	 $("#txtPolicyDate");
		 aseg=$('#selectInsurance option:selected');
		if(policyDate.val().trim().length>0&&policy.val().trim().length>0&&parseInt(aseg.val())>0){ 
			$("#listMarks").hide();
			$("#listSubMarks").hide();
			$("#policyCont").hide();
			$("#vehicleCont").show();
			policyNavigation=0;
			next=true;
			}else{				
				alert(Messages.requiredData);
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
		next=false;
		
		}
		var markData;
		function clearMarks(mark){
			$("#listMarks").hide();
			$("#listSubMarks").show();			
			markData=mark;
			policyNavigation=3;
			next=false;			
		}		
		         
		var submarkData;
		function clearSubMarks(submark){
			submarkData=submark;
			$("#lblMarkSelected").text(""+$(markData).text());
			$("#lblSubMarkSelected").text(""+$(submarkData).text());
			next=true;			
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
		 var policyId;
		 
		function initSelectedPolicy(v){
			  listitem = $(v).parent( "li" );	
			   seriesSelected=jQuery(v).find("h2");
				 insuranceSelected=jQuery(v).children("p:first");
				 expirationSelected=jQuery(v).children("p:last");
				 policyId=jQuery(v).children("input:hidden").val();							
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
		next=false;
		
		$('#txtPlates').keypress(function(key) {        		
   		 if((key.charCode < 97 || key.charCode > 122) && (key.charCode < 65 || key.charCode > 90) && (key.charCode != 45)&& (key.charCode != 46)
   				&& (key.charCode < 48 || key.charCode > 57)){
       		 return false;
       	 }else{             		
       	        return true;
       	    }
		});
   		$('#txtSeries').keypress(function(key) {        		
   		 if((key.charCode < 97 || key.charCode > 122) && (key.charCode < 65 || key.charCode > 90) && (key.charCode < 48 || key.charCode > 57)){
       		 return false;
       	 }else{             		
       	        return true;
       	    }
   		});
   		$('#txtColor').keypress(function(key) {        		
   		 if((key.charCode < 97 || key.charCode > 122) && (key.charCode < 65 || key.charCode > 90)){
       		 return false;
       	 }else{             		
       	        return true;
       	    }
   		});
   		$('#txtHolder').keypress(function(key) {
   			
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
		
		$(document).on('pagebeforeshow','#poliza',function(e,data){    			    
			initPolicyVehicleDataInfo();
			updatedPolicy=false;
			next=false;
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
		var pic=getCarPictureUri();
		
		
		if(policyDate.val().trim().length>0&&policy.val().trim().length>0&&aseg.text().trim().length>0
			&&serie.val().trim().length>0&&plates.val().trim().length>0&&vehicleType.val().trim().length>0&&mark.val().trim().length>0	
			&&subMark.val().trim().length>0&&model.val().trim().length>0&&color.val().trim().length>0&&holder.val().trim().length>0			
		){ 	
			if(picUri.trim().length>0){ 
			if(!updatedPolicy){ 
				if(next){
					initCountPolicies();
					setTimeout(
							function() { 
								var data=getJsonstoreResultsWrapperObject();
								if(parseInt(data)<10){										
									setPolicyVehicleDataTransaction(policy,policyDate,aseg,plates,serie,vehicleType,mark,subMark,model,color,pic,holder);
									
									setTimeout(
											function() { 
												var data=getJsonstoreResultsWrapperObject();
												if(data){										
													policySaved=true;								
												}else{
													policySaved=false;						
												}				
												}, 300 );
									
								}else{
									alert(Messages.PoliciesLimitNo);							
								}				
								}, 300 );		
		    		
			}
				
			}else{
				if(next){
				var docs = [{_id: parseInt(policyId), json: {
					PolicyNo: policy.val().trim(), PolicyDate: policyDate.val().trim(), insurance: aseg.text().trim(),
					Plates: plates.val().trim(),Serie: serie.val().trim(),VehicleType: vehicleType.val().trim(),Mark: mark.val().trim(),
					SubMark: subMark.val().trim(),Model: model.val().trim(),Color: color.val().trim(),carPicture: pic.trim(),
					Holder: holder.val().trim()
					}
				
				}];
				var c='PolicyVehicle';
				updateJsonCollection(c,docs);	
				}
			}
			} else {		    			
				alert(Messages.pictureMsg);			
		    }
			
		    } else {		    			
				alert(Messages.requiredData);			
		    }		    
		   
		}
		function addPolicyToList(name,insurance,policyDate,id,pic){			
			initPolicyToList(name,insurance,policyDate,id,pic);
	        
		}
function initPolicyToList(name,insurance,policyDate,id,pic){
			
			$('#listPolicy').append('<li class="ui-li-has-thumb ui-last-child" ><a data-rel="popup" data-position-to="window" data-transition="pop" href="#popupShosPolicyDetails" onclick="initSelectedPolicy(this);" class="ui-btn ui-btn-icon-right ui-icon-carat-r" > ' +
			        '<img height="100%" src="'+pic.trim()+'"> '+
				    '<h2>'+name.trim()+'</h2>'+
				    '<p>'+insurance.trim()+'</p>'+
				    '<p>'+Messages.spnExpiration+policyDate.trim()+'</p>'+
				    ' <input type="hidden" value="'+id+'" />'+
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
				policyNavigation=2;
			break;				
			}
		}
		var picUri="";
		function getCarPictureUri(){
			return picUri;			
		}
		function takeCarPicture()
		{
			navigator.camera.getPicture(
			        function(data) {
			        	picUri=data;
			        	initPicture(data);
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
		        top: 150,
		          bottom:50
		    }); 
		}					
		
		function initDeletePolicy(){
			$( "#popupShosPolicyDetails" ).popup( "close" );
			setTimeout(function() { $( "#popupDialogEliminar" ).popup( "open" ).attr('data-transition','pop'); }, 300 );
		}
		
		var updatedPolicy=false;
		function initPolicyDetails(){
			$("#searchMark").val("");					
			$("#searchSubMark").val("");
			findByIdPolicyVehicle(policyId);
			setTimeout(
					function() { 
				var data=getJsonstoreResultsWrapperObject();
				$("#searchMark").val(""+data[0].json.Mark);					
				$("#searchSubMark").val(""+data[0].json.SubMark);
					$("#txtSeries").val(data[0].json.Serie);
					$("#txtPlates").val(data[0].json.Plates);
				$("#txtVehicleType").val(data[0].json.VehicleType);
				
				$("#txtModel").val(data[0].json.Model);
				$("#txtColor").val(data[0].json.Color);
				$("#txtHolder").val(data[0].json.Holder);
				 policy=	 $("#txtPolicyNo");
				 policy.val(data[0].json.PolicyNo);
				 policyDate=	 $("#txtPolicyDate");
				 policyDate.val(data[0].json.PolicyDate);									 
				 $( "select" ).selectmenu();
				  $('#selectInsurance option:contains("'+data[0].json.insurance+'")').prop('selected', true);
				  $( "select" ).selectmenu( "refresh", true );				  
				  aseg=  $("#selectInsurance option:selected");	
				  initPicture(data[0].json.carPicture);
				  picUri=data[0].json.carPicture.trim();
					location.href="#AgregarPoliza"; 										
					updatedPolicy=true;
				}, 300 );						
		
		}
		
		function cleanPolicyInputs(){
		$("#txtSeries").val("");
		$("#txtPlates").val("");
		$("#txtVehicleType").val("");
		$("#searchMark").val("");
		$("#searchSubMark").val("");
		$("#txtModel").val("");
		$("#txtColor").val("");
		$("#txtHolder").val("");		  
		$("#txtPolicyNo").val("");			
		$("#txtPolicyDate").val("");									 
		$( "select" ).selectmenu();
		$('#selectInsurance').prop('selectedIndex',0);
		$( "select" ).selectmenu( "refresh", true );
		cleanPicture();
		aseg=  $("#selectInsurance option:selected");
		picUri="";
		policySaved=true;
		}
		
		
		function validNewPolicy(){
			initCountPolicies();
			setTimeout(
					function() { 
						var data=getJsonstoreResultsWrapperObject();
						if(parseInt(data)<10){										
						location.href="#AgregarPoliza"; 
						policySaved=true;
						}else{
							alert(Messages.PoliciesLimitNo);							
						}				
						}, 300 );										
		}
		
		function initCountPolicies(){
			var collectionName = 'PolicyVehicle';

			  var collections = {
			    		PolicyVehicle : {
			                searchFields: {mobileId: 'string',PolicyNo: 'string', PolicyDate: 'string', insurance: 'string', Plates: 'string', Serie: 'string'
			                	, VehicleType: 'string', Mark: 'string', SubMark: 'string', Model: 'string', Color: 'string'
			                		, carPicture: 'string', Holder: 'string'
			                	}
			            } 
			    }; 
			countJSONStoreDocs(collectionName,collections);	
				
		}
		
		function initPicture(data){
			$('#carPhotoCont').remove();
			$('#carPhotoCube').hide();
        	var div = "<div id=\"carPhotoCont\" style=\"width: 65px; height: 65px; border: thin; border-style: dashed; display: inline-block; padding: 5px 5px 5px 5px;\">";
        	var img = "<img src=\"" + data + "\" width=\"100%\" height=\"100%\" /></div>";
            $('#carPhotos').append(div + img);			
		}
		function cleanPicture(){
			$('#carPhotos').empty();	      	
        	var div ="<div id=\"carPhotoCube\" style=\"width: 70px; height: 70px; border: thin; border-style: dashed; display: inline-block;\"></div>";        	
            $('#carPhotos').append(div);			
		}
		
		function validUnsavedPolicy(){
			
							
							var serie=	$('#txtSeries');
							var plates=	$("#txtPlates");
							var vehicleType=$("#txtVehicleType");
							var mark=$("#searchMark");
							var subMark=$("#searchSubMark");
							var model=$("#txtModel");
							var color=$("#txtColor");
							var holder=$("#txtHolder");	
							var pic=getCarPictureUri();
							 policy=	 $('#txtPolicyNo');
							 policyDate=	 $("#txtPolicyDate");
							 aseg=$('#selectInsurance option:selected');
							
								if(!policySaved||(policyDate.val().trim().length>1||policy.val().trim().length>1||(parseInt(aseg.val())>1)
										||serie.val().trim().length>1||plates.val().trim().length>1||vehicleType.val().trim().length>0||mark.val().trim().length>1
										||subMark.val().trim().length>1||model.val().trim().length>1||color.val().trim().length>1||holder.val().trim().length>1||pic.trim().length>1)){
									
								
								if(policyDate.val().trim().length>0&&policy.val().trim().length>0&&(parseInt(aseg.val())>0)
								&&serie.val().trim().length>0&&plates.val().trim().length>0&&vehicleType.val().trim().length>0&&mark.val().trim().length>0	
								&&subMark.val().trim().length>0&&model.val().trim().length>0&&color.val().trim().length>0&&holder.val().trim().length>0&&pic.trim().length>0){
								
									$('#liSUdata').show();
									
								}else{
									$('#liSUdata').hide();
								}
								if(policyDate.val().trim().length>0||policy.val().trim().length>0||(parseInt(aseg.val())>0)
										||serie.val().trim().length>0||plates.val().trim().length>0||vehicleType.val().trim().length>0||mark.val().trim().length>0	
										||subMark.val().trim().length>0||model.val().trim().length>0||color.val().trim().length>0||holder.val().trim().length>0||pic.trim().length>0){					
											$('#liKeepEd').show();
											
										}else{
											$('#liKeepEd').hide();
										}
								popUpListPolicy();
								$( "#popupMenu" ).popup( "open" );
								}else{
									
									 cleanPolicyInputs();
									location.href="#poliza"; 
								}
								
							
										 			 
							
		}
		