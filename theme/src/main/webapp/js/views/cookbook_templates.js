/***********************
*
* Javascript Model : PDS Portal Data System
* Author	Tara Grieb (r624223), Aaron Sander | March 7, 2013 3:46:32 PM PST
* Thought	An Object at REST tends to stay at REST unless called by a remote service.
*
***********************/

function Cookbook_Layout_Views()
{
	
	/***********
	*	@name:			this.init()
	*	@description:	Set the default service url based on the current window location.
	*
	*	@param: 		(Optional) base service url.	
	*	@returns: 		??? (array) | (string|false)	All Data | (Requested Data Value | false)
	***********/
	this.top_nav = function init() 
	{
		return '<table>
					<thead>
					  <th>Username</th>
					  <th>Real Name</th>
					  <th>Email</th>
					</thead>
					<tbody>
					  {{#users}}
						<tr>
						  <td>{{username}}</td>
						  <td>{{firstName}} {{lastName}}</td>
						  <td>{{email}}</td>
						</tr>
					  {{/users}}
					</tbody>
				  </table>';
	};
};