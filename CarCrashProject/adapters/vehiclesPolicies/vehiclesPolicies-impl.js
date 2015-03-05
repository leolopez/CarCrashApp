
var selectStatement = WL.Server.createSQLStatement("select * from Vehicle");
var addStatement = WL.Server.createSQLStatement(" insert into InsurancePolicies(Email,PolicyNumber,ExpirationDate,IDInsuranceCompany,Identifier) values(?,?,?,?,?)" +
		" insert into Vehicle (Plates,Serie,VehicleType,IDVehicleBrand,Model,Year,Color,PictureURL,OwnerName,Cellphone, Email, Identifier) values ( ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?)"
		);
var updateStatement = WL.Server.createSQLStatement("update Vehicle set  Plates=?,Serie=?, VehicleType=?, IDVehicleBrand=?, Model=?, Year=?,Color=?,PictureURL=?,OwnerName=?,Cellphone=? where identifier=? and email=?" +
		" update InsurancePolicies set PolicyNumber=?,ExpirationDate=?,IDInsuranceCompany=? where identifier=? and email=?");
var deleteStatement = WL.Server.createSQLStatement("delete InsurancePolicies where identifier=? and email=? delete Vehicle where identifier=? and email=? ");



	/************************************************************************
	 * Implementation code for procedure - 'procedure2'
	 *
	 * @param - account object from js/
	 * @return - invocationResult
	 */

function getSqlAdapters() {
	return WL.Server.invokeSQLStatement({
		preparedStatement : selectStatement,
		parameters : []
	});
}

function saveVehiclePolicies(param1) {
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

function save(pVehiclesPolicies){
	return WL.Server.invokeSQLStatement({
		preparedStatement : addStatement,
		parameters : [ pVehiclesPolicies.email,  
			              pVehiclesPolicies.PolicyNo, pVehiclesPolicies.PolicyDate,pVehiclesPolicies.Insurance,pVehiclesPolicies.identifier,
			              pVehiclesPolicies.Plates,pVehiclesPolicies.Serie,pVehiclesPolicies.VehicleType,pVehiclesPolicies.Mark,pVehiclesPolicies.SubMark,pVehiclesPolicies.Model,pVehiclesPolicies.Color,
			              pVehiclesPolicies.carPicture,
		              pVehiclesPolicies.Holder, pVehiclesPolicies.OwnerCellPhone, pVehiclesPolicies.email, pVehiclesPolicies.identifier ]
	});
}
function update(pVehiclesPolicies){
	WL.Logger.info(pVehiclesPolicies);
	return WL.Server.invokeSQLStatement({
		preparedStatement : updateStatement,
		parameters : [ pVehiclesPolicies.Plates,pVehiclesPolicies.Serie,pVehiclesPolicies.VehicleType,pVehiclesPolicies.Mark,pVehiclesPolicies.SubMark,pVehiclesPolicies.Model,pVehiclesPolicies.Color,pVehiclesPolicies.carPicture,
			              pVehiclesPolicies.Holder, pVehiclesPolicies.OwnerCellPhone, pVehiclesPolicies.identifier,  pVehiclesPolicies.email,  
			              pVehiclesPolicies.PolicyNo, pVehiclesPolicies.PolicyDate,pVehiclesPolicies.Insurance,pVehiclesPolicies.identifier, pVehiclesPolicies.email ]
	});
}
function remove(pVehiclesPolicies){
	return WL.Server.invokeSQLStatement({
		preparedStatement : deleteStatement,
		parameters : [pVehiclesPolicies.identifier, pVehiclesPolicies.email, pVehiclesPolicies.identifier, pVehiclesPolicies.email]
	});
}