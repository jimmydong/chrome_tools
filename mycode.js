chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
		if(request.act == 'hidden') $(request.filter).html('');
		if(request.act == 'bgcolor') $(request.filter).css('background-color', '#EE4444');
		if(request.act == 'style'){
			t = request.style.split(';');
			for(var i=0;i<t.length;i++){
				t2 = t[i].split(':');
				if(t2.length == 2)$(request.filter).css(t2[0],t2[1]);
			}
		}
		sendResponse({flag: "ok"});
});
//kill ad
if(t = $('#ad_text'))t.html('');