var showCJ = true,
	time = 90000,
	n = 0;

$('.MF_Consultation .consultationBox .closeBtn img').click(function() {
	$('.MF_Consultation').css('display', 'none');
			message.clear();
	
	var timeClock = setTimeout('modalShow(' + time + ')', time);
	showCJ = true;
});
$('.freeFeel').click(function() {
	$('.MF_Consultation').css('display', 'block');
	message.show();
	var timeClock = setTimeout('modalShow(' + time + ')', time);
	showCJ = false;
});

function sub(name, Phone) {
	if(name == '') {
		alert('姓名不能为空');
	} else {
		if(Phone == '') {
			alert('电话不能为空');
		} else {
			console.info('1');
			$.post("http://112.124.31.118:9200/minephoneweb/links", {
					Username: name,
					tel: Phone,
					projectType: '',
					remark: '',
					QQ: '',
					comefrom: 'minephone'
				}, function(data) {

					data = eval("(" + data + ")");
					$('.userName').val('');
					$('.userPassword').val('');
					$('.MF_Consultation').css('display', 'none');
					var timeClock = setTimeout('modalShow(' + time + ')', time);
					showCJ = true;
					alert("您的申请已提交，我司会立即安排商务经理联系您。感谢你的支持。咨询电话020-28190980。");
					
				}).success(function() { console.log("second success"); })
				.error(function(data) { console.dir(data); });
		}
	}

}

$('.Experience').click(function() {
	var name = $('.userName').val();
	var phone = $('.userPassword').val();
	console.log('name == ' + name);
	console.log('phone == ' + phone);
	sub(name, phone);
});

function modalShow(Time) {
	Time = time;
	console.log(time);
	if(showCJ) {
		if(n >= 1) {
			console.log(showCJ);
			var timeClock = setTimeout('modalShow()', Time);
			$('.MF_Consultation').css('display', 'block');
				message.show();
			
			time = 90000;
			showCJ = !showCJ;
		} else if(n == 0) {
			n = 1;
			var timeClock = setTimeout('modalShow(' + time + ')', Time);
		}
	} else {
			message.clear();
		clearTimeout(timeClock);
		
	}
}
$(function() {
	if($(window).width() >= 800) {
		modalShow(time);
	}
});



// 使用message对象封装消息  
	var message = {
		time: 0,
		title: document.title,
		timer: null,
		// 显示新消息提示  
		show: function() {
			var title = message.title.replace("【　　　】", "").replace("【新消息】", "");
			// 定时器，设置消息切换频率闪烁效果就此产生  
			message.timer = setTimeout(function() {
				message.time++;
				message.show();
				if(message.time % 2 == 0) {
					document.title = "【新消息】" + title
				} else {
					document.title = "【　　　】" + title
				};
			}, 600);
			return [message.timer, message.title];
		},
		// 取消新消息提示  
		clear: function() {
			clearTimeout(message.timer);
			document.title = "新零售，会员，营销，电子商务，微信小程序";
		}
	};
	// 页面加载时绑定点击事件，单击取消闪烁提示  
	function bind() {
		document.onclick = function() {
			message.clear();
		};
	}