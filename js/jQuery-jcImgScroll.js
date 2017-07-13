;(function($){
	$.fn.jcImgScroll = function(options) {
		var defaults = {
			speed : 400,
			width : 618,
			height : 342,
			offsetX : 100,
			setZoom : .7,
			loadClass : "loading",
			position:"center",
			count :3,
			arrow : {
				width:110,	
				height:342,
				x:20,
				y:0
			},
			NumBtn : false,
			setNumBtn : {
				width : 19,
				height : 18,
				x : 0,
				y : 362
			},
			title:true,
			setTitle : {
				height:35,
				border:8,
				bgColor:"#6ba600",
				color:"#fff",
				padding:20,
				opacity:.8
			}
		};
		var options = $.extend(defaults,options);
		return this.each(function() {
			var _SELF = $(this),
				_arrData = [],
				_IDX = 0,
				_CENTER = 0,
			    $IMGLIST = $("a",_SELF),
				$IMGWRAP = $("ul",_SELF),
				$IMGWRAPLIST = $("li",$IMGWRAP),
				fnGetIndexArr = function(index,len){  // 当前索引,长度
					var arrCurrIdx = [index];
					for(b=0;b<=len;b++){
						arrCurrIdx.push(index+(b+1));
						arrCurrIdx.unshift(index-(b+1)<0?99:index-(b+1));
					};
					return arrCurrIdx;
				},
				setSize = function(Dom,l,t,w,h,z,s){
					Dom.show()
						 .css("z-index",z)
						 .animate({"top":t,"left":l,"height":h,"width":w},s);
				};
				//初始化DOM对象
				object = function(length){
					this.length = length;
					this.setNum = options.setNumBtn;
					this.NumBtnDom = function(list,w,h,l,t){
						return "<dl style=\"z-index:11;width:"+w+"px;height:"+h+"px;position:absolute;left:"+l+"px;top:"+t+"px;\">"+ list +"<dl>";
					};
					this.arrow = function(l,r,w,h,x,y){
						return "<em class=\"sPrev\" id=\"sPrev\" style=\"position:absolute;cursor:pointer;width:"+w+"px;height:"+h+"px;left:0px;top:135px\"></em><em class=\"sNext\" id=\"sNext\" style=\"position:absolute;cursor:pointer;width:"+w+"px;height:"+h+"px;right:0px;top:"+y+"px;\"></em>";
					};
					this.hoverDom = function(t,con,h){
						return '<div class="info"><a href="'+h+'"><h2>'+t+'</h2><p>'+con+'</p></a></div>';
					};
				};
			//初始化获取DOM数据
			object.prototype.Initial = function(callback){
				if(options.count > this.length) { //this.length
					alert("\"Count\" parameter can not be greater than the total number of pictures, you must base !");
					return false;
				} else if(options.count < 0) {
					alert("\"Count\" parameter can not be negative, you must base  !");
					return false;
				} else if(options.count%2 === 0) {
					alert("\"Count\" parameter must base  !");
					return false;
				};
				this.arrNumList = [];
				this.arrImgObj = [];
				this.arrData = [];
				this.centerIdx = Math.round(this.length/2)-1;
				this.centerCount = Math.floor(options.count/2)-1,
				_IDX = this.centerIdx;
				_CENTER = this.centerCount;
				this.indexArr = fnGetIndexArr(this.centerIdx,this.centerCount);  //获取当前索引组
				//console.log(this.indexArr)
				$IMGWRAP.css({"position":"relative","width":options.width,"height":options.height,"margin":"0 auto"});
				var a=null,b=null,c=null,sTmpDD=null,t=2,t2=this.centerCount+1,
					CenIdxArr = this.indexArr[this.centerCount+1],
				    wrapL = $IMGWRAP.offset().left,
					wrapR = $IMGWRAP.offset().left+options.width,
					setPos = function(mode,height){
						var nPos = null;
						switch(mode){
							case "top" :
								nPos = 0;
								break;
							case "center" :
								nPos = (options.height - height)*0.5;
								break;
							case "bottom" :
								nPos = options.height - height;
								break;
							default :
								alert("Parameters \"position\" Error, \"top\", \"center\", \"bottom\" !")
						};
						return nPos;
					};
				for(a=0;a<this.length;a++){
					var ourl=window.location.protocol+"://"+window.location.host+window.location.pathname;
					var othis = $IMGWRAPLIST.eq(a),
						olist = othis.find("a"),
					    sPath = olist.attr("path"),
						sTitle = olist.attr("title"),
                        sCon = olist.data("content"),
                        sHref = olist.attr("href");
					othis.addClass(options.loadClass)
						 .css({ "width":options.width,
							    "height":options.height,
								"position":"absolute",
								"display":"block",
								"overflow":"hidden",
								"z-index":0
							  });
					//创建图片对象
					oImg = new Image();
					oImg.src = sPath;
					oImg.title = sTitle;
					// oImg.width = 360;
					// oImg.height = 240;
					// oImg.width = options.width;
					// oImg.height = options.height;
					this.arrImgObj.push(oImg);
					//显示初始化
					for(c=0;c<options.count;c++){
						if(a===this.indexArr[c]){
							var zindex = a>CenIdxArr?a-t:a,
								tmp = a>CenIdxArr?a-this.centerIdx:t2, //核心索引
								width = Math.round(options.width/tmp*options.setZoom),
								height = Math.round(options.height/tmp*options.setZoom),
								top = Math.round(setPos(options.position,height))
								left = Math.round(options.offsetX*tmp);
							//console.log(tmp)
							if(a<CenIdxArr){
								t2-=1;
								left = left * -1;
								
							};
							if(a>CenIdxArr){
								t+=2;
								left = (options.width-width)+left;
							};
							if(a==CenIdxArr){
								othis.addClass("select");
								width = options.width;
								height = options.height;
								left = 0;
								top = 0;
							};
							setSize(othis,left,top,width,height,zindex,options.speed*1.5);
							this.arrData.push([left,top,width,height,zindex]);
							break;
						};
					};
					//输出标题Dom
					if(options.title){
						othis.prepend(this.hoverDom(sTitle,
                                                    sCon,
                                                    sHref
													))
							 .end()
							 .find("b")
							 .css("opacity",100);
					};
					//获取数字按钮
					if(options.NumBtn){
						var NumStyle = "cursor:pointer;float:left;height:"+this.setNum.height+"px;width:"+this.setNum.width+"px;overflow:hidden;";
						if(this.centerIdx === a){
							sTmpDD = "<dd class=\"curr\" style=\""+ NumStyle +"\">"+ a +"</dd>";
						} else {
							sTmpDD = "<dd style=\""+ NumStyle +"\">"+ a +"</dd>";
						};
						this.arrNumList.push(sTmpDD);
					};
				};
				//输出箭头按钮
				_SELF.prepend(this.arrow(wrapL,wrapR,options.arrow.width,options.arrow.height,options.arrow.x,options.arrow.y))
					 .find("em")
					 .show(0);
				//输出数字按钮
				if(this.arrNumList.length !=0 ){
					var NumListDom = this.arrNumList.join(""),
						NumWrapWidth = this.setNum.width*this.length,
						NumWrapHeight = this.setNum.height,
						NumWrapLeft = (_SELF.width()-NumWrapWidth)*0.5 + this.setNum.x;
					_SELF.append(this.NumBtnDom(NumListDom,NumWrapWidth,NumWrapHeight,NumWrapLeft,this.setNum.y))
						 .find("dl")
						 .show();
				};
				callback.call(this,this.arrImgObj);
				return this.arrData;
			};
			//调用对象 、操作
			var o = new object($IMGLIST.length);
			_arrData = o.Initial(function(arrImg){
				for(var b in arrImg){
					arrImg[b].tmp = b;
					arrImg[b].onload = function(){
						var idx = this.tmp,
							$thisImg = $IMGLIST.eq(idx);
						$thisImg.html($(arrImg[idx]))
								.find("img")
								.fadeIn(600)
								.parents("li")
								.removeClass(options.loadClass);
					};
				};
				//释放对象
				(function(obj){
					var d=null,arg = arguments,len=arg.length;
					for(d=1;d<len;d++){
						delete obj[arg[d]];
					};
				}(this,"arrImgObj","arrNumList","NumBtnDom","arrow","hoverDom","setNum","indexArr"));
			});
			o.Initial = null;
			o = null;
			object = null;
			//事件操作
			//console.log(_arrData)
			var imgLength = $IMGLIST.length;
			function imgScroll(index,ArrData,dd){
				$IMGWRAPLIST.hide()
							.css("z-index",-1)
							.eq(index)
							.addClass("select")
							.siblings()
							.removeClass("select");
			    $IMGWRAPLIST.eq(index)
							.find("img")
							.fadeTo(100,.5)
							.fadeTo(200,1);
				
				dd.eq(index).addClass("curr").siblings().removeClass("curr");
				var indedArr = fnGetIndexArr(index,_CENTER),
					indedArrLen = indedArr.length,i=null;
					//console.log(ArrData)
				for(i=0;i<indedArrLen;i++){
					setSize($IMGWRAPLIST.eq(indedArr[i]),
							ArrData[i][0],
							ArrData[i][1],
							ArrData[i][2],
							ArrData[i][3],
							ArrData[i][4],
							150
							);
				};
			};
			var $prev = $("#sNext",_SELF),
				$next = $("#sPrev",_SELF),
				$dd = $("dd",_SELF);
			$prev.click(function(){
				if(_IDX > 0) {
					_IDX = _IDX -1;
					imgScroll(_IDX,_arrData,$dd);
				};
				return false;
			});
			$next.click(function(){
				if(_IDX < imgLength-1) {
					_IDX = _IDX + 1;
					imgScroll(_IDX,_arrData,$dd);
				};
				return false;
			});
			$dd.click(function(){
				_IDX = $(this).index();
				imgScroll(_IDX,_arrData,$dd);
			});
			if(options.title){
				var borderwidth = options.setTitle.border,
				    warpheight = options.height,
					warpwidth = options.width,
					textHeight = options.setTitle.height;
			};
			return false;
		});
	};
})(jQuery)