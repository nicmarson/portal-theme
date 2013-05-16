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