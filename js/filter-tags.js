function newList() {
	var masonry = new Macy({
		container: '#sortable',
		trueOrder: false,
		waitForImages: false,
		margin: 24,
		columns: 6,
		margin: {
			y: 16,
			x: '2%',
		},
		breakAt: {
			1300: 6,
			1200: 5,
			1100: 4,
			850: 2,
			0: 1,
		},
	});
}
window.onresize = function(){
newList();
}
var num = 0;
var page = 10; //每次加载4条
//获取滚动条当前的位置
function getScrollTop() {
	var scrollTop = 0;
	if(document.documentElement && document.documentElement.scrollTop) {
		scrollTop = document.documentElement.scrollTop;
	} else if(document.body) {
		scrollTop = document.body.scrollTop;
	}
	return scrollTop;
}

//获取当前可是范围的高度 
function getClientHeight() {
	var clientHeight = 0;
	if(document.body.clientHeight && document.documentElement.clientHeight) {
		clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
	} else {
		clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
	}
	return clientHeight;
}

//获取文档完整的高度 
function getScrollHeight() {
	return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}

$(function() {
	$.ajax({
		url: "work.json", //json文件位置
		type: "get",
		dataType: 'json',
		success: function(data) { //请求成功完成后要执行的方法
			var jsonAll = [];
			var jsonAPP = [];
			var jsonWEB = [];
			var jsonPM = [];
			var jsonDX = [];

			var urlTitle = 'https://marshmello.oss-cn-hangzhou.aliyuncs.com/';
//			var urlResize = '?x-oss-process=image/resize,p_50';
			$('.sortable__nav a').click(function() {
				$('.sortable__nav a').removeClass('is-active');
				$(this).addClass('is-active');
			})

			$.each(data.data, function(i, data) {
				var titleNum1 = data.ObjectName.indexOf('/');
				var title = data.ObjectName.substring(0, titleNum1);
				var Id = data.id;
				jsonAll.push({
					id: data.id,
					ObjectName: data.ObjectName
				});
				if(title == 'APP') {
					jsonAPP.push({
						id: data.id,
						ObjectName: data.ObjectName
					});
				} else if(title == 'WEB') {
					jsonWEB.push({
						id: data.id,
						ObjectName: data.ObjectName
					});
				} else if(title == '平面设计') {
					jsonPM.push({
						id: data.id,
						ObjectName: data.ObjectName
					});
				} else if(title == '动效设计') {
					jsonDX.push({
						id: data.id,
						ObjectName: data.ObjectName
					});
				}
			});
			$(window).scroll(function() {
				var scrollTop = $(this).scrollTop()+200;　　
				var scrollHeight = $(document).height();　　
				var windowHeight = $(this).height();　
				if(scrollTop + windowHeight >= scrollHeight) {
					if($('#btn_all').is('.is-active')) {
						myAll();
						$('.pull-loading').html("上拉加载");
					}

				};
				var winHeight=scrollTop-200 + windowHeight == scrollHeight;
				if(winHeight){
					$('.pull-loading').html("已经加载完了哟!");
				}
			});

			function myAll() {
				var data_length = jsonAll.length; //数据的总长度
				var remainder = data_length % page; //余数
				if(data_length >= (num + page)) {
					for(var j = num; j < num + page; j++) {
						var titleNum1 = jsonAll[j].ObjectName.indexOf('/');
						var titleNum2 = jsonAll[j].ObjectName.lastIndexOf('/');
						var title = jsonAll[j].ObjectName.substring(0, titleNum1);
						var nameNum = jsonAll[j].ObjectName.lastIndexOf('.');
						var name = jsonAll[j].ObjectName.substring(titleNum1 + 1, titleNum2);
						var content = jsonAll[j].ObjectName.substring(titleNum2 + 1, nameNum);
						var Id = jsonAll[j].id;
						var imgUrl = urlTitle + jsonAll[j].ObjectName;
						$('#sortable').append(
							"<a class='card demo'><img id='" +
							Id +
							"' class='card__picture' src='" +
							imgUrl +
							"'><div class='card-infos'><h2 class='card——badge'>" +
							title +
							"</h2><h2 class='card__title'>" +
							name +
							"</h2><p class='card__text'>" + content + "</p></div></a>"
						)
					}

					num += page;　
					newList();
				} else if(remainder != 0 && data_length - num == remainder) {
					for(var j = num; j < num + remainder; j++) {
						var titleNum1 = jsonAll[j].ObjectName.indexOf('/');
						var titleNum2 = jsonAll[j].ObjectName.lastIndexOf('/');
						var title = jsonAll[j].ObjectName.substring(0, titleNum1);
						var nameNum = jsonAll[j].ObjectName.lastIndexOf('.');
						var name = jsonAll[j].ObjectName.substring(titleNum1 + 1, titleNum2);
						var content = jsonAll[j].ObjectName.substring(titleNum2 + 1, nameNum);
						var Id = jsonAll[j].id;
						var imgUrl = urlTitle + jsonAll[j].ObjectName;
						$('#sortable').append(
							"<a class='card demo'><img id='" +
							Id +
							"' class='card__picture' src='" +
							imgUrl +
							"'><div class='card-infos'><h2 class='card——badge'>" +
							title +
							"</h2><h2 class='card__title'>" +
							name +
							"</h2><p class='card__text'>" + content + "</p></div></a>"
						)
					}

					num += page;　
					newList();
				}
			};
			$('#btn_all').click(function() {
				num = 0;
				$('#sortable a').remove();
				myAll();
			});

			$('#btn1').click(function() {
				$('#sortable a').remove();
				for(var i = 0; i < jsonAPP.length; i++) {
					var titleNum1 = jsonAPP[i].ObjectName.indexOf('/');
					var titleNum2 = jsonAPP[i].ObjectName.lastIndexOf('/');
					var title = jsonAPP[i].ObjectName.substring(0, titleNum1);
					var nameNum = jsonAPP[i].ObjectName.lastIndexOf('.');
					var name = jsonAPP[i].ObjectName.substring(titleNum1 + 1, titleNum2);
					var content = jsonAPP[i].ObjectName.substring(titleNum2 + 1, nameNum);
					var Id = jsonAPP[i].id;
					var imgUrl = urlTitle + jsonAPP[i].ObjectName;
					$('#sortable').append(
						"<a class='card'><img id='" +
						Id +
						"' class='card__picture' src='" +
						imgUrl +
						"'><div class='card-infos'><h2 class='card——badge'>" +
						title +
						"</h2><h2 class='card__title'>" +
						name +
						"</h2><p class='card__text'>" + content + "</p></div></a>"
					)
				};
				newList();
			});
			$('#btn2').click(function() {
				$('#sortable a').remove();
				for(var i = 0; i < jsonWEB.length; i++) {
					var titleNum1 = jsonWEB[i].ObjectName.indexOf('/');
					var titleNum2 = jsonWEB[i].ObjectName.lastIndexOf('/');
					var title = jsonWEB[i].ObjectName.substring(0, titleNum1);
					var nameNum = jsonWEB[i].ObjectName.lastIndexOf('.');
					var name = jsonWEB[i].ObjectName.substring(titleNum1 + 1, titleNum2);
					var content = jsonWEB[i].ObjectName.substring(titleNum2 + 1, nameNum);
					var Id = jsonWEB[i].id;
					var imgUrl = urlTitle + jsonWEB[i].ObjectName;
					$('#sortable').append(
						"<a class='card'><img id='" +
						Id +
						"' class='card__picture' src='" +
						imgUrl +
						"'><div class='card-infos'><h2 class='card——badge'>" +
						title +
						"</h2><h2 class='card__title'>" +
						name +
						"</h2><p class='card__text'>" + content + "</p></div></a>"
					)
				};
				newList();
			});
			$('#btn3').click(function() {
				$('#sortable a').remove();
				for(var i = 0; i < jsonPM.length; i++) {
					var titleNum1 = jsonPM[i].ObjectName.indexOf('/');
					var titleNum2 = jsonPM[i].ObjectName.lastIndexOf('/');
					var title = jsonPM[i].ObjectName.substring(0, titleNum1);
					var nameNum = jsonPM[i].ObjectName.lastIndexOf('.');
					var name = jsonPM[i].ObjectName.substring(titleNum1 + 1, titleNum2);
					var content = jsonPM[i].ObjectName.substring(titleNum2 + 1, nameNum);
					var Id = jsonPM[i].id;
					var imgUrl = urlTitle + jsonPM[i].ObjectName;
					$('#sortable').append(
						"<a class='card'><img id='" +
						Id +
						"' class='card__picture' src='" +
						imgUrl +
						"'><div class='card-infos'><h2 class='card——badge'>" +
						title +
						"</h2><h2 class='card__title'>" +
						name +
						"</h2><p class='card__text'>" + content + "</p></div></a>"
					)
				};
				newList();
			});
			$('#btn4').click(function() {
				$('#sortable a').remove();
				for(var i = 0; i < jsonDX.length; i++) {
					var titleNum1 = jsonDX[i].ObjectName.indexOf('/');
					var titleNum2 = jsonDX[i].ObjectName.lastIndexOf('/');
					var title = jsonDX[i].ObjectName.substring(0, titleNum1);
					var nameNum = jsonDX[i].ObjectName.lastIndexOf('.');
					var name = jsonDX[i].ObjectName.substring(titleNum1 + 1, titleNum2);
					var content = jsonDX[i].ObjectName.substring(titleNum2 + 1, nameNum);
					var Id = jsonDX[i].id;
					var imgUrl = urlTitle + jsonDX[i].ObjectName;
					$('#sortable').append(
						"<a class='card'><img id='" +
						Id +
						"' class='card__picture' src='" +
						imgUrl +
						"'><div class='card-infos'><h2 class='card——badge'>" +
						title +
						"</h2><h2 class='card__title'>" +
						name +
						"</h2><p class='card__text'>" + content + "</p></div></a>"
					)
				};
				newList();
			});

		}

	});
	//	弹窗
	var alertView = $('#alert-view');
	var toogleImg = $('.cut a,.alert-view-img');
	var main = $('.main');
	var alertImg = $('.alert-view-img ');
	var imgList = new Image();
	var cardPicture = $('.card__picture');
	var h = window.innerHeight;
	var w = window.innerWidth;
	alertImg.css('width', w * 0.6);
	$(document).on('click', '.card__picture', function() { //ajax动态加载点击触发解决
		$('body').css('overflow', 'hidden');
		alertView.css('display', 'block');
		main.css('filter', 'blur(10px)');
		var viewImg = $(this).attr('src');
		alertImg.attr('src', viewImg);
		var viewId = $(this).attr('id');
		console.log(viewId)

		alertImg.removeClass('alert-img');

		var imgWb = this.naturalWidth * 2; //当前图片宽度
		var imgNum = 1100 / imgWb; //放大图片比值
		var imgHb = this.naturalHeight * 2; //当前图片高度
		var imgInt = imgHb * imgNum; //放大图片高度
		var imgH = new Image();
		imgH.src = viewImg;
		//判断是否有缓存
		if(imgH.complete) {
			if(imgInt < h) {
				alertImg.addClass('alert-img');
			}
		} else {
			imgH.onload = function() {
				if(imgInt < h) {
					alertImg.addClass('alert-img');
				}
			};
		}
		$('.cut-left').click(function() {
			var leftImg = $('#' + (--viewId)).attr('src');
			alertImg.attr('src', leftImg);

			alertImg.removeClass('alert-img');
			var imgH = alertImg.css('height');
			if(parseInt(imgH) < h) {
				alertImg.addClass('alert-img');
			}
		});
		$('.cut-right').click(function() {
			var rightImg = $('#' + (++viewId)).attr('src');
			alertImg.attr('src', rightImg);

			alertImg.removeClass('alert-img');
			var imgH = alertImg.css('height');
			if(parseInt(imgH) < h) {
				alertImg.addClass('alert-img');
			}
		});

	});

	var imgs = document.querySelectorAll(".card__picture");
	for(var i = 0; i < imgs.length; i++) {
		imgs[i].index = i;
		imgs[i].onclick = function() {
			var indexNum = this.index;;
			$('.cut-left').click(function() {
				if(indexNum < 1) {
					indexNum = imgs.length;
				};
				indexNum--;
				var leftImg = cardPicture.eq(indexNum).attr('src');
				alertImg.attr('src', leftImg);

				alertImg.removeClass('alert-img');
				var imgH = alertImg.css('height');
				if(parseInt(imgH) < h) {
					alertImg.addClass('alert-img');
				}
			});
			$('.cut-right').click(function() {
				if(indexNum == imgs.length - 1) {
					indexNum = -1;
				};
				indexNum++;
				var rightImg = cardPicture.eq(indexNum).attr('src');
				alertImg.attr('src', rightImg);

				alertImg.removeClass('alert-img');
				var imgH = alertImg.css('height');
				if(parseInt(imgH) < h) {
					alertImg.addClass('alert-img');
				}
			})
		}
	}

	$(document).mouseup(function(e) {
		if(!toogleImg.is(e.target) && toogleImg.has(e.target).length === 0) { // Mark 1
			$('body').css('overflow', 'auto');
			alertView.css('display', 'none');
			main.css('filter', 'blur(0)');
			alertImg.removeClass('alert-img');
		}
	});

	//	$.when(myajax).done(function() {
	//		var $imgs = $('#sortable div'); // Store all images
	//		var $buttons = $('.sortable__nav'); // Store buttons element
	//		var tagged = {}; // Create tagged object
	//
	//		$imgs.each(function() { // Loop through images and
	//			var img = this; // Store img in variable
	//			var tags = $(this).data('tags'); // Get this element's tags
	//
	//			if(tags) { // If the element had tags
	//				tags.split(',').forEach(function(tagName) { // Split at comma and
	//
	//					if(tagged[tagName] == null) { // If object doesn't have tag
	//						tagged[tagName] = []; // Add empty array to object
	//					}
	//					tagged[tagName].push(img); // Add the image to the array
	//				});
	//			}
	//		});
	//
	//		$('<li>' + "<a data-sjslink='all' class='nav__link'>全部</a>'", {}).appendTo($buttons);
	//
	//		$.each(tagged, function(tagName) { // For each tag name
	//			$('<li>' + "<a data-sjslink='" + tagName + "' class='nav__link'>" + tagName + "</a>'", {}).appendTo($buttons); // Add to the buttons
	//		});
	////		document.querySelector('#sortable').sortablejs();
	//	});
});