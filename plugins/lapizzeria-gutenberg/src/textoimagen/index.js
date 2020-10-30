const { registerBlockType } = wp.blocks;
const { MediaUpload, RichText, URLInputButton, BlockControls, AlignmentToolbar } = wp.editor;
const { IconButton  } = wp.components;

// Logo para el bloque
import { ReactComponent as Logo } from '../pizzeria-icon.svg';

registerBlockType('lapizzeria/textoimagen', {
    title: 'Pizzeria Texto e Imagen',
    icon: {src: Logo},
    category: 'lapizzeria',
    attributes: {
        imagenFondo: {
            type: 'string',
            selector: '.ingredientes-bloque'
        }, 
        tituloBloque: {
            type: 'string',
            source: 'html',
            selector: '.texto-ingredientes h1'
        },
        textoBloque: {
            type: 'string',
            source: 'html',
            selector: '.texto-ingredientes p'
        },
        enlaceBloque: {
            type: 'string',
            source: 'attribute',
            attribute: 'href'
        },
        imagenBloque: {
            type: 'string',
            source: 'attribute',
            selector: '.imagen-ingredientes img',
            attribute: 'src',
            default: Logo
        }
    },
    supports: {
        align: ['wide', 'full']
    },
    edit: props => {

        // extraer de props
        const { attributes: { imagenFondo, tituloBloque, textoBloque, enlaceBloque, imagenBloque }, setAttributes } = props;

        const onSeleccionarImagen = nuevaImagen => {
            setAttributes({ imagenFondo : nuevaImagen.sizes.full.url })
        }
        const onChangeTitulo = nuevoTitulo => {
            setAttributes({tituloBloque : nuevoTitulo})
        }
        const onChangeTexto = nuevoTexto => {
            setAttributes({ textoBloque: nuevoTexto })
        }
        const onChangeURL = nuevaUrl => {
            setAttributes({ enlaceBloque : nuevaUrl })
        }
        const onSeleccionarImagenIngredientes = nuevaImagen => {
            setAttributes({ imagenBloque : nuevaImagen.sizes.full.url })
        }


        return (
            <div className="ingredientes-bloque" style={{ backgroundImage: `url(${imagenFondo })`}}>

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
                
                <div className="contenido-ingredientes">
                    <div className="texto-ingredientes">
                            <h1 className="titulo">
                                <RichText
                                    placeholder={'Agrega el Titulo del Hero'}
                                    onChange={onChangeTitulo}
                                    value={tituloBloque}
                                />
                            </h1>
                            <p>
                                <RichText
                                    placeholder={'Agrega el Titulo del Hero'}
                                    onChange={onChangeTexto}
                                    value={textoBloque}
                                />
                            </p>

                            <div>
                                <a href={enlaceBloque} className="boton boton-secundario">Leer Más</a>
                            </div>

                            <URLInputButton 
                                onChange={onChangeURL}
                                url={enlaceBloque}
                            />
                    </div>
                    <div className="imagen-ingredientes">
                        <img src={imagenBloque} />
                        <MediaUpload
                            onSelect={onSeleccionarImagenIngredientes}
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
                </div>
            </div>
        )
    },
    save: props => {

        // extraer de props
        const { attributes: { imagenFondo, tituloBloque, textoBloque, enlaceBloque, imagenBloque } } = props;
        return (
            <div className="ingredientes-bloque" style={{ backgroundImage: `url(${imagenFondo })`}}>
                
                <div className="contenido-ingredientes">
                    <div className="texto-ingredientes">
                            <h1 className="titulo">
                                <RichText.Content value={tituloBloque} />
                            </h1>
                            <p>
                                <RichText.Content value={textoBloque} />
                            </p>

                            <div>
                                <a href={enlaceBloque} className="boton boton-secundario">Leer Más</a>
                            </div>
                    </div>
                    <div className="imagen-ingredientes">
                        <img src={imagenBloque} />
                    </div>
                </div>
            </div>
        )
    }
});