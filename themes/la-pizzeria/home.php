
<?php get_header() ?>
   
<?php 
    $slug = get_query_var('pagename');
    $page = get_page_by_path($slug);
    
?>
<div class="hero" style="background-image: url( <?php echo get_the_post_thumbnail_url($page,'full'); ?> );">

    <div class="contenido-hero">
        <h1><?php echo $page->post_title ?></h1>
    </div>
</div>

<div class="seccion contenedor con-sidebar">

    <main class="contenido-principal">
        
        <?php while (have_posts()) { the_post();?>

        <article class="entrada-blog">
            
                <a href="<?php the_permalink() ?>"> <?php the_post_thumbnail('especialidades') ?></a>
                
            <?php 
                get_template_part('template-parts/informacion', 'entrada');
            ?>

                    <div class="contenido-entrada">
                        <?php the_excerpt() ?>

                        <a href="<?php the_permalink() ?>" class="boton boton-primario">Ver Mas</a>
                    </div>
            
        </article>

        <?php }  ?>

        <div class="paginacion">
            <?php echo $argu = next_posts_link('Anteriores') ?>
            <?php previous_posts_link('Siguientes') ?>
        </div>
        
    </main>

        <?php get_sidebar() ?>
</div>


<?php get_footer() ?>
