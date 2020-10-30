const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, ColorPalette, BlockControls, AlignmentToolbar } = wp.editor;
const { PanelBody } = wp.components;

// Logo para el bloque
import { ReactComponent as Logo } from '../pizzeria-icon.svg';

/**  
    7 Pasos para crear un Bloque en Gutenberg 
    1.- Importar el componente(s) que utilizarás
    2.- Coloca el componente donde deseas utilizarlo.
    3.- Crea una función que lea los contenidos
    4.- Registra un atributo
    5.- Extraer el contenido desde props
    6.- Guarda el contenido con setAttributes
    7.- Lee los contenidos guardados en save()
*/

registerBlockType('lapizzeria/boxes', {
    title: 'Pizzeria Cajas', 
    icon: { src: Logo }, 
    category: 'lapizzeria', 
    attributes: {
        headingBox: {
            type: 'string', 
            source: 'html',
            selector: '.box h2'
        }, 
        textoBox: {
            type: 'string', 
            source: 'html', 
            selector : '.box p'
        }, 
        colorFondo: {
            type: 'string'
        },
        colorTexto: {
            type: 'string'
        }, 
        alineacionContenido: {
            type: 'string',
            default: 'center'
        }
    },
    edit: (props) => {
        console.log(props);

        // Extraer el contenido desde props
        const { attributes: { headingBox, textoBox, colorFondo, colorTexto, alineacionContenido }, setAttributes } = props;

        const onChangeHeadingBox = nuevoHeading => {
            setAttributes({ headingBox : nuevoHeading });
        }
        const onChangeTextoBox = nuevoTexto => {
            setAttributes({ textoBox : nuevoTexto })
        }

        const onChangeColorFondo = nuevoColor => {
            setAttributes({ colorFondo: nuevoColor })
        }
        const onChangeColorTexto = nuevoColor => {
            setAttributes({ colorTexto : nuevoColor })
        }
        const onChangeAlinearContenido = nuevaAlineacion => {
            setAttributes({ alineacionContenido : nuevaAlineacion })
        }

        return(
            <>
                <InspectorControls>
                    <PanelBody
                        title={'Color de Fondo'}
                        initialOpen={true}
                    >
                        <div className="components-base-control">
                            <div className="components-base-control__field">
                                <label className="components-base-control__label">
                                    Color de Fondo
                                </label>
                                <ColorPalette 
                                    onChange={onChangeColorFondo}
                                    value={colorFondo}
                                />

                            </div>
                        </div>
                    </PanelBody>
                    <PanelBody
                        title={'Color de Texto'}
                        initialOpen={false}
                    >
                        <div className="components-base-control">
                            <div className="components-base-control__field">
                                <label className="components-base-control__label">
                                    Color de Texto
                                </label>
                                <ColorPalette 
                                    onChange={onChangeColorTexto}
                                    value={colorTexto}
                                />
                            </div>
                        </div>
                    </PanelBody>
                </InspectorControls>

                <BlockControls>
                    <AlignmentToolbar 
                        onChange={onChangeAlinearContenido}
                    />
                </BlockControls>


                <div className="box" style={{ backgroundColor : colorFondo, textAlign : alineacionContenido }}>
                    <h2 style={{ color: colorTexto }}>
                        <RichText 
                            placeholder="Agrega el Encabezado"
                            onChange={onChangeHeadingBox}
                            value={headingBox}
                        />
                    </h2>
                    <p style={{ color: colorTexto }}>
                        <RichText 
                            placeholder="Agrega el Texto"
                            onChange={onChangeTextoBox}
                            value={textoBox}
                        />
                    </p>
                </div>
            </>
        )
    },
    save: (props) => {
        console.log(props);

        // Extraer el contenido desde props
        const { attributes: { headingBox, textoBox, colorFondo, colorTexto, alineacionContenido } } = props;

        return(
            <div className="box" style={{ backgroundColor : colorFondo, textAlign : alineacionContenido }}>
                <h2 style={{ color: colorTexto }}>
                    <RichText.Content value={headingBox} />
                </h2>
                <p style={{ color: colorTexto }}>
                    <RichText.Content value={textoBox} />
                </p>
            </div>
        )
    }
});