function clsJsonStoreHelper(){
	this.collectionName = "";
	this.collections = {};
	this.options = {};
	this.document = {};
	this.id = 0;
	
	this.save = _saveData;
	this.remove = _removeData;
	this.get = _getData;
	this.existsCollection = _existsCollection;
	this.destroy = _destroy;
	
	this.fnSuccess = function(){};
	this.fnFail = function(){};
}

function _existsCollection(){
	WL.JSONStore.init(this.collections);
	if(undefined != WL.JSONStore.get(this.collectionName)){
		return true;
	}
	else{
		return false;
	}
}

function _saveData(){
	var collectionName = this._collectionName;
	var collections = this._collections;
	var options = this._options;
	var document = this._document;
	var id = this._id;
	var fnSuccess = this._fnSuccess;
	var fnFail = this._fnFail;
	
	WL.JSONStore.init(collections, options)
		.then(function(){
			var data = document;
			if(id == 0){
				//save new document
				return WL.JSONStore.get(collectionName).add(data);
			}
			else{
				//edit existing document
				var docs = [{_id: id, json: data}];
				WL.JSONStore.get(collectionName)
					.replace(docs)
						.then(fnSuccess)
						.fail(fnFail);
			}
		})
			.then(fnSuccess)
			.fail(fnFail);
}
function _destroy(){
	var collections = this.collections;
	WL.JSONStore.init(collections);
	WL.JSONStore.destroy();
}

function _removeData(){
	var collectionName = this.collectionName;
	var id = this.id;
	var collections = this.collections;
	var fnSuccess = this.fnSuccess;
	var fnFail = this.fnFail;
	
	if(id != 0){
		//remove document
		var queries = [{_id: id}];
		var options = {exact: true};
		
		WL.JSONStore.init(collections);
		WL.JSONStore.get(collectionName)
			.remove(queries, options)
				.then(fnSuccess)
				.fail(fnFail);
	}
	else{
		return false;
	}
}

function _getData(){
	var collectionName = this._collectionName;
	var options = this._options;
	var document = this._document;
	var collections = this._collections;
	var fnSuccess = this._fnSuccess;
	var fnFail = this._fnFail;
	
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
	
	WL.JSONStore.init(collections).then(function () {
		WL.JSONStore.get(collectionName)
			.advancedFind([queryPart], options)
				.then(fnSuccess)
				.fail(fnFail);
	});
}
