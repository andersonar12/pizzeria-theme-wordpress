
<?php
if ( have_posts() ) {
    while ( have_posts() ) :
 
        the_post(); ?>
 
        <h2><?php the_title(); ?></h2>
 
        <?php the_content(); ?>
 
    <?php   endwhile;
}?>


<h1><?php

 $path = $template;
 
 $exp = explode('/',$path);

 echo $exp[10];
 ?></h1>

<?php echo get_site_url() ?>