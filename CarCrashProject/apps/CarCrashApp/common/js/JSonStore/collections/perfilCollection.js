;(function () {

	WL.JSONStore.init({
		perfil : {
			searchFields: {"email":"string", "password":"string"}
		}
	}, {
		// password : 'PleaseChangeThisPassword'
	})

	.then(function () {
		WL.Logger.debug(['At this point there is no data inside your collection ("perfil"), but JSONStore is ready to be used.'].join('\n'));
	})

	.fail(function (errObj) {
		WL.Logger.ctx({pretty: true}).error(errObj);
	});

}());