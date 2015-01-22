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
	location.href = '#login'; //First page to show
	$('a').attr('data-transition','slide');	//general app transition
	$("a[href='#sinisterReport']").click(function(){
    	getLocation();
    });
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
	        
	        //Leo's scripts
	        
	        {"id":"DatosMecanico", "url":"pages/profile/mechanic.html"},
	        
		    {"id":"DatosMedicos", "url":"pages/profile/medical.html"},
			
		    {"id":"AgregarPoliza", "url":"pages/profile/policiesContent.html"},
			
		    {"id":"perfil", "url":"pages/profile/profile.html"},
			
		    {"id":"poliza", "url":"pages/profile/showPolicies.html"},
			
		    {"id":"AlertasPoliza", "url":"pages/policyAlert/policiesAlert.html"}
	];
}