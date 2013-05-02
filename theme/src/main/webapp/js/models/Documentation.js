/***********************
*
* Javascript Model : DataModel
* Author	Tara Grieb (r624223) February 13, 2013 4:00:48 PM PST
* Thought	Data is the core of all applications, if we keep the data global, 
*			we can access it forever.
*
***********************/

function Cookie( params )
{
	if (typeof(params) != 'undefined')
	{
		return this.get();
	}
	
	/***********
	*	@name:			this.get()
	*	@description:	Get Cookie
	*
	*	@param: 		(null|string) 				id : Cookie Name
	*	@returns: 		(array) | (string|false)	All Cookies | (Requested Cookie Value | false)
	***********/
	this.get = function get( id ) 
	{
		var i,x,y,ARRcookies=document.cookie.split(";");
		if(typeof(id) == 'undefined'){
			var cookies = new Object;
			for (i=0;i<ARRcookies.length;i++)
			{
				x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
				y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
				x=x.replace(/^\s+|\s+$/g,"");
				cookies[x] = unescape(y);

			}
			return cookies;
		}else{
			for (i=0;i<ARRcookies.length;i++)
			{
				x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
				y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
				x=x.replace(/^\s+|\s+$/g,"");
					if (x==id)
					{
						return unescape(y);
					}
			}
			return false;
		}
	};
	
	/***********
	*	@name:			this.set()
	*	@description:	Set Cookie
	*
	*	@param: 		(string) 		cookieName 	Cookie Name
	*	@param: 		(string) 		cookieValue Cookie Value
	*	@param: 		(int|null) 		exp 		Cookie Exp Days | Default: 0
	*	@param: 		(string|null) 	path 		Cookie Storage Path | Default: "/"
	*
	*	@returns: 		(string|false)	Requested Cookie Value
	***********/
	this.set = function set(name, value, days, path) 
	{
		if (typeof(name) == 'undefined')	{ return false; }
		if (typeof(value) == 'undefined')	{ return false; }
		if (typeof(days) == 'undefined')	{ days = 0; }
		if (typeof(path) == 'undefined')	{ path = '/'; }
		//console.log(name + ', ' + value + ', ' + days);
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = '; expires='+date.toGMTString();
		}
		else var expires = '';
		document.cookie = name+'='+value+expires+'; path=' + path;
	};
	
	/***********
	*	@name:			this.remove
	*	@description:	remove cookie
	*
	*	@param: 		(string) 	id Cookie Name
	*	@returns: 		(bool)		if cookie exist true, else false.
	***********/
	this.remove = function remove(key) 
	{
		document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
	};
	
	/***********
	*	@name:			this.isSet
	*	@description:	Check if a Cookie is Set
	*
	*	@param: 		(string) 	id Cookie Name
	*	@returns: 		(bool)		if cookie exist true, else false.
	***********/
	this.isSet = function isSet( id ) 
	{
		var i,x,y,ARRcookies=document.cookie.split(";");
		for (i=0;i<ARRcookies.length;i++)
		{
			x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
			x=x.replace(/^\s+|\s+$/g,"");
			if (x==id)
			{
				return true;
			}
		}
		return false;
	}
};