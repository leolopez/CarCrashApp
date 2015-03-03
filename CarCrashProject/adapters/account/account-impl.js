var addStatement = WL.Server.createSQLStatement("insert into Accounts (FirstName, BirthDate, Email, CellPhone, Password) values (?, ?, ?, ?, ?)");
var selectStatement = WL.Server.createSQLStatement("select FirstName AS 'firstName', LastName As 'lastName', SecondLastName As 'secondLastName', BirthDate As 'birthDate', Country AS 'country', State AS 'state', City AS 'city', Email AS 'email', CellPhone AS 'cellPhone', Password AS 'password' FROM Accounts WHERE Email = ? AND Password = ?");

/************************************************************************
 * Implementation code for procedure - 'procedure1'
 *
 * @param - email and passwor to validate
 * @return - invocationResult
 */
function accessAccount(pData) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : selectStatement,
		parameters : [pData.email, pData.password]
	});
}

/************************************************************************
 * Implementation code for procedure - 'procedure2'
 *
 * @param - account object from js/account.js
 * @return - invocationResult
 */
function saveAccount(account) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : addStatement,
		parameters : [account.firstName, account.birthDate, account.email, account.cellPhone, account.password]
	});
}

