/***********************
*
* Javascript Model : PDS Portal Data System
* Author	Tara Grieb (r624223), Aaron Sander | March 7, 2013 3:46:32 PM PST
* Thought	An Object at REST tends to stay at REST unless called by a remote service.
*
***********************/

function PDS( params )
{

	/*##############
	# INIT METHODS #
	##############*/

	/***********
	*	@name:			this.init()
	*	@description:	Set the default service url based on the current window location.
	*
	*	@param: 		(String) (Optional) APIUrl Base service url. OR
	*	@param: 		(Object) (Optional) Object Containing Paramters
	*						(string) (Optional) APIUrl Base service url.	
	*						(bool) 	 (Optional) debug debug flag
	*	@returns: 		N/A Sets Global Value.
	***********/
	this.init = function init( params ) 
	{
		var initObj = new Object;
		initObj.debug = false
		if (typeof(params) != 'undefined')
		{	
			var debug	= typeof(params.debug) 	!= 'undefined'	?	params.debug 	: 	false;
			initObj.debug = debug;
			if (typeof(params) == 'string'){
				initObj.APIUrl = params;
			} else if (typeof(params.APIUrl != 'undefined')) {
				initObj.APIUrl = params.APIUrl;
			}
		}
		if ( ! initObj.APIUrl) {
			// set API URL
			if(! window.location.origin) window.location.origin = window.location.protocol + '//' + window.location.host;
			var url = window.location.origin + '/member-services';
			initObj.APIUrl = url;
		}
		return initObj;
	};
	
	/*#################
	# OBJECT VARIABLES#
	#################*/
	
	var initObjVars = this.init(params);
	var APIUrl 	= initObjVars.APIUrl;
	var debug 	= initObjVars.debug;
	
	/*################
	# PUBLIC METHODS #
	################*/
	
	/***********
	*	@name:			this.family()
	*	@description:	Get Family Data
	*
	*	@param: 		(string) id Member ID
	*	@param: 		(object) (Optional) Optional Object Members:
	*																(function) callback
	*	@returns: 		(Object) jQuery Ajax Object | N/A 
	***********/
	this.family = function family( id, optional ) 
	{
		
		if (typeof(id) == 'undefined')
        {
        	return false;
		}
		if (typeof(optional) != 'undefined')
		{
			var callback	= typeof(optional.callback) 	!= 'undefined'	?	optional.callback 	: 	false;
		}else{
			var optional = false;
		}
		var serviceUrl = APIUrl + '/v1.0/member/' + id + '/family.json';
        
		if (debug)
        {
        	console.log('Method: Family');
        	console.log('Id: ' + id);
        	console.log('Optional: ' + optional);
        	console.log('ServiceUrl :' + serviceUrl);
		}

		if (typeof(callback) == 'function')
		{
			_callRestServiceCallback(serviceUrl, function(data, status, error) {
				responseObj = _buildCallbackObject(data, status, error);
				callback(responseObj);
			});
		}else{
			return responseObj = _callRestServiceObject(serviceUrl);
		}
	};
		
	/***********
	*	@name:			this.claims()
	*	@description:	Get Claims Data
	*
	*	@param: 		(string) id Member ID
	*	@param: 		(object) (Optional) Optional Object Members:
	*																(object) (Optional) args Arguments to pass to the Rest Service
	*																(function) (Optional) callback Callback function
	*	@returns: 		(Object) jQuery Ajax Object | N/A 
	***********/
	this.claims = function claims( id, optional ) 
	{
		if (typeof(id) == 'undefined')
        {
        	return false;
		}

		if (typeof(optional) != 'undefined')
		{
			var args		= typeof(optional.args) 		!= 'undefined'	?	optional.args 		: 	false;
			var callback	= typeof(optional.callback) 	!= 'undefined'	?	optional.callback 	: 	false;
		}else{
			var optional = false;
		}
		var serviceUrl 	= APIUrl + '/v1.0/member/' + id + '/claim.json';

        if(args) {
        	var claimNumber			= typeof(args.claimNumber) 			!= 'undefined'	?	args.claimNumber 			: 	false;
			var providerName		= typeof(args.providerName) 		!= 'undefined'	?	args.providerName 			: 	false;
            var otherFamilyMemberId	= typeof(args.otherFamilyMemberId)	!= 'undefined'	?	args.otherFamilyMemberId 	: 	false;
			var dateRangeStart		= typeof(args.dateRangeStart) 		!= 'undefined'	?	args.dateRangeStart 		: 	false;
			var dateRangeEnd		= typeof(args.dateRangeEnd) 		!= 'undefined'	?	args.dateRangeEnd 			: 	false;
            var paramPrefix = '?';

            if(claimNumber) {
                serviceUrl = serviceUrl.concat(paramPrefix + 'claimNumber=' + claimNumber);
                paramPrefix = '&';
            }
            if(providerName) {
                serviceUrl = serviceUrl.concat(paramPrefix + 'providerName=' + providerName);
                paramPrefix = '&';
            }
            if(otherFamilyMemberId) {
                serviceUrl = serviceUrl.concat(paramPrefix + 'otherFamilyMemberId=' + otherFamilyMemberId);
                paramPrefix = '&';
            }
            if(dateRangeStart) {
                serviceUrl = serviceUrl.concat(paramPrefix + 'dateRangeStart=' + dateRangeStart);
                paramPrefix = '&';
            }
            if(dateRangeEnd) {
                serviceUrl = serviceUrl.concat(paramPrefix + 'dateRangeEnd=' + dateRangeEnd);
            }
        }
		
		if (debug)
        {
        	console.log('Method: Family');
        	console.log('Id: ' + id);
        	console.log('Optional: ' + optional);
        	console.log('ServiceUrl :' + serviceUrl);
		}
		
        if (typeof(callback) == 'function')
		{
			_callRestServiceCallback(serviceUrl, function(data, status, error) {
				responseObj = _buildCallbackObject(data, status, error);
				callback(responseObj);
			});
		}else{
			return responseObj = _callRestServiceObject(serviceUrl);
		}
	};
	
	
	/***********
	*	@name:			this.benefits()
	*	@description:	Get Benefits Data
	*
	*	@param: 		(string) id Member ID
	*	@param: 		(object) (Optional) Optional Object Members:
	*																(object) (Optional) other_id Other ID
	*																(function) (Optional) callback Callback function
	*	@returns: 		(Object) jQuery Ajax Object | N/A 	
	***********/
	this.benefits = function benefits( id, optional) 
	{
		if (typeof(id) == 'undefined')
        {
        	return false;
		}
		
		if (typeof(optional) != 'undefined')
		{
			var other_id	= typeof(optional.other_id) 	!= 'undefined'	?	optional.other_id 	: 	false;
			var callback	= typeof(optional.callback) 	!= 'undefined'	?	optional.callback 	: 	false;
		}else{
			var optional = false;
		}
		var serviceUrl = APIUrl + '/v1.0/member/' + id + '/benefit.json';
		
		if(other_id) {
            serviceUrl = serviceUrl.concat('?otherFamilyMemberId=' + other_id);
        }

		if (debug)
        {
        	console.log('Method: Benefits');
        	console.log('Id: ' + id);
        	console.log('Optional: ' + optional);
        	console.log('ServiceUrl :' + serviceUrl);
		}
		
      	if (typeof(callback) == 'function')
		{
			_callRestServiceCallback(serviceUrl, function(data, status, error) {
				responseObj = _buildCallbackObject(data, status, error);
				callback(responseObj);
			});
		}else{
			return responseObj = _callRestServiceObject(serviceUrl);
		}
	};
	
	
	/***********
	*	@name:			this.pcp()
	*	@description:	Get PCP Data
	*
	*	@param: 		(string) id Member ID
	*	@param: 		(object) (Optional) Optional Object Members:
	*																(function) callback
	*	@returns: 		(Object) jQuery Ajax Object | N/A 
	***********/
	this.pcp = function pcp( id, callback ) 
	{
		if (typeof(id) == 'undefined')
        {
        	return false;
		}
		
		if (typeof(optional) != 'undefined')
		{
			var callback	= typeof(optional.callback) 	!= 'undefined'	?	optional.callback 	: 	false;
		}else{
			var optional = false;
		}
		var serviceUrl = APIUrl + '/v1.0/member/' + id + '/pcp.json';

		if (debug)
        {
        	console.log('Method: PCP');
        	console.log('Id: ' + id);
        	console.log('Optional: ' + optional);
        	console.log('ServiceUrl :' + serviceUrl);
		}
		
		if (typeof(callback) == 'function')
		{
			_callRestServiceCallback(serviceUrl, function(data, status, error) {
				responseObj = _buildCallbackObject(data, status, error);
				callback(responseObj);
			});
		}else{
			return responseObj = _callRestServiceObject(serviceUrl);
		}
	};	
		
	/***********
	*	@name:			this.referrals()
	*	@description:	Get Referrals Data
	*
	*	@param: 		(string) id Member ID
	*	@param: 		(object) (Optional) Optional Object Members:
	*																(function) callback
	*	@returns: 		(Object) jQuery Ajax Object | N/A 
	***********/
	this.referrals = function referrals( id, callback ) 
	{
		if (typeof(id) == 'undefined')
        {
        	return false;
		}
		
		if (typeof(optional) != 'undefined')
		{
			var callback	= typeof(optional.callback) 	!= 'undefined'	?	optional.callback 	: 	false;
		}else{
			var optional = false;
		}	
		var serviceUrl = APIUrl + '/v1.0/member/' + id + '/referrals.json';

		if (debug)
        {
        	console.log('Method: Referrals');
        	console.log('Id: ' + id);
        	console.log('Optional: ' + optional);
        	console.log('ServiceUrl :' + serviceUrl);
		}
		
		if (typeof(callback) == 'function')
		{
			_callRestServiceCallback(serviceUrl, function(data, status, error) {
				responseObj = _buildCallbackObject(data, status, error);
				callback(responseObj);
			});
		}else{
			return responseObj = _callRestServiceObject(serviceUrl);
		}
	};	

	/***********
	*	@name:			this.preferences()
	*	@description:	Get Preferences Data
	*
	*	@param: 		(string) id Member ID
	*	@param: 		(object) (Optional) Optional Object Members:
	*																(function) callback
	*	@returns: 		(Object) jQuery Ajax Object | N/A 
	***********/
	this.preferences = function preferences( id, callback ) 
	{
		if (typeof(id) == 'undefined')
        {
        	return false;
		}
		
		if (typeof(optional) != 'undefined')
		{
			var callback	= typeof(optional.callback) 	!= 'undefined'	?	optional.callback 	: 	false;
		}else{
			var optional = false;
		}
		var serviceUrl = APIUrl + '/v1.0/member/' + id + '/preferences.json';
		
		if (debug)
        {
        	console.log('Method: Preferences');
        	console.log('Id: ' + id);
        	console.log('Optional: ' + optional);
        	console.log('ServiceUrl :' + serviceUrl);
		}
		
		if (typeof(callback) == 'function')
		{
			_callRestServiceCallback(serviceUrl, function(data, status, error) {
				responseObj = _buildCallbackObject(data, status, error);
				callback(responseObj);
			});
		}else{
			return responseObj = _callRestServiceObject(serviceUrl);
		}
	};
	
	/*##################
	# PRIVATE METHODS #
	#################*/
	
	/***********
	*	@name:			_callRestServiceCallback()
	*	@description:	Call the Restful Service with a callback.
	*
	*	@param: 		(string)	endpoint URL to the Service Call
	*	@param:			(function)	callback Callback Function.
	*	@returns: 		NA | Callback.	
	***********/
	var _callRestServiceCallback = function (endpoint, callback) {
		$.ajax({
            url:endpoint,
            dataType:'jsonp',
            jsonpCallback: 'cb',
            success:function (data, status) {
                // data, status, error message
                if (debug)
					console.log('STATUS: ' + status);
                callback(data, status, null);
            },
            error: function(jqxhr, status, errorthrown) {
                // data, status, error message
                if (debug) { 
					console.log('STATUS: ' + status);
					console.log('ERROR THROWN: ' + errorthrown);
				}
                callback(null, status, errorthrown);
            }
        });
	};
	
	/***********
	*	@name:			_callRestServiceObject()
	*	@description:	Call the Restful Service with jQuery Deferred Functions.
	*
	*	@param: 	(string) URL of the call
	*	@returns: 	(object) Ajax Object
	***********/	
	var _callRestServiceObject = function (endpoint) {
		var restCall = $.ajax({
            url:endpoint,
            dataType:'jsonp',
            jsonpCallback: 'cb'// ,
        });
		return restCall;
	};
	
	/***********
	*	@name:			_buildCallbackObject()
	*	@description:	Build the common expected object format.
	*
	*	@param: 	(object) data The data object returned from the service
	*	@param: 	(string) status The status of the Ajax call
	*	@param: 	(string) error Error Details
	*	@returns: 	(object) Formated Object
	***********/
	var _buildCallbackObject = function (data, status, error){
		var obj = new Object({
			'data'		: '',
			'status'	: '',
			'error'		: null
		});
		if(data) {
			obj.data = data;
			obj.status = status;
		} else {
			obj.data = null;
			obj.status = status;
			obj.error = error;
		}
		return obj;
	};
	
	/*################
	# TEST METHODS #
	################*/
	
	/***********
	*	@name:			this.getTestAPIUrl()
	*	@description:	Get APIUrl For Tests
	*																(function) callback
	*	@returns: 		(String)
	***********/
	this.getTestAPIUrl = function getTestAPIUrl() 
	{
		return APIUrl;
	}
	
	/***********
	*	@name:			this.getTestDebug()
	*	@description:	Get Debug For Tests
	*																(function) callback
	*	@returns: 		(Bool)
	***********/
	this.getTestDebug = function getTestDebug() 
	{
		return debug;
	}
};