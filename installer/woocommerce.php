<?php

// Or just remove them all in one line
add_filter( 'woocommerce_enqueue_styles', '__return_false' );

remove_action( 'woocommerce_before_shop_loop_item_title', 'woocommerce_template_loop_product_thumbnail', 10);
add_action( 'woocommerce_before_shop_loop_item_title', 'woocommerce_template_loop_product_thumbnail', 10);

/**
* WooCommerce Loop Product Thumbs
**/
if ( ! function_exists( 'woocommerce_template_loop_product_thumbnail' ) ) {
    function woocommerce_template_loop_product_thumbnail() {
        echo woocommerce_get_product_thumbnail();
    }
}
/**
* WooCommerce Product Thumbnail
**/
//if ( ! function_exists( 'woocommerce_get_product_thumbnail' ) ) {
//    function woocommerce_get_product_thumbnail( $size = 'large', $placeholder_width = 0, $placeholder_height = 0 ) {
//        global $post, $woocommerce;
//
//        $output = '';
//
//        if ( has_post_thumbnail() ) {
//            $output .= get_the_post_thumbnail( $post->ID, $size );
//        } else {
//            $output .= '<img src="'. woocommerce_placeholder_img_src() .'" alt="'.get_alt($post->ID).'" />';
//        }
//
//        return $output;
//    }
//}

function get_parent_terms($term) {
    if ($term->parent > 0) {
        $term = get_term_by("id", $term->parent, "product_cat");
        if ($term->parent > 0) {
            get_parent_terms($term);
        } else return $term;
    }
    else return $term;
}

// Ensure cart contents update when products are added to the cart via AJAX (place the following in functions.php)
add_filter( 'woocommerce_add_to_cart_fragments', 'woocommerce_header_add_to_cart_fragment' );

function woocommerce_header_add_to_cart_fragment( $fragments ) { ob_start(); ?>
<a class="cart-contents" href="<?php echo WC()->cart->get_cart_url(); ?>" title="<?php _e( 'View your shopping cart' ); ?>"><?php echo sprintf (_n( '%d item', '%d items', WC()->cart->cart_contents_count ), WC()->cart->cart_contents_count ); ?> - <?php echo WC()->cart->get_cart_total(); ?></a>
<?php
    $fragments['a.cart-contents'] = ob_get_clean();
    return $fragments;
}

add_filter( 'woocommerce_billing_fields', 'custom_woocommerce_billing_fields' );

function custom_woocommerce_billing_fields( $fields ) {
    unset($fields['billing_company']);
    unset($fields['billing_postcode']);
    unset($fields['billing_state']);
    return $fields;
}

function plural_form($n, $forms) {
    return $n%10==1&&$n%100!=11?$forms[0]:($n%10>=2&&$n%10<=4&&($n%100<10||$n%100>=20)?$forms[1]:$forms[2]);
}
