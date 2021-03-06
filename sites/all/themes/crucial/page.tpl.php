    <div id="header-wrapper" class="clearfix">
        <header id="header" role="banner" class="bg-transition">
            <div class="container section">
                <div class="columns four" id="header-primary">
                    <?php if ($is_front) { ?>
                        <h1 id="logo">
                            <a href="<?php print $front_page; ?>" title="<?php print $site_name; ?>: <?php print $site_slogan; ?>">
                                <img title="<?php print $site_name; ?>" alt="<?php print $site_name; ?>" src="<?php print $logo; ?>">
                            </a>
                        </h1>
                    <?php } else { ?>
                        <h3 id="logo">
                            <a href="<?php print $front_page; ?>" title="<?php print $site_name; ?>: <?php print $site_slogan; ?>">
                                <img title="<?php print $site_name; ?>" alt="<?php print $site_name; ?>" src="<?php print $logo; ?>">
                            </a>
                        </h3>
                    <?php } ?>
                    <a href="#" class="search-toggle" id="mobile-search-toggle" title="<?php print t('Search'); ?>"></a>
                    <a id="primary-nav-toggle" href="#">菜单</a>
                </div>

                <?php if ($page['main_menu']) { ?>
                <nav id="primary-nav" role="navigation" class="section columns eleven">
                    <?php print render($page['main_menu']); ?>
                </nav>
                <?php } ?>

                <div class="columns one" id="header-search">
                    <a href="#" class="search-toggle" title="<?php print t('Search'); ?>"></a>
                    <div id="search-form-wrapper"><?php $searchblock = module_invoke('search', 'block_view', 'form');  print render($searchblock); ?></div>
                </div>

            </div>
        </header>

        <?php if ($is_front) { ?>
        <div id="slider">
            <div class="slides">
                <div class="slide" id="slide-1">
                    <div class="container">
                        <div id="slider-left" class="columns eight">
                            <img src="/sites/all/themes/crucial/images/slider-ram.png">
                        </div>
                    </div>
                </div>
                <div class="slide" id="slide-2">
                    <div class="container">
                        <div id="slider-left" class="columns eight">
                            <img src="/sites/all/themes/crucial/images/slider-ssd.png">
                        </div>
                    </div>
                </div>
                <div class="slide" id="slide-3">
                    <div class="container">
                        <div id="slider-left" class="columns eight">
                            <img src="/sites/all/themes/crucial/images/slider-tmall.png">
                        </div>
                    </div>
                </div>
            </div>
            <div class="slider-right-container container">
                <div id="slider-right" class="columns eight">
                    <h2 class="text-center">仅需三步！</h2>
                    <h3 class="text-center">快速匹配，100%兼容！</h3>
                    <hr>
                    <h4 class="text-center">Crucial 选购顾问</h4>
                    <div class="form-select-wrapper clearfix">
                        <?php
                            $block = module_invoke('site', 'block_view', 'filter_block');
                            print $block['content'];
                        ?>
                    </div>
                    <p class="text-center" style="color:#fff;font-size:13px;">使用选购顾问，在最短的时间内找到100%兼容于您电脑的升级产品！</p>
                </div>
            </div>
            <div id="slider-nav">
                <ul class="container">
                    <li class="column one-third">
                        <a href="<?php print url('taxonomy/term/1'); ?>">
                            <img src="/sites/all/themes/crucial/images/slider-nav-ram.png">
                            <h3>兼容内存</h3>
                            <p>Crucial英睿达内存条，优质内存颗粒，经严格测试，100%兼容于50,000多个系统</p>
                        </a>
                    </li>
                    <li class="column one-third">
                        <a href="<?php print url('taxonomy/term/14'); ?>">
                            <img src="/sites/all/themes/crucial/images/slider-nav-ssd.png">
                            <h3>高速SSD</h3>
                            <p>Crucial英睿达固态硬盘，更快，更耐用，更稳定，更可靠。提高电脑性能，享受极速体验</p>
                        </a>
                    </li>
                    <li class="column one-third">
                        <a href="http://crucial.tmall.com" target="_blank">
                            <img src="/sites/all/themes/crucial/images/slider-nav-tmall.png">
                            <h3>天猫旗舰店</h3>
                            <p>Crucial英睿达天猫旗舰店，内存九折特惠，全场满减，美光品质，升级首选！</p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <?php } ?>
    </div>

	<div id="main" class="container clearfix">
        <?php if ($page['above_main']){ ?>
            <div id="above-main" class="section columns sixteen">
                <?php print render($page['above_main']); ?>
            </div>
        <?php } ?>

        <?php $is_full_width = (!empty($node->field_full_width[LANGUAGE_NONE][0]['value'])) ? 1 : 0; ?>
        <?php $primarywidth = ($is_front || !$page['sidebar_first'] || $is_full_width) ? 'sixteen' : 'eleven'; ?>
		<section id="primary" class="columns <?php print $primarywidth; ?>">

            <?php if ($page['above_content']){ ?>
            <div id="above-content" class="section">
                <?php print render($page['above_content']); ?>
            </div>
            <?php } ?>

            <div id="content" role="main" class="contextual-links-region section">
                <div class="element-invisible"><a id="main-content"></a></div>
                <?php if ($messages){ ?><div id="console" class="clearfix"><?php print $messages; ?></div><?php } ?>
                <?php if ($page['help']) { ?><div id="help"><?php print render($page['help']); ?></div><?php } ?>
                <?php if ($action_links) { ?><ul class="action-links"><?php print render($action_links); ?></ul><?php } ?>

				<?php if ($title && empty($is_front)) { ?>
					<?php print render($title_prefix); ?>
                    <?php if(arg(0) != '选购顾问') { ?><h1 class="title" id="page-title"><?php print $title; ?></h1><?php } ?>
                    <?php print render($title_suffix); ?>
				<?php } ?>
                <?php if ($tabs): ?><div class="tabs"><?php print render($tabs); ?></div><?php endif; ?>

                <?php print render($page['content']); ?>
			</div>

			<?php if ($page['below_content']) { ?>
            <div id="below-content" class="section">
				<?php print render($page['below_content']); ?>
            </div>
            <?php } ?>

        </section>

		<?php if ($page['sidebar_first'] && !$is_front) { ?>
        <section id="secondary" role="complementary" class="columns five omega">
            <div class="section">
                <?php print render($page['sidebar_first']); ?>
            </div>
        </section>
		<?php } ?>
	</div>

	<footer id="footer">
        <div class="container section">
		  <?php print render($page['footer']); ?>
        </div>
    </footer>

    <?php if ($page['mega_menu']){ ?>
    <div id="megamenu-content" class="hidden">
        <?php print render($page['mega_menu']); ?>
    </div>
    <?php } ?>
