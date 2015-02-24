function wlCommonInit(){
	/*
	 * Use of WL.Client.connect() API before any connectivity to a MobileFirst Server is required. 
	 * This API should be called only once, before any other WL.Client methods that communicate with the MobileFirst Server.
	 * Don't forget to specify and implement onSuccess and onFailure callback functions for WL.Client.connect(), e.g:
	 *    
	 *    WL.Client.connect({
	 *    		onSuccess: onConnectSuccess,
	 *    		onFailure: onConnectFailure
	 *    });
	 *     
	 */
	
	// Common initialization code goes here
	
	//WL.JSONStore.destroy();
	
	var pages = getPages(); //pages object
	$.each(pages, function(idx, obj){
		$.get(obj.url, function(data){
			var pageContent = data.replace("{id}",obj.id);
			$('body').append(pageContent); //load page inside index.html
			
			if(obj.leftPanel && obj.leftPanel != "false")
			{
				$.get(obj.leftPanel.url, function(data){
					$("#" + obj.id).append(data.replace("{id}", obj.leftPanel.id));
				});
			}
			
			if(obj.header && obj.header != "false")
			{
				$.get(obj.header.url, function(data){
					var headerHTML = data.replace("{saveButton}",obj.header.saveButton);
					/*try{
						if(device.platform == "iOS" && parseFloat(device.version) >= 7.0)
						{
							headerHTML = headerHTML.replace("{headerStyle}","style='padding-top:20px;'").replace("{leftStyle}","style='margin-top:20px;'").replace("{rightStyle}","style='margin-top:20px;'");
						}
						else
						{
							headerHTML = headerHTML.replace("{headerStyle}","").replace("{leftStyle}","").replace("{rightStyle}","");
						}
					}
					catch(exception){
						headerHTML = headerHTML.replace("{headerStyle}","").replace("{leftStyle}","").replace("{rightStyle}","");
					}*/
					if(obj.leftPanel)
					{
						$("#" + obj.id).append(headerHTML.replace("{leftPanel}", "#" + obj.leftPanel.id));
					}
					else
					{
						$("#" + obj.id).append(headerHTML);
					}
				});
			}
			if(obj.popup && obj.popup != "false")
			{
				$.each(obj.popup, function(idx, popup){
					$.get(popup.url,function(data){
						$("#" + obj.id).append(
								data.replace("{id}", popup.id).
								replace("{header}", popup.header).
								replace("{title}", popup.title).
								replace("{content}", popup.content).
								replace("{ok_action}", popup.okButton.action).
								replace("{ok_location}", popup.okButton.location).
								replace("{ok_text}", popup.okButton.text).
								replace("{cn_action}", popup.cancelButton.action).
								replace("{cn_location}", popup.cancelButton.location).
								replace("{cn_text}", popup.cancelButton.text)
								);
					});
				});
			}
		});
	});
	
	setTimeout("initializeData();", 700);
}

function initializeData()
{
	$('a').attr('data-transition','slide');	//general app transition
	
	initLanguage();
	
	$("a[href='#sinisterReport']").click(function(){
    	getLocation();
    });
	
	checkUser();
}

function checkUser(){
	var oJS = new clsJsonStoreHelper();
	oJS.collectionName = 'perfil';
	oJS.fnSuccess = function(numCnt){
		if(numCnt > 0){
			location.href = "#perfil";
		}
		else{
			location.href = "#login";
		}
	};
	oJS.fnFail = function(){
		alert('Error de base de datos interno.');
		location.href = "#login";
	};
	oJS.count();
}

//Pages array to load on index
function getPages()
{
	//add each page to view in app
	//Examples:
	//for adding a header:
	////"header":{
	////	"url":"pages/general/header.html",
	////	"saveButton":"savePolicy();"
	////}
	//for adding a panel:
	////"leftPanel":{
	////	"id":"nav-panel",
	////	"url":"pages/general/left_panel.html"
	////}
	//for adding dialogs, you can add more then one
	////"popup":[
	////        {
	////        	 "url":"pages/general/popup.html",
	////        	 "id":"dialog", 
	////        	 "header":"myHeader", 
	////        	 "title":"Hi Dialog!", 
	////        	 "content":"You have to insert your own content here", 
	////        	 "okButton":{"action":"alert('ok button action');","location":"#login","text":"OK"}, 
	////        	 "cancelButton":{"action":"alert('cancel button action');","location":"","text":"Cancel"}
	////         }
	////         ]
	return [
	        {"id":"login", "url":"pages/account/login.html"},
	        
	        {"id":"signup", "url":"pages/account/signup.html"},
	        
	        {"id":"theftsList", "url":"pages/sinister/theftsList.html", 
	        	"header":{
		        	"url":"pages/general/header.html"
		        },
		        "leftPanel":{
		        	"id":"theftsListNav",
		        	"url":"pages/general/left_panel.html"
		        }
	        },
	        
	        {"id":"sinisterList", "url":"pages/sinister/sinisterList.html",
	        	"header":{
		        	"url":"pages/general/header.html"
		        },
		        "leftPanel":{
		        	"id":"sinisterListNav",
		        	"url":"pages/general/left_panel.html"
		        }
	        },
	        
	        {"id":"sinisterReport", "url":"pages/sinister/reportSinister.html",
	        	"header":{
	        		"url":"pages/general/header.html"
	        	},
	        	"leftPanel":{
	        		"id":"reportSinisterNav",
	        		"url":"pages/general/left_panel.html"
	        	},
	        	"popup":[
	        	         {
	        	        	 "url":"pages/general/popup.html",
	        	        	 "id":"reportSinisterPop", 
	        	        	 "header":"Reportar?", 
	        	        	 "title":"Esta seguro que desea levantar un reporte?", 
	        	        	 "content":"Esta accion enviara su ubicacion y datos a su aseguradora.", 
	        	        	 "okButton":{"action":"sendIncidenteInfo();","location":"#","text":"OK"}, 
	        	        	 "cancelButton":{"action":"","location":"#","text":"Cancel"}
	        	         }
	        	         ]
	        },
	        
	        {"id":"reportSinisterDet", "url":"pages/sinister/reportSinisterDet.html",
	        	"header":{
		        	"url":"pages/general/header.html"
		        },
		        "leftPanel":{
		        	"id":"sinisterListNav",
		        	"url":"pages/general/left_panel.html"
		        }
	        },
	        
	        {"id":"contacts", "url":"pages/contacts.html",
	        	"header":{
	        		"url":"pages/general/header.html"
	        	},
	        	"leftPanel":{
	        		"id":"contactsNav",
	        		"url":"pages/general/left_panel.html"
	        	}
	        },
	        
	        //Leo's scripts
	        
	        {"id":"DatosMecanico", "url":"pages/profile/mechanic.html",
	        	"header":{
	        		"url":"pages/general/header.html",
	        		"saveButton":"saveMechanicData();"
	        	},
	        	"leftPanel":{
	        		"id":"mechanicNav",
	        		"url":"pages/general/left_panel.html"
	        	}
	        },
	        
		    {"id":"DatosMedicos", "url":"pages/profile/medical.html",
	        	"header":{
	        		"url":"pages/general/header.html",
	        		"saveButton":"saveUserMedicalData();"
	        	}, 
	        	"leftPanel":{
	        		"id":"medicalNav",
	        		"url":"pages/general/left_panel.html"
	        	}
	        	},
			
		    {"id":"AgregarPoliza", "url":"pages/profile/policiesContent.html",
	        	"header":{
	        		"url":"pages/general/header.html",
	        		"saveButton":"savePolicy();"
	        	},
	        	"leftPanel":{
	        		"id":"policyNav",
	        		"url":"pages/general/left_panel.html"
	        	}
	        	},
			
		    {"id":"perfil", "url":"pages/profile/profile.html",
	        	"header":{
	        		"url":"pages/general/header.html",
	        		"saveButton":"saveAnyPerfil();"
	        	},
	        	"leftPanel":{
	        		"id":"profileNav",
	        		"url":"pages/general/left_panel.html"
	        	}
	        	},
			
		    {"id":"poliza", "url":"pages/profile/showPolicies.html",
	        	"header":{
	        		"url":"pages/general/header.html"
	        	},
	        	"leftPanel":{
	        		"id":"showPolicyNav",
	        		"url":"pages/general/left_panel.html"
	        	}
	        	},
			
		    {"id":"AlertasPoliza", "url":"pages/policyAlert/policiesAlert.html",
	        	"header":{
	        		"url":"pages/general/header.html"
	        	},
	        	"leftPanel":{
	        		"id":"alertsNav",
	        		"url":"pages/general/left_panel.html"
	        	}
	        	},
	        	{"id":"showContacts", "url":"pages/contacts/showContacts.html",
		        	"header":{
		        		"url":"pages/general/header.html"
		        	},
		        	"leftPanel":{
		        		"id":"showContactsNav",
		        		"url":"pages/general/left_panel.html"
		        	}
		        	},
		        	{"id":"contactsContent", "url":"pages/contacts/contactsContent.html",
			        	"header":{
			        		"url":"pages/general/header.html",
			        			"saveButton":"saveContact();"
			        	},
			        	"leftPanel":{
			        		"id":"contactsContNav",
			        		"url":"pages/general/left_panel.html"
			        	}
			        	}
	];
	
}


function initLanguage(){
	 var locale = WL.App.getDeviceLocale();
	    var lang = WL.App.getDeviceLanguage();
	    WL.Logger.debug(">> Detected locale: " + locale);
	    WL.Logger.debug(">> Detected language: " + lang);

	    if (locale.indexOf("en")!=-1) languageChanged("english");
	    if (locale.indexOf("es")!=-1) languageChanged("spanish");
}
function languageChanged(lang) {		
    switch (lang){
    	case "english":
    		setEnglish();
    		break;
    	case "spanish":
    		setSpanish();
    		break;
    }
    
    initProfileTranslations();
    initShowPoliciesTranslations();
    initMedicalDataTranslations();
    initMechanicDataTranslations();
    initAddPolicyTranslations();
    initReportSinisterTranslations();
    initReportSinisterDetTranslations();
    initSinisterListTranslations();
    initTheftsListTranslations();
    initPoliciesAlertsTranslations();
    initContactsTranslations();
    initLeftPanelTranslations();
    initSingUpTranslations();
    initLogInTranslations();
}

function initProfileTranslations (){
	 $("#myAccName").text(Messages.myAccName);
	    $("#enterDetails").text(Messages.enterDetails);
	    $("label[id='lblProfileName']").text(Messages.lblProfileName);
	    $("label[id='lblFirstName']").text(Messages.lblFirstName);
	    $("label[id='lblLastName']").text(Messages.lblLastName);
	    $("label[id='lblCellPhone']").text(Messages.lblCellPhone);
	    $("#lblCityRes").text(Messages.lblCityRes);
	    $("#lblCompany").text(Messages.lblCompany);
	    $("#h1ConfirmCity").text(Messages.h1ConfirmCity);
	    $("#h3SelectedCity").text(Messages.h3SelectedCity);	
}
function initShowPoliciesTranslations(){
	  $("#h3RecordsList").text(Messages.h3RecordsList);
	    $("#h1ConfirmPolicy").text(Messages.h1ConfirmPolicy);
	    $("#h3DeletePolicy").text(Messages.h3DeletePolicy);
	    $("#aAddPolicy").text(Messages.aAddPolicy);
	    $("#aDeletePolicy").text(Messages.aDeletePolicy); 
	    $("#h3SelectPolicyOp").text(Messages.h3SelectPolicyOp);
	    $("#aPolicyDetails").text(Messages.aPolicyDetails); 	   	
	    $("#h1PolicyDetail").text(Messages.h1PolicyDetail); 
	    $('a[id="aSUdata"]').text(Messages.aSUdata);
	    $('a[id="aKeepEd"]').text(Messages.aKeepEd);
	    $('a[id="aRPoliza"]').text(Messages.aRPoliza);
	    $('li[id="liSelectPolicyOp"]').text(Messages.h3SelectPolicyOp);
	    $("#pContact3").text(Messages.pContact3);
	    $('a[id="Details"]').text(Messages.aPolicyDetails);
	    $('a[id="Delete"]').text(Messages.aDeletePolicy);
	    $('a[id="New"]').text(Messages.aAddPolicy);
	    $('a[id="aContactsList"]').text(Messages.aContactsList);
	    $('h3[id="aContactsList"]').text(Messages.aContactsList);
	    $("#h3AddContacts").text(Messages.h3AddContacts);  
	   
}

function initMedicalDataTranslations(){
	 $("#lblIMSSNum").text(Messages.lblIMSSNum); 
	    $("#lblBloodType").text(Messages.lblBloodType); 
	    $("#lblAllergies").text(Messages.lblAllergies); 
	    $("#lblConditions").text(Messages.lblConditions); 
	    $("#h3MedicalData").text(Messages.h3MedicalData); 
}
function initMechanicDataTranslations(){
	 $("#h3MechanicDetails").text(Messages.h3MechanicDetails); 
	    $("#lblMechanicName").text(Messages.lblMechanicName); 
	    $("#lblMechanicFirstName").text(Messages.lblMechanicFirstName); 
	    $("#lblMechanicLastName").text(Messages.lblMechanicLastName); 
	    $("#lblMechanicCellPhone").text(Messages.lblMechanicCellPhone); 
	    $("#lblMechanicAddress").text(Messages.lblMechanicAddress); 
}
function initAddPolicyTranslations(){
	 $("#h3AddPolicies").text(Messages.h3AddPolicies); 
	    $("#lblPolicyNum").text(Messages.lblPolicyNum); 
	    $("#lblPolicyExpiration").text(Messages.lblPolicyExpiration); 
	    $("#opNoneInsurance").text(Messages.opNoneInsurance); 
	    $("#lblInsurance").text(Messages.lblInsurance);
	    $("#txtPolicyDate").attr("placeholder", Messages.placeholderDateFormat); 
	    $("#txtAseg").val(Messages.txtAseg);  
	    $('a[id="aRecordsList"]').text(Messages.aRecordsList); 
	    //Vehicle section
	    $("#h3Vehicle").text(Messages.h3Vehicle); 
	    $("#lblPlates").text(Messages.lblPlates); 
	    $("#lblSeries").text(Messages.lblSeries); 
	    $("#lblVehicleType").text(Messages.lblVehicleType); 
	    $("#lblMark").text(Messages.lblMark); 
	    $("#lblSubMark").text(Messages.lblSubMark); 
	    $("#lblModel").text(Messages.lblModel); 
	    $("#lblColor").text(Messages.lblColor); 
	    $("#aTakeCarPict").text(Messages.aTakeCarPict); 
	    $("#h1ConfirmMark").text(Messages.h1ConfirmMark); 
	    $("#pMark").text(Messages.pMark); 
	    $("#lblOwnerName").text(Messages.lblOwnerName); 
	    $("#pSubMark").text(Messages.pSubMark); 
	    $("#h3SelectedMark").text(Messages.h3SelectedMark); 
}

function initReportSinisterTranslations(){
	 $("#h3ReportIncident").text(Messages.h3ReportIncident); 
	    $("#aActualizeLocation").text(Messages.aActualizeLocation); 
	    $("#opSelectCar").text(Messages.opSelectCar); 
	    $("#aRepSinister").text(Messages.aRepSinister); 
	    $("#aRepTheft").text(Messages.aRepTheft);  
}

function initReportSinisterDetTranslations(){
	 $("#aTakeSinisterPic").text(Messages.aTakeSinisterPic); 
	    $("#lblflipAmbulancia").text(Messages.lblflipAmbulancia); 	    
	    $("#opOff").text(Messages.opOff); 
	    $("#opOn").text(Messages.opOn); 
	    $("#lblflipLegal").text(Messages.lblflipLegal);  
	    $("#opflipLegalOff").text(Messages.opOff); 
	    $("#opflipLegalOn").text(Messages.opOn);
	    $("#lblObservaciones").text(Messages.lblObservaciones);
	    $("#aSendInfo").text(Messages.aSendInfo);
}

function initSinisterListTranslations(){
	 $("#h3SinisterList").text(Messages.h3SinisterList); 
	    $("#aSinisterList").text(Messages.aSinisterList); 	    
	    $("#aTheftList").text(Messages.aTheftList); 
	    $('span[dat="listDate"]').text(Messages.date);
	    $('span[rep="sinister"]').text(Messages.report);
}

function initTheftsListTranslations(){
	 $("#h3TheftsList").text(Messages.h3TheftsList); 
	    $("#aSinisterList2").text(Messages.aSinisterList); 	    
	    $("#aTheftList2").text(Messages.aTheftList); 	   
}

function initPoliciesAlertsTranslations(){
	 $("#h3PoliciesAlerts").text(Messages.h3PoliciesAlerts); 
	    $("#pExpiredPolicy").text(Messages.pExpiredPolicy);    
}

function initContactsTranslations(){
	 $("#h3ContactsReport").text(Messages.h3ReportIncident);    
}

function initLeftPanelTranslations(){	
	 $('h2[tit="h2Profile"]').text(Messages.h2Profile);  	 	 
	 $('a[sel="aAccount"]').text(Messages.aAccount);  	 	 
	 $('a[sel="aPoliza"]').text(Messages.aPoliza);  	 	 
	 $('a[sel="aMedicalData"]').text(Messages.aMedicalData);  	 	 
	 $('a[sel="aMechanicContact"]').text(Messages.aMechanicContact);  	 	 
	 $('h2[tit="aSinister"]').text(Messages.aSinister);  	 	 
	 $('a[sel="aLiReportIncident"]').text(Messages.h3ReportIncident);  	 	 
	 $('a[sel="aLiTheftsList"]').text(Messages.aTheftList);  	 	 
	 $('a[sel="aLiSinistersList"]').text(Messages.aSinisterList);  	 	 
	 $('a[sel="aLiAlerts"]').text(Messages.aLiAlerts);  	 	 
	 $('h2[sel="aContacts"]').text(Messages.aContacts);  
	 $('a[sel="aEmergencies"]').text(Messages.aEmergencies);  
	 $('a[sel="aInsurances"]').text(Messages.aInsurances);  
	 
}

function initSingUpTranslations(){	
	 $('#h2SignUp').text(Messages.h2SignUp); 
	 $('#txtName').attr("placeholder", Messages.txtName); 
	 $('#txtNacimiento').attr("placeholder", Messages.txtNacimiento); 
	 $('#txtPais').attr("placeholder", Messages.txtPais); 
	 $('#txtCiudad').attr("placeholder", Messages.txtCiudad); 
	 $('#txtEmail').attr("placeholder", Messages.txtEmail); 
	 $('#txtPass').attr("placeholder", Messages.txtPass); 
	 $('#txtPassConfirm').attr("placeholder", Messages.txtPassConfirm); 
	 $('#txtCelular').attr("placeholder", Messages.txtCelular); 
	 $('#aSignUp').text(Messages.h2SignUp); 
	 $('#aSignIn').text(Messages.aSignIn); 
}

function initSingUpTranslations(){	
	 $('#h2SignUp').text(Messages.h2SignUp); 
	 $('#txtName').attr("placeholder", Messages.txtName); 
	 $('#txtNacimiento').attr("placeholder", Messages.txtNacimiento); 
	 $('#txtPais').attr("placeholder", Messages.txtPais); 
	 $('#txtCiudad').attr("placeholder", Messages.txtCiudad); 
	 $('#txtEmail').attr("placeholder", Messages.txtEmail); 
	 $('#txtPass').attr("placeholder", Messages.txtPass); 
	 $('#txtPassConfirm').attr("placeholder", Messages.txtPassConfirm); 
	 $('#txtCelular').attr("placeholder", Messages.txtCelular); 
	 $('#aSignUp').text(Messages.h2SignUp); 
	 $('#aSignIn').text(Messages.aSignIn); 
	 
}

function initLogInTranslations(){	
	 $('#btnLogIn').val(Messages.aSignIn); 
	 $('#aLogSignUp').text(Messages.h2SignUp);
	 $('#txtPwd').attr("placeholder", Messages.txtPass);
	 $('#aHelp').text(Messages.aHelp);
}

function initSinisterPopUpTranslations(){
	//use this function in pagebeforeshow 
	$('h1[h1pop="popHeader"]').text(Messages.popHeader);
	$('h3[h3pop="popTitle"]').text(Messages.popTitle);
	$('p[ppop="popContent"]').text(Messages.popContent);
}
