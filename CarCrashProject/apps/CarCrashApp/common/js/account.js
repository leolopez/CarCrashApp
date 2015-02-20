function logIn()
{
	var mail = $('#txtEmail').val();
	var pass = $('#txtPwd').val();
	
	//Check User
	
	if(mail != "admin" || pass != "admin")
	{
		alert('Fallo en Log In');
	}
	else
	{
		//Guardar datos en jsonstore
		location.href = "#sinisterList";
	}
}

function signUp()
{
	var form = $("#frmSignUp");
	form.validate({
		errorElement:'div',
		required: "*",
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
		alert("Registrado correctamente, ahora inicie sesion con su e-mail y password");
		location.href = "#login";
		//Enviar datos a server
		//Limpiar campos
		$("#frmSignUp")[0].reset();
	}
}