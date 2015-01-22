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
					if(obj.leftPanel)
					{
						$("#" + obj.id).append(data.replace("{leftPanel}", "#" + obj.leftPanel.id));
					}
					else
					{
						$("#" + obj.id).append(data);
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
	setTimeout("location.href = '#login';", 700); //First page to show
	setTimeout("$('a').attr('data-transition','slide');", 700); //general app transition
}

//Pages array to load on index
function getPages()
{
	//add each page to view in app
	//Examples:
	//for adding a header:
	////"header":{
	////	"url":"pages/general/header.html",	        		
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
	        
	        {"id":"signup", "url":"pages/account/signup.html"}
	];
}