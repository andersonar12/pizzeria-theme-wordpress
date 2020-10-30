<footer class="site-footer">
    <?php
     $args = array(
        'theme_location' => 'header-menu',
        'container' => 'nav',
        'container_class' => 'footer-nav',
        'after'=>'<span class="separador"> | </span>'
    );

    wp_nav_menu($args);
     
    ?>

<div class="direccion">
            <p>8170 Bay avenue Mountain View, CA 94003</p>
            <p>Telefono:+5853829145</p>
        </div>
</footer>



<?php wp_footer(); ?>
</body>
</html>