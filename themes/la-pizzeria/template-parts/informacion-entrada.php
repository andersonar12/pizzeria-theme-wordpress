<header class="informacion-entrada">
            <div class="fecha">
            <time>
                 <?php echo the_time('d') ?>
             <span><?php the_time('M') ?></span>
            <time>
     </div>  

     <?php if(is_home()):?>
        <div class="titulo-entrada">
            <h2><?php the_title() ?></h2>
        </div>
     <?php endif ?>
                    
 </header>

          <p class="autor">
               Escrito por:
               <span><?php the_author() ?></span>
           </p>
