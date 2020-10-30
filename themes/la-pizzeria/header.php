<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <?php wp_head() ?>
</head>
<body>
    
<header class="site-header contenedor">

    <div class="logo">
        <a href="<?php echo get_site_url() ?>"><img src="<?php echo get_template_directory_uri() . '/img/logo.svg';   ?>" alt="" srcset=""></a>
    </div>

    <div class="informacion-header">
        <div class="redes-sociales">
            <?php 
                $args = array(
                    'theme_location'=>'redes-sociales',
                    'container'=>'nav',
                    'container_class'=>'sociales',
                    'link_before'=> '<span class="sr-text">',
                    'link_after'=> '</span>'
                );
                wp_nav_menu($args);
            ?>
        </div>

        <div class="direccion">
            <p>8170 Bay avenue Mountain View, CA 94003</p>
            <p>Telefono:+5853829145</p>
        </div>
    </div>


</header>

<div class="menu-movil">
</div>

<div class="menu-principal">
    <div class="contenedor">
        <?php 
            $args = array(
                'theme_location' => 'header-menu',
                'container' => 'nav',
                'container_class' => 'menu-sitio',
                'container_id' => 'menu'
            );
        
            wp_nav_menu($args);
        
        ?>
    </div>

</div>