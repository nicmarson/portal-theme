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
				var headHTML = ''
				headHTML += rootThis.logoElement.clone().wrap('<div></div>').parent().html();
				headHTML += '<hr><p>';
				return headHTML;	
			}
			
			function buildPrintPageFoot(rootThis){
				var footHTML = ''
				footHTML += '</p><hr>';
				footHTML += rootThis.footerElement.clone().wrap('<div></div>').parent().html();
				return footHTML;
			}
			
			function includeStyles(rootThis){
				var styleHTML = ''
				$.each(rootThis.styleElement, function(i,item){
					styleHTML += '<link rel="stylesheet" href="'+item.href+'">';
				});
				return styleHTML;
			}
			
		}).apply(Print)
	}


 /* PRINT PLUGIN DEFINITION
  * ========================== */

  var old = $.fn.print

  $.fn.print = function (option) {;
  	var options = $.extend({}, $.fn.print.defaults, typeof option == 'object' && option);
  	if (options.event == 'fire'){
		Print.doPrint(options);
  	}else{
  		$(this).on(options.event, function(){
  			Print.doPrint(options);
  		});
  	}
  }

  $.fn.print.defaults = {
    'event':		'click',
    'elements':		'document',
	'grabParent':	true
  }

  $.fn.print.Constructor = Print


 /* PRINT NO CONFLICT
  * ==================== */
  $.fn.print.noConflict = function () {
    $.fn.print = old
    return this
  }


 /* PRINT DATA-API
  * ================= */

$(document).on('click', '[data-toggle=print]', function (e) {
    var $this = $(this), href
      , target = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
    $(this).print({
    	'event':'fire',
    	elements: [target],
    	'grabParent':	false
    })
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
				var newState = 'expand'
				if (params.toggleState == 'expand'){
					newState = 'collapse'
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
						rootThis.expand({'id': '#'+elmId})
					}else if (params.toggleState === 'collapse'){
						rootThis.collapse({'id': '#'+elmId})
					}
				});
			};
			
		}).apply(AccordionViewAll)
	}


 /* VIEW ALL PLUGIN DEFINITION
  * ========================== */

  var old = $.fn.accordionViewAll

	$.fn.accordionViewAll = function (option) {
		var options = $.extend({}, $.fn.accordionViewAll.defaults, typeof option == 'object' && option);
		AccordionViewAll.toggle(options);
	}

  $.fn.accordionViewAll.defaults = {
    'target': 		'target',
	'toggleText': 	'toggleText',
	'toggleState': 	'expand'
  }

  $.fn.accordionViewAll.Constructor = AccordionViewAll


 /* VIEW ALL NO CONFLICT
  * ==================== */

  $.fn.accordionViewAll.noConflict = function () {
    $.fn.accordionViewAll = old
    return this
  }


 /* VIEW ALL DATA-API
  * ================= */
$(document).on('click', '.accordionViewAll', function (e) {
    var $this = $(this), href
      , target = $this.attr('data-target')
      , toggleState = $this.attr('data-toggle-state')
      ,	toggleText = $this.attr('data-toggle-text')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
    $(this).accordionViewAll({
    	'target': 		target
    	,'thisElm'	:		$(this)
    	,'toggleText': 	toggleText
    	,'toggleState': toggleState
    })
  });
}(window.jQuery);