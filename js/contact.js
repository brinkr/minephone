function sub() {
	var linkeperson = $("#Username").val();
	var tel = $("#tel").val();
	var project = $("#selectpicker option:selected").text();
	var QQ = $("#QQ").val();
				/*var linkeperson="测试";  //$("#Username").val();
				 var email="244975106@qq.com";   //$("#email").val();
				 var project="未选择";   //$("#selectpicker").val();*/
	var remark = $("#remark").val()+"——"+project;
    console.log(remark);
	if(linkeperson == '') {
		alert('联系人不能为空');
		return false;
	}
	if(tel == '') {
		alert('电话不能为空');
		return false;
	}
	if(remark == '') {
		alert('内容不能为空');
		return false;
	}

	$.post("http://112.124.31.118:9200/minephoneweb/links", { Username: linkeperson, tel: tel, projectType: project, remark: remark, QQ: QQ, comefrom: 'minephone' }, function(data) {
		data = eval("(" + data + ")");
		alert(data.message);
		$("#Username").val("");
		$("#tel").val("");
	    $("#selectpicker").val("");
		$("#remark").val("");
		$("#QQ").val("");
	});
}

function getWidth(){
	if (window.innerWidth) 
    winWidth = window.innerWidth; 
    else if ((document.body) && (document.body.clientWidth)) 
    winWidth = document.body.clientWidth; 
    // 获取窗口高度 
    if (window.innerHeight) 
    winHeight = window.innerHeight; 
    else if ((document.body) && (document.body.clientHeight)) 
    winHeight = document.body.clientHeight; 
    // 通过深入 Document 内部对 body 进行检测，获取窗口大小 
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) 
    { 
    winHeight = document.documentElement.clientHeight; 
    winWidth = document.documentElement.clientWidth; 
	}
	return winWidth;
}

$("#submit").click(function() {
	sub();
});


$(document).ready(function(){
	$('#selectpicker').css({'color':'#757575'});
	$('#selectpicker').click(function(){
		if($('#selectpicker option:selected').val()!=0){
			$(this).css({'color':'#000'});
		}else{
			$(this).css({'color':'#757575'});
		}
		
	});
	if(getWidth()>768){
		var myHeight=getWidth()*0.3;
		var ft_size=80*(getWidth()/1920);
		$('.banner').css({"height":myHeight});
		$('.slogan').css({"fontSize":ft_size,"paddingTop":130*(getWidth()/1920)});
		$('.slogan p:last-of-type').css({"fontSize":(24/80)*ft_size});
	}
	$(window).resize(function(){		
		if(getWidth()>768){
			myHeight=getWidth()*0.3;
			var ft_size=80*(getWidth()/1920);
			$('.banner').css({"height":myHeight});
			$('.slogan').css({"fontSize":ft_size,"paddingTop":130*(getWidth()/1920)});
			$('.slogan p:last-of-type').css({"fontSize":(24/80)*ft_size});

		}
		

	});
	
});