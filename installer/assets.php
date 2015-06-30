<?php
// custom js/stylesheet
function tt_add_jscss() {
    if (!is_admin()) {
        wp_deregister_script( 'jquery' );
    }

    wp_deregister_style( 'contact-form-7' );

    if(defined('QTRANS_INIT')) {
        wp_deregister_style('qtranslate-style');
    }

    if(defined('GOOGLEMAPS')) {
        wp_enqueue_script('googlemaps', '//maps.googleapis.com/maps/api/js?v=3.exp&amp;sensor=false', array(), '', false);
    }
    wp_enqueue_script('jquery', get_template_directory_uri().'/js/libs/jquery.js', array(), '1.11.3', false);
    wp_enqueue_script('fastClick', get_template_directory_uri().'/js/libs/fastclick.js', array('jquery'), '1.0', true);
    wp_enqueue_script('resizeEnd', get_template_directory_uri().'/js/libs/resizeEnd.js', array('jquery'), '1.0', true);
    wp_enqueue_script('bxslider', get_template_directory_uri().'/js/libs/bxslider.js', array('jquery'), '4.1.2', true);
    wp_enqueue_script('libs', get_template_directory_uri().'/js/lib.js', array('jquery'), '1.0', true);
    wp_enqueue_script('init', get_template_directory_uri().'/js/init.js', array('jquery'), '1.0', true);
    wp_enqueue_script('css3animateIt', get_template_directory_uri().'/js/libs/css3animate-it.js', array('jquery'), '1.0', true);

    wp_enqueue_style('animations', get_template_directory_uri() . '/style/animations.min.css' );
    wp_enqueue_style('scss', get_template_directory_uri() . '/style/style.scss');

    if(class_exists('Woocommerce')) {
        wp_enqueue_style('custom-woo', get_template_directory_uri() . '/style/woo.scss' );
    }
}
add_action('wp_enqueue_scripts', 'tt_add_jscss');
?>
