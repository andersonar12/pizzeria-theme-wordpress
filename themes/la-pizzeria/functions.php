<?php 

/* Estilos y JS */

function lapizzeria_styles()
{
    /* Fuentes */
    wp_enqueue_style( 'googlefont', 'https://fonts.googleapis.com/css2?family=Open+Sans&family=Raleway:wght@400;700;900&display=swap', array(), '1.0.0');

    /* Estilos */
   
   wp_enqueue_style( 'normalize','https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css' , array(), '8.0.1');

    wp_enqueue_style( 'style', get_stylesheet_uri(), array(), '1.0.0');

    

    wp_enqueue_style( 'slicknav.css', get_template_directory_uri() . '/assets/css/slicknav.css', array(), '1.0.10');

    //Scripts
    wp_enqueue_script('jquery',get_template_directory_uri() . '/assets/js/jquery.min.js', array(), '3.4.1 ',true);
   


    wp_enqueue_script('slicknav.js',get_template_directory_uri() . '/assets/js/jquery.slicknav.js', array('jquery'), '1.0.10',true);

    wp_enqueue_script('scripts',get_template_directory_uri() . '/assets/js/script.js', array('jquery'), '1.0 ',true);
   
}
add_action( 'wp_enqueue_scripts', 'lapizzeria_styles');

/* Soporte de imagenes destacadas */
function lapizzeria_setup(){
    /*** Titulos para SEO */
    add_theme_support('title-tag');

    /** Gutenberg */

    // Soporte a estilos por default de gutenberg en tu tema
    add_theme_support('wp-block-styles');

    // Soporte a contenido completo
    add_theme_support('align-wide');

    // Paleta de Colores
    add_theme_support('editor-color-palette', array(
        array(
            'name' => 'Rojo',
            'slug' => 'rojo',
            'color' => '#a61206'
        ), 
        array(
            'name' => 'Naranja',
            'slug' => 'naranja',
            'color' => '#F19F30'
        ), 
        array(
            'name' => 'Verde',
            'slug' => 'verde',
            'color' => '#127427'
        ), 
        array(
            'name' => 'Blanco',
            'slug' => 'blanco',
            'color' => '#FFFFFF'
        ), 
        array(
            'name' => 'Negro',
            'slug' => 'negro',
            'color' => '#000000'
        ), 
    ));

    // Deshabilita los colores personalizados
    add_theme_support('disable-custom-colors');

    // Imagenes destacadas
    add_theme_support('post-thumbnails');

    // Tamaños de imagenes
    add_image_size('nosotros', 437, 291, true);
    add_image_size('especialidades', 768,515, true);
    add_image_size('especialidades_portrait', 435, 526, true);
}
add_action('after_setup_theme','lapizzeria_setup');
 
/* Menus */

function lapizzeria_menus(){
    register_nav_menus( array(
        'header-menu'=>'Header Menu',
        'redes-sociales'=>'Redes Sociales',
        'footer-menu'=>'Footer Menu',
    ));
}
add_action('init','lapizzeria_menus');

/* Zona de widgets */
function lapizzeria_widgets(){
    register_sidebar( array(
        'name'=> 'Blog Sidebar',
        'id'=> 'blog_sidebar',
        'before_widget'=> '<div class="widget">',
        'after_widget' => '</div>',
        'before_title' => '<h3>',
        'after_title' => '</h3>'
    ) );
}
add_action('widgets_init','lapizzeria_widgets');

function lapizzeria_botones_paginador(){
    return 'class="boton boton-secundario"';
}

add_filter( 'next_posts_link_attributes', 'lapizzeria_botones_paginador' );
add_filter( 'previous_posts_link_attributes', 'lapizzeria_botones_paginador' );
