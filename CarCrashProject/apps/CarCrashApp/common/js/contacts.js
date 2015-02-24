var contactSaved=false;
var updatedContact=false;
var contactId="0";
var contactExist=false;
var dataDetails=null;
var contactUpdate=false;
var contactsCount=0;
function contact()
{
	this.userContactName = "";
	this.userContactFirstName = "";
	this.userContactLastName = "";
	this.userContactCellPhone = "";	
}

function validNewContact(){
	cleanContactInputs();		
	countContacts();
	setTimeout(function(){ 
	if(parseInt(contactsCount)<5){
		location.href="#contactsContent"; 
		contactUpdate=false;
		contactSaved=false;
		contactId=0;
	}else{
		alert("limite maximo de registros");
	}
},300);
		}
function countContacts(){
	var jsonStore = new clsJsonStoreHelper(
			parseInt(contactId), 
			[{}],
			"Contacts",
			{Contacts:{
				searchFields:{UserContactName:'string',		
					UserContactFirstName:'string',UserContactLastName:'string',
					UserContactCellPhon:'string' }
			}},
			{
				
			},
			countSuccess,
			countFail
	);
	
	jsonStore.count();		
	
}

function validUnsavedContact(){										
	
var	userContactName=$("#txtUserContactName");
var	userContactFirstName=$("#txtUserContactFirstName");
var	userContactLastName=$("#txtUserContactLastName");	 
var	userContactCellPhone=$("#txtUserContactCellPhone");
	
		if(!contactSaved&&(userContactName.val().trim().length>0||userContactFirstName.val().trim().length>0||userContactLastName.val().trim().length>0
				||userContactCellPhone.val().trim().length>0
		)){			
		
		if(userContactName.val().trim().length>0&&userContactFirstName.val().trim().length>0&&userContactLastName.val().trim().length>0
				&&userContactCellPhone.val().trim().length>0){
		
			$('#liSUdataC').show();
			
		}else{
			$('#liSUdataC').hide();
		}
		if(userContactName.val().trim().length>0||userContactFirstName.val().trim().length>0||userContactLastName.val().trim().length>0
				||userContactCellPhone.val().trim().length>0	
		){					
					$('#liKeepEdC').show();
					
				}else{
					$('#liKeepEdC').hide();
				}
		popUpListPolicy();
		$( "#popupMenuContactCont" ).popup( "open" );
		}else{
			
			 cleanContactInputs();
			location.href="#showContacts"; 
		}																									 			 
	
}

function cleanContactInputs(){						
	
	$("#txtUserContactName").val("");
	$("#txtUserContactFirstName").val("");
	$("#txtUserContactLastName").val("");	 
	$("#txtUserContactCellPhone").val("");
}
function saveContact(){						
	countContacts();
	setTimeout(function (){ 
	
	if(parseInt(contactsCount)<5||contactUpdate){			
	
	var	userContactName=$("#txtUserContactName");
	var	userContactFirstName=$("#txtUserContactFirstName");
	var	userContactLastName=$("#txtUserContactLastName");	 
	var	userContactCellPhone=$("#txtUserContactCellPhone");
	
	
	if(userContactName.val().trim().length>0&&userContactFirstName.val().trim().length>0&&userContactLastName.val().trim().length>0
			&&userContactCellPhone.val().trim().length>0
	){ 	
						
		if(!contactUpdate){ 
		var jsonStore = new clsJsonStoreHelper(
				0, 
				[{}],
				"Contacts",
				{Contacts:{
					searchFields:{UserContactName:'string',		
						UserContactFirstName:'string',UserContactLastName:'string',
						UserContactCellPhon:'string' }
				}},
				{
					
				},
				existSuccess,
				existFail
		);
		var queryPart1 = WL.JSONStore.QueryPart()
		.equal('UserContactName', userContactName.val().trim())
        .equal('UserContactFirstName',userContactFirstName.val().trim())
        .equal('UserContactLastName', userContactLastName.val().trim())
        .equal('UserContactCellPhon',userContactCellPhone.val().trim());
		
		jsonStore.get();
		//jsonStore.advancedFind(queryPart1);//
		}
		
		setTimeout(
				function() { 
		if(!contactExist||contactUpdate){
			
			var docs="";
			if(contactUpdate){
				docs={UserContactName:userContactName.val().trim(),		
						UserContactFirstName:userContactFirstName.val().trim(),UserContactLastName:userContactLastName.val().trim(),
						UserContactCellPhon:userContactCellPhone.val().trim()};
			}else{
				docs=[{UserContactName:userContactName.val().trim(),		
					UserContactFirstName:userContactFirstName.val().trim(),UserContactLastName:userContactLastName.val().trim(),
					UserContactCellPhon:userContactCellPhone.val().trim()}];
			}
			
		var jsonStore = new clsJsonStoreHelper(
				parseInt(contactId),docs,
				"Contacts",
				{Contacts:{
					searchFields:{UserContactName:'string',		
						UserContactFirstName:'string',UserContactLastName:'string',
						UserContactCellPhon:'string' }
				}},
				{
					
				},
				success,
				fail
		);
		
		jsonStore.save();				
		
		}else{	
			 if(contactExist){
				alert(Messages.dataExist);
			 }
			
			
		}
				},300);
	    } else {		    			
			alert(Messages.requiredData);			
	    }	
	
	}else{
		alert("limite maximo de registros");
	}
	    
	},300);
	}

function success(result){
	if(contactUpdate){
		alert(Messages.dataUpdate);
		contactSaved=false;
	}else{ 
	alert(Messages.msgDataSaved);
	contactSaved=true;
	}
		
}

function fail(result){
	
}

function initContacts(){
	var jsonStore = new clsJsonStoreHelper(
			0, 
			[{}],
			"Contacts",
			{Contacts:{
				searchFields:{UserContactName:'string',		
					UserContactFirstName:'string',UserContactLastName:'string',
					UserContactCellPhon:'string' }
			}},
			{
				
			},
			initSuccess,
			initFail
	);
	//jsonStore.getAll();
	jsonStore.get();
	
}

function initSuccess(result){
	
	if(result.length>0){
		var index;
		$('#listContact').empty();
		for (index = 0; index < result.length; ++index) {				   
			
			initContactToList(result[index].json.UserContactName,result[index].json.UserContactFirstName+" "+
					result[index].json.UserContactLastName, result[index]._id);
		}														
} 
}

function initFail(result){
	
}

function existSuccess(result){
	
	if(result.length>0){		
		contactExist=true;
	}else{
		contactExist=false;		
	} 
}

function existFail(result){
	
}

$(document).on('pagebeforeshow','#showContacts',function(e,data){   
	initContacts();
});

function initContactToList(name,lastname, id){
	
	$('#listContact').append('<li  ><a data-rel="popup" data-position-to="window" data-transition="pop" href="#popupMenuContact" onclick="initSelectedContact(this);" class="ui-btn ui-btn-icon-right ui-icon-carat-r" > ' +
	        
		    '<h2>'+name.trim()+'</h2>'+
		    '<p>'+lastname.trim()+'</p>'+
		    
		    ' <input type="hidden" value="'+id+'" />'+
		   ' </a>'+
		   ' </li>');		
}
var listitem;
function initSelectedContact(v){
	  listitem = $(v).parent( "li" );		 
	  contactId=jQuery(v).children("input:hidden").val();							
	popUpListPolicy();			
}

function initContactDetails(){
	//cleanPolicyInputs();
	dataDetails=null;
	var jsonStore = new clsJsonStoreHelper(
			parseInt(contactId), 
			[{}],
			"Contacts",
			{Contacts:{
				searchFields:{UserContactName:'string',		
					UserContactFirstName:'string',UserContactLastName:'string',
					UserContactCellPhon:'string' }
			}},
			{
				
			},
			detailsSuccess,
			detailsFail
	);
	
	jsonStore.findById();	
	
	setTimeout(
			function() { 								
		  location.href="#contactsContent";	
		  $(document).on('pagebeforeshow','#contactsContent',function(e,data1){ 
			 
			  if(dataDetails!=null&&dataDetails.length>0&&contactUpdate){ 
				
				$("#txtUserContactName").val(dataDetails[0].json.UserContactName);
				$("#txtUserContactFirstName").val(dataDetails[0].json.UserContactFirstName);
				$("#txtUserContactLastName").val(dataDetails[0].json.UserContactLastName);
			    $("#txtUserContactCellPhone").val(dataDetails[0].json.UserContactCellPhon);	
			    
			  }
		  });
		  
			//updatedPolicy=true;
		}, 300 );						

}

function detailsSuccess(result){
	dataDetails=result;
	contactUpdate=true;
}

function detailsFail(result){
	
}

function initDelete(){
	$( "#popupMenuContact" ).popup( "close" );
	setTimeout(function(){ $( "#popupDialogDelContact" ).popup( "open" ); },300);
}

function contactDeleted(){
	
	var jsonStore = new clsJsonStoreHelper(
			parseInt(contactId), 
			[{}],
			"Contacts",
			{Contacts:{
				searchFields:{UserContactName:'string',		
					UserContactFirstName:'string',UserContactLastName:'string',
					UserContactCellPhon:'string' }
			}},
			{
				
			},
			deleteSuccess,
			deleteFail
	);
	
	jsonStore.remove();		
}

function deleteSuccess(result){
	var item2 = $("#listContact").find(listitem);
    item2.remove();			    	
    ondeletedUpdateList('listContact');
}

function deleteFail(result){

}

function ondeletedUpdateList(list){
	try{
		$('#'+list).listview('refresh');	        			
	}catch(err){
		
	}
}

function countSuccess(result){
	contactsCount=result;
	
}

function countFail(result){

}