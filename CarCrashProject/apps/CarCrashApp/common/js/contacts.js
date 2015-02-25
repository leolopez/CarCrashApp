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
	var jsonStore = new clsJsonStoreHelper();
	jsonStore.collectionName="Contacts";
	jsonStore.document=
			{
			};
	jsonStore.id=parseInt(contactId);
	jsonStore.fnSuccess=countSuccess;
	jsonStore.fnFail=countFail;
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
		var jsonStore = new clsJsonStoreHelper();
		jsonStore.collectionName="Contacts";
		jsonStore.document=
				[{operator: "equal", key:'UserContactName',value:userContactName.val().trim()				
				},
				{					operator: "equal", key:'UserContactFirstName',value:userContactFirstName.val().trim()									
				},
				{	operator: "equal",key:'UserContactLastName',value:userContactLastName.val().trim()													
				},
				{					operator: "equal",key:'UserContactCellPhon',value:userContactCellPhone.val().trim()					
				}];
		jsonStore.id=0;
		jsonStore.fnSuccess=existSuccess;
		jsonStore.fnFail=existFail;
		jsonStore.get();
		
		}else{
			savingContact();	
		}		
		
	    } else {		    			
			alert(Messages.requiredData);			
	    }	
	
	}else{
		alert("limite maximo de registros");
	}
	    
	},300);
	}

function savingContact(){
	var	userContactName=$("#txtUserContactName");
	var	userContactFirstName=$("#txtUserContactFirstName");
	var	userContactLastName=$("#txtUserContactLastName");	 
	var	userContactCellPhone=$("#txtUserContactCellPhone");
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
		
	var jsonStore = new clsJsonStoreHelper();
	jsonStore.collectionName="Contacts";
	jsonStore.document=docs;				
	jsonStore.id=parseInt(contactId);
	jsonStore.fnSuccess=success;
	jsonStore.fnFail=fail;						
	jsonStore.save();				
	
	}
	
}

function success(result){
	if(contactUpdate){
		alert(Messages.dataUpdate);
		contactSaved=false;
	}else{ 
	alert(Messages.msgDataSaved);
	contactSaved=true;
	}
	location.href="#showContacts";	
}

function fail(errorObject){
	alert("Error: "+errorObject.msg);
}

function initContacts(){
	var jsonStore = new clsJsonStoreHelper();
	jsonStore.collectionName="Contacts";
	jsonStore.document=
			{
			};
	jsonStore.id=0;
	jsonStore.fnSuccess=initSuccess;
	jsonStore.fnFail=initFail;
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
		alert(Messages.dataExist);
	}else{
		 savingContact();		
	} 
}

function existFail(result){
	
}

$(document).on('pagebeforeshow','#showContacts',function(e,data){   
	initContacts();
	basicPersonFiltersNumber("txtUserContactCellPhone");       	 
	 basicPersonNameFilters("txtUserContactFirstName");
	 basicPersonNameFilters("txtUserContactLastName");
	 $('#txtUserContactName').keypress(function(key) {        		
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
	var jsonStore = new clsJsonStoreHelper();
	jsonStore.collectionName="Contacts";
	jsonStore.document=
			{
			};
	jsonStore.id=parseInt(contactId);
	jsonStore.fnSuccess=detailsSuccess;
	jsonStore.fnFail=detailsFail;							
	jsonStore.get();	
	
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

function detailsFail(errorObject){
	alert("Error: "+errorObject.msg);
}

function initDelete(){
	$( "#popupMenuContact" ).popup( "close" );
	setTimeout(function(){ $( "#popupDialogDelContact" ).popup( "open" ); },300);
}

function contactDeleted(){
	
	var jsonStore = new clsJsonStoreHelper();
	
	jsonStore.collectionName="Contacts";
	jsonStore.document=
			{
			};
	jsonStore.id=parseInt(contactId);
	jsonStore.fnSuccess=deleteSuccess;
	jsonStore.fnFail=deleteFail;			
	jsonStore.remove();		
}

function deleteSuccess(result){
	var item2 = $("#listContact").find(listitem);
    item2.remove();			    	
    ondeletedUpdateList('listContact');
}

function deleteFail(errorObject){
	alert("Error: "+errorObject.msg);
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