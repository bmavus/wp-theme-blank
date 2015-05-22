<?php

/* BEGIN: Theme config params*/

define ('AJAXSIGN', FALSE);
define ('GOOGLEMAPS', FALSE);
define ('WPFOLDER', '');
define ('HOME_PAGE_ID', get_option('page_on_front'));
define ('BLOG_ID', get_option('page_for_posts'));
define ('POSTS_PER_PAGE', get_option('posts_per_page'));
if(class_exists('Woocommerce')) :
    define ('SHOP_ID', get_option('woocommerce_shop_page_id'));
    define ('ACCOUNT_ID', get_option('woocommerce_myaccount_page_id'));
endif;

/* END: Theme config params */

//Auto-install recommended plugins
require_once('installer/installer.php');

// Run pre-installed plugins
require_once('installer/themer.php');

// Custom shortcodes
require_once('shortcodes.php');

// uncomment if need CPT
//require_once('custom-cpt.php');

// register menus
register_nav_menus(array(
    'primary_menu' => 'Primary navigation',
    'footer_menu' => 'Footer navigation'
));

// Custom images sizes
//add_image_size( 'example_name', '960', '540', true );

//excerpt custom
function gebid($post_id, $num){
    $the_post = get_post($post_id); //Gets post ID
    $the_excerpt = $the_post->post_content; //Gets post_content to be used as a basis for the excerpt
    $excerpt_length = $num; //Sets excerpt length by word count
    $the_excerpt = strip_tags(strip_shortcodes($the_excerpt)); //Strips tags and images
    $words = explode(' ', $the_excerpt, $excerpt_length + 1);
    if(count($words) > $excerpt_length) :
    array_pop($words);
    array_push($words, '...');
    $the_excerpt = implode(' ', $words);
    endif;
    $the_excerpt = '<p>' . $the_excerpt . '</p>';
    return $the_excerpt;
}

//Custom JS/Styles
function tt_add_jscss() {
    if (!is_admin()) {
        wp_deregister_script( 'jquery' );
    }

    wp_deregister_style( 'contact-form-7' );

    if(defined('QTRANS_INIT')) {
        wp_deregister_style('qtranslate-style');
    }

    if(defined(GOOGLEMAPS)) {
        wp_enqueue_script('googlemaps', '//maps.googleapis.com/maps/api/js?v=3.exp&amp;sensor=false', array(), '', false);
    }
    wp_enqueue_script('jquery', get_template_directory_uri().'/js/jquery-1.9.1.js', array(), '', false);
    wp_enqueue_script('libs', get_template_directory_uri().'/js/lib.js', array('jquery'), '1.0', true);
    wp_enqueue_script('init', get_template_directory_uri().'/js/init.js', array('jquery'), '1.0', true);
    wp_enqueue_script('css3animateIt', get_template_directory_uri().'/js/css3animate-it.js', array('jquery'), '1.0', true);

    wp_enqueue_style('animations', get_template_directory_uri() . '/style/animations.min.css' );
    wp_enqueue_style('scss', get_template_directory_uri() . '/style/style.scss');
}
add_action('wp_enqueue_scripts', 'tt_add_jscss');

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

function remove_footer_admin () {
    echo 'Powered by <a href="http://www.wordpress.org" target="_blank">WordPress</a> | Theme Developer <a href="http://frontend.im" target="_blank">Tusko Trush</a>';
}
add_filter('admin_footer_text', 'remove_footer_admin');

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
