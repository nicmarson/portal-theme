/*
 * canvas2png.js
 *
 * Copyright (c) 2010-2011 Shinya Muramatsu
 * Released under the MIT License
 * http://flashcanvas.net/
 */(function(e){var t=e.getElementsByTagName("script"),n=t[t.length-1],r=n.getAttribute("src").replace(/[^\/]+$/,"save.php");window.canvas2png=function(t){var n=t.tagName.toLowerCase();if(n!=="canvas")return;if(typeof FlashCanvas!="undefined")FlashCanvas.saveImage(t);else{var i=e.createElement("form"),s=e.createElement("input");i.setAttribute("action",r);i.setAttribute("method","post");s.setAttribute("type","hidden");s.setAttribute("name","dataurl");s.setAttribute("value",t.toDataURL());e.body.appendChild(i);i.appendChild(s);i.submit();i.removeChild(s);e.body.removeChild(i)}}})(document);