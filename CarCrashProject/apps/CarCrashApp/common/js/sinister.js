var sPageNav = "";
var oCurrentSinister = new clsSinister();
function clsSinister(){
	this.data = {
		idPolicy: 0,
		date: (new Date().getFullYear()) + '-' + ((new Date().getMonth()) + 1) + '-' + (new Date().getDate()),
		time: (new Date().getHours()) + ':' + (new Date().getMinutes()) + ':' + (new Date().getSeconds()),
		type: "",
		status: 0,
		location: new clsLocation(),
		extras: new clsReportExtras()
	};
	
	this.save = _saveSinister;
	//this.remove = _removeSinister;
	//this.get = _getSinister;
	
	this.fnSuccess = function(){};
	this.fnFail = function(){};
}

function clsLocation(){
	this.lat = "";
	this.lng = "";
}

function clsReportExtras(){
		this.pictures = [];
		this.medicalAssistance = false;
		this.legalAssistance = false;
		this.comments = "";
}

function _saveSinister(){
	var fnSuccess = this.fnSuccess;
	var fnFail = this.fnFail;
	var doc = this.data;

	var oJS = new clsJsonStoreHelper();
	oJS.collectionName = "reports";
	oJS.document = doc;
	oJS.id = 0;
	oJS.fnSuccess = fnSuccess;
	oJS.fnFail = fnFail;
	oJS.save();
}

function sendIncidenteInfo()
{	
	if(currentLat != 0 && currentLng != 0)
	{
		if($('#selectAuto').val() != 0)
		{
			oCurrentSinister.data.idPolicy = parseInt($('#selectAuto').val());
			oCurrentSinister.data.status = 0;
			oCurrentSinister.data.location.lat = currentLat;
			oCurrentSinister.data.location.lng = currentLng;
			if(sPageNav == "#reportSinisterDet"){
				oCurrentSinister.data.type = "sinister";
			}else{
				oCurrentSinister.data.type = "theft";
				oCurrentSinister.fnSuccess = function(numadd){
					//save local success
					var oJS = new clsJsonStoreHelper();
					oJS.collectionName = 'reports';
					oJS.fnSuccess = function(response){
						//save server success
						oJS.fnSuccess = function(response){
							//get server success
							loadTheftList();
						};
						oJS.fnFail = function(error){
							navigator.notification.alert(
							'Error al actualizar status de reportes.',
							function onSuccess() {
							}, "Error");
						};
						oJS.getFromServer("sinisters", "getSinisters");
						navigator.notification.alert(
						'Reportado exitosamente',
						function onSuccess() {
						});
						return true;
					};
					oJS.fnFail = function(error){
						navigator.notification.alert(
						'No se pudo conectar al servidor, reintente.',
						function onSuccess() {
						}, "Error");
					};
					oJS.saveToServer("sinisters", "saveSinisters");
				};
				oCurrentSinister.fnFail = function(error){
					navigator.notification.alert(
					'Error al generar el reporte, intentelo de nuevo.',
					function onSuccess() {
					});
				};
				oCurrentSinister.save();
			}
			location.href = sPageNav;
		}
		else
		{
			navigator.notification.alert(
			Messages.selectAuto,
			function onSuccess() {
				parent.history.back();
			});
		}
	}
	else
	{
		navigator.notification.alert(
		Messages.alertLocation,
		function onSuccess() {
			parent.history.back();
		});
	}
}

function takePicture()
{
	navigator.camera.getPicture(
	        function(data) {
	        	$('#photoCube').hide();
	        	var div = "<div style=\"width: 65px; height: 65px; border: thin; border-style: dashed; display: inline-block; padding: 5px 5px 5px 5px;\">";
	        	var img = "<img ident=\"pics\" src=\"" + data + "\" width=\"100%\" height=\"100%\" /></div>";
	            $('#photos').append(div + img);
	        },
	        function(e) {
	            console.log("Error getting picture: " + e);
	        },
	        { quality: 50, destinationType: navigator.camera.DestinationType.FILE_URI, sourceType : navigator.camera.PictureSourceType.CAMERA, saveToPhotoAlbum: true});
}

function enviarExtras()
{
	//var iPhotos = $('#photos > div').length - 1;
	var ambulancia = $('#flipAmbulancia').val();
	var legal = $('#flipLegal').val();
	var observaciones = $('#txtObservaciones').val();
	
	oCurrentSinister.data.extras.medicalAssistance = ambulancia == 'on' ? true : false;
	oCurrentSinister.data.extras.legalAssistance = legal == 'on' ? true : false;
	oCurrentSinister.data.extras.comments = observaciones;
	
	$('img[ident="pics"]').each(function(idx,item){
		var imgSrc = $(item).attr("src");
		oCurrentSinister.data.extras.pictures.push({url:imgSrc});
	});
	
	oCurrentSinister.fnSuccess = function(){
		var oJS = new clsJsonStoreHelper();
		oJS.collectionName = 'reports';
		oJS.fnSuccess = function(response){
			//save server success
			oJS.fnSuccess = function(response){
				//get server success
				loadSinisterList();
			};
			oJS.fnFail = function(error){
				navigator.notification.alert(
				'Error al actualizar status de reportes.',
				function onSuccess() {
				}, "Error");
			};
			oJS.getFromServer("sinisters", "getSinisters");
			navigator.notification.alert(
			'Reportado exitosamente.',
			function onSuccess() {
			});
			return true;
		};
		oJS.fnFail = function(error){
			navigator.notification.alert(
			'No se pudo conectar al servidor, reintente.',
			function onSuccess() {
			}, "Error");
		};
		oJS.saveToServer("sinisters", "saveSinisters");
		
		location.href="#sinisterList";
	};
	oCurrentSinister.fnFail = function(){
		navigator.notification.alert(
		'Error al generar el reporte, intentelo de nuevo.',
		function onSuccess() {
		}, "Error");
	};
	oCurrentSinister.save();
}

function reportar(page)
{
	sPageNav = page;
	navigator.notification.confirm(
	// Shows a customizable confirmation dialog box.

	// Confirm dialog message (String)
	"Esta seguro que desea levantar un reporte? Esta accion enviara su ubicacion y datos a su aseguradora.",
	// Callback to invoke with index of button pressed (1, 2 or 3)
	function onConfirm(result) {
		if(result == 1){
			sendIncidenteInfo();
		}
	},
	"Reportar?");
}

function loadSinisterList(){
	var oJStore = new clsJsonStoreHelper();
	oJStore.collectionName = "reports";
	oJStore.fnSuccess = function(){
		showLocalReports();
	};
	oJStore.fnFail = function(){
		showLocalReports();
	};
	oJStore.getFromServer("sinisters", "getSinisters");
}

function showLocalReports(){
	var oJStore = new clsJsonStoreHelper();
	oJStore.collectionName = "reports";
	oJStore.options = {};
	oJStore.document = {key:"type", operator:"equal", value:"sinister"};
	oJStore.fnSuccess = function(result){
		$("#ulSinisters").html('');
		$(result).each(function(idx, item){
			var oJSAuto = new clsJsonStoreHelper();
			oJSAuto.collectionName = "PolicyVehicle";
			oJSAuto.options = {};
			oJSAuto.document = {};
			oJSAuto.id = item.json.idPolicy;
			oJSAuto.fnSuccess = function(resultAuto){
				$("#ulSinisters").append(	"<li>" +
												"<a href=\"#\" onclick=\"showDetails('sinister', " + item._id + ", " + resultAuto[0]._id + ");\">" +
													"<img src=\"" + resultAuto[0].json.carPicture + "\" height=\"100%\" width=\"100%\">" +
													"<h2><span><img style=\"width:10px;height:10px;\" src=\"images/general/" + (item.json.status == 0 ? "red" : item.json.status == 1 ? "yellow" : item.json.status == 2 ? "green" : "gray") + "_dot.png\"/></span>  " + resultAuto[0].json.Mark + "-" + resultAuto[0].json.SubMark + "</h2>" +
													"<p><span dat=\"listDate\">Date: </span> " + item.json.date + " |<span rep=\"sinister\"> Report: </span> " + item._id + "</p>" +
												"</a>" + 
											"</li>");
				$('#ulSinisters').listview('refresh').trigger('create');
			};
			oJSAuto.fnFail = function(errorAuto){
				
			};
			oJSAuto.get();
		});
	};
	oJStore.fnFail = function(error){
		navigator.notification.alert(
		'Error al cargar listado de siniestros.',
		function onSuccess() {
		}, "Error");
	};
	oJStore.get();
}

function loadTheftList(){
	var oJStore = new clsJsonStoreHelper();
	oJStore.collectionName = "reports";
	oJStore.options = {};
	oJStore.document = {key:"type", operator:"equal", value:"theft"};
	oJStore.fnSuccess = function(result){
		$("#ulThefts").html('');
		$(result).each(function(idx, item){
			var oJSAuto = new clsJsonStoreHelper();
			oJSAuto.collectionName = "PolicyVehicle";
			oJSAuto.options = {};
			oJSAuto.document = {};
			oJSAuto.id = item.json.idPolicy;
			oJSAuto.fnSuccess = function (resultAuto){
				$("#ulThefts").append(	"<li ele='a'>" +
											"<a href=\"#\" onclick=\"showDetails('theft', " + item._id + ", " + resultAuto[0]._id + ");\">" +
												"<img src=\"" + resultAuto[0].json.carPicture + "\" height=\"100%\" width=\"100%\">" +
												"<h2><span><img style=\"width:10px;height:10px;\" src=\"images/general/" + (item.json.status == 0 ? "red" : item.json.status == 1 ? "yellow" : item.json.status == 2 ? "green" : "gray") + "_dot.png\"/></span>  " + resultAuto[0].json.Mark + "-" + resultAuto[0].json.SubMark + "</h2>" +
												"<p><span dat=\"listDate\">Date: </span> " + item.json.date + " |<span rep=\"sinister\"> Report: </span> " + item._id + "</p>" +
											"</a>" + 
										"</li>");
				$('#ulThefts').listview('refresh').trigger('create');
			};
			oJSAuto.fnFail = function (errorAuto){
				navigator.notification.alert(
				'Error al obtener datos del vehiculo.',
				function onSuccess() {
				}, "Error");
			};
			oJSAuto.get();
		});
	};
	oJStore.fnFail = function(error){
		navigator.notification.alert(
		'Error al cargar listado de siniestros.',
		function onSuccess() {
		}, "Error");
	};
	oJStore.get();
}

function loadVehiclesList(){
	var oJStore = new clsJsonStoreHelper();
	oJStore.collectionName = "PolicyVehicle";
	oJStore.options = {};
	oJStore.document = {};
	oJStore.fnSuccess = function(result){
		$("option","#selectAuto").remove();
		//$( "select" ).selectmenu();	
		$("#selectAuto").append('<option id="opSelectCar" value="0" selected="selected">Select your car</option>');
		$(result).each(function(idx, item){
			$("#selectAuto").append('<option value="' + item._id + '">' + item.json.Mark + '-' + item.json.SubMark  + '</option>');
		});
		$('#selectAuto').value = "0";
		$( "#selectAuto" ).selectmenu( "refresh", true );
		//$("#selectAuto").listview('refresh').trigger('create');
	};
	oJStore.fnFail = function(error){
		navigator.notification.alert(
		'Error al obtener los autos registrados.',
		function onSuccess() {
		}, "Error");
	};
	oJStore.get();
}

function loadSinisterData(){
	$("#imgConsAuto").attr("src",$("#hidConsImgAuto").val());
	
	$("#tdConsMarca").text($("#hidConsMarca").val());
	$("#tdConsSubMarca").text($("#hidConsSubmarca").val());
	$("#tdConsModelo").text($("#hidConsModelo").val());
	$("#tdConsPlacas").text($("#hidConsPlacas").val());
	$("#tdConsColor").text($("#hidConsColor").val());
	$("#tdConsPoliza").text($("#hidConsPoliza").val());
	$("#tdConsExp").text($("#hidConsExp").val());
	$("#tdConsAseguradora").text($("#hidConsAseguradora").val());
	
	$("#tdConsLegalAsis").text($("#hidConsLegalAsis").val());
	$("#tdConsMedAsis").text($("#hidConsMedAsis").val());
	$("#tdConsCom").text($("#hidConsComentarios").val());
	
	setMap(Number($("#hidConsLat").val()), Number($("#hidConsLng").val()), "mapConsultSinister");	
}

function showDetails(pType, pReportId, pAutoId){
	var oJS = new clsJsonStoreHelper();
	oJS.collectionName = "reports";
	oJS.id = pReportId;
	oJS.fnSuccess = function(report){
		$("#hidConsLat").val(report[0].json.location.lat);
		$("#hidConsLng").val(report[0].json.location.lng);
		switch(pType){
		case "sinister":
			$("#divConsExtras").show();
			$("#hidConsLegalAsis").val(report[0].json.extras.legalAssistance ? "Si" : "No");
			$("#hidConsMedAsis").val(report[0].json.extras.medicalAssistance ? "Si" : "No");
			$("#hidConsComentarios").val(report[0].json.extras.comments);
			break;
		case "theft":
			$("#divConsExtras").hide();
			break;
		}
		location.href = "#consultSinister";
	};
	oJS.fnFail = function(error){
		navigator.notification.alert(
		'Error al obtener los datos del siniestro.',
		function onSuccess() {
			parent.history.back();
		}, "Error");
	};
	oJS.get();
	
	oJS.collectionName = "PolicyVehicle";
	oJS.id = pAutoId;
	oJS.fnSuccess = function(vehicle){
		$("#hidConsImgAuto").val(vehicle[0].json.carPicture);
		$("#hidConsMarca").val(vehicle[0].json.Mark);
		$("#hidConsSubmarca").val(vehicle[0].json.SubMark);
		$("#hidConsModelo").val(vehicle[0].json.Model);
		$("#hidConsPlacas").val(vehicle[0].json.Plates);
		$("#hidConsColor").val(vehicle[0].json.Color);
		$("#hidConsPoliza").val(vehicle[0].json.PolicyNo);
		$("#hidConsExp").val(vehicle[0].json.PolicyDate);
		$("#hidConsAseguradora").val(vehicle[0].json.insurance);
		location.href = "#consultSinister";
	};
	oJS.fnFail = function(error){
		navigator.notification.alert(
		'Error al obtener los datos del vehiculo.',
		function onSuccess() {
			parent.history.back();
		}, "Error");
	};
	oJS.get();
}

$(document).on("pageshow", "#sinisterList", function(event){loadSinisterList();});
$(document).on("pageshow", "#theftsList", function(event){loadTheftList();});
$(document).on("pageshow", "#sinisterReport", function(event){oCurrentSinister = new clsSinister();});
$(document).on("pageshow", "#consultSinister", function(event){loadSinisterData();});
$(document).on("pageinit", "#sinisterReport", function(event){loadVehiclesList();});

$(document).on('pagebeforeshow','#sinisterReport',function(e,data){    
	initSinisterPopUpTranslations(); 				  
});	