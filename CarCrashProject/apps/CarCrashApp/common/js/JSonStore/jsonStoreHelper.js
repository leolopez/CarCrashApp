function clsJsonStoreHelper(){
	this.collectionName = "";
	//this.collections = {};
	this.options = {};
	this.document = {};
	this.id = 0;
	
	this.save = _saveData;
	this.remove = _removeData;
	this.get = _getData;
	this.count = _count;
	
	this.fnSuccess = function(){};
	this.fnFail = function(){};
}

function _saveData(){
	var collectionName = this.collectionName;
	var collections = getCollections();
	var document = this.document;
	var id = this.id;
	var fnSuccess = this.fnSuccess;
	var fnFail = this.fnFail;
	
	if(id == 0){
		WL.JSONStore.init(collections, {})
		.then(function(){
			var data = document;
			//save new document
			return WL.JSONStore.get(collectionName).add(data, {markDirty:true});
		})
		.then(fnSuccess)
		.fail(fnFail);
	}else{
		var docs = [{_id: parseInt(id), json: document}];
		WL.JSONStore.init(collections, {})
		.then(function(){
			WL.JSONStore.get(collectionName)
			.replace(docs)
				.then(fnSuccess)
				.fail(fnFail);
		});
	}
}

function _removeData(){
	var collectionName = this.collectionName;
	var id = this.id;
	var collections = getCollections();
	var fnSuccess = this.fnSuccess;
	var fnFail = this.fnFail;
	
	//remove document
	var queries = [{_id: parseInt(id)}];
	var options = {exact: true, markDirty: true};
	
	WL.JSONStore.init(collections,{});
	WL.JSONStore.get(collectionName)
		.remove(queries, options)
			.then(fnSuccess)
			.fail(fnFail);
}

function _getData(){
	var collectionName = this.collectionName;
	var options = this.options;
	var document = this.document;
	var collections = getCollections();
	var fnSuccess = this.fnSuccess;
	var fnFail = this.fnFail;
	var id = parseInt(this.id);
	
	if(id == 0 || isNaN(id))
	{	
		var queryPart = WL.JSONStore.QueryPart();
		$(document).each(function(){
			switch(this.operator){
			case "equal":
				queryPart.equal(this.key, this.value);
				break;
			case "like":
				queryPart.like(this.key, this.value);
				break;
			}
		});
		
		WL.JSONStore.init(collections, {}).then(function () {
			WL.JSONStore.get(collectionName)
				.advancedFind([queryPart], options)
					.then(fnSuccess)
					.fail(fnFail);
		});
	}else{
		WL.JSONStore.init(collections, {}).then(function(){
			WL.JSONStore.get(collectionName)
				.findById(parseInt(id))
					.then(fnSuccess)
					.fail(fnFail);
		});
	}
}

function _count(){
	var collectionName = this.collectionName;
	var collections = getCollections();
	var fnSuccess = this.fnSuccess;
	var fnFail = this.fnFail;

	WL.JSONStore.init(collections, {}).then(function(){
		
		WL.JSONStore.get(collectionName).count({},{exact:true})
		.then(fnSuccess)
		.fail(fnFail);
		
	});
}

function getCollections(){
	return {
		perfil:{
			searchFields:{
				email:"string", password:"string"
			}
		},
		Contacts:{
			searchFields:{UserContactName:'string',		
				UserContactFirstName:'string',UserContactLastName:'string',
				UserContactCellPhon:'string' }
		},
		reports:{
			searchFields:{
				idPolicy:'string', date:'string', status:'boolean', type:'string'
			}
		},
		reportLocations:{
			searchFields:{
				idReport:"integer"
			}
		},
		reportPictures:{
			searchFields:{
				idReport:"integer"
			}
		},
		 profile : {
             searchFields: {mobileId: 'string', name: 'string', firstname: 'string', lastname: 'string', cellPhone: 'string',
             	city: 'string', enterprise: 'string',birthDate: 'string',email: 'string',password: 'string'}
         }
	};
}