function newList(){var masonry=new Macy({container:'#sortable',trueOrder:false,waitForImages:false,margin:24,columns:6,margin:{y:16,x:'2%'},breakAt:{1400:6,1300:5,1200:4,1100:3,1000:2,0:1}})}window.onresize=function(){newList()};var num=0;var page=6;function getScrollTop(){var scrollTop=0;if(document.documentElement&&document.documentElement.scrollTop){scrollTop=document.documentElement.scrollTop}else if(document.body){scrollTop=document.body.scrollTop}return scrollTop}function getClientHeight(){var clientHeight=0;if(document.body.clientHeight&&document.documentElement.clientHeight){clientHeight=Math.min(document.body.clientHeight,document.documentElement.clientHeight)}else{clientHeight=Math.max(document.body.clientHeight,document.documentElement.clientHeight)}return clientHeight}function getScrollHeight(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)}$(function(){$.ajax({url:"work.json",type:"get",dataType:'json',success:function(data){var jsonAll=[];var jsonAPP=[];var jsonWEB=[];var jsonPM=[];var jsonDX=[];var urlTitle='https://marshmello.oss-cn-hangzhou.aliyuncs.com/';var urlResize='?x-oss-process=image/resize,p_50';$('.sortable__nav a').click(function(){$('.sortable__nav a').removeClass('is-active');$(this).addClass('is-active')});$.each(data.data,function(i,data){var titleNum1=data.ObjectName.indexOf('/');var title=data.ObjectName.substring(0,titleNum1);jsonAll.push({ObjectName:data.ObjectName});if(title=='APP'){jsonAPP.push({ObjectName:data.ObjectName})}else if(title=='WEB'){jsonWEB.push({ObjectName:data.ObjectName})}else if(title=='平面设计'){jsonPM.push({ObjectName:data.ObjectName})}else if(title=='动效设计'){jsonDX.push({ObjectName:data.ObjectName})}});$(window).scroll(function(){var scrollTop=$(this).scrollTop()+400;var scrollHeight=$(document).height();var windowHeight=$(this).height();if(scrollTop+windowHeight>=scrollHeight){if($('#btn_all').is('.is-active')){myAll();$('.pull-loading').html("上拉加载")}};var winHeight=scrollTop-400+windowHeight==scrollHeight;if(winHeight){$('.pull-loading').html("已经加载完了哟!")}});function myAll(){var data_length=jsonAll.length;var remainder=data_length%page;if(data_length>=(num+page)){for(var j=num;j<num+page;j+=1){var titleNum1=jsonAll[j].ObjectName.indexOf('/');var titleNum2=jsonAll[j].ObjectName.lastIndexOf('/');var title=jsonAll[j].ObjectName.substring(0,titleNum1);var nameNum=jsonAll[j].ObjectName.lastIndexOf('.');var name=jsonAll[j].ObjectName.substring(titleNum1+1,titleNum2);var content=jsonAll[j].ObjectName.substring(titleNum2+1,nameNum);var imgUrl=urlTitle+jsonAll[j].ObjectName+urlResize;var dataUrl=urlTitle+jsonAll[j].ObjectName;$('#sortable').append("<a class='card'><img class='card__picture' src='"+imgUrl+"'data-src='"+dataUrl+"'><div class='card-infos'><h2 class='card——badge'>"+title+"</h2><h2 class='card__title'>"+name+"</h2><p class='card__text'>"+content+"</p></div></a>")}num+=page;newList()}else if(remainder!=0&&data_length-num==remainder){for(var j=num;j<num+remainder;j+=1){var titleNum1=jsonAll[j].ObjectName.indexOf('/');var titleNum2=jsonAll[j].ObjectName.lastIndexOf('/');var title=jsonAll[j].ObjectName.substring(0,titleNum1);var nameNum=jsonAll[j].ObjectName.lastIndexOf('.');var name=jsonAll[j].ObjectName.substring(titleNum1+1,titleNum2);var content=jsonAll[j].ObjectName.substring(titleNum2+1,nameNum);var imgUrl=urlTitle+jsonAll[j].ObjectName+urlResize;var dataUrl=urlTitle+jsonAll[j].ObjectName;$('#sortable').append("<a class='card'><img class='card__picture' src='"+imgUrl+"'data-src='"+dataUrl+"'><div class='card-infos'><h2 class='card——badge'>"+title+"</h2><h2 class='card__title'>"+name+"</h2><p class='card__text'>"+content+"</p></div></a>")}num+=page;newList()}};$('#btn_all').click(function(){num=0;$('#sortable a').remove();myAll()});$('#btn1').click(function(){$('#sortable a').remove();for(var i=0;i<jsonAPP.length;i+=1){var titleNum1=jsonAPP[i].ObjectName.indexOf('/');var titleNum2=jsonAPP[i].ObjectName.lastIndexOf('/');var title=jsonAPP[i].ObjectName.substring(0,titleNum1);var nameNum=jsonAPP[i].ObjectName.lastIndexOf('.');var name=jsonAPP[i].ObjectName.substring(titleNum1+1,titleNum2);var content=jsonAPP[i].ObjectName.substring(titleNum2+1,nameNum);var imgUrl=urlTitle+jsonAPP[i].ObjectName+urlResize;var dataUrl=urlTitle+jsonAPP[i].ObjectName;$('#sortable').append("<a class='card'><img class='card__picture' src='"+imgUrl+"'data-src='"+dataUrl+"'><div class='card-infos'><h2 class='card——badge'>"+title+"</h2><h2 class='card__title'>"+name+"</h2><p class='card__text'>"+content+"</p></div></a>")};newList()});$('#btn2').click(function(){$('#sortable a').remove();for(var i=0;i<jsonWEB.length;i+=1){var titleNum1=jsonWEB[i].ObjectName.indexOf('/');var titleNum2=jsonWEB[i].ObjectName.lastIndexOf('/');var title=jsonWEB[i].ObjectName.substring(0,titleNum1);var nameNum=jsonWEB[i].ObjectName.lastIndexOf('.');var name=jsonWEB[i].ObjectName.substring(titleNum1+1,titleNum2);var content=jsonWEB[i].ObjectName.substring(titleNum2+1,nameNum);var imgUrl=urlTitle+jsonWEB[i].ObjectName+urlResize;var dataUrl=urlTitle+jsonWEB[i].ObjectName;$('#sortable').append("<a class='card'><img class='card__picture' src='"+imgUrl+"'data-src='"+dataUrl+"'><div class='card-infos'><h2 class='card——badge'>"+title+"</h2><h2 class='card__title'>"+name+"</h2><p class='card__text'>"+content+"</p></div></a>")};newList()});$('#btn3').click(function(){$('#sortable a').remove();for(var i=0;i<jsonPM.length;i+=1){var titleNum1=jsonPM[i].ObjectName.indexOf('/');var titleNum2=jsonPM[i].ObjectName.lastIndexOf('/');var title=jsonPM[i].ObjectName.substring(0,titleNum1);var nameNum=jsonPM[i].ObjectName.lastIndexOf('.');var name=jsonPM[i].ObjectName.substring(titleNum1+1,titleNum2);var content=jsonPM[i].ObjectName.substring(titleNum2+1,nameNum);var imgUrl=urlTitle+jsonPM[i].ObjectName+urlResize;var dataUrl=urlTitle+jsonPM[i].ObjectName;$('#sortable').append("<a class='card'><img class='card__picture' src='"+imgUrl+"'data-src='"+dataUrl+"'><div class='card-infos'><h2 class='card——badge'>"+title+"</h2><h2 class='card__title'>"+name+"</h2><p class='card__text'>"+content+"</p></div></a>")};newList()});$('#btn4').click(function(){$('#sortable a').remove();for(var i=0;i<jsonDX.length;i+=1){var titleNum1=jsonDX[i].ObjectName.indexOf('/');var titleNum2=jsonDX[i].ObjectName.lastIndexOf('/');var title=jsonDX[i].ObjectName.substring(0,titleNum1);var nameNum=jsonDX[i].ObjectName.lastIndexOf('.');var name=jsonDX[i].ObjectName.substring(titleNum1+1,titleNum2);var content=jsonDX[i].ObjectName.substring(titleNum2+1,nameNum);var imgUrl=urlTitle+jsonDX[i].ObjectName+urlResize;var dataUrl=urlTitle+jsonDX[i].ObjectName;$('#sortable').append("<a class='card'><img class='card__picture' src='"+imgUrl+"'data-src='"+dataUrl+"'><div class='card-infos'><h2 class='card——badge'>"+title+"</h2><h2 class='card__title'>"+name+"</h2><p class='card__text'>"+content+"</p></div></a>")};newList()})}});var alertView=$('#alert-view');var toogleImg=$('.cut a,.alert-view-img');var main=$('.main');var alertImg=$('.alert-view-img ');var imgList=new Image();var cardPicture=$('.card__picture');var h=window.innerHeight;var w=window.innerWidth;$(document).on('click','.card__picture',function(){$('body').css('overflow','hidden');alertView.css('display','block');main.css('filter','blur(10px)');var viewImg=$(this).attr('data-src');alertImg.attr('src',viewImg);alertImg.removeClass('alert-img');var imgWb=this.naturalWidth*2;var imgNum=1100/imgWb;var imgHb=this.naturalHeight*2;var imgInt=imgHb*imgNum;var imgH=new Image();imgH.src=viewImg;var imgs=document.querySelectorAll(".card__picture");for(var i=0;i<imgs.length;i+=1){imgs[i].index=i;var indexNum=this.index;$('.cut-left').off('click');$('.cut-left').click(function(){if(indexNum<1){indexNum=imgs.length};indexNum-=1;var leftImg=imgs[indexNum].src;var str=leftImg.split('?');alertImg.attr('src',str[0]);alertImg.removeClass('alert-img');var imgH=alertImg.css('height');if(parseInt(imgH)<h){alertImg.addClass('alert-img')}});$('.cut-right').off('click');$('.cut-right').click(function(){if(indexNum==imgs.length-1){indexNum=-1};indexNum+=1;var leftImg=imgs[indexNum].src;var str=leftImg.split('?');alertImg.attr('src',str[0]);alertImg.removeClass('alert-img');var imgH=alertImg.css('height');if(parseInt(imgH)<h){alertImg.addClass('alert-img')}})}if(imgH.complete){if(imgInt<h){alertImg.addClass('alert-img')}}else{imgH.onload=function(){if(imgInt<h){alertImg.addClass('alert-img')}}}});$(document).mouseup(function(e){if(!toogleImg.is(e.target)&&toogleImg.has(e.target).length===0){$('body').css('overflow','auto');alertView.css('display','none');main.css('filter','blur(0)');alertImg.removeClass('alert-img')}});});
