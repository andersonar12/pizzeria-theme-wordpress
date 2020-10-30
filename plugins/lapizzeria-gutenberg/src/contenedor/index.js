const { registerBlockType } = wp.blocks;
const { MediaUpload, InnerBlocks } = wp.editor;
const { IconButton } = wp.components;

// Logo para el bloque
import { ReactComponent as Logo } from '../pizzeria-icon.svg';

registerBlockType('lapizzeria/contenedor', {
    title: 'Pizzeria Contenedor', 
    icon: { src: Logo }, 
    category: 'lapizzeria', 
    attributes: {
        imagenFondo: {
            type: 'string',
            selector: '.bloque-contenedor'
        }
    },
    edit: props => {
        // extraer los valores
        const { attributes: { imagenFondo }, setAttributes } = props;

        const onSeleccionarImagen = nuevaImagen => {
            setAttributes({ imagenFondo : nuevaImagen.sizes.full.url });
        }

        return(
            <div className="bloque-contenedor" style={{ backgroundImage : `url(${imagenFondo})` }}>
                <div className="contenido-bloque">
                    <div className="imagen-fondo">
                        <MediaUpload
                            onSelect={onSeleccionarImagen}
                            type="image"
                            render={({ open }) => (
                                <IconButton 
                                    className="lapizzeria-agregar-imagen"
                                    onClick={open}
                                    icon="format-image"
                                    showTooltip="true"
                                    label="Cambiar Imagen"
                                />
                            ) }
                        />
                    </div>
                    <div className="bloques-internos">
                        <InnerBlocks />
                    </div>
                </div>
            </div>
        );
    }, 
    save: props => {
        // extraer los valores
        const { attributes: { imagenFondo } } = props;

        return(
            <div className="bloque-contenedor" style={{ backgroundImage : `url(${imagenFondo})` }}>
                <div className="contenido-bloque">
                    <div className="imagen-fondo"></div>
                    <div className="bloques-internos">
                        <InnerBlocks.Content />
                    </div>
                </div>
            </div>
        )
    }
});
