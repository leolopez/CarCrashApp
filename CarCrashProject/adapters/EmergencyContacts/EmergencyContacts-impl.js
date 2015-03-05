var selectStatement = WL.Server.createSQLStatement("select * from EmergencyContacts where Email=?");

var addStatement = WL.Server.createSQLStatement(" insert into EmergencyContacts(Identifier,Email,FirstName,LastName,SecondLastName,CellPhone) values(?,?,?,?,?,?)" 
	);
var updateStatement = WL.Server.createSQLStatement(" update EmergencyContacts set FirstName=?,LastName=?,SecondLastName=?,CellPhone=? where Identifier=?  and Email=? ");
var deleteStatement = WL.Server.createSQLStatement("delete EmergencyContacts where identifier=? and email=? ");



	/************************************************************************
	 * Implementation code for procedure - 'procedure2'
	 *
	 * @param - account object from js/
	 * @return - invocationResult
	 */

function getEmergencyContacts(oData) {
	var result = WL.Server.invokeSQLStatement({
		preparedStatement : selectStatement,
		parameters : [oData.email]
	});
	var oReturn = [];
	if(result.resultSet!=undefined){
	for(var i = 0; i < result.resultSet.length; i++){
		var data = {
				identifier: result.resultSet[i].identifier, 
				email: result.resultSet[i].email, 
				UserContactFirstName:result.resultSet[i].FirstName,
				UserContactLastName:result.resultSet[i].LastName, 
				UserContactSecondLastName:result.resultSet[i].SecondLastName,
				UserContactCellPhone:result.resultSet[i].CellPhone					
					
				};
		
	
		oReturn.push(data);
	}
	}
	return {data: oReturn};
}

function saveEmergencyContacts(param1) {
	switch(param1.operation){
	case "add":
		save(param1.json);
		break;
	case "replace":
		update(param1.json);
		break;
	case "remove":
		remove(param1.json);
		break;
	}		
		return {};
}

function save(pEmergencyContacts){
	return WL.Server.invokeSQLStatement({
		preparedStatement : addStatement,
		parameters : [  pEmergencyContacts.identifier, pEmergencyContacts.email,
		               ,pEmergencyContacts.UserContactFirstName, pEmergencyContacts.UserContactLastName, 
		               pEmergencyContacts.UserContactSecondLastName, pEmergencyContacts.UserContactCellPhone
		                ]
	});
}
function update(pEmergencyContacts){
	
	return WL.Server.invokeSQLStatement({
		preparedStatement : updateStatement,
		parameters : [pEmergencyContacts.UserContactFirstName, pEmergencyContacts.UserContactLastName,  pEmergencyContacts.UserContactSecondLastName, 
		              pEmergencyContacts.UserContactCellPhone
		              ,pEmergencyContacts.identifier, pEmergencyContacts.email ]
	});
}
function remove(pEmergencyContacts){
	return WL.Server.invokeSQLStatement({
		preparedStatement : deleteStatement,
		parameters : [ pEmergencyContacts.identifier, pEmergencyContacts.email]
	});
}