'use strict';
var debug = require('./shared/utils/debug');

var application = require('application');
application.mainModule = 'views/main-page';
application.cssFile = './app.css';

application.onUncaughtError = function (error) {
    console.log('Application error: ' + error.name + '; ' + error.message + '; ' + error.nativeError);
};

var appSettings = require('application-settings');


// Load files from local file system instead of from the net
// TODO: Change for production
global.REK = {};
global.REK.dev = {
	server: 'dev',
	devServer: 'http://labs.emiloberg.se/rekdata',
	//devServer: 'http://local.dev:5656',
	clearImageFolder: false
};


//appSettings.setBoolean('develLocalFiles', false);


var _properties = {
	host: 'http://local.dev:8080',
	companyId: 10155,
	groupName: 'Guest',
	drugsStructureId: 11571,
	adviceStructureId: 12602,
	resourcesStructureId: 14304,
	locale: 'sv_SE'
};

if (global.REK.dev.server = 'dev') {

	global.REK.preferences = {
		host: global.REK.dev.devServer
	};

	global.REK.urls = {
		drugs: global.REK.dev.devServer + '/drugs.json',
		advice: global.REK.dev.devServer + '/advice.json',
		resources: global.REK.dev.devServer + '/resrouces.json',
		hbsDrugs: global.REK.dev.devServer + '/details-drugs.hbs',
		hbsAdvice: global.REK.dev.devServer + '/details-advice.hbs',
		hbsResources: global.REK.dev.devServer + '/resources.hbs',
		css: global.REK.dev.devServer + '/custom.css'
	};

} else {
	global.REK.preferences = {
		host: _properties.host
	};

	global.REK.urls = {
		drugs: _properties.host + '/api/jsonws/skinny-web.skinny/get-skinny-journal-articles/' +
		'company-id/' + _properties.companyId +
		'/group-name/' + _properties.groupName +
		'/ddm-structure-id/' + _properties.drugsStructureId +
		'/locale/' + _properties.locale,

		advice: _properties.host + '/api/jsonws/skinny-web.skinny/get-skinny-journal-articles/' +
		'company-id/' + _properties.companyId +
		'/group-name/' + _properties.groupName +
		'/ddm-structure-id/' + _properties.adviceStructureId +
		'/locale/' + _properties.locale,

		resources: _properties.host + '/api/jsonws/skinny-web.skinny/get-skinny-journal-articles/' +
		'company-id/' + _properties.companyId +
		'/group-name/' + _properties.groupName +
		'/ddm-structure-id/' + _properties.resourcesStructureId +
		'/locale/' + _properties.locale,

		hbsDrugs: _properties.host + '/reklistan-theme/handlebars/details-drugs.hbs',
		hbsAdvice: _properties.host + '/reklistan-theme/handlebars/details-advice.hbs',
		hbsResources: _properties.host + '/reklistan-theme/handlebars/resources.hbs',

		css: _properties.host + '/reklistan-theme/css/custom.css?browserId=other&themeId=reklistantheme_WAR_reklistantheme&languageId=en_US&b=6210'
	};
}


debug.debug('APP SETTINGS');
debug.debug('global.REK.preferences.host: ' + global.REK.preferences.host);
debug.debug('global.REK.urls.drugs: ' + global.REK.urls.drugs);
debug.debug('global.REK.urls.advice: ' + global.REK.urls.advice);
debug.debug('global.REK.urls.resources: ' + global.REK.urls.resources);
debug.debug('global.REK.urls.hbsDrugs: ' + global.REK.urls.hbsDrugs);
debug.debug('global.REK.urls.hbsAdvice: ' + global.REK.urls.hbsAdvice);
debug.debug('global.REK.urls.hbsResources: ' + global.REK.urls.hbsResources);
debug.debug('global.REK.urls.css: ' + global.REK.urls.css);

application.start();
