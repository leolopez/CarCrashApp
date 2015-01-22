function logIn()
{
	var mail = $('#txtEmail').val();
	var pass = $('#txtPwd').val();
	if(mail != "admin" || pass != "admin")
	{
		alert('Fallo en Log In');
	}
	else
	{
		location.href = "#sinisterList";
	}
}