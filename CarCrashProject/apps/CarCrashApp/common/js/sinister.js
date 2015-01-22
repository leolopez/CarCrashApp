var sPageNav = "";
function sendIncidenteInfo()
{
	if(currentLat != 0 && currentLng != 0)
	{
		if($('#selectAuto').val() != 0)
		{
			alert('Posicion:\nLatitud - ' +
					currentLat +
					'\nLongitud - ' + currentLng +
					'\nAuto:\n' +
					$('#selectAuto option:selected').text() +
					'\nPlacas - HCM-2101\nPoliza - 11111111');
			location.href = sPageNav;
		}
		else
		{
			alert('Debe seleccionar el automovil siniestrado.');
			parent.history.back();
		}
	}
	else
	{
		alert('Su ubicación no puede ser leída.');
		parent.history.back();
	}
}

function takePicture()
{
	navigator.camera.getPicture(
	        function(data) {
	        	$('#photoCube').hide();
	        	var div = "<div style=\"width: 65px; height: 65px; border: thin; border-style: dashed; display: inline-block; padding: 5px 5px 5px 5px;\">";
	        	var img = "<img src=\"" + data + "\" width=\"100%\" height=\"100%\" /></div>";
	            $('#photos').append(div + img);
	        },
	        function(e) {
	            console.log("Error getting picture: " + e);
	        },
	        { quality: 50, destinationType: navigator.camera.DestinationType.FILE_URI, sourceType : navigator.camera.PictureSourceType.CAMERA});
}

function enviarExtras()
{
	var iPhotos = $('#photos > div').length - 1;
	var ambulancia = $('#flipAmbulancia').val();
	var legal = $('#flipLegal').val();
	var observaciones = $('#txtObservaciones').val();
	
	alert('Fotos enviadas: ' + iPhotos +
			'\nAmbulancia? - ' + ambulancia +
			'\nAsistencia Legal? - ' + legal +
			'\nObservaciones: ' + observaciones);
	
	location.href="#sinisterList";
}

function reportar(page)
{
	sPageNav = page;
}