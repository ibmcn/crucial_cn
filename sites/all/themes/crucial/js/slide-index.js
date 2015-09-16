var indexMain, indexSH, indexI = 0;


jQuery(document).ready(function($) {
  var sUserAgent = navigator.userAgent;
  var mobileAgents = ['Android', 'iPhone', 'Symbian', 'WindowsPhone', 'iPod', 'BlackBerry', 'Windows CE'];
  var goUrl = 0;
  for (var i = 0; i < mobileAgents.length; i++) {
    if (sUserAgent.indexOf(mobileAgents[i]) < 0) {
      goUrl = 1;
      break;
    }
  }
  if(goUrl = 1){
    // if ua isn't mobile
    var links = $(".tmall-item .tmall-pic");
    var links2 = $(".tmall-info .tmall-title");
    var links3 = $(".tmall-info .tmall-price");
    for(var i = 0; i < links.length; i ++){
      var numid = links.eq(i).attr("href").replace("http://a.m.tmall.com/i","").split(".htm")[0];
      if(parseInt(numid)!= NaN){
        nhref = 'http://detail.tmall.com/item.htm?id=' + numid;
        links.eq(i).attr("tmall-id",numid).attr("href",nhref);
        links2.eq(i).attr("href",nhref);
        links3.eq(i).attr("href",nhref);
      }
    }
  }

  indexMain = jQuery("#tmall-index");
  indexSH = jQuery("#tmall-index .j-trigger");
  indexSH.mouseover(function(event) {
    /* Change the frame view by mouse move */
    var index = $(this).attr("t-index");
    $(".tmall-border").hide();
    $(this).find(".tmall-border").show();
    $("#tmall-index-frames .tmall-item").removeClass('tmall-current').eq(parseInt(index)).addClass('tmall-current');
  });

  slider = setTimeout("indexAutoSlide()", 2000);
  indexMain.mouseover(function(event) {
    clearTimeout(slider);
  }).mouseout(function(event) {
    slider = setTimeout("indexAutoSlide()", 2000);
  });

});

function indexAutoSlide() {
  if (indexI >= indexSH.length) {
    indexI = 0;
  }
  jQuery(indexSH).eq(indexI).trigger('mouseover');
  indexI = indexI + 1;
  slider = setTimeout("indexAutoSlide()", 2000);
}

