<div class="hero" style="background-image: url( <?php echo get_the_post_thumbnail_url(); ?> );">
    <div class="contenido-hero">
        <h1><?php the_title(); ?></h1>
    </div>
</div>

<div class="seccion contenedor">
    <main class="contenido-principal">
    
        <?php 
            if(is_single()):
                get_template_part('template-parts/informacion', 'entrada');
            endif;
        
        ?>
        <?php the_content(); ?>
    </main>
</div>
  