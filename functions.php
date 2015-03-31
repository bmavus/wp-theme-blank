<?php

//Auto-install recommended plugins
require_once('installer/installer.php');

//shortcodes functions
require_once('shortcodes.php');

//uncomment if need CPT
//require_once('custom-cpt.php');

remove_action('wp_head', 'feed_links_extra', 3);
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'index_rel_link');
remove_action('wp_head', 'parent_post_rel_link', 10, 0);
remove_action('wp_head', 'start_post_rel_link', 10, 0);
remove_action('wp_head', 'wp_shortlink_wp_head' );
remove_action('wp_head', 'adjacent_posts_rel_link_wp_head' );
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'rel_canonical');
add_action('widgets_init', 'my_remove_recent_comments_style');
function my_remove_recent_comments_style() {
    global $wp_widget_factory;
    remove_action('wp_head', array($wp_widget_factory->widgets['WP_Widget_Recent_Comments'], 'recent_comments_style'));
}

update_option('image_default_link_type','none');
update_option('uploads_use_yearmonth_folders', 0);
update_option('permalink_structure', '/%category%/%postname%/');

if(class_exists('AssetsMinifyInit') || class_exists('AssetsMinifyAdmin')) {
    update_option('am_async_flag', 0);
}

if(class_exists('Wp_Scss_Settings')) {
    $wpscss = get_option('wpscss_options');
    if(empty($wpscss['css_dir']) && empty($wpscss['scss_dir'])) update_option('wpscss_options', array('css_dir' => '/style/', 'scss_dir' => '/style/', 'compiling_options' => 'scss_formatter_compressed'));
}

add_filter( 'show_admin_bar', '__return_false' );

// remove wp version param from any enqueued scripts
function vc_remove_wp_ver_css_js( $src ) {
    if ( strpos( $src, 'ver=' ) )
        $src = remove_query_arg( 'ver', $src );
    return $src;
}
add_filter( 'style_loader_src', 'vc_remove_wp_ver_css_js', 9999 );
add_filter( 'script_loader_src', 'vc_remove_wp_ver_css_js', 9999 );

// changing the logo link from wordpress.org to your site
function tt_login_url() {  return home_url(); }
// changing the alt text on the logo to show your site name
function tt_login_title() { return get_option( 'blogname' ); }

add_filter( 'login_headerurl', 'tt_login_url' );
add_filter( 'login_headertitle', 'tt_login_title' );

// REMOVE THE WORDPRESS UPDATE NOTIFICATION FOR ALL USERS EXCEPT SYSADMIN
if (!current_user_can('update_plugins')) { // checks to see if current user can update plugins
    add_action( 'init', create_function( '$a', "remove_action( 'init', 'wp_version_check' );" ), 2 );
    add_filter( 'pre_option_update_core', create_function( '$a', "return null;" ) );
}

//register menus
register_nav_menus(array(
    'head_menu' => 'Main navigation',
    'foot_menu' => 'Footer navigation'
));

/* BEGIN: Theme config params*/
define ('HOME_PAGE_ID', get_option('page_on_front'));
define ('BLOG_ID', get_option('page_for_posts'));
define ('POSTS_PER_PAGE', get_option('posts_per_page'));
if(class_exists('Woocommerce')) :
    define ('SHOP_ID', get_option('woocommerce_shop_page_id'));
    define ('ACCOUNT_ID', get_option('woocommerce_myaccount_page_id'));
endif;
/* END: Theme config params */

//Thumbnails theme support
add_theme_support( 'post-thumbnails' );

//custom theme url
function theme(){
    return ($_SERVER['REMOTE_ADDR']=='127.0.0.1'?site_url():'') . str_replace(site_url(), '', get_stylesheet_directory_uri());
}


//Body class
function new_body_classes( $classes ){
    if( is_page() ){
        global $post;
        $temp = get_page_template();
        if ( $temp != null ) {
            $path = pathinfo($temp);
            $tmp = $path['filename'] . "." . $path['extension'];
            $tn= str_replace(".php", "", $tmp);
            $classes[] = $tn;
        }
        if (is_active_sidebar('sidebar')) {
            $classes[] = 'with_sidebar';
        }
        foreach($classes as $k => $v) {
            if(
                $v == 'page-template' ||
                $v == 'page-id-'.$post->ID ||
                $v == 'page-template-default' ||
                $v == 'woocommerce-page' ||
                ($temp != null?($v == 'page-template-'.$tn.'-php' || $v == 'page-template-'.$tn):'')) unset($classes[$k]);
        }
    }
    if( is_single() ){
        global $post;
        $f = get_post_format( $post->ID );
        foreach($classes as $k => $v) {
            if($v == 'postid-'.$post->ID || $v == 'single-format-'.(!$f?'standard':$f)) unset($classes[$k]);
        }
    }
    global $is_lynx, $is_gecko, $is_IE, $is_opera, $is_NS4, $is_safari, $is_chrome, $is_iphone;

    $browser = $_SERVER[ 'HTTP_USER_AGENT' ];

    // Mac, PC ...or Linux
    if ( preg_match( "/Mac/", $browser ) ){
        $classes[] = 'macos';
    } elseif ( preg_match( "/Windows/", $browser ) ){
        $classes[] = 'windows';
    } elseif ( preg_match( "/Linux/", $browser ) ) {
        $classes[] = 'linux';
    } else {
        $classes[] = 'unknown-os';
    }
    // Checks browsers in this order: Chrome, Safari, Opera, MSIE, FF
    if ( preg_match( "/Chrome/", $browser ) ) {
        $classes[] = 'chrome';
        preg_match( "/Chrome\/(\d.\d)/si", $browser, $matches);
        $classesh_version = 'ch' . str_replace( '.', '-', $matches[1] );
        $classes[] = $classesh_version;
    } elseif ( preg_match( "/Safari/", $browser ) ) {
        $classes[] = 'safari';
        preg_match( "/Version\/(\d.\d)/si", $browser, $matches);
        $sf_version = 'sf' . str_replace( '.', '-', $matches[1] );
        $classes[] = $sf_version;
    } elseif ( preg_match( "/Opera/", $browser ) ) {
        $classes[] = 'opera';
        preg_match( "/Opera\/(\d.\d)/si", $browser, $matches);
        $op_version = 'op' . str_replace( '.', '-', $matches[1] );
        $classes[] = $op_version;
    } elseif ( preg_match( "/MSIE/", $browser ) ) {
        $classes[] = 'msie';
        if( preg_match( "/MSIE 6.0/", $browser ) ) {
            $classes[] = 'ie6';
        } elseif ( preg_match( "/MSIE 7.0/", $browser ) ){
            $classes[] = 'ie7';
        } elseif ( preg_match( "/MSIE 8.0/", $browser ) ){
            $classes[] = 'ie8';
        } elseif ( preg_match( "/MSIE 9.0/", $browser ) ){
            $classes[] = 'ie9';
        }
    } elseif ( preg_match( "/Firefox/", $browser ) && preg_match( "/Gecko/", $browser ) ) {
        $classes[] = 'firefox';
        preg_match( "/Firefox\/(\d)/si", $browser, $matches);
        $ff_version = 'ff' . str_replace( '.', '-', $matches[1] );
        $classes[] = $ff_version;
    } else {
        $classes[] = 'unknown-browser';
    }
    return $classes;
}
add_filter( 'body_class', 'new_body_classes' );

//excerpt custom
function gebid($post_id, $num){
    $the_post = get_post($post_id); //Gets post ID
    $the_excerpt = $the_post->post_content; //Gets post_content to be used as a basis for the excerpt
    $excerpt_length = $num; //Sets excerpt length by word count
    $the_excerpt = strip_tags(strip_shortcodes($the_excerpt)); //Strips tags and images
    $words = explode(' ', $the_excerpt, $excerpt_length + 1);
    if(count($words) > $excerpt_length) :
    array_pop($words);
    array_push($words, '…');
    $the_excerpt = implode(' ', $words);
    endif;
    $the_excerpt = '<p>' . $the_excerpt . '</p>';
    return $the_excerpt;
}

//remove ID in menu list
add_filter('nav_menu_item_id', 'clear_nav_menu_item_id', 10, 3);
function clear_nav_menu_item_id($id, $item, $args) {
    return "";
}

//custom SEO title
function seo_title(){
    global $post;
    if(is_404()) {
        echo '404 Page not found - ';
    } elseif($post->post_parent) {
        $parent_title = get_the_title($post->post_parent);
        echo wp_title('-', true, 'right') . $parent_title.' - ';
    } elseif(class_exists('Woocommerce') && is_shop()) {
        echo get_the_title(SHOP_ID) . ' - ';
    } else {
        wp_title('-', true, 'right');
    }
    bloginfo('name');
}

//images sizes
//add_image_size( 'example_name', '960', '540', true );

// Disables Kses only for textarea saves
foreach (array('pre_term_description', 'pre_link_description', 'pre_link_notes', 'pre_user_description') as $filter) {
    remove_filter($filter, 'wp_filter_kses');
}

// Disables Kses only for textarea admin displays
foreach (array('term_description', 'link_description', 'link_notes', 'user_description') as $filter) {
    remove_filter($filter, 'wp_kses_data');
}

//Custom JS/Styles
function tt_add_jscss() {
    if (!is_admin()) {
        wp_deregister_script( 'jquery' );
    }
    wp_enqueue_script('googlemaps', '//maps.googleapis.com/maps/api/js?v=3.exp&amp;sensor=false', array(), '', FALSE);
    wp_enqueue_script( 'jquery', get_template_directory_uri().'/js/jquery-1.9.1.js', array(), '', FALSE);
    wp_enqueue_script('libs', get_template_directory_uri().'/js/lib.js', array('jquery'), '1.0', true);
    wp_enqueue_script('init', get_template_directory_uri().'/js/init.js', array('jquery'), '1.0', true);

    wp_deregister_style( 'contact-form-7' );

    if(QTRANS_INIT) {
        wp_deregister_style('qtranslate-style');
    }

    wp_enqueue_style('animations', get_template_directory_uri() . '/style/animations.min.css' );
    wp_enqueue_style('scss', get_template_directory_uri() . '/style/style.scss');
}
add_action('wp_enqueue_scripts', 'tt_add_jscss');

function wp_IEhtml5_js () {
    global $is_IE;
    if ($is_IE)
        echo '<!--[if lt IE 9]><script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script><script src="//css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script><![endif]--><!--[if lte IE 9]><link href="'.theme().'/style/animations-ie-fix.css" rel="stylesheet" /><![endif]-->';
}
add_action('wp_head', 'wp_IEhtml5_js');

$bar = array(
    'name'          => 'Blog Sidebar',
    'id'            => 'blogbar',
    'description'   => 'Sidebar for news section',
    'before_widget' => '<div class="widget cfx %2$s">',
    'after_widget'  => '</div>',
    'before_title'  => '<div class="widgettitle">',
    'after_title'   => '</div>'
);
register_sidebar($bar);

function remove_footer_admin () {
    echo 'Powered by <a href="http://www.wordpress.org" target="_blank">WordPress</a> | Theme Developer <a href="http://frontend.im" target="_blank">Tusko Trush</a>';
}
add_filter('admin_footer_text', 'remove_footer_admin');

if(QTRANS_INIT) {
    remove_action('wp_head', 'qtranxf_head', 10, 0);
    remove_action('wp_head', 'qtrans_header', 10, 0);

    //convert blogurl
    function qtrans_home_url($url = '') {
        return qtrans_convertURL(site_url($url));
    }
    //qTranslate Taxonomies Description Fix
    function qtranslate_edit_taxonomies(){
        $args=array(
            'public' => true ,
            '_builtin' => false
        );
        $output = 'object';
        $operator = 'and'; // 'and' or 'or'
        $taxonomies = get_taxonomies($args,$output,$operator);
        if  ($taxonomies) {
            foreach ($taxonomies  as $taxonomy ) {
                add_action( $taxonomy->name.'_add_form', 'qtrans_modifyTermFormFor');
                add_action( $taxonomy->name.'_edit_form', 'qtrans_modifyTermFormFor');
            }
        }
    }
    add_action('admin_init', 'qtranslate_edit_taxonomies');
    add_filter('walker_nav_menu_start_el', 'qtrans_in_nav_el', 10, 4);
    function qtrans_in_nav_el($item_output, $item, $depth, $args){
        $attributes  = ! empty( $item->attr_title ) ? ' title="'  . esc_attr( $item->attr_title ) .'"' : '';
        $attributes .= ! empty( $item->target )     ? ' target="' . esc_attr( $item->target     ) .'"' : '';
        $attributes .= ! empty( $item->xfn )        ? ' rel="'    . esc_attr( $item->xfn        ) .'"' : '';
        // Determine integration with qTranslate Plugin
        if (function_exists('qtrans_convertURL')) {
            $attributes .= ! empty( $item->url ) ? ' href="' . qtrans_convertURL(esc_attr( $item->url )) .'"' : '';
        } else {
            $attributes .= ! empty( $item->url ) ? ' href="' . esc_attr( $item->url ) .'"' : '';
        }
        $item_output = $args->before;
        $item_output .= '<a'. $attributes .'>';
        $item_output .= $args->link_before . apply_filters( 'the_title', $item->title, $item->ID ) . $args->link_after;
        $item_output .= '</a>';
        $item_output .= $args->after;
        return $item_output;
    }
}

function remove_default_description($bloginfo) {
    $default_tagline = 'Just another WordPress site';
    return ($bloginfo === $default_tagline) ? '' : $bloginfo;
}
add_filter('get_bloginfo_rss', 'remove_default_description');

//Wordpress ?s= redirect to /search/
function tt_search_redirect() {
    global $wp_rewrite;
    if (!isset($wp_rewrite) || !is_object($wp_rewrite) || !$wp_rewrite->using_permalinks()) { return; }
    $search_base = $wp_rewrite->search_base;
    if (is_search() && !is_admin() && strpos($_SERVER['REQUEST_URI'], "/{$search_base}/") === false) {
        wp_redirect(home_url("/{$search_base}/" . urlencode(get_query_var('s'))));
        exit();
    }
}
add_action('template_redirect', 'tt_search_redirect');

//Fix for empty search queries redirecting to home page
function tt_request_filter($query_vars) {
    if (isset($_GET['s']) && empty($_GET['s']) && !is_admin()) {
        $query_vars['s'] = ' ';
    }
    return $query_vars;
}
add_filter('request', 'tt_request_filter');

function tt_dashboard_widgets() {
    remove_meta_box('dashboard_incoming_links', 'dashboard', 'normal');
    remove_meta_box('dashboard_plugins', 'dashboard', 'normal');
    remove_meta_box('dashboard_primary', 'dashboard', 'normal');
    remove_meta_box('dashboard_secondary', 'dashboard', 'normal');
}
add_action('admin_init', 'tt_dashboard_widgets');

function transliterate($textcyr = null, $textlat = null) {
    $cyr = array(
        'ы', ' ', 'є', 'ї', 'ж',  'ч',  'щ',   'ш',  'ю',  'а', 'б', 'в', 'г', 'д', 'е', 'з', 'и', 'й', 'і', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ъ', 'ь', 'я',
        'Ы','Є', 'Ї', 'Ж',  'Ч',  'Щ',   'Ш',  'Ю',  'А', 'Б', 'В', 'Г', 'Д', 'Е', 'З', 'И', 'Й', 'І', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ъ', 'Ь', 'Я');
    $lat = array(
        'y', '_', 'ye', 'yi', 'zh', 'ch', 'sht', 'sh', 'yu', 'a', 'b', 'v', 'g', 'd', 'e', 'z', 'i', 'j', 'i', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'f', 'h', 'c', 'y', 'x', 'ya',
        'Y','Ye', 'Yi', 'Zh', 'Ch', 'Sht', 'Sh', 'Yu', 'A', 'B', 'V', 'G', 'D', 'E', 'Z', 'I', 'J', 'I', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'F', 'H', 'c', 'Y', 'X', 'Ya');
    if($textcyr) return str_replace($cyr, $lat, $textcyr);
    else if($textlat) return str_replace($lat, $cyr, $textlat);
        else return null;
}

//return header 403 for wrong login
function my_login_failed_403() {
    status_header( 403 );
}
add_action( 'wp_login_failed', 'my_login_failed_403' );

if( function_exists('acf_add_options_page') ) {
    acf_add_options_page(array(
        'page_title' => 'Theme Settings',
        'menu_title' => 'Theme Settings',
        'menu_slug' => 'acf-theme-settings',
        'capability' => 'edit_posts',
        'redirect' => false
    ));
    acf_add_options_sub_page(array(
        'page_title' => 'Header',
        'menu_title' => 'Header',
        'parent_slug' => 'acf-theme-settings',
    ));
    acf_add_options_sub_page(array(
        'page_title' => 'Footer',
        'menu_title' => 'Footer',
        'parent_slug' => 'acf-theme-settings',
    ));
}

//custom ajax-admin.php rewrite
function new_ajax_admin_url() {
    add_rewrite_rule('a/(.*)$','wp-admin/admin-ajax.php/$1','top');
}
add_action('init', 'new_ajax_admin_url', 10, 0);

function get_alt($id){
    $c_alt = get_post_meta($id, '_wp_attachment_image_alt', true);
    $c_tit = get_the_title($id);
    return $c_alt?$c_alt:$c_tit;
}

function tree_children($absolute = false, $page_id = 0) {
    global $post;
    $childlist = get_pages('child_of='.$post->ID);
    $children = '';
    if($post->post_parent) {
        $ancestors = get_post_ancestors($post->ID);
        $reverse = array_reverse($ancestors);
        $abs = $reverse[0];
        $children .= '<ul class="submenu">';
        $children .= wp_list_pages("title_li=&child_of=".$abs."&echo=0&sort_column=menu_order");
        $children .= '</ul>';
        echo $children;
    } elseif($childlist) {
        echo '<ul class="submenu">' . wp_list_pages("title_li=&child_of=".$post->ID."&echo=0&sort_column=menu_order") . '</ul>';
    }
}

add_filter('widget_categories_args','show_empty_categories_links');
function show_empty_categories_links($args) {
    $args['hide_empty'] = 0;
    return $args;
}

function cats($pid){
    $post_categories = wp_get_post_categories($pid);
    $cats = '';
    $co = count($post_categories); $i = 1;
    foreach($post_categories as $c){
        $cat = get_category($c);
        $cats .= '<a href="'.get_category_link($cat->term_id).'">'.$cat->name.'</a>' .($i++ != $co?'<span>,</span> ':'');
    }
    return $cats;
}
