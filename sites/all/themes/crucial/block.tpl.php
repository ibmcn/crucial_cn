<aside id="<?php print $block_html_id; ?>" class="<?php print $classes; ?> clearfix"<?php print $attributes; ?>>
	<?php if ($block->subject): ?>
	<header class="node-header">
		<?php print render($title_prefix); ?>
        	<h3<?php print $title_attributes; ?>><?php print $block->subject ?></h3>
        <?php print render($title_suffix); ?>
	</header>
    <?php endif;?>
	
	<div class="content"<?php print $content_attributes; ?>>
		<?php print $content ?>
	</div>
	<div class="clear"></div>
</aside>