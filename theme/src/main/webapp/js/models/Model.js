/***********************
*
* Javascript Model : DataModel
* Author	Tara Grieb (r624223) February 13, 2013 4:00:48 PM PST
* Thought	Data is the core of all applications, if we keep the data global, 
*			we can access it forever.
*
***********************/

function Model()
{
	this.init = function init()
	{
		console.log('inited.');
		console.log(this);
	};
};