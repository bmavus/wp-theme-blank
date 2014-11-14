<?php
//Example for Custom Post Type with Taxonimies

/*
    *** You van use dash-icons https://developer.wordpress.org/resource/dashicons/
*/
add_action( 'init', 'register_cpts' );
function register_cpts() {

    //custom taxonomy attached to jobs CPT
    $taxname = 'Taxonomy Name';
    $taxlabels = array(
        'name'                          => $shorname,
        'singular_name'                 => $shorname,
        'search_items'                  => 'Search '.$shorname,
        'popular_items'                 => 'Popular '.$shorname,
        'all_items'                     => 'All '.$shorname.'s',
        'parent_item'                   => 'Parent '.$shorname,
        'edit_item'                     => 'Edit '.$shorname,
        'update_item'                   => 'Update '.$shorname,
        'add_new_item'                  => 'Add New '.$shorname,
        'new_item_name'                 => 'New '.$shorname,
        'separate_items_with_commas'    => 'Separate '.$shorname.'s with commas',
        'add_or_remove_items'           => 'Add or remove '.$shorname.'s',
        'choose_from_most_used'         => 'Choose from most used '.$shorname.'s'
    );
    $taxarr = array(
        'label'                         => $shorname,
        'labels'                        => $taxlabels,
        'public'                        => true,
        'hierarchical'                  => true,
        'show_in_nav_menus'             => true,
        'args'                          => array( 'orderby' => 'term_order' ),
        'query_var'                     => true,
        'show_ui'                       => true,
        'rewrite'                       => true,
    );
    register_taxonomy( 'taxonomy_name', 'custom_post_type', $taxarr );

    register_post_type( 'custom_post_type',
                       array(
                           'labels'                => array(
                               'name' => 'Custom Post Type',
                               'singular_name' => 'Custom Post Type',
                               'add_new' => 'Add New',
                               'add_new_item' => 'Add New',
                               'edit_item' => 'Edit',
                               'new_item' => 'New',
                               'all_items' => 'All',
                               'view_item' => 'View',
                               'search_items' => 'Search',
                               'not_found' =>  'Not found',
                               'not_found_in_trash' => 'No found in Trash',
                               'parent_item_colon' => '',
                               'menu_name' => 'Custom Post Type'
                           ),
                           'public'                => true,
                           'show_ui'               => true,
                           'show_in_menu'          => true,
                           'supports'              => array( 'title', 'editor', 'thumbnail' ),
                           'rewrite'               => array( 'slug' => 'permalink' ),
                           'has_archive'           => true,
                           'hierarchical'          => true,
                           'show_in_nav_menus'     => true,
                           'capability_type'       => 'page',
                           'query_var'             => true,
                           'menu_icon'             => 'dashicons-admin-page',
                       ));
    flush_rewrite_rules();
}
