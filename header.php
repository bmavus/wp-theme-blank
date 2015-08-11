<?php
    header('Expires: '.gmdate('D, d M Y H:i:s \G\M\T', time() + 3600));
    header('Content-Type: text/html; charset=utf-8');
    header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
    header('X-UA-Compatible: IE=Edge,chrome=1');
    ob_start('ob_html_compress');
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title><?php seo_title(); ?></title>
<meta name="MobileOptimized" content="width" />
<meta name="HandheldFriendly" content="True"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0" />
<link rel="shortcut icon" type="image/vnd.microsoft.icon" href="//s1.wp.com/i/favicon.ico?m=1311976025g" sizes="16x16 32x32 48x48">
<link rel="shortcut icon" type="image/x-icon" href="//s1.wp.com/i/favicon.ico?m=1311976025g" sizes="16x16">
<link rel="icon" type="image/x-icon" href="//s1.wp.com/i/favicon.ico?m=1311976025g" sizes="16x16">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?> data-ajax="<?php echo site_url('/a/'); ?>">
<div id="wrap">
    <header>
        <div class="row cfx">
            <a href="<?php echo site_url('/'); ?>" class="logo"></a>
            <a class="c-hamburger c-hamburger--htx" href=""><span></span></a>
            <nav role="navigation" class="cfx">
                <?php wp_nav_menu(array('container' => false, 'items_wrap' => '<ul id="%1$s">%3$s</ul>', 'theme_location'  => 'primary_menu')); ?>
            </nav>
        </div>
    </header>
