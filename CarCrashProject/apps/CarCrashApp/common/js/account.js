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
		alert("Registrado correctamente, ahora inicie sesion con su e-mail y password");
		location.href = "#login";
		$("#frmSignUp")[0].reset();
	}
	else{
		alert('Ocurrio un error al crear su cuenta, por favor intente de nuevo.');
	}
}
function saveAccountFailure(error){
	alert('Error al registrarse, asegurese de contar con conexion a internet.');
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
				location.href = "#perfil";
			}
			else{
				alert('Ocurrio un error al guardar su usuario. Intentelo de nuevo.');
			}
		};
		oJS.fnFail = function(){
			alert('Ocurrio un error al guardar su usuario. Intentelo de nuevo.');
		};
		oJS.save(false, false);
	}
	else{
		alert('E-Mail y Password incorrectos.');
		$('#txtPass').val("").focus();
	}
}

function accessFailure(error){
	alert('Error, asegurese de contar con conexion a internet.');
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
		alert('Los campos de password no coinciden.');
		$("#txtPass").focus();
		$("#txtPass").val("");
		$("#txtPassConfirm").val("");
	}
}