var detailMain, detailSH, detailI=0;
jQuery(document).ready(function($) {
  detailMain = jQuery("#tmall-detail");
  detailSH = jQuery("#tmall-detail .j-trigger");
  detailSH.mouseover(function(event) {
      /* Change the frame view by mouse move */
			var index = $(this).attr("t-index");
			$("#tmall-detail .tmall-border").hide();
			$("#tmall-detail .j-trigger .tmall-cover").show();
			$("#tmall-detail .j-trigger.tmall-current").removeClass('tmall-current');
			$(this).addClass('tmall-current').find(".tmall-border").show();
			$(this).find(".tmall-cover").hide();
			$("#tmall-detail-frames .tmall-item").removeClass('tmall-current').eq(parseInt(index)).addClass('tmall-current');

  });
  detailSlider = setTimeout("detailAutoSlide()",2000);

  detailMain.mouseover(function(event) {
    clearTimeout(detailSlider);
  }).mouseout(function(event) {
    detailSlider = setTimeout("detailAutoSlide()",2000);
  });

});

function detailAutoSlide(){
  if(detailI >= detailSH.length) {
    detailI = 0;
  }
  jQuery(detailSH).eq(detailI).trigger('mouseover');
  detailI = detailI + 1 ;
  detailSlider = setTimeout("detailAutoSlide()",2000);
}
