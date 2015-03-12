var selectStatement = WL.Server.createSQLStatement("select * from medicalData where Email=?");
var existStatement = WL.Server.createSQLStatement("select * from medicalData where  Email=?");

var addStatement = WL.Server.createSQLStatement(" insert into medicalData(Identifier,Email,InsuranceNumber,TypeBlood,Alergies,Ailment) values(?,?,?,?,?,?)" 
	);
var updateStatement = WL.Server.createSQLStatement(" update medicalData set InsuranceNumber=?,TypeBlood=?,Alergies=?,Ailment=? where  Email=? ");


	/************************************************************************
	 * Implementation code for procedure - 'procedure2'
	 *
	 * @param - medicalData json from js/medicalData.js
	 * @return - invocationResult
	 */

function getMedicalData(oData) {
	var result = WL.Server.invokeSQLStatement({
		preparedStatement : selectStatement,
		parameters : [oData.email]
	});
	var oReturn = [];
	if(result.resultSet!=undefined){
	for(var i = 0; i < result.resultSet.length; i++){
		var data = {
				identifier: result.resultSet[i].Identifier, 
				email: result.resultSet[i].Email, 
				IMSS:result.resultSet[i].InsuranceNumber,
				bloodType:result.resultSet[i].TypeBlood, 
				alergics:result.resultSet[i].Alergies,
				clinicalConditions:result.resultSet[i].Ailment
				};
		
	
		oReturn.push(data);
	}
	}
	return {data: oReturn};
}

function saveMedicalData(param1) {
	var result = WL.Server.invokeSQLStatement({
		preparedStatement : existStatement,
		parameters : [ param1.email]
	});
	
	if(result.resultSet!=undefined){
	if(result.resultSet.length>0){
		update(param1);
	}else{
		save(param1);
	}
	}		
		return {data: result};
}

function save(pMedicalData){
	return WL.Server.invokeSQLStatement({
		preparedStatement : addStatement,
		parameters : [  pMedicalData.identifier, pMedicalData.email,
		               pMedicalData.IMSS, pMedicalData.bloodType, 
		               pMedicalData.alergics, pMedicalData.clinicalConditions
		                ]
	});
}
function update(pMedicalData){
	
	return WL.Server.invokeSQLStatement({
		preparedStatement : updateStatement,
		parameters : [pMedicalData.IMSS, pMedicalData.bloodType,  
		              pMedicalData.alergics, pMedicalData.clinicalConditions,
		              pMedicalData.email ]
	});
}

