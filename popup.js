	$(function(){init();});
	function init(){
		var tools_url = 'http://at.yoka.com/jimmy.php';
	  	//历史数据处理
	  	$('#code').val(readVal('myCode',''));
	  	$('#filter').val(readVal('myFilter','#main'));
		$('#show').html('ready');
		//绑定事件
		$('#b1').bind("click",function() {
			t = $('#code').attr('value').toString();
			t1 = t.split(' ');
			t2 = t1[0].split('-');t3 = t1[1].split(':');
			my_date = new Date(new Number(t2[0]),new Number(t2[1]-1),new Number(t2[2]),new Number(t3[0]),new Number(t3[1]),new Number(t3[2]));
			$('#show').html(my_date.getTime());
			saveVal('myCode', $('#code').val());
		});
		$('#b2').bind("click",function(){
				my_date = new Date(new Number($('#code').attr('value')));
				result = my_date.getFullYear() + '-' + (my_date.getMonth()+1) + '-' + my_date.getDate() + ' ' + my_date.getHours() + ':' + my_date.getMinutes() + ':' + my_date.getSeconds();
				$('#show').html(result);
				saveVal('myCode', $('#code').val());
	  	});
	  	$('#b3').bind("click",function(){
	  		t = $('#code').attr('value').toString();
	  		result = phpjs.urlencode(t);
	  		$('#show').html(result);
	  		saveVal('myCode', $('#code').val());
	  	});
	  	$('#b4').bind("click",function(){
	  		t = $('#code').attr('value').toString();
	  		result = phpjs.urldecode(t);
	  		$('#show').html(result);
	  		saveVal('myCode', $('#code').val());
	  	});
	  	$('#b5').bind("click",function(){
	  		t = $('#code').attr('value').toString();
	  		result = t;
	  		$('#show').html(result);
	  		saveVal('myCode', $('#code').val());
	  	});
	  	$('#b6').bind("click",function(){
	  		t = $('#code').attr('value').toString();
	  		t = '{"t":"' + t + '"}';
	  		json = window.JSON;
	  		result = json.parse(t);
	  		$('#show').html(result['t']);
	  		saveVal('myCode', $('#code').val());
	  	});
	  	$('#hidden').bind("click",function(){
	  		chrome.tabs.getSelected(null, function(tab) {
	  			chrome.tabs.sendRequest(tab.id, {filter: $('#filter').val(), act: 'hidden'}, function(response){
	  				$('#show').html(response.flag);
	  			});
	  			saveVal('myFilter', $('#filter').val());
	  		});
	  	});	
		$('#bgcolor').bind("click",function(){
	  		chrome.tabs.getSelected(null, function(tab) {
	  			chrome.tabs.sendRequest(tab.id, {filter: $('#filter').val(), act: 'bgcolor'}, function(response){
					$('#show').html(response.flag);
	  			});
	  			saveVal('myFilter', $('#filter').val());
	  		});
	  	});
		$('#style').bind("click",function(){
	  		chrome.tabs.getSelected(null, function(tab) {
	  			chrome.tabs.sendRequest(tab.id, {filter: $('#filter').val(), act: 'style', style: $('#code').val()}, function(response){
					$('#show').html(response.flag);
	  			});
	  			saveVal('myCode', $('#code').val());
	  			saveVal('myFilter', $('#filter').val());
	  		});
	  	});
  	}

function readVal(val, defa){
    if(typeof(localStorage.getItem(val)) == 'undefined') {
        localStorage.setItem(val, defa);
        re = defa;
    }
    else
        re = localStorage.getItem(val);
    return re;
}

function saveVal(val, content) {
    localStorage.setItem(val, content);
}