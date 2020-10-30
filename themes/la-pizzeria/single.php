
<?php get_header() ?>

<?php while (have_posts()) { the_post();
    
    get_template_part('template-parts/loop','contenido');
    
    //COmentarios
    comments_template();
 }  ?>

<?php get_footer() ?>
