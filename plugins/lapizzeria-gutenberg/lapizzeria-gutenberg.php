<?php
/*
    Plugin Name: La Pizzeria Gutenberg Blocks
    Plugin URI: 
    Description: Agrega bloques de Gutenberg nativos
    Version: 1.0
    Author: Anderson Romero
    Author URI: https://anderson-romero-web.web.app/home
    License: GPL2
    License URI: https://www.gnu.org/licenses/gpl-2.0.html
*/

if(!defined('ABSPATH')) exit;

/** Categorias Personalizadas */
function lapizzeria_categoria_personalizada($categories, $post) {
    return array_merge(
        $categories,
        array(
            array(
                'slug' => 'lapizzeria', 
                'title' => 'La Pizzeria',
                'icon' => 'store'
            )
        )
    );
}
add_filter('block_categories', 'lapizzeria_categoria_personalizada', 10, 2);


/** Registrar bloques, scripts y CSS */

function lapizzeria_registrar_bloques() {

    // Si gutenberg no existe, salir
    if(!function_exists('register_block_type')) {
        return;
    }

    // Registrar los bloques en el editor
    wp_register_script(
        'lapizzeria-editor-script', // nombre unico
        plugins_url( 'build/index.js', __FILE__), // archivo con los bloques
        array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'), // dependencias
        filemtime( plugin_dir_path(__FILE__) . 'build/index.js') // versión
    );

    // Estilos para el editor (unicamente)
    wp_register_style(
        'lapizzeria-editor-styles', // nombre
        plugins_url( 'build/editor.css', __FILE__), // archivo css para el editor
        array('wp-edit-blocks'), // dependencias
        filemtime( plugin_dir_path(__FILE__) . 'build/editor.css')
    );

    // Estilos para los bloques (backend y front end)
    wp_register_style(
        'lapizzeria-frontend-styles', // nombre
        plugins_url( 'build/styles.css', __FILE__), // archivo css para el editor
        array(), // dependencias
        filemtime( plugin_dir_path(__FILE__) . 'build/styles.css')
    );

    // Arreglo de bloques
    $blocks = [
        'lapizzeria/boxes',
        'lapizzeria/galeria',
        'lapizzeria/hero',
        'lapizzeria/textoimagen', 
        'lapizzeria/contenedor'
    ];

    // Recorrer bloques y agregar scripts y styles
    foreach($blocks as $block) {
        register_block_type($block, array(
            'editor_script' => 'lapizzeria-editor-script', // script principal para editor
            'editor_style' => 'lapizzeria-editor-styles', // estilos para el editor
            'style' => 'lapizzeria-frontend-styles' // estilos para el front end
        ));
    }

    /** Registar un bloque dinamico */
    register_block_type( 'lapizzeria/menu', array(
        'editor_script' => 'lapizzeria-editor-script', // script principal para editor
        'editor_style' => 'lapizzeria-editor-styles', // estilos para el editor
        'style' => 'lapizzeria-frontend-styles', // estilos para el front end
        'render_callback' => 'lapizzeria_especialidades_front_end' // Query a la base de datos
    ) );
}
add_action('init', 'lapizzeria_registrar_bloques');


/** Consulta la base de datos para mostrar los resultados en el front end*/

function lapizzeria_especialidades_front_end($atts) {

     // echo "<pre>";
     // var_dump($atts);
     // echo "</pre>";

     // Extraer los valores y agregar defaults
    $cantidad = $atts['cantidadMostrar'] ? $atts['cantidadMostrar'] : 4;
    $titulo_bloque = $atts['tituloBloque'] ? $atts['tituloBloque'] : 'Nuestras Especialidades';
    $tax_query = array();

    if(isset($atts['categoriaMenu'])){
        $tax_query[] =  array(
            'taxonomy' => 'categoria-menu',
            'terms' => $atts['categoriaMenu'],
            'field' => 'term_id'
        );
    }
   
    // Obtener los datos del Query
    $especialidades = wp_get_recent_posts(array(
        'post_type' => 'especialidades',
        'post_status' => 'publish',
        'numberposts' => $cantidad,
        'tax_query' => $tax_query
    ));

    // Revisar que haya resultados
    if(count($especialidades) == 0 ) {
        return 'No hay Especialidades';
    }

    $cuerpo = '';
    $cuerpo .= '<h2 class="titulo-menu">';
    $cuerpo .= $titulo_bloque;
    $cuerpo .= '</h2>';
    $cuerpo .= '<ul class="nuestro-menu">';
    foreach($especialidades as $esp):
        // obtener un objeto del post
        $post = get_post( $esp['ID'] );
        setup_postdata($post);

        $cuerpo .= sprintf(
            '<li>
                %1$s
                <div class="platillo">
                    <div class="precio-titulo">
                        <h3>%2$s</h3>
                        <p>$ %3$s</p>
                    </div>
                    <div class="contenido-platillo">
                        <p>%4$s</p>
                    </div>
                </div>
            </li>', 
            get_the_post_thumbnail($post, 'especialidades'),
            get_the_title($post),
            get_field('precio', $post),
            get_the_content($post)
        );
        wp_reset_postdata();
    endforeach;
    $cuerpo .= '</ul>';

    return $cuerpo;
}

/** Agrega lightbox a plugin */
function lapizzeria_frontend_scripts() {
    wp_enqueue_style('lightbox', 'https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.1/css/lightbox.min.css', array(), '2.11.1');

    wp_enqueue_script('lightboxjs', 'https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.1/js/lightbox.min.js', array('jquery'), '2.11.1', true);
}
add_action('wp_enqueue_scripts', 'lapizzeria_frontend_scripts');
