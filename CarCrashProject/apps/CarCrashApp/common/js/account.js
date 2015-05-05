function account()
{
	this.firstName = "";
	this.lastName = "";
	this.secondLastName = "";
	this.birthDate = "";
	this.country = "";
	this.state = "";
	this.city = "";
	this.email = "";
	this.cellPhone = "";
	this.password = "";
	
	//functions
	this.save = saveAccount;
	this.access = accessAccount;
}

function saveAccount(pAccount)
{	
	var restHelper = new clsRestHelper('account','saveAccount',pAccount, saveAccountSuccess, saveAccountFailure);
	restHelper.callRestAdapter();
}
function saveAccountSuccess(result){
	var oResult = result.invocationResult;
	if(oResult.isSuccessful && oResult.isSuccessful)
	{
		navigator.notification.alert(
				"Registrado correctamente, ahora inicie sesion con su e-mail y password",
				function(){
			location.href = "#login";
			$("#frmSignUp")[0].reset();
		});
	}
	else{
		navigator.notification.alert(
		'Ocurrio un error al crear su cuenta, por favor intente de nuevo.',
		function() {});
	}
}
function saveAccountFailure(error){
	navigator.notification.alert(
	'Error al registrarse, asegurese de contar con conexion a internet.',
	function(){}, "Error");
}

function accessAccount(pEmail, pPassword)
{
	var restHelper = new clsRestHelper('account','accessAccount', {email:pEmail, password:pPassword}, accessSuccess, accessFailure);
	restHelper.callRestAdapter();
}

function accessSuccess(result){
	var oResult = result.invocationResult.resultSet[0];
	if(oResult){
		//Guardar datos en jsonstore
		var oJS = new clsJsonStoreHelper();
		oJS.collectionName = "perfil";
		oJS.document = oResult;
		oJS.id = 0;
		oJS.fnSuccess = function(numAdd){
			if(numAdd > 0){
				//redireccionar a perfil
				getGlobalData();
				location.href = "#perfil";
			}
			else{
				navigator.notification.alert(
				'Ocurrio un error al guardar su usuario. Intentelo de nuevo.',
				function onSuccess() {
				});
			}
		};
		oJS.fnFail = function(){
			navigator.notification.alert(
			'Ocurrio un error al guardar su usuario. Intentelo de nuevo.',
			function onSuccess() {
			}, "Error");
		};
		oJS.save(false, false);
	}
	else{
		navigator.notification.alert(
		'E-Mail y Password incorrectos.',
		function onSuccess() {
			$('#txtPass').val("").focus();
		});
	}
}

function accessFailure(error){
	 WL.Logger.debug(">> accessFailure : " + JSON.stringify(error));
	navigator.notification.alert(
	'Error, asegurese de contar con conexion a internet.',
	function onSuccess() {
	}, "Error");
}

function logIn()
{
	var mail = $('#txtEmail').val();
	var pass = $('#txtPwd').val();
	
	var oAcc = new account();
	oAcc.email = mail;
	oAcc.password = pass;
	
	oAcc.access(mail,pass);
}

function signUp()
{
	//Check password confirmation
	if($("#txtPass").val() === $("#txtPassConfirm").val()){
		var form = $("#frmSignUp");
		form.validate({
			errorElement:'div',
			rules:{
				txtName:{
					required: true,
					minlength: 2
				},
				txtPass:{
					required: true,
					minlength: 5
				},
				txtPassConfirm:{
					required: true,
					minlength: 5
				},
				txtCelular:{
					required: true,
					minlength: 10
				}
			}
		});
		if(form.valid())
		{
			//Enviar datos a server
			var oAccount = new account();
			oAccount.firstName = $("#txtName").val();
			oAccount.birthDate = $("#txtNacimiento").val();
			oAccount.email = $("#txtEmailSu").val();
			oAccount.password = $("#txtPass").val();
			oAccount.cellPhone = $("#txtCelular").val();
			
			oAccount.save(oAccount);		
		}
	}
	else{
		navigator.notification.alert('Los campos de password no coinciden.',
		function onSuccess() {
			$("#txtPass").focus();
			$("#txtPass").val("");
			$("#txtPassConfirm").val("");
		});
	}
}
function logOut(){
	navigator.notification.confirm(
	"Are you sure?",
	function onConfirm(result) {
		if(result == 1){		
			cleanProfileInputs();
			WL.JSONStore.destroy();
			location.href = "#login";
		}
	},
	"Logout");
}

function cleanProfileInputs(){	
	$('input').text("");
}