/***********************
*
* Javascript Model : PDS Portal Data System
* Author	Tara Grieb (r624223), Aaron Sander | March 7, 2013 3:46:32 PM PST
* Thought	An Object at REST tends to stay at REST unless called by a remote service.
*
***********************/

function Cookbook_View()
{
	
	/***********
	*	@name:			this.init()
	*	@description:	Set the default service url based on the current window location.
	*
	*	@param: 		(Optional) base service url.	
	*	@returns: 		??? (array) | (string|false)	All Data | (Requested Data Value | false)
	***********/
	this.top_nav = function top_nav(data) 
	{
		var source =  '{{#items}}<li><a href="{{url}}" class="btn btn-large btn-primary">{{link}}</a></li>{{/items}}';
  		var template = Handlebars.compile(source);
		return template(data);
	};
};