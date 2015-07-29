<?php get_header();
global $post;
$parent = get_post_ancestors($post->ID);
$parent = array_pop($parent);
$pagetitle = $parent?get_the_title($parent):get_the_title($post->ID);
$haschild = get_pages('child_of='.$post->ID); ?>
<section class="content row cfx">
    <article role="main">
        <h1><?php the_title(); ?></h1>
        <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); the_content(); endwhile; endif; ?>
    </article>
    <?php if($parent || $haschild): ?>
    <aside>
        <nav>
            <h2><?php echo $pagetitle; ?></h2>
            <?php tree_children(); ?>
        </nav>
    </aside>
    <?php endif; ?>
</section>
<?php get_footer(); ?>
