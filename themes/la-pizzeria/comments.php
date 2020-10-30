<div class="contenedor comentarios">
    <?php 
        $args = array('class_submit' => 'boton boton-primario', );
        comment_form($args);
    ?>

    <h3 class="text-center">Comentarios</h3>
    <ul>
        <?php 
        
            $array1 = array(
                'post_id' => $post->ID,
                'status' => 'approve'
             );

             $array2 = array(
                 'per_page' => 10,
                'reverse_top_level'=> false );

            $comentarios = get_comments($array1 );
            wp_list_comments($array2,$comentarios);
        ?>
    </ul>
</div>

