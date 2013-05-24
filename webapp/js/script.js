// _tag needs to be declared OUTSIDE any containing objs
var _tag=new WebTrends();
_tag.dcsGetId();
_tag.dcsCustom=function() {
			// Add custom parameters here.
			//_tag.DCSext.memberIdFromVelocity="{$memberId}";
};
$(document).ready(function() {
	_tag.dcsCollect(); 		
});

// LT IE7 Support

// Icomoon - Font Glyphs
/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

// window.onload = function() {
// 	function addglyph(el, entity) {
// 		var html = el.innerHTML;
// 		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
// 	}
// 	var glyphs = {
// 			'glyph-email' : '&#x26;',
// 			'glyph-search' : '&#x29;',
// 			'glyph-users' : '&#x2a;',
// 			'glyph-United-States' : '&#x75;',
// 			'glyph-Washington' : '&#x6b;',
// 			'glyph-Utah' : '&#x7a;',
// 			'glyph-phone' : '&#x27;',
// 			'glyph-information' : '&#x30;',
// 			'glyph-success' : '&#x31;',
// 			'glyph-warning' : '&#x32;',
// 			'glyph-Oregon' : '&#x72;',
// 			'glyph-lightning' : '&#x21;',
// 			'glyph-pointer' : '&#x70;',
// 			'glyph-user-info' : '&#x69;',
// 			'glyph-folder-closed' : '&#xf07b;',
// 			'glyph-folder-open' : '&#xf07c;',
// 			'glyph-checked' : '&#xf00c;',
// 			'glyph-close' : '&#xf00d;',
// 			'glyph-linked' : '&#xf0c1;',
// 			'glyph-play' : '&#xe000;',
// 			'glyph-new-tab' : '&#xe001;',
// 			'glyph-house' : '&#xe002;'
// 		},
// 		els = document.getElementsByTagName('*'),
// 		i, attr, html, c, el;
// 	for (i = 0; ; i += 1) {
// 		el = els[i];
// 		if(!el) {
// 			break;
// 		}
// 		attr = el.getAttribute('data-glyph');
// 		if (attr) {
// 			addglyph(el, attr);
// 		}
// 		c = el.className;
// 		c = c.match(/glyph-[^\s'"]+/);
// 		if (c && glyphs[c[0]]) {
// 			addglyph(el, glyphs[c[0]]);
// 		}
// 	}
// };
