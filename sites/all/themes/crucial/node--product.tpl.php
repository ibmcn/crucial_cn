<article id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?>"<?php print $attributes; ?>>
	<?php if (!$page) { ?>
    <header class="node-header">
		<?php print render($title_prefix); ?>
        <h2<?php print $title_attributes; ?>><a href="<?php print $node_url; ?>"><?php print $title; ?></a></h2>
        <?php print render($title_suffix); ?>
	</header>
    <?php } ?>
    
	<div class="content clearfix"<?php print $content_attributes; ?>>
		<?php
		// We hide the comments and links now so that we can render them later.
		hide($content['comments']);
		hide($content['links']);
		//print render($content);
		?>
        <div class="row">
    		<div class="columns five alpha">
            	<?php print render($content['body']); ?>
            </div>
            <div class="columns six omega">
                <?php print render($content['field_image']); ?>
            </div>
        </div>
        
	<div id="button_wrapper">
		<div class="product_price" data-tmall-id="<?php print $node->field_tmall_product_id["und"][0]["value"];?>"></div>
		<a href="http://detail.tmall.com/item.htm?id=<?php print $node->field_tmall_product_id["und"][0]["value"];?>" class="buy-now button"><i class="tmall-cat"></i>立即购买</a>
	</div>
        <div id="crucial-tab-wrapper">
        	<ul class="crucial-tabs">
            	<li><a href="#" rel="tab-1" class="defaulttab"><?php print t('产品参数'); ?></a></li>
                <li><a href="#" rel="tab-2"><?php print t('产品介绍'); ?></a></li>
                <li><a href="#" rel="tab-3"><?php print t('选择Crucial'); ?></a></li>
                <li><a href="#" rel="tab-4"><?php print t('安装指南'); ?></a></li>
            </ul>
            <div class="tab-content" id="tab-1"><?php print render($content['field_tab_1']); ?></div>
            <div class="tab-content" id="tab-2"><?php print render($content['field_tab_2']); ?></div>
            <div class="tab-content" id="tab-3"><?php print render($content['field_tab_3']); ?></div>
            <div class="tab-content" id="tab-4"><?php print render($content['field_tab_4']); ?></div>
        </div>	
    </div>
</article>

<script>
(function() {
		var tmallId = "";
		var obj = jQuery("*[data-tmall-id]");
		for (var i = 0; i < obj.length; i++) {
			if(i == 0){
				tmallId = obj.eq(i).attr("data-tmall-id");
				
			}else{
				tmallId = tmallId + ',' + obj.eq(i).attr("data-tmall-id");
			}
			if(obj.eq(i).attr("data-tmall-id")==""){
				obj.eq(i).text("当前缺货");
				obj.eq(i).next(".buy-now").hide();
				if(obj.length == 1){
					return false;
				}
			}
		}
		jQuery.ajax({
			// url: '/fetchJsonData/?act=get_product',
			url: '/crucial/ajax.php?act=get_product',
			type: 'GET',
			dataType: 'json',
			async: false,
			data: {"id" : tmallId},
			success: function(data){
				database = data;
				for(var tid in data){
					jQuery("*[data-tmall-id='"+ tid +"']").text("¥ " + data[tid].price);
				}
				// 缺货处理
				for (var i = 0; i < obj.length; i++) {
					if(obj.eq(i).text() == ""){
						obj.eq(i).text("当前缺货");
					}
				}
			}
		})
		.fail(function() {
			console.log("api is error");
		});
	})();
</script>
