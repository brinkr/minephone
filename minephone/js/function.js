			$(document).ready(function() {
	
				// Show or hide the sticky footer button
				$(window).scroll(function() {
					if ($(this).scrollTop() > 200) {
						$('.go-top').fadeIn(200);
					} else {
						$('.go-top').fadeOut(200);
					}
				});		
				// Animate the scroll to top
				$('.go-top').click(function(event) {
					event.preventDefault();
					$('html, body').animate({scrollTop: 0}, 300);
				})
				//解决方案切换
				$(".tab>li").mouseover(function(){ 
					$(".tab>li").removeClass("on"); 
					$(this).addClass("on"); 
					var target = $('#' + this.rel); 
					if (target.size() > 0) { 
						$('.details > dl').hide(); 
						target.show(); 
					} else { 
					alert('There is no such container.'); 
					} 
				}); 
				var $tab_li = $('.tab ul li');
				$tab_li.hover(function(){
					$(this).addClass('selected').siblings().removeClass('selected');
					var index = $tab_li.index(this);
					$('div.tab_box > div').eq(index).show().siblings().hide();
				});	
				//解决方案移上效果
				$('.tab-bg').hover(function(){
					$(this).addClass('overlayer');
					$(this).find($('.tab-bg p')).addClass('alphy');
					$(this).find($('.tab-bg i')).css('display','block');
					$(this).find($('.tab-bg i a')).css('display','block');
				},
				function(){
					$(this).removeClass('overlayer');
					$('.tab-bg p').removeClass('alphy');
					$(this).find($('.tab-bg i')).hide();
				})
			});
			$(document).ready(function($){
				$('#full-width-slider').royalSlider({
					autoPlay: true,
					arrowsNav: true,
					loop: false,
					keyboardNavEnabled: false,
					controlsInside: false,
					imageScaleMode: 'fill',
					arrowsNavAutoHide: true,
					arrowsNavHideOnTouch:true,
					navigateByClick:false,
					autoScaleSlider: true, 
					autoScaleSliderWidth: 960,     
					autoScaleSliderHeight: 395,
					controlNavigation: 'bullets',
					thumbsFitInViewport: false,
					startSlideId: 0,
					transitionType:'move',
					autoplay:true,
					deeplinking: {
						enabled: true,
						change: false
					},
					imgWidth: 1400,
					imgHeight: 680
				});
				
			});
