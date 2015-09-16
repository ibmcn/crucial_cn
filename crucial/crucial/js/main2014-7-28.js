KISSY.ready(function(S) {


// **************************************
//                  SLIDER
// **************************************

// 回调传入了S（KISSY对象）和Slide构造器
if(document.getElementById('#landing-slider')) {
    KISSY.use('gallery/slide/1.3/',function(S,Slide){
        // 这里调用Slide
         var s = new Slide('.slider',{
            effect : 'fade',
            autoSlide:true,//自动播放
            timeout:5000,//切换时间间隔
            speed:1500//切换速度，越小越快，单位为毫秒

         });
    });
}


// **************************************
//                  SELECTOR
// **************************************



base_path = "/crucial/ajax.php";
tmall = "http://detail.tmall.com/item.htm";
step1_path = base_path + '?act=c';

// step1_path = 'js/manu.json';

KISSY.use('core,io,dom,anim,mvc',function(S,Node,IO,DOM,Anim,mvc){


    var $ = KISSY.all,
        selector = $('.selector'),
        step1 = $('.step-1'),
        step2 = $('.step-2'),
        step3 = $('.step-3'),
        step1_select= step1.one('select'),
        step2_select = step2.one('select'),
        step3_select = step3.one('select'),
        result = $('.result'),
        product_list = $('.plist'),
        main_id,
        sub_id,
        products;

        // result.hide();
        // fix_height();

// ****************************************
//       STEP1: load options on doc ready
// ****************************************
    step1_select.append('<option class="placeholder">请选择制造商</option>');
    IO.getJSON(step1_path,function(data){
        if(data == null){
                show_error('Sorry, no manufacturer is found, please try again later.')
                selector.replaceClass('active-2','active-1');
        }else{

            // load step1 options on load
            S.each(data, function(item) {
                //check if parameters already set
                if($('#step1-val').val() != '' && $('#step1-val').val() == item.id) {
                    option = '<option value="'+ item.id +'" selected="selected">' + decodeURI(item.name) + '</option>';
                    step1_select.append(option);
                    show_step2();
                }
                else {
                    option = '<option value="'+ item.id +'">' + decodeURI(item.name) + '</option>';
                    step1_select.append(option);
                }

            });
            step1_select.removeAttr('disabled');
            step1.removeClass('loading');
            $('.loader').hide();
        }

    });



// ****************************************
//       on STEP1 change
// ****************************************

    selector.delegate('change','.step-1 select',function(s) {
        $('#step1-val').val('');
        $('#step2-val').val('');
        $('#step3-val').val('');
		savelog(s.target.value,'0');
        show_step2();
    });

    function show_step2(){
        $('.step-1 .placeholder').attr('disabled','disabled');

        selector.replaceClass('active-1 active-3','active-2');

        step2.addClass('loading');
        $('.loader').show();

        //remove options and product list
        step2_select.empty();
        step3_select.empty();
        product_list.empty();

        step1_option = $('.step-1 select').val();

        step2_path = base_path + "?act=c&pid=" + step1_option;

        // step2_path = "js/line.json"; //replace with the path above

        var option = '';

        IO.getJSON(step2_path,function(data){
            if(data == null){
                show_error('Sorry, no product line is found, please choose another manufacturer.')
                selector.replaceClass('active-2','active-1');
            }else{


                S.each(data, function(item) {
                    //check if parameters already set
                    if($('#step2-val').val() != '' && $('#step2-val').val() == item.id) {
                        option += '<option value="'+ item.id +'" selected="selected">' + decodeURI(item.name) + '</option>';
                        show_step3();
                    }
                    else {
                        option += '<option value="'+ item.id +'">' + decodeURI(item.name) + '</option>';
                    }
                });

                step2_select.append('<option class="placeholder">请选择制造商</option>' + option);
                step2_select.removeAttr('disabled');
                step2.removeClass('loading');
                $('.loader').hide();

            }
        });





    }

// ****************************************
//       on STEP2 change
// ****************************************

    selector.delegate('change','.step-2 select',function(s) {
        $('#step1-val').val('');
        $('#step2-val').val('');
        $('#step3-val').val('');
		savelog(s.target.value,'0');
        show_step3();
    });

    function show_step3(){
        $('.step-2 .placeholder').attr('disabled','disabled');

        selector.replaceClass('active-1 active-2','active-3');
        step3.addClass('loading');
        $('.loader').show();

        //remove options and product list
        step3_select.empty();
        product_list.empty();

        if($('.selector-box').hasClass('.landing-page') && $('#step2-val').val()) {
            step2_option = $('#step2-val').val();
        }
        else {
            step2_option = $('.step-2 select').val();
        }
        //console.log(step2_option);
        step3_path = base_path + "?act=c&pid=" + step2_option;

        // step3_path = "js/model.json"; //replace with the path above

        var option = '';

        IO.getJSON(step3_path,function(data){
            if(data == null){

                show_error('Sorry, no model is found, please choose another product line.')
                selector.replaceClass('active-3','active-2');

            }else{
                S.each(data, function(item) {
                    //check if parameters already set
                    if($('#step3-val').val() != '' && $('#step3-val').val() == item.id) {
                        option += '<option value="'+ item.id +'" selected="selected">' + decodeURI(item.name) + '</option>';
                        show_product();
                    }
                    else {
                        option += '<option value="'+ item.id +'">' + decodeURI(item.name) + '</option>';
                    }
                });

                step3_select.append('<option class="placeholder">请选择制造商</option>'+option);
                step3_select.removeAttr('disabled');
                step3.removeClass('loading');
                $('.loader').hide();
            }

        });




    }


// ****************************************
//       on STEP3 change
// ****************************************


    step3_select.on('change',function(s) {
        if($('.selector-box').hasClass('.landing-page')) {
            $('#step1-val').val('');
            $('#step2-val').val('');
            $('#step3-val').val('');
			savelog(s.target.value,'0');
            show_product();
        }
    });
	result.delegate('click','.item',function(s) {
		//console.log(KISSY.DOM.attr(s.currentTarget, 'data-iid'));
        savelog(KISSY.DOM.get('.step-3-select').value,KISSY.DOM.attr(s.currentTarget, 'data-iid'));
    });

	result.delegate('click','.ddrmax_close',function(s) {
		KISSY.all('.ddrmax').fadeOut();
    });
	result.delegate('click','.ssdmax_close',function(s) {
		KISSY.all('.ssdmax').fadeOut();
    });

    function show_product(){

        $('.step-3 .placeholder').attr('disabled','disabled');

        product_list.empty().removeClass('has_ddr has_ssd').append('<div class="ddr clearfix"></div><div class="ssd clearfix"></div>');

        result.show().addClass('loading');
        $('.loader').show();
        selector.removeClass('active-1 active-2 active-3');

        if($('.selector-box').hasClass('.landing-page') && $('#step3-val').val()) {
            step3_option = $('#step3-val').val();
        }
        else {
            step3_option = $('.step-3 select').val();
        }

        product_path = base_path + "?act=p&id=" + step3_option;

        // product_path = "js/product.json"; //replace with the path above!!!!

        IO.getJSON(product_path,function(data){
            // console.log(data.length);


            if(data == null){

                show_error('Sorry, no product is found, please try again later')
                selector.replaceClass('active-3','active-2');

             }else{

                var tuples = [];

                S.each(data,function(item, i){
                    tuples.push([i, item.price]);

                    tuples.sort(function(a, b) {
                        a = a[1];
                        b = b[1];

                        return a > b ? -1 : (a < b ? 1 : 0);
                    });

                });
				var ddr_bar,ssd_bar,ddr_i=0,ssd_i=0;
                for (var i = 0; i < tuples.length; i++) {
                    var index = tuples[i][0];
                    var item = data[index];

                    // do something with key and value
                    //console.log(item.price);

                    var href = tmall + '?id=' + item.num_iid;
					//console.log(item.attrs_value);

					option ='<div class="item" data-iid="' + item.num_iid + '">';
                        option +='<span class="family">' + item.family + '</span>';
                        option +='<div class="product_image">';
                            option +='<a href="' + href +'" target="_blank">';
                            option +='<img src="' + item.pic_url + '" alt="">';
                            option +='</a>';
                        option +='</div>';


                        option +='<div class="product_info">';
                            option +='<h3 class="field-content">';
                            option +='<a href="' + href +'" target="_blank">'+ decodeURI(item.title) + '</a>';
                            option +='</h3>';
							option +='<p class="price">产品价格：<span>￥'+ item.price + '</span><a class="buynow" href="' + href +'" target="_blank">立即购买</a></p>';
                            option +='<p class="code">产品编号：<span>'+ item.bianhao + '</span></p>';
                        option +='</div>';
                    option +='</div>';
                    if(item.family === "DDR3"||item.family === "DDR2"||item.family === "DDR"){
						
						if (item.recommend)
						{
						product_list.one('.ddr').prepend(option);
						product_list.one('.ddr').prepend('<div class="highlight orange ddrhigh"><div class="htitle">升级推荐</div></div>');
						}
						else
                        product_list.one('.ddr').append(option);
						
						if (ddr_i==0 && item.attrs_value && item.attrs_value!='None')
						{
							ddr_bar='<div class="ddrmax show"><span>该电脑型号自带内存容量:'+item.attrs_value+'</span><a class="ddrmax_close">X</a></div>';
							ddr_i+=1;
						}
                            product_list.addClass('has_ddr');


                    }else if (item.family === "SSDs"||item.family === "SSD"){
						if (ssd_i==0)
						{
							ssd_bar='<div class="ssdmax show"><span>M550 更优秀的性能，M500 更优惠的价格</span><a class="ssdmax_close">X</a></div>';
							ssd_i+=1;
						}
						if (item.recommend)
						{
							product_list.one('.ssd').prepend(option);
							product_list.one('.ssd').prepend('<div class="highlight orange ssdhigh"><div class="htitle">升级推荐</div></div>');
						}
						else
                        product_list.one('.ssd').append(option);
						
                        product_list.addClass('has_ssd');
                    }
                    else{
                        product_list.append(option);
                    }

                }
				if (ssd_bar)
				product_list.one('.ssd').prepend(ssd_bar);
				if (ddr_bar)
				product_list.one('.ddr').prepend(ddr_bar);

            }

            result.removeClass('loading');
            $('.loader').hide();

            // fix_height();

            //check if all options are selected
            $('#filter-search').on('click', function(){

            });


        });

        //scroll list into window

        new Anim(window,{

            scrollTop: $('.selector').offset().top

        },0.6).run();




    }

    function fix_height(){
        var max = 0;
        $('.item').each(function(){
            // console.log($(this).height());

            if($(this).height() > max){
                max = $(this).height();
            }

        });

        DOM.css('.item', "height",max);
    }


    function show_error(error){
        result.show().one('.plist').append(error);
    }

});
})

function decodeFromGb2312(str){
   var strOut = '';
   for (var i=0;i<str.length; i++){
      var c = str.charAt(i);
      // +是空格
      if (c == '+'){
         strOut += ' ';
      }
      // a,b,c,1,2等，非%开头的，直接返回本身
      else if (c != '%'){
         strOut += c;
      }
      // %开头
      else{
         i++;
         var nextC = str.charAt(i);
         // 数字，则不是汉字
         if (!isNaN(parseInt(nextC))){
            i++;
            strOut += decodeURIComponent(c+nextC+str.charAt(i));
         }
         else{
            var x = new String();
            try
            {
               var code = str.substr(i,2)+str.substr(i+3,2);
               i = i + 4;

               var index = -1;
               while ((index = z.indexOf(code,index+1)) != -1){
                  if (index%4 == 0){
                     strOut += String.fromCharCode(index/4+19968);
                     break;
                  }
               }
            }catch(e){}
         }
      }
   }
   return strOut;
}


function savelog(sele_id,proid){
	KISSY.IO.getJSON(base_path+'?act=visitlog&choose='+sele_id+'&iid='+proid,function(data){

    });
}