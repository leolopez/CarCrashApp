	var policyNavigation=0;
	var policySaved=false;
	var policyupdate=false;
	var policyCollectionName = 'PolicyVehicle';
	var policyLimit=0;
	var policyExist=false;
	
	function vehiclesPolicies()
	{		
		this.PolicyNo= "";	
		this.PolicyDate= "";	
		this.insurance= "";	
		this.Plates= "";	
		this.Serie= "";	
		this.VehicleType= "";	
		this.Mark= "";	
		this.SubMark= "";	
		this.Model= "";	
		this.Color= "";	
		this.carPicture= "";	
		this.Holder= "";	
		this.PolicyContactName= "";	
		this.PolicyContactFirstName= "";	
		this.PolicyContactLastName= "";					
		this.PolicyContactCellPhon="";	
	}
	
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
		var polContactNameGrl="";
		var polContactFirstNameGrl="";
		var polContactLastNameGrl="";	 
		var polContactCellPhoneGrl="";
		
		var next=false;
	
		
		function getPolicyValues(){
			 policy=	 $("#txtPolicyNo");
			 policyDate=	 $("#txtPolicyDate");
			 aseg=$('#selectInsurance option:selected');
			  polContactNameGrl=$("#txtPolContactName");
				 polContactFirstNameGrl=$("#txtPolContactFirstName");
				 polContactLastNameGrl=$("#txtPolContactLastName");	 
				polContactCellPhoneGrl=$("#txtPolContactCellPhone");
		}
		
		function initVehicle(){			  	
			getPolicyValues();
		 
		if(policyDate.val().trim().length>0&&policy.val().trim().length>0&&parseInt(aseg.val())>0
				&&polContactNameGrl.val().trim().length>0&&polContactFirstNameGrl.val().trim().length>0&&polContactLastNameGrl.val().trim().length>0
				&&polContactCellPhoneGrl.val().trim().length>0){ 
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
			$( "#popupDialogEliminar" ).popup( "close" );	
			var jsonStore = new clsJsonStoreHelper();
			
			jsonStore.collectionName=policyCollectionName;
			jsonStore.document=
					{
					};
			jsonStore.id=policyId;
			jsonStore.fnSuccess=function(success){
				var item2 = $("#listPolicy").find(listitem);
			    item2.remove();			    	
			    ondeletedUpdatePolicy();
			};
			jsonStore.fnFail=function(success){
				alert("No se ha podido eliminar el registro");
			};			
			jsonStore.remove();															 			    
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
		basicPersonFiltersNumber("txtOwnerCellPhone");		
		basicPersonFiltersNumber("txtPolContactCellPhone");        	 
   	 basicPersonNameFilters("txtPolContactFirstName");
   	 basicPersonNameFilters("txtPolContactLastName");
   	 $('#txtPolContactName').keypress(function(key) {        		
   		 if((key.charCode < 97 || key.charCode > 122) && (key.charCode < 65 || key.charCode > 90) && (key.charCode != 32)
   				 && (key.charCode != 225)&& (key.charCode != 233)&& (key.charCode != 237)&& (key.charCode != 243)&& (key.charCode != 250)&& (key.charCode != 241)
   	   				&& (key.charCode != 193)&& (key.charCode != 201)&& (key.charCode != 205)&& (key.charCode != 211)&& (key.charCode != 218)&&  (key.charCode != 209) 
   		 ){
       		 return false;
       	 }else{             		
       	        return true;
       	    }
		});
   	 
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
			
			initCountPolicies();
			setTimeout(function (){ 
				
			if(parseInt(policyLimit)<10||policyupdate){			
				getPolicyValues();
				var serie=	$("#txtSeries");
				var plates=	$("#txtPlates");
				var vehicleType=$("#txtVehicleType");
				var mark=$("#searchMark");
				var subMark=$("#searchSubMark");
				var model=$("#txtModel");
				var color=$("#txtColor");
				var holder=$("#txtHolder");	 
				var ownerCellPhone=$("#txtOwnerCellPhone");		
				var pic=getCarPictureUri();
				
				
				if(policyDate.val().trim().length>0&&policy.val().trim().length>0&&aseg.text().trim().length>0
					&&serie.val().trim().length>0&&plates.val().trim().length>0&&vehicleType.val().trim().length>0&&mark.val().trim().length>0	
					&&subMark.val().trim().length>0&&model.val().trim().length>0&&color.val().trim().length>0&&holder.val().trim().length>0	&&ownerCellPhone.val().trim().length>0
					&&polContactNameGrl.val().trim().length>0&&polContactFirstNameGrl.val().trim().length>0&&polContactLastNameGrl.val().trim().length>0
					&&polContactCellPhoneGrl.val().trim().length>0
				){ 	
					if(picUri.trim().length>0){	
						policyExist=false;			
				if(!policyupdate){ 
					
				var jsonStore = new clsJsonStoreHelper();
				jsonStore.collectionName=policyCollectionName;
				jsonStore.document=
						[{operator: "equal", key:'mobileId',value:device.uuid.trim()				
						},
						{operator: "equal", key:'PolicyNo',value:policy.val().trim()									
						},
						{operator: "equal",key:'PolicyDate',value:policyDate.val().trim()													
						},
						{operator: "equal",key:'insurance',value:aseg.text().trim()					
						},
						{operator: "equal",key:'Plates',value:plates.val().trim()					
						},
						{operator: "equal",key:'Serie',value:serie.val().trim()				
						},
						{operator: "equal",key:'VehicleType',value:vehicleType.val().trim()				
						},
						{operator: "equal",key:'Mark',value:mark.val().trim()					
						},
						{operator: "equal",key:'SubMark',value:subMark.val().trim()					
						},
						{operator: "equal",key:'Model',value:model.val().trim()					
						},
						{operator: "equal",key:'Color',value:color.val().trim()					
						},
						{operator: "equal",key:'carPicture',value:pic.trim()				
						},
						{operator: "equal",key:'Holder',value:holder.val().trim()				
						},
						{operator: "equal",key:'OwnerCellPhone',value:ownerCellPhone.val().trim()					
						},
						{operator: "equal",key:'PolicyContactName',value:polContactNameGrl.val().trim()					
						},
						{operator: "equal",key:'PolicyContactFirstName',value:polContactFirstNameGrl.val().trim()					
						},
						{operator: "equal",key:'PolicyContactLastName',value:polContactLastNameGrl.val().trim()					
						},
						{operator: "equal",key:'PolicyContactCellPhon',value:polContactCellPhoneGrl.val().trim()					
						}
						];
				jsonStore.id=0;
				jsonStore.fnSuccess=function(success){if(success.length>0){alert(Messages.dataExist);  }else{savingPolicy();}};
				jsonStore.fnFail=function(fail){};
				jsonStore.get();
				
				}else{
					savingPolicy();
				}				
				
			    } else {		    			
					alert(Messages.pictureMsg);			
			    }	
			
				} else {		    			
					alert(Messages.requiredData);			
			    }
				
			    } else {		    			
					alert(Messages.PoliciesLimitNo);			
			    }
			    
			},300);			
		}
		
		function savingPolicy(){
			getPolicyValues();
			var serie=	$("#txtSeries");
			var plates=	$("#txtPlates");
			var vehicleType=$("#txtVehicleType");
			var mark=$("#searchMark");
			var subMark=$("#searchSubMark");
			var model=$("#txtModel");
			var color=$("#txtColor");
			var holder=$("#txtHolder");	 
			var ownerCellPhone=$("#txtOwnerCellPhone");		
			var pic=getCarPictureUri();
			if(!policyExist||policyupdate){
				
				var docs="";
				if(policyupdate){
					docs={mobileId: device.uuid.trim(),PolicyNo: policy.val().trim(), PolicyDate: policyDate.val().trim(), insurance: aseg.text().trim(),
							Plates: plates.val().trim(),Serie: serie.val().trim(),VehicleType: vehicleType.val().trim(),Mark: mark.val().trim(),
							SubMark: subMark.val().trim(),Model: model.val().trim(),Color: color.val().trim(),carPicture: pic.trim(),
							Holder: holder.val().trim(), OwnerCellPhone: ownerCellPhone.val().trim(),
							PolicyContactName:polContactNameGrl.val().trim(),
							PolicyContactFirstName:polContactFirstNameGrl.val().trim(), PolicyContactLastName:polContactLastNameGrl.val().trim(),
							PolicyContactCellPhon:polContactCellPhoneGrl.val().trim()
				        	};
				}else{
					policySaved=false;
					policyId=0;
					docs=[{mobileId: device.uuid.trim(),PolicyNo: policy.val().trim(), PolicyDate: policyDate.val().trim(), insurance: aseg.text().trim(),
						Plates: plates.val().trim(),Serie: serie.val().trim(),VehicleType: vehicleType.val().trim(),Mark: mark.val().trim(),
						SubMark: subMark.val().trim(),Model: model.val().trim(),Color: color.val().trim(),carPicture: pic.trim(),
						Holder: holder.val().trim(), OwnerCellPhone: ownerCellPhone.val().trim(),
						PolicyContactName:polContactNameGrl.val().trim(),
						PolicyContactFirstName:polContactFirstNameGrl.val().trim(), PolicyContactLastName:polContactLastNameGrl.val().trim(),
						PolicyContactCellPhon:polContactCellPhoneGrl.val().trim()
			        	}];

				}
				
			var jsonStore = new clsJsonStoreHelper();
			jsonStore.collectionName=policyCollectionName;
			jsonStore.document=docs;				
			jsonStore.id=parseInt(policyId);
			jsonStore.fnSuccess=function(success){alert(Messages.msgDataSaved);							
			policySaved=true;
			initPolicyVehicleDataInfo();					
			location.href="#poliza";
			};
			jsonStore.fnFail=function(errorObject){alert("Error: "+errorObject.msg);};						
			jsonStore.save();							
			}
		}
		
		function addPolicyToList(name,insurance,policyDate,id,pic){			
			initPolicyToList(name,insurance,policyDate,id,pic);
	        
		}
function initPolicyToList(name,insurance,policyDate,id,pic){
			
			$('#listPolicy').append('<li class=" ui-li-has-thumb" ><a data-rel="popup" data-position-to="window" data-transition="pop" href="#popupShosPolicyDetails" onclick="initSelectedPolicy(this);" class="ui-btn ui-btn-icon-right ui-icon-carat-r" > ' +
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
		        top: 60,
		          bottom:50
		    }); 
		}					
		
		function initDeletePolicy(){
			$( "#popupShosPolicyDetails" ).popup( "close" );
			setTimeout(function() { $( "#popupDialogEliminar" ).popup( "open" ).attr('data-transition','pop'); }, 300 );
		}
		
		var updatedPolicy=false;
		function initPolicyDetails(){
			cleanPolicyInputs();
			policyupdate=true;
			var jsonStore = new clsJsonStoreHelper();
			jsonStore.collectionName=policyCollectionName;
			jsonStore.document=
					{
					};
			jsonStore.id=policyId;
			jsonStore.fnSuccess=function(data) { 
				 location.href="#AgregarPoliza";	
				  $(document).on('pagebeforeshow','#AgregarPoliza',function(e,data1){ 
					  
					  if(data!=null&&data.length>0&&policyupdate){ 
						$('#searchMark').val(""+data[0].json.Mark);									
						$("#searchSubMark").val(""+data[0].json.SubMark);
							$("#txtSeries").val(data[0].json.Serie);
							$("#txtPlates").val(data[0].json.Plates);
						$("#txtVehicleType").val(data[0].json.VehicleType);				
						$("#txtModel").val(data[0].json.Model);
						$("#txtColor").val(data[0].json.Color);
						$("#txtHolder").val(data[0].json.Holder);
						$("#txtOwnerCellPhone").val(data[0].json.OwnerCellPhone);
						$("#txtPolContactName").val(data[0].json.PolicyContactName);
						$("#txtPolContactFirstName").val(data[0].json.PolicyContactFirstName);
					    $("#txtPolContactLastName").val(data[0].json.PolicyContactLastName);	 
						$("#txtPolContactCellPhone").val(data[0].json.PolicyContactCellPhon);
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
					  }
				  });
				  
					updatedPolicy=true;
				
				
				};
			jsonStore.fnFail=function(fail){
				
			};							
			jsonStore.get();												
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
		$("#txtOwnerCellPhone").val("");
		$("#txtPolContactName").val("");
		$("#txtPolContactFirstName").val("");
	    $("#txtPolContactLastName").val("");	 
		$("#txtPolContactCellPhone").val("");
		$( "select" ).selectmenu();
		$('#selectInsurance').prop('selectedIndex',0);
		$( "select" ).selectmenu( "refresh", true );
		cleanPicture();
		aseg=  $("#selectInsurance option:selected");
		picUri="";
		policySaved=false;
		policyupdate=false;
		}
		
		
		function validNewPolicy(){
			 
			initCountPolicies();
			setTimeout(
					function() { 											
						if(parseInt(policyLimit)<10){
							cleanPolicyInputs();
						location.href="#AgregarPoliza"; 
						policySaved=true;
						}else{
							alert(Messages.PoliciesLimitNo);							
						}				
						}, 300 );										
		}
		
		function initCountPolicies(){									
			 policyLimit=0;
			var jsonStore = new clsJsonStoreHelper();
			jsonStore.collectionName="PolicyVehicle";
			jsonStore.document=
					{
					};
			jsonStore.id=0;
			jsonStore.fnSuccess=function(succes){ policyLimit=succes;};
			jsonStore.fnFail=function(fail){ };
			jsonStore.count();							
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
							var ownerCellPhone=$("#txtOwnerCellPhone");							
							var pic=getCarPictureUri();
							 policy=	 $('#txtPolicyNo');
							 policyDate=	 $("#txtPolicyDate");
							 aseg=$('#selectInsurance option:selected');
							 polContactNameGrl=$("#txtPolContactName");
							 polContactFirstNameGrl=$("#txtPolContactFirstName");
							 polContactLastNameGrl=$("#txtPolContactLastName");	 
							polContactCellPhoneGrl=$("#txtPolContactCellPhone");
							
								if(!policySaved||(policyDate.val().trim().length>1||policy.val().trim().length>1||(parseInt(aseg.val())>1)
										||serie.val().trim().length>1||plates.val().trim().length>1||vehicleType.val().trim().length>0||mark.val().trim().length>1
										||subMark.val().trim().length>1||model.val().trim().length>1||color.val().trim().length>1||holder.val().trim().length>1
										||pic.trim().length>1||ownerCellPhone.val().trim().length>1
										||polContactNameGrl.val().trim().length>0||polContactFirstNameGrl.val().trim().length>0||polContactLastNameGrl.val().trim().length>0
										||polContactCellPhoneGrl.val().trim().length>0
								)){
									
								
								if(policyDate.val().trim().length>0&&policy.val().trim().length>0&&(parseInt(aseg.val())>0)
								&&serie.val().trim().length>0&&plates.val().trim().length>0&&vehicleType.val().trim().length>0&&mark.val().trim().length>0	
								&&subMark.val().trim().length>0&&model.val().trim().length>0&&color.val().trim().length>0&&holder.val().trim().length>0&&pic.trim().length>0
								&&ownerCellPhone.val().trim().length>0
								&&polContactNameGrl.val().trim().length>0&&polContactFirstNameGrl.val().trim().length>0&&polContactLastNameGrl.val().trim().length>0
								&&polContactCellPhoneGrl.val().trim().length>0){
								
									$('#liSUdata').show();
									
								}else{
									$('#liSUdata').hide();
								}
								if(policyDate.val().trim().length>0||policy.val().trim().length>0||(parseInt(aseg.val())>0)
										||serie.val().trim().length>0||plates.val().trim().length>0||vehicleType.val().trim().length>0||mark.val().trim().length>0	
										||subMark.val().trim().length>0||model.val().trim().length>0||color.val().trim().length>0||holder.val().trim().length>0||pic.trim().length>0
										||ownerCellPhone.val().trim().length>0
										||polContactNameGrl.val().trim().length>0||polContactFirstNameGrl.val().trim().length>0||polContactLastNameGrl.val().trim().length>0
										||polContactCellPhoneGrl.val().trim().length>0		
								){					
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
		
		$(function(){
			 $('#alistPolicies').on( "taphold", function( event ) {alert("ss"); } );
			 
			  function tapholdHandler( event ){
			    $( event.target ).addEvent( "alert('dd');" );
			  }
			});
		