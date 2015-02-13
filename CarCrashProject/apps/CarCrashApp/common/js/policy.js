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
		
		var next=false;
		
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
				
			//indPolicyVehicle(seriesSelected.text(),insuranceSelected.text(),expirationSelected.text().split(":")[1]);
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
		
		next=false;
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
		
		
		if(policyDate.val().trim().length>0&&policy.val().trim().length>0&&aseg.text().trim().length>0
			&&serie.val().trim().length>0&&plates.val().trim().length>0&&vehicleType.val().trim().length>0&&mark.val().trim().length>0	
			&&subMark.val().trim().length>0&&model.val().trim().length>0&&color.val().trim().length>0&&holder.val().trim().length>0			
		){ 				    	
			if(!updatedPolicy){ 
				if(next){
		    	setPolicyVehicleDataTransaction(policy,policyDate,aseg,plates,serie,vehicleType,mark,subMark,model,color,color,holder);	
			}
				
			}else{
				if(next){
				var docs = [{_id: parseInt(policyId), json: {
					PolicyNo: policy.val().trim(), PolicyDate: policyDate.val().trim(), insurance: aseg.text().trim(),
					Plates: plates.val().trim(),Serie: serie.val().trim(),VehicleType: vehicleType.val().trim(),Mark: mark.val().trim(),
					SubMark: subMark.val().trim(),Model: model.val().trim(),Color: color.val().trim(),carPicture: color.val().trim(),
					Holder: holder.val().trim()
					}
				
				}];
				var c='PolicyVehicle';
				updateJsonCollection(c,docs);	
				}
			}
		    } else {		    			
				alert(Messages.requiredData);			
		    }		    
		   
		}
		function addPolicyToList(name,insurance,policyDate,id){			
			initPolicyToList(name,insurance,policyDate,id);
	        
		}
function initPolicyToList(name,insurance,policyDate,id){
			
			$('#listPolicy').append('<li class="ui-li-has-thumb ui-last-child" ><a data-rel="popup" data-position-to="window" data-transition="pop" href="#popupShosPolicyDetails" onclick="initSelectedPolicy(this);" class="ui-btn ui-btn-icon-right ui-icon-carat-r" > ' +
			        '<img height="100%" src="http://i.ndtvimg.com/auto/makers/10/63/ferrari-458-italia-01.jpg"> '+
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
		
		var updatedPolicy=false;
		function initPolicyDetails(){			
			findByIdPolicyVehicle(policyId);
			setTimeout(
					function() { 
				var data=getJsonstoreResultsWrapperObject();
				
					$("#txtSeries").val(data[0].json.Serie);
					$("#txtPlates").val(data[0].json.Plates);
				$("#txtVehicleType").val(data[0].json.VehicleType);
				$("#searchMark").val(data[0].json.Mark);
				$("#searchSubMark").val(data[0].json.SubMark);
				$("#txtModel").val(data[0].json.Model);
				$("#txtColor").val(data[0].json.Color);
				$("#txtHolder").val(data[0].json.Holder);
				 policy=	 $("#txtPolicyNo");
				 policy.val(data[0].json.PolicyNo);
				 policyDate=	 $("#txtPolicyDate");
				 policyDate.val(data[0].json.PolicyDate);									 
				 $( "select" ).selectmenu();
				  $('#selectInsurance option:contains("'+data[0].json.insurance+'")').attr('selected', true);
				  $( "select" ).selectmenu( "refresh", true );
				  aseg=  $("#selectInsurance option:selected");				 
					location.href="#AgregarPoliza"; 										
					updatedPolicy=true;
				}, 300 );						
		
		}