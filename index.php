<?php get_header();
$catID = get_queried_object()->term_id;
$catN = get_queried_object()->name;
$curauth = $wp_query->get_queried_object();

if(is_date()){
    $queryname = 'Archive of '.date("F").', '.date('Y');
} elseif(is_category()) {
    $queryname = single_cat_title('', false);
} elseif(is_author()) {
    $queryname = 'Posts by ' . $curauth->nickname;
} else {
    $queryname = get_the_title(BLOG_ID);
} ?>
<section class="content row cfx">
    <?php if($queryname) : echo '<h1>'. $queryname. '</h1>'; endif; ?>
    <article role="main">
        <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
        <?php if(is_sticky($post->ID)) { ?>
        <div class="sticky_post blogpost cfx">
            <?php if ( has_post_thumbnail() ) { ?>
            <a href="<?php the_permalink(); ?>"><?php the_post_thumbnail('large'); ?></a>
            <?php } ?>
            <h2><a href="<?php the_permalink(); ?>" class="blogtitle"><?php the_title() ;?></a></h2>
            <time><?php echo get_the_date( 'F j, Y'); ?></time>
            <?php echo gebid($post->ID, 30, 'Read More'); ?>
        </div>
        <?php } else { ?>
        <div class="sticky_post blogpost cfx">
            <?php if ( has_post_thumbnail() ) { ?>
            <a href="<?php the_permalink(); ?>" class="alignleft blogimg"><?php the_post_thumbnail('blog_image'); ?></a>
            <?php } ?>
            <div class="excerpt">
                <h2><a href="<?php the_permalink(); ?>" class="blogtitle"><?php the_title(); ?></a></h2>
                <time><?php echo get_the_date( 'F j, Y'); ?></time>
                <?php echo gebid($post->ID, 30, 'Read More'); ?>
            </div>
        </div>
        <?php } ?>
        <?php endwhile;
            wp_pagenavi();
        endif; ?>
    </article>
    <aside>
        <?php dynamic_sidebar('Blog Sidebar'); ?>
    </aside>
</section>
<?php get_footer(); ?>
