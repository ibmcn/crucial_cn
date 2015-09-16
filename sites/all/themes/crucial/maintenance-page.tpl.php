<!DOCTYPE html>
<!--[if lt IE 7 ]><html class="ie ie6" <?php print $language->language; ?>> <![endif]-->
<!--[if IE 7 ]><html class="ie ie7" <?php print $language->language; ?>> <![endif]-->
<!--[if IE 8 ]><html class="ie ie8" <?php print $language->language; ?>> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><html <?php print $language->language; ?>> <!--<![endif]-->

<head>
    <meta charset="utf-8" />
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
    <link rel="shortcut icon" href="<?php print $theme_path; ?>/images/favicon.ico">
    <link rel="apple-touch-icon" href="<?php print $theme_path; ?>/images/apple-touch-icon.png">
    <link rel="apple-touch-icon" sizes="72x72" href="<?php print $theme_path; ?>/images/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="114x114" href="<?php print $theme_path; ?>/images/apple-touch-icon-114x114.png">

</head>

<body class="<?php print $classes; ?>" <?php print $attributes;?>>
	<div class="wrapper">
        <div id="skip-link">
            <a href="#main-content" class="element-invisible element-focusable"><?php print t('Skip to main content'); ?></a>
        </div>

        <header id="header" role="banner" class="container">
            <div class="section column sixteen alpha omega">
                <h1 id="logo">
                    <a href="<?php print $front_page; ?>" title="<?php print $site_name; ?>: <?php print $site_slogan; ?>">
                        <span class="element-invisible"><?php print $site_name; ?>: <?php print $site_slogan; ?></span>
                    </a>
                </h1>
            </div>
        </header>
        
        <div id="main" class="container">
            <section id="primary" class="columns sixteen omega alpha">
                <div id="content" role="main" class="contextual-links-region section">
                    <?php if (!empty($title)): ?><h1 class="title" id="page-title"><?php print $title; ?></h1><?php endif; ?>
          			<?php if (!empty($messages)): print $messages; endif; ?>
					<?php print $content; ?>
                </div>
    
            </section>
            
        </div>
    
        <footer id="footer" class="container">
            <div class="section columns sixteen alpha omega">
                <?php print $footer ?>
            </div>
        </footer>
    </div>
</body>
</html>
