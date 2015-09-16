var base_path = "/crucial/ajax.php";
var tmall = "http://detail.tmall.com/item.htm";
var step1_path = base_path + '?act=c';
var os=validataOS();
var offvalue=100;
var itemvalue=253;
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

$.removeClass(step1,"loading");

KISSY.all('.step-1-select').on('change', function(){
		
		$.get('.ddr').innerHTML='';
		$.get('.ssd').innerHTML='';
		step2_select.innerHTML='';
		step3_select.innerHTML='';
		$.addClass(step2,"loading");
		$.replaceClass('.selector','active-1 active-4 active-3','active-2');
		option=getdata(step1_path+'&pid='+this.value,step2_select,step2,'请选择产品线');
		
		
	});

KISSY.all('.step-2-select').on('change', function(){
		$.get('.ddr').innerHTML='';
		$.get('.ssd').innerHTML='';
		step3_select.innerHTML='';
		$.addClass(step3,"loading");
		$.replaceClass('.selector','active-2 active-1 active-4','active-3');
		option=getdata(step1_path+'&pid='+this.value,step3_select,step3,'请选择型号');

	});
	
KISSY.all('.step-3-select').on('change', function(){
		$.get('.ddr').innerHTML='';
		$.get('.ssd').innerHTML='';
		$.addClass(result,"loading");
		$.replaceClass('.selector','active-1 active-2 active-3','active-4');
		option=getproductdata(base_path+'?act=p&id='+this.value,result);
		//$.offset(selector).top
		
		
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
function getdata(url,step_select,obj,fristoption){
	KISSY.io({
    url: url,
    success: function(data) {
        option='<option class="placeholder">'+fristoption+'</option>';
		data.forEach(function(i){
		option += '<option value="'+ i.id +'">' + i.name + '</option>';
		})
		$.replaceClass('.scrollup','show','hide');
		$.replaceClass('.scrolldown','show','hide');
		step_select.innerHTML=option;
		if (option)
		$.removeClass(obj,"loading");
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

		data.forEach(function(item){
			$.replaceClass('.scrollup','show','hide');
			$.replaceClass('.scrolldown','show','hide');
			var href = tmall + '?id=' + item.num_iid;
                    
					
					
					if(item.family === "DDR3"||item.family === "DDR2"||item.family === "DDR"){

                    ddr +='<div class="item">';
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

                        ssd +='<div class="item">';
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
                        option +='<div class="item">';
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
        console.log("error")
    },
    //发送请求类型是jsonp
    dataType:"json"
});
}


function validataOS(){
if(navigator.userAgent.indexOf("Window")>0){
return "Windows";
}else if(navigator.userAgent.indexOf("Mac OS X")>0) {
return "Mac ";
}else if(navigator.userAgent.indexOf("Linux")>0) {
return "Linux";
}else{
return "NUll";
}
}