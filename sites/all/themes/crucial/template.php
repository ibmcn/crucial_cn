<?php
//drupal_add_css(path_to_theme() . '/css/style-ie.css', array('group' => CSS_THEME, 'browsers' => array('IE' => 'lte IE 7', '!IE' => FALSE), 'preprocess' => FALSE));

function crucial_menu_local_task($variables) {
  $link = $variables['element']['#link'];
  if ($link['path'] == 'node/%/view') return false;
  $link['localized_options']['html'] = TRUE;
  return '<li>'.l($link['title'], $link['href'], $link['localized_options']).'</li>'."\n"; 
}

function crucial_menu_local_tasks(&$variables) {
  $output = '';
  $has_access = user_access('access contextual links');
  drupal_add_library('contextual', 'contextual-links');
  if (!empty($variables['primary'])) {
    $variables['primary']['#prefix'] = '<h2 class="element-invisible">' . t('Primary tabs') . '</h2>';
    $variables['primary']['#prefix'] = ($has_access) ?
      '<div class="contextual-links-wrapper"><ul class="contextual-links">' : '<ul class="tabs primary">';

    $variables['primary']['#suffix'] = ($has_access) ?
      '</ul></div>' : '</ul>';
    $output .= drupal_render($variables['primary']);
  }
  if (!empty($variables['secondary'])) {
    $variables['secondary']['#prefix'] = '<h2 class="element-invisible">' . t('Secondary tabs') . '</h2>';
    $variables['secondary']['#prefix'] = '<ul class="tabs secondary clearfix">';
    $variables['secondary']['#suffix'] = '</ul>';
    $output .= drupal_render($variables['secondary']);
  }
  return $output;
}

// Gets rid of the Maintenance Mode message in the main theme
function crucial_preprocess_page(&$vars) {
  // Loads JQuery Cycle only on home page.
  if ($vars['is_front']) {
    drupal_add_js(drupal_get_path('theme', 'crucial') . '/js/jquery.cycle.all.js');
    $vars['scripts'] = drupal_get_js();
  }

  if (variable_get('maintenance_mode', 0)) {
    $message_count = count($_SESSION['messages']['status']);
    if($message_count > 1) {
      array_shift($_SESSION['messages']['status']);
    }
    else {
      unset($_SESSION['messages']['status']);
    }
  }
}

// Changes home page title.
function crucial_preprocess_html(&$vars) {
  if (drupal_is_front_page()) {
    $slogan = variable_get('site_slogan');
    if ($slogan) {
      $vars['head_title'] = implode(' | ', array(variable_get('site_name'), $slogan));
    } else {
      $vars['head_title'] = variable_get('site_name');
    }
  }
}

// Modifies menu for superfish
function crucial_menu_tree__main_menu($variables) {
  return '<ul class="menu sf-menu">' . $variables['tree'] . '</ul>';
}

/**
 * Implements theme_menu_link(). */
 
function crucial_menu_link(array $variables) {
  $element = $variables['element'];
  $sub_menu = '';

  if ($element['#below']) {
    // Wrap in dropdown-menu.
    unset($element['#below']['#theme_wrappers']);
    $sub_menu = '<ul class="menu sub-menu">' . drupal_render($element['#below']) . '</ul>';
  }
  $output = l($element['#title'], $element['#href'], $element['#localized_options']);
  return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>\n";
}

// Add placeholders
function crucial_form_alter(&$form, &$form_state, $form_id) {
  /*if ($form_id == 'webform_client_form_111') {
    $form['submitted']['gan_xing_qu_de_chan_pin_xing_hao']['#attributes']['placeholder'] = '请注明您需要我们为您岩石的产品型号及演示时间等';
  }*/
  if ($form_id == 'search_block_form') {
    $form['search_block_form']['#attributes']['placeholder'] = t('请输入搜索词...');
  } 
}