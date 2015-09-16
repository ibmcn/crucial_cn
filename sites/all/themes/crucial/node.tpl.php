<article id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?>"<?php print $attributes; ?>>
  <?php if (!$page) { ?>
    <header class="node-header">
    <?php print render($title_prefix); ?>
        <h2<?php print $title_attributes; ?>><a href="<?php print $node_url; ?>"><?php print $title; ?></a></h2>
        <?php print render($title_suffix); ?>
  </header>
    <?php } ?>
    
    <?php if ($display_submitted) { ?>
    <div class="clearfix">
	    <div class="dateline"><?php print date('Y-m-d',$node->created); ?></div>
	    <!-- JiaThis Button BEGIN -->
	    <div class="jiathis_style_32x32 clearfix jiathisshare">
	      <a class="jiathis_button_qzone"></a>
	      <a class="jiathis_button_tsina"></a>
	      <a class="jiathis_button_tqq"></a>
	      <a class="jiathis_button_weixin"></a>
	      <a class="jiathis_button_renren"></a>
	      <a href="http://www.jiathis.com/share" class="jiathis jiathis_txt jtico jtico_jiathis" target="_blank"></a>
	    </div>

	    <script type="text/javascript" src="http://v3.jiathis.com/code/jia.js" charset="utf-8"></script>
    </div>
    <!-- JiaThis Button END -->
    <?php } ?>
    
  <div class="content clearfix"<?php print $content_attributes; ?>>
    <?php
    // We hide the comments and links now so that we can render them later.
    hide($content['comments']);
    hide($content['links']);
    print render($content);
    ?>
  </div>

    <?php if (!empty($content['links'])): ?>
        <div class="links"><?php print render($content['links']); ?></div>
    <?php endif; ?>

    <?php print render($content['comments']); ?>
</article>
