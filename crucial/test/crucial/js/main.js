var base_path = "/crucial/ajax.php";
var tmall = "http://detail.tmall.com/item.htm";
var step1_path = base_path + '?act=c';
var os=validataOS();
var offvalue=100;
var itemvalue=207;
var $ = KISSY.DOM,Event = KISSY.Event,
        selector = $.get('.selector'),
        step1 = $.get('.step-1'),
        step2 = $.get('.step-2'),
        step3 = $.get('.step-3'),
        step1_select = $.get('.step-1-select'),
        step2_select = $.get('.step-2-select'),
        step3_select = $.get('.step-3-select'),
        result = $.get('.result'),
        product_list = $.get('.plist'),
        main_id,
        sub_id,
		option,
        products;


getdata(step1_path,step1_select,step1,'请选择制造商');


		

KISSY.all('.step-1-select').on('change', function(s){
		ok();
		$.get('.ddr').innerHTML='';
		$.get('.ssd').innerHTML='';
		step2_select.innerHTML='';
		step3_select.innerHTML='';

		if (this.value=='其它')
		{
		sorry();
		}
		else
		{
		$.addClass(step2,"loading");
		$.replaceClass('.selector','active-1 active-4 active-3','active-2');
		option=getdata(step1_path+'&pid='+this.value,step2_select,step2,'请选择产品线');
		savelog(s.target.value,'0');
		}

	});

KISSY.all('.step-2-select').on('change', function(s){
		ok();
		$.get('.ddr').innerHTML='';
		$.get('.ssd').innerHTML='';
		step3_select.innerHTML='';
		
		if (this.value=='其它')
		{
		sorry();
		}
		else
		{
		$.addClass(step3,"loading");
		$.replaceClass('.selector','active-2 active-1 active-4','active-3');
		option=getdata(step1_path+'&pid='+this.value,step3_select,step3,'请选择型号');
		savelog(s.target.value,'0');
		}
		
	});
	
KISSY.all('.step-3-select').on('change', function(s){
		ok();
		$.get('.ddr').innerHTML='';
		$.get('.ssd').innerHTML='';
		
		if (this.value=='其它')
		{
		sorry();
		}
		else
		{
		$.addClass(result,"loading");
		$.replaceClass('.selector','active-1 active-2 active-3','active-4');
		option=getproductdata(base_path+'?act=p&id='+this.value,result);
		$.replaceClass('.result','defaultbg','');
		savelog(s.target.value,'0');
		}
	});



if (os=='Mac'){
KISSY.all(result).on('scroll', function(){
		if (result.scrollTop<offvalue)
		{
			$.replaceClass('.scrollup','show','hide');
		}
		else
		{
			$.replaceClass('.scrollup','hide','show');
		}
		
		if (result.scrollTop>=(product_list.offsetHeight-itemvalue))
		{
			$.replaceClass('.scrolldown','show','hide');
			//console.log(result.scrollTop+'---'+(product_list.offsetHeight-itemvalue));
		}
		else{
			$.replaceClass('.scrolldown','hide','show');
		}
		
	});
KISSY.all('.scrolldown').on('click', function(){
		//$.offset(result,{ left:200, top:300 });
		var move;
		move=Math.floor((result.scrollTop+itemvalue)/itemvalue)*itemvalue;
		
		if (result.scrollTop+itemvalue<=product_list.offsetHeight)
		{
		result.scrollTop=move;
		$.replaceClass('.scrollup','hide','show');
		}

		
	});
KISSY.all('.scrollup').on('click', function(){
		var move;
		move=Math.floor((result.scrollTop-itemvalue)/itemvalue)*itemvalue;
		//console.log(result.scrollTop+'---'+(product_list.offsetHeight-itemvalue))
		if (result.scrollTop>=offvalue)
		{
		result.scrollTop=move;
		$.replaceClass('.scrolldown','hide','show');
		}

		move=itemvalue;
		move=result.scrollTop-move;
		if (result.scrollTop<itemvalue)
		{
			$.replaceClass('.scrollup','show','hide');
			$.replaceClass('.scrolldown','hide','show');
		}
	});
}


KISSY.Event.delegate(product_list,'click','.item', function(s){
	savelog(step3_select.value,$.attr(s.currentTarget,"data-iid"));
});
KISSY.Event.delegate(product_list,'click','.ddrmax_close', function(s){
	KISSY.all('.ddrmax').fadeOut();
});
KISSY.Event.delegate(product_list,'click','.ssdmax_close', function(s){
	KISSY.all('.ssdmax').fadeOut();
	$.replaceClass('.orange','highlight','highlight_notop');
});
function getdata(url,step_select,obj,fristoption){
	KISSY.io({
    url: url,
    success: function(data) {
        option='<option class="placeholder">'+fristoption+'</option>';
		option = document.createElement("option");
		option.innerHTML=fristoption;
		step_select.appendChild(option);
		
		data.forEach(function(i){
		option = document.createElement("option");
		option.innerHTML=i.name;
		option.value=i.id;
		step_select.appendChild(option);
		})
		$.replaceClass('.scrollup','show','hide');
		$.replaceClass('.scrolldown','show','hide');
		if (option)
		$.removeClass(obj,"loading");
		option='<option value="no">'+fristoption+'</option>';
		option = document.createElement("option");
		option.innerHTML='其它';
		step_select.appendChild(option);
    },

    // 请求错误时的回调
    error: function(){
        console.log("error")
    },
    //发送请求类型是jsonp
    dataType:"json"
});
}

function getproductdata(url,obj){
	KISSY.io({
    url: url,
    success: function(data) {
		var ddr='',ssd='';
		var i=0;
		if (data)
			ok();
		else
			sorry();
		data.forEach(function(item){
			
			$.replaceClass('.scrollup','show','hide');
			$.replaceClass('.scrolldown','show','hide');
			var href = tmall + '?id=' + item.num_iid;
                    
					
					
					if(item.family === "DDR3"||item.family === "DDR2"||item.family === "DDR"){
					if (!ddr)
					{
					ddr+='<div class="ddrmax show"><span>该电脑型号自带内存容量:'+item.attrs_value+'</span><a class="ddrmax_close">X</a></div>';
					i++;
					}
                    ddr +='<div class="item" data-iid="'+item.num_iid+'">';
                        ddr +='<span class="family">' + item.family + '</span>';
                        ddr +='<div class="product_image">';
                            ddr +='<a href="' + href +'" target="_blank">';
                            ddr +='<img src="' + item.pic_url + '" alt="">';
                            ddr +='</a>';
                        ddr +='</div>';

                   
                        ddr +='<div class="product_info">';
                            ddr +='<h3 class="field-content">';
                            ddr +='<a href="' + href +'" target="_blank">'+ item.title + '</a>';
                            ddr +='</h3>';
							ddr +='<p class="price">产品价格：<span>￥'+ item.price + '</span><a class="buynow" href="' + href +'" target="_blank">立即购买</a></p>';
                            ddr +='<p class="code">产品编号：<span>'+ item.bianhao + '</span></p>';
                        ddr +='</div>';
                    ddr +='</div>';
  					
                    
                    }else if (item.family === "SSDs"||item.family === "SSD"){
						if (!ssd)
						{
							ssd+='<div class="ssdmax show"><span>M550 更优秀的性能，M500 更优惠的价格</span><a class="ssdmax_close">X</a></div><div class="highlight orange"><div class="htitle">升级推荐</div></div>';
						}

                        ssd +='<div class="item" data-iid="'+item.num_iid+'">';
                        ssd +='<span class="family">' + item.family + '</span>';
                        ssd +='<div class="product_image">';
                            ssd +='<a href="' + href +'" target="_blank">';
                            ssd +='<img src="' + item.pic_url + '" alt="">';
                            ssd +='</a>';
                        ssd +='</div>';

                   
                        ssd +='<div class="product_info">';
                            ssd +='<h3 class="field-content">';
                            ssd +='<a href="' + href +'" target="_blank">'+ item.title + '</a>';
                            ssd +='</h3>';
							ssd +='<p class="price">产品价格：<span>￥'+ item.price + '</span><a class="buynow" href="' + href +'" target="_blank">立即购买</a></p>';
                            ssd +='<p class="code">产品编号：<span>'+ item.bianhao + '</span></p>';
                        ssd +='</div>';
                    ssd +='</div>';
                    }
                    else{
                        option +='<div class="item" data-iid="'+item.num_iid+'">';
                        option +='<span class="family">' + item.family + '</span>';
                        option +='<div class="product_image">';
                            option +='<a href="' + href +'" target="_blank">';
                            option +='<img src="' + item.pic_url + '" alt="">';
                            option +='</a>';
                        option +='</div>';

                   
                        option +='<div class="product_info">';
                            option +='<h3 class="field-content">';
                            option +='<a href="' + href +'" target="_blank">'+ item.title + '</a>';
                            option +='</h3>';
							option +='<p class="price">产品价格：<span>￥'+ item.price + '</span><a class="buynow" href="' + href +'" target="_blank">立即购买</a></p>';
                            option +='<p class="code">产品编号：<span>'+ item.bianhao + '</span></p>';
                        option +='</div>';
                    option +='</div>';
                    }
					
		
		})
		

		if (os=='Mac')
		{
			$.replaceClass('.scrolldown','hide','show');
		}
		if (ddr)
		$.get('.ddr').innerHTML=ddr;
		if (ssd)
		$.get('.ssd').innerHTML=ssd;

		$.removeClass(obj,"loading");
    },

    // 请求错误时的回调
    error: function(){
		sorry();
        console.log("error");
    },
    //发送请求类型是jsonp
    dataType:"json"
});
}

function savelog(sele_id,proid){
	KISSY.io({
		url: '/crucial/ajax.php?act=visitlog&choose='+sele_id+'&iid='+proid,
		success: function(data) {

		},
	
		// 请求错误时的回调
		error: function(){
			console.log("error")
		},
		//发送请求类型是jsonp
		dataType:"json"
	});
}

function validataOS(){
if(navigator.userAgent.indexOf("Window")>0){
return "Windows";
}else if(navigator.userAgent.indexOf("Mac")>0) {
return "Mac";
}else if(navigator.userAgent.indexOf("Linux")>0) {
return "Linux";
}else{
return "NUll";
}
}
function ok(){
	$.replaceClass('.result','hide','show');
	$.replaceClass('.noresoult','show','hide');
}
function sorry(){
	$.replaceClass('.result','show','hide');
	$.replaceClass('.noresoult','hide','show');
}