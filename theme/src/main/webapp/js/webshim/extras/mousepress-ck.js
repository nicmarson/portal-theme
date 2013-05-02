/*
 * simple helper for a mousepress event
 * used by webshims improving spinbutton controls for input[type=time], input[type=number]...
 * 
 * $(element).bind('mousepress', function(){
 * 	//repeatedly called after mousedown, till mouseleave/mouseup
 * });
 */(function(e){var t=function(e,t){var n=e.data("mousepresstimer");n&&clearTimeout(n);t&&e.unbind("mouseup.mousepressext mouseleave.mousepressext");e=null};e.event.special.mousepress={setup:function(){var n;e(this).bind("mousedown.mousepressext",function(n){var r=e(this),i=function(s){var o=0;t(r);r.data("mousepresstimer",setInterval(function(){e.event.special.mousepress.handler(r[0],n);o++;o>3&&s>45&&i(s-40)},s))},s=e(n.target).trigger("mousepressstart",[n]);t(r);r.data("mousepresstimer",setTimeout(function(){i(180)},200));r.bind("mouseup.mousepressext mouseleave.mousepressext",function(e){t(r,!0);s.trigger("mousepressend",[e]);r=null;s=null})})},teardown:function(){t(e(this).unbind(".mousepressext"),!0)},handler:function(t,n){return(e.event.dispatch||e.event.handle).call(t,{type:"mousepress",target:n.target,pageX:n.pageX,pageY:n.pageY})}}})(jQuery);