<!DOCTYPE html>
<!--[if lt IE 7 ]><html class="ie ie6" <?php print $language->language; ?>> <![endif]-->
<!--[if IE 7 ]><html class="ie ie7" <?php print $language->language; ?>> <![endif]-->
<!--[if IE 8 ]><html class="ie ie8" <?php print $language->language; ?>> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><html <?php print $language->language; ?>> <!--<![endif]-->

<head profile="<?php print $grddl_profile; ?>">
    <meta charset="utf-8" />
    <meta name="baidu-site-verification" content="WQjNBr1Ha0" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="profile" href="http://gmpg.org/xfn/11" />

	<?php print $head; ?>
    <title><?php print $head_title; ?></title>
    <?php print $styles; ?>
    <?php print $scripts; ?>

    <!--[if lte IE 9]>
        <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
        <script src="http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE9.js"></script>
    <![endif]-->

    <?php global $theme_path; $theme_path = base_path().path_to_theme(); ?>
    <link rel="apple-touch-icon" href="<?php print $theme_path; ?>/images/apple-touch-icon.png">
    <link rel="apple-touch-icon" sizes="72x72" href="<?php print $theme_path; ?>/images/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="114x114" href="<?php print $theme_path; ?>/images/apple-touch-icon-114x114.png">

</head>

<body class="<?php print $classes; ?>" <?php print $attributes;?>>
	<div class="wrapper">
        <div id="skip-link">
            <a href="#main-content" class="element-invisible element-focusable"><?php print t('Skip to main content'); ?></a>
        </div>
		<?php print $page_top; ?>
        <?php print $page; ?>
        <?php print $page_bottom; ?>
    </div>
</body>
</html>
