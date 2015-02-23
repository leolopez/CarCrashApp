/**
 * @param objAccount
 *            must be an object of account class from js/account.js
 * @returns json true if registration was successful false if it isn't
 */
function registerAccount(objAccount)
{
	var ret = {value:true};
	return ret;
}

/**
 * @param objAccount
 *            must be an object of account class from js/account.js
 * @returns json account object of user / null if login was incorrect
 */
function verifyLogin(pData)
{
	var oAcc = {
			data:{
				firstName: "Diego",
				lastName: "",
				birthDay: "1991-03-10",
				country: "",
				state: "",
				city: "",
				email: "123@123.com",
				cellPhone: "123123123123",
				password: "123123"
			}
	};
	
	if(oAcc.data.email == pData.email && oAcc.data.password == pData.password){
		return oAcc;
	}
	else{
		return {};
	}
}