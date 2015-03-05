var contactSaved=false;
var updatedContact=false;
var contactId="0";
var contactExist=false;
var dataDetails=null;
var contactUpdate=false;
var contactsCount=0;
var dataToConDelete=null;
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
				[{operator: "equal", key:'UserContactFirstName',value:userContactName.val().trim()				
				},
				{					operator: "equal", key:'UserContactLastName',value:userContactFirstName.val().trim()									
				},
				{	operator: "equal",key:'UserContactSecondLastName',value:userContactLastName.val().trim()													
				},
				{					operator: "equal",key:'UserContactCellPhone',value:userContactCellPhone.val().trim()					
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

var docs;

function savingContact(){
	var	userContactName=$("#txtUserContactName");
	var	userContactFirstName=$("#txtUserContactFirstName");
	var	userContactLastName=$("#txtUserContactLastName");	 
	var	userContactCellPhone=$("#txtUserContactCellPhone");
	if(!contactExist||contactUpdate){
		
		 docs="";
		if(contactUpdate){
			docs={UserContactFirstName:userContactName.val().trim(),		
					UserContactLastName:userContactFirstName.val().trim(),UserContactSecondLastName:userContactLastName.val().trim(),
					UserContactCellPhone:userContactCellPhone.val().trim()};
		}else{
			docs={UserContactFirstName:userContactName.val().trim(),		
				UserContactLastName:userContactFirstName.val().trim(),UserContactSecondLastName:userContactLastName.val().trim(),
				UserContactCellPhone:userContactCellPhone.val().trim()};
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
	
	var data=	{"operation":'add',
			 "json" : docs
			};	
	
	if(contactUpdate){
		
		var dataUp=	{"operation":'replace',
				 "json" : {
					 UserContactFirstName:$("#txtUserContactName").val().trim(),		
						UserContactLastName:$("#txtUserContactFirstName").val().trim(),UserContactSecondLastName:$("#txtUserContactLastName").val().trim(),
						UserContactCellPhone:$("#txtUserContactCellPhone").val().trim(),
						email:dataDetails[0].json.email,identifier:dataDetails[0].json.identifier
				 }
				};		
		
		updateEmergencyContacts(dataUp);
		alert(Messages.dataUpdate);
		contactSaved=false;
	}else{
		saveEmergencyContacts(data);
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
			
			initContactToList(result[index].json.UserContactFirstName,result[index].json.UserContactLastName+" "+
					result[index].json.UserContactSecondLastName, result[index]._id);
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
		
		  
			//updatedPolicy=true;
		}, 300 );						

}

function detailsSuccess(result){
	dataDetails=result;
	location.href="#contactsContent";	
	  $(document).on('pagebeforeshow','#contactsContent',function(e,data1){ 
		 
		  if(dataDetails!=null&&dataDetails.length>0&&contactUpdate){ 
			
			$("#txtUserContactName").val(dataDetails[0].json.UserContactFirstName);
			$("#txtUserContactFirstName").val(dataDetails[0].json.UserContactLastName);
			$("#txtUserContactLastName").val(dataDetails[0].json.UserContactSecondLastName);
		    $("#txtUserContactCellPhone").val(dataDetails[0].json.UserContactCellPhone);	
		    
		  }
	  });
	
	contactUpdate=true;
}

function detailsFail(errorObject){
	alert("Error: "+errorObject.msg);
}

function initDelete(){
	var jsonStore = new clsJsonStoreHelper();
	jsonStore.collectionName="Contacts";
	jsonStore.document=
			{
			};
	jsonStore.id=parseInt(contactId);
	jsonStore.fnSuccess=function(succes){ dataToConDelete=succes; };
	jsonStore.fnFail=detailsFail;							
	jsonStore.get();
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
    var data=	{"operation":'remove',
			 "json" : dataToConDelete[0].json
			};	
    deleteEmergencyContacts(data);
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

function saveEmergencyContacts(pContact)
{	
	var restHelper = new clsRestHelper('EmergencyContacts','saveEmergencyContacts',pContact, saveEmergencyContactsSuccess, saveEmergencyContactsFailure);
	restHelper.callRestAdapter();
}
function saveEmergencyContactsSuccess(result){
	var oResult = result.invocationResult;
	if(oResult.isSuccessful)
	{				
		
	}
	else{
		alert('Ocurrio un error, por favor intente de nuevo.');
	}
}
function saveEmergencyContactsFailure(error){
	alert('Error al actualizar, asegurese de contar con conexion a internet.');
}

function deleteEmergencyContacts(pContact)
{	
	var restHelper = new clsRestHelper('EmergencyContacts','saveEmergencyContacts',pContact, deleteEmergencyContactsSuccess, deleteEmergencyContactsFailure);
	restHelper.callRestAdapter();
}
function deleteEmergencyContactsSuccess(result){
	var oResult = result.invocationResult;
	if(oResult.isSuccessful)
	{			
		 dataToConDelete=null;
		alert("Registro eliminado con exito.");
	}
	else{
		alert('Ocurrio un error, por favor intente de nuevo.');
	}
}
function deleteEmergencyContactsFailure(error){
	alert('Error al actualizar, asegurese de contar con conexion a internet.');
}

function updateEmergencyContacts(pContact)
{	
	var restHelper = new clsRestHelper('EmergencyContacts','saveEmergencyContacts',pContact, updateEmergencyContactsSuccess, updateEmergencyContactsFailure);
	restHelper.callRestAdapter();
}
function updateEmergencyContactsSuccess(result){
	var oResult = result.invocationResult;
	if(oResult.isSuccessful)
	{			
		dataDetails=null;
		
	}
	else{
		alert('Ocurrio un error, por favor intente de nuevo.');
	}
}
function updateEmergencyContactsFailure(error){
	alert('Error al actualizar, asegurese de contar con conexion a internet.');
}