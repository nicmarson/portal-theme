/***********************
*
* Javascript Model : DataModel
* Author	Tara Grieb (r624223) February 13, 2013 4:00:48 PM PST
* Thought	Data is the core of all applications, if we keep the data global, 
*			we can access it forever.
*
***********************/

function DataModel( params )
{
	if (typeof(params) != 'undefined')
	{
		var dataModelObject = this;
		$.each(params, function dataModelInitEach(k,v){
			dataModelObject[k] = v;
		});
	}
	
	/***********
	*	@name:			this.get()
	*	@description:	Get Data Model Data
	*
	*	@param: 		(null|string) 				id : Data Model ID
	*	@returns: 		(array) | (string|false)	All Data | (Requested Data Value | false)
	***********/
	this.get = function get( id ) 
	{
		if (typeof(id) != 'undefined')
		{
			dataModelObject = this;
			if (typeof(dataModelObject[id]) != 'undefined')
			{
				return dataModelObject[id];
			}
			return false;
		}else{
			dataModelObject = this;
			dataModelObjectReturn = new Object;
			$.each(dataModelObject, function dataModelGetEach(k,v){
				if (typeof(v) != 'function')
				{
					dataModelObjectReturn[k] = v;
				}
			});
			return dataModelObjectReturn;
		}
	};

	/***********
	*	@name:			this.set()
	*	@description:	Set Data Model Data
	*
	*	@param: 		(string) 		key 		: Data Model ID
	*	@param: 		(string) 		value 		: Data Model Value
	*	@returns: 		(true|false)
	***********/	
	this.set = function set(key, value) 
	{
		this[key] = value;
		if (typeof(this[key]) != 'undefined'){
			return true;
		}else{
			return false;
		}
	};

	/***********
	*	@name:			this.remove
	*	@description:	remove data model value
	*
	*	@param: 		(string) 	key Data Model Key
	*	@returns: 		(bool)		if cookie exist true, else false.
	***********/	
	this.remove = function remove(key) 
	{
		delete this[key];
		if (typeof(this[key]) == 'undefined'){
			return true;
		}else{
			return false;
		}
	};
	
	
	// In Development.
	this.localStorage = function localStorage(key) 
	{
		delete this[key];
		if (typeof(this[key]) == 'undefined'){
			return true;
		}else{
			return false;
		}
	};
};