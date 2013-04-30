var Utility = {
	// https://gist.github.com/1308368
	uuid: function(a,b){for(b=a='';a++<36;b+=a*51&52?(a^15?8^Math.random()*(a^20?16:4):4).toString(16):'-');return b},
	pluralize: function( count, word ) {
		return count === 1 ? word : word + 's';
	},
	store: function( namespace, data ) {
		if ( arguments.length > 1 ) {
			return localStorage.setItem( namespace, JSON.stringify( data ) );
		} else {
			var store = localStorage.getItem( namespace );
			return ( store && JSON.parse( store ) ) || [];
		}
	}
};