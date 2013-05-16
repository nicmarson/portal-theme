/* =============================================================
 * cambria print v1.0
 *  
 * =============================================================*/

!function ($) {

  "use strict"; // jshint ;_;

	var Print = Print || {};
	if ($.isEmptyObject(Print)) {
		(function () {
			this.namespace = "";

			this.init = function (params) {

				// Dom Elements 
				this.styleElement 	= $(document)[0].styleSheets;
 				this.logoElement 	= $('.nav-brand');
 				this.footerElement 	= $('.nav-brand');
 				
			};
			
			this.doPrint = function (params) {
				this.init();
				
				// General Bindings.
 				var rootThis = this;
				
				var content = '';
				
				content += includeStyles(rootThis);
				content += buildPrintPageHead(rootThis);
				content += buildPrintContent(params);
				content += buildPrintPageFoot(rootThis);
				
				var newWindow = window.open();
				$(newWindow.document.body).html(content);
				newWindow.print();
				newWindow.close();
			};
			
			function buildPrintContent(params){
				var content = '';
				$.each(params.elements, function(i,param){
					var html = '';
					if (params.grabParent){
						html = $(param).clone().wrap('<div></div>').parent().html();
					}else{
						html = $(param).html();
					}
					content += html;
				});
				return content;
			}
			
			function buildPrintPageHead(rootThis){
				var headHTML = '';
				headHTML += rootThis.logoElement.clone().wrap('<div></div>').parent().html();
				headHTML += '<hr><p>';
				return headHTML;	
			}
			
			function buildPrintPageFoot(rootThis){
				var footHTML = '';
				footHTML += '</p><hr>';
				footHTML += rootThis.footerElement.clone().wrap('<div></div>').parent().html();
				return footHTML;
			}
			
			function includeStyles(rootThis){
				var styleHTML = '';
				$.each(rootThis.styleElement, function(i,item){
					styleHTML += '<link rel="stylesheet" href="'+item.href+'">';
				});
				return styleHTML;
			}
			
		}).apply(Print);
	}


 /* PRINT PLUGIN DEFINITION
  * ========================== */

  var old = $.fn.print;

  $.fn.print = function (option) {;
  	var options = $.extend({}, $.fn.print.defaults, typeof option == 'object' && option);
  	if (options.event == 'fire'){
		Print.doPrint(options);
  	}else{
  		$(this).on(options.event, function(){
  			Print.doPrint(options);
  		});
  	}
  };

  $.fn.print.defaults = {
    'event':		'click',
    'elements':		'document',
	'grabParent':	true
  };

  $.fn.print.Constructor = Print;


 /* PRINT NO CONFLICT
  * ==================== */
  $.fn.print.noConflict = function () {
    $.fn.print = old;
    return this;
  };


 /* PRINT DATA-API
  * ================= */

$(document).on('click', '[data-toggle=print]', function (e) {
    var $this = $(this), href
      , target = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''); //strip for ie7
    $(this).print({
    	'event':'fire',
    	elements: [target],
    	'grabParent':	false
    });
  });


}(window.jQuery);



/* =============================================================
 * cambria Accordion View All v1.0
 *  
 * =============================================================*/


!function ($) {
  	"use strict"; // jshint ;_;
	var AccordionViewAll = AccordionViewAll || {};
	if ($.isEmptyObject(AccordionViewAll)) {
		(function () {
			this.expand = function (params) {
				if (!$(params.id).hasClass('in')){
					$(params.id).collapse('show');
				}
			};
			
			this.collapse = function (params) {
				if (!$(params.id).hasClass('out') && $(params.id).hasClass('in')){
					// alert(params.id + ", " + $(params.id).hasClass('out') + ", " + $(params.id).hasClass('in'));
					$(params.id).collapse('hide');
				}
			};
			
			this.textSwap = function (params) {
			 	$('.accordionViewAll[data-target="' + params.target + '"]').each(function(){
			 		$(this).attr('data-toggle-text', params.thisElm.text());
			 	});
			 	$('.accordionViewAll[data-target="' + params.target + '"]').each(function(){
			 		$(this).text(params.toggleText);
			 	});
			 	
			};
			
			this.stateSwap = function (params) {
				var newState = 'expand';
				if (params.toggleState == 'expand'){
					newState = 'collapse';
				}
			 	$('.accordionViewAll[data-target="' + params.target + '"]').each(function(){
			 		$(this).attr('data-toggle-state', newState);
			 	});
			};
			
			this.toggle = function (params) {
			 	var rootThis = this;
			 	this.textSwap(params);
			 	this.stateSwap(params);
				$(params.target + ' .accordion-body').each(function(){
					var elmId = $(this).attr('id');
					if (params.toggleState === 'expand'){
						rootThis.expand({'id': '#'+elmId});
					}else if (params.toggleState === 'collapse'){
						rootThis.collapse({'id': '#'+elmId});
					}
				});
			};
			
		}).apply(AccordionViewAll);
	}


 /* VIEW ALL PLUGIN DEFINITION
  * ========================== */

  var old = $.fn.accordionViewAll;

	$.fn.accordionViewAll = function (option) {
		var options = $.extend({}, $.fn.accordionViewAll.defaults, typeof option == 'object' && option);
		AccordionViewAll.toggle(options);
	};

  $.fn.accordionViewAll.defaults = {
    'target': 		'target',
	'toggleText': 	'toggleText',
	'toggleState': 	'expand'
  };

  $.fn.accordionViewAll.Constructor = AccordionViewAll;


 /* VIEW ALL NO CONFLICT
  * ==================== */

  $.fn.accordionViewAll.noConflict = function () {
    $.fn.accordionViewAll = old;
    return this;
  };


 /* VIEW ALL DATA-API
  * ================= */
	$(document).on('click', '.accordionViewAll', function (e) {
	    var $this = $(this), href
	      , target = $this.attr('data-target')
	      , toggleState = $this.attr('data-toggle-state')
	      ,	toggleText = $this.attr('data-toggle-text')
	        || e.preventDefault()
	        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''); //strip for ie7
	    $(this).accordionViewAll({
	    	'target': 		target
	    	,'thisElm'	:		$(this)
	    	,'toggleText': 	toggleText
	    	,'toggleState': toggleState
	    });
	});
}(window.jQuery);





/* =============================================================
 * Cambria Progress Bar Extension v1.0
 *  
 * =============================================================*/


!function ($) {
  	"use strict"; // jshint ;_;
	var ProgressBarExtension = ProgressBarExtension || {};
	if ($.isEmptyObject(ProgressBarExtension)) {
		(function () {
			this.init = function(params){
				if (!params.thisElm){
					alert('ProgressBarExtension Requires an Element value');
					return false;
				}
				ProgressBarExtension.thisElm		= params.thisElm;
				ProgressBarExtension.amountPart		= params.amountPart;
				ProgressBarExtension.amountTotal 	= params.amountTotal;
				ProgressBarExtension.showTooltip 	= params.showTooltip;
				
				var percentCalculated = doMathRound(ProgressBarExtension.amountPart, ProgressBarExtension.amountTotal);
				
				setPercentage(percentCalculated, ProgressBarExtension.thisElm);
				
				if(ProgressBarExtension.showTooltip){
					attachTooltip(ProgressBarExtension.thisElm, ProgressBarExtension.showTooltip);
				};
			};
			
			function doMathRound(amountPart, amountTotal){
				return Math.round(100 * amountPart / amountTotal);
			};
			
			function doMathNoRound(amountPart, amountTotal){
				return 100 * amountPart / amountTotal;
			};
			
			function setPercentage(percentCalculated, thisElm){
				thisElm.children('.bar').css('width', percentCalculated+'%');
			};
			
			function attachTooltip(thisElm, toolTip){
				$(document).ready(function(){
					thisElm.attr('title',toolTip);
					thisElm.tooltip();
				});
				
			};
		}).apply(ProgressBarExtension);
	}


 /* Progress Bar PLUGIN DEFINITION
  * ========================== */

  var old = $.fn.progressBarExtension;

$.fn.progressBarExtension = function (option) {
	var options = $.extend({}, $.fn.progressBarExtension.defaults, typeof option == 'object' && option);
	ProgressBarExtension.init(options);
};

$.fn.progressBarExtension.defaults = {
	'amountPart'	: false
	,'amountTotal'	: false
	,'showTooltip'	: false
};

  $.fn.progressBarExtension.Constructor = ProgressBarExtension;


 /* Progress Bar NO CONFLICT
  * ==================== */

  $.fn.progressBarExtension.noConflict = function () {
    $.fn.progressBarExtension = old;
    return this;
  };


 /* Progress Bar DATA-API
  * ================= */
  $('.progress.amount-graph').each(function(){
	  var showTooltip = false;
	  if ($(this).attr('data-tooltip-message')){
		  showTooltip = $(this).attr('data-tooltip-message');
	  };
	  $(this).progressBarExtension({
		'thisElm'		: $(this)
		,'amountPart'	: $(this).attr('data-amount-part')
		,'amountTotal'	: $(this).attr('data-amount-total')
		,'showTooltip'	: showTooltip
	  });
  });
  
}(window.jQuery);



/* =============================================================
 * Cambria Password Strength v1.0
 *  
 * =============================================================*/


!function ($) {
  	"use strict"; // jshint ;_;
	var PasswordStrength = PasswordStrength || {};
	if ($.isEmptyObject(PasswordStrength)) {
		(function () {
			
			this.init = function(params) {
				//alert('init');
				var randomKey = Math.floor((Math.random()*100)+1);
				var createdMeter = $('<p>',{'class':'strong', 'id':'pStrength_'+randomKey});
				var meterId = '#'+createdMeter.attr('id');
				var thisElmId = '#'+ params.thisElm.attr('id');
				
				createdMeter.insertAfter(thisElmId);
				params.thisElm.attr('data-meter',meterId);
				params.meter = meterId;
				PasswordStrength.doCheck(params);
			};
			
			this.doCheck = function(params) {
				var meter = $(params.meter);
				meter.html(checkStrength(params.password,meter));
			};
			function checkStrength(password, elm){
				var strength = 0;

				if (password.length < 6) { 
					elm.removeAttr('class');
					elm.addClass('short');
					return 'Password Strength: Too short';
				}

				if (password.length > 7) strength += 1;
				if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/))  strength += 1;
				if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/))  strength += 1;
				if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/))  strength += 1;
				if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1;
				if (strength < 2 ) {
					elm.removeAttr('class');
					elm.addClass('weak');
					return 'Password Strength: Weak';
				} else if (strength == 2 ) {
					elm.removeAttr('class');
					elm.addClass('good');
					return 'Password Strength: Good';
				} else {
					elm.removeAttr('class');
					elm.addClass('strong');
					return 'Password Strength: Strong';
				}
			};

			// Static method - escapes a jQuery-style id.
			this.escape = function(namespaceId, elmtId) {
				return elmtId.replace("#", "#" + namespaceId);
			};	
		}).apply(PasswordStrength);
	}


 /* Password Strength PLUGIN DEFINITION
  * ========================== */

  var old = $.fn.passwordStrength;

$.fn.passwordStrength = function (option) {
	var options = $.extend({}, $.fn.passwordStrength.defaults, typeof option == 'object' && option);
	if (options.meter){
		PasswordStrength.doCheck(options);
	}else{
		PasswordStrength.init(options);
	}

};

$.fn.passwordStrength.defaults = {
	'meter'		: false
	,'password'	: ''
};

  $.fn.passwordStrength.Constructor = PasswordStrength;


 /* Password Strength NO CONFLICT
  * ==================== */

  $.fn.passwordStrength.noConflict = function () {
    $.fn.passwordStrength = old;
    return this;
  };


 /* Password Strength DATA-API
  * ================= */
	$(document).on('keyup', '.password-strength', function (e) {
	    var $this = $(this), href
	      , meter = $this.attr('data-meter')
	      , password = $this.val()
	        || e.preventDefault()
	        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''); //strip for ie7
	    $(this).passwordStrength({
	    	'meter'			: meter
	    	,'password'		: password
	    	,'thisElm'		: $(this)

	    });
	});
  
}(window.jQuery);



/* =============================================================
 * cambria Collapse Drawer v1.0
 *  
 * =============================================================*/


!function ($) {
  	"use strict"; // jshint ;_;
	var CollapseDrawer = CollapseDrawer || {};
	if ($.isEmptyObject(CollapseDrawer)) {
		(function () {
			this.toggle = function (params) {
				$('[data-drawer-group='+params.toggleGroup+'].in').each(function(){
					$(this).unbind('shown');
					var hasData = $(this).data('collapse');
			    	if (params.target != '#'+$(this).attr('id')){
						if (hasData && !hasData.transitioning){
				    		$(this).collapse('hide');
					    	hasData || $(this).data('collapse', null);  
				    	}else if(hasData && hasData.transitioning){
				    		$(this).on('shown', function () {
				    			$(this).collapse('hide');
				    			hasData || $(this).data('collapse', null);  
				    		});
				    	}
			    	}
				});
			};	
		}).apply(CollapseDrawer);
	}


 /* Collapse Drawer PLUGIN DEFINITION
  * ========================== */

  var old = $.fn.collapseDrawer;

	$.fn.collapseDrawer = function (option) {
		var options = $.extend({}, $.fn.collapseDrawer.defaults, typeof option == 'object' && option);
		CollapseDrawer.toggle(options);
	};

  $.fn.collapseDrawer.defaults = {
    'target'		: false
    ,'toggleGroup'	: false
  };

  $.fn.collapseDrawer.Constructor = CollapseDrawer;


 /* Collapse Drawer NO CONFLICT
  * ==================== */

  $.fn.collapseDrawer.noConflict = function () {
    $.fn.collapseDrawer = old;
    return this;
  };


 /* Collapse Drawer DATA-API
  * ================= */
	$(document).on('click.collapse.data-api', '[data-toggle=collapse]', function (e) {
		var $this = $(this), href
	    , target = $this.attr('data-target')
	      || e.preventDefault()
	      || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''); //strip for ie7
		if ($(target).hasClass('collapseDrawer')){
			var toggleGroup = $(target).attr('data-drawer-group');
			$(this).collapseDrawer({
		    	'target'		: target
		    	,'thisElm'		: $(this)
		    	,'toggleGroup'	: toggleGroup
		    });
		}
	});
}(window.jQuery);





