/**
 * @param 	pid - must be 0 if want to save new document
 * @param	pDocument - document object
 * @param	pCollectionName - collection name [string]
 * @param	pCollections - must be a collection/searchfields object [object]
 * 			var collections = {
			  // Object that defines the 'people' collection.
			  people : {
			    // Object that defines the Search Fields for the 'people' collection.
			    searchFields : {name: 'string', age: 'integer'}
			  }
			};
 * @param 	pOptions - options object
 * @param	pFnSuccess - function when success
 * @param	pFnFail - function when failure
 */
function clsJsonStoreHelper(pid, pDocument, pCollectionName, pCollections, pOptions, pFnSuccess, pFnFail){
	this._collectionName = pCollectionName;
	this._collections = pCollections;
	this._options = pOptions;
	this._document = pDocument;
	this._id = pid;
	
	this.save = _saveData;
	this.remove = _removeData;
	this.get = _getData;
	
	this._fnSuccess = pFnSuccess;
	this._fnFail = pFnFail;
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

function _removeData(){
	var collectionName = this._collectionName;
	var id = this._id;
	var collections = this._collections;
	var fnSuccess = this._fnSuccess;
	var fnFail = this._fnFail;
	
	if(id != 0){
		//remove document
		var queries = [{_id: id}];
		var options = {exact: true};
		
		WL.JSONStore.init(collections).then(function () {
			WL.JSONStore.get(collectionName)
				.remove(queries, options)
					.then(fnSuccess)
					.fail(fnFail);
		});
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