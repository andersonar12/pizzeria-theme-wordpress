const { registerBlockType } = wp.blocks;
const { withSelect } = wp.data;
const { RichText, InspectorControls } = wp.editor;
const { PanelBody, RangeControl, SelectControl, TextControl } = wp.components;

// Logo para el bloque
import { ReactComponent as Logo } from '../pizzeria-icon.svg';

registerBlockType('lapizzeria/menu', {
    title: 'La Pizzeria Menu',
    icon: { src: Logo},
    category: 'lapizzeria', 
    attributes: {
        cantidadMostrar: {
            type: 'number'
        },
        categoriaMenu: {
            type: 'number'
        },
        tituloBloque: {
            type:'string',
            default: 'Titulo Bloque'
        }
    },
    edit: withSelect((select, props) => {

        console.log(props);

        // extraer los valores
        const { attributes: { cantidadMostrar, categoriaMenu  }, setAttributes} = props;

        const onChangeCantidadMostrar = nuevaCantidad => {
            setAttributes({ cantidadMostrar : parseInt(  nuevaCantidad ) })
        }

        const onChangeCategoriaMenu = nuevaCategoria => {
            setAttributes({ categoriaMenu : nuevaCategoria });
        }

        const onChangeTituloBloque = nuevoTitulo => {
            setAttributes({ tituloBloque : nuevoTitulo });
        }

        return {
            categorias: select('core').getEntityRecords('taxonomy', 'categoria-menu'),
            // Enviar una petición a la api
            especialidades: select("core").getEntityRecords('postType', 'especialidades', {
                'categoria-menu' : categoriaMenu,
                per_page : cantidadMostrar || 4
            }), 
            onChangeCantidadMostrar,
            onChangeCategoriaMenu,
            onChangeTituloBloque,
            props
        };
    })

    (({ categorias, especialidades, onChangeCantidadMostrar, onChangeCategoriaMenu, onChangeTituloBloque, props})  => {
  
        // extraer los props
        const { attributes: { cantidadMostrar, categoriaMenu, tituloBloque } } = props;

        // Verificar especialidades
        if(!especialidades) {
            return 'Cargando...';
        }

        // Si no hay especialidades
        if(especialidades && especialidades.length === 0) {
            return 'No hay resultados';
        }

        // console.log(categorias);


        // Verificar categorias
        if(!categorias) {
            console.log('No hay categorias');
            return null;
        }
        if(categorias && categorias.length === 0) {
            console.log('No hay resultados');
            return null;
        }

        // Generar label y value a categorias
        categorias.forEach( categoria =>{
            categoria['label'] = categoria.name;
            categoria['value'] = categoria.id;
        })

        // Arreglo con valores por default
        const opcionDefault = [{ value: '', label : ' -- Todos -- '}];
        const listadoCategorias = [...opcionDefault, ...categorias ];
        

        return(
            <>
                <InspectorControls>
                    <PanelBody
                        title={'Cantidad a Mostrar'}
                        initialOpen={true}
                    >
                        <div className="components-base-control">
                            <div className="components-base-control__field">
                                <label className="components-base-control__label">
                                    Cantidad a Mostrar
                                </label>
                                <RangeControl 
                                    onChange={onChangeCantidadMostrar}
                                    min={2}
                                    max={10}
                                    value={cantidadMostrar || 4}
                                />
                            </div>
                        </div>
                    </PanelBody>

                    <PanelBody
                        title={'Categoría de Especialidad'}
                        initialOpen={false}
                    >
                        <div className="components-base-control">
                            <div className="components-base-control__field">
                                <label className="components-base-control__label">
                                    Categoría de Especialidad
                                </label>

                                <SelectControl 
                                    options={ listadoCategorias }
                                    onChange={onChangeCategoriaMenu}
                                    value={categoriaMenu}
                                />

                            </div>
                        </div>
                    </PanelBody>

                    <PanelBody
                        title={'Titulo Bloque'}
                        initialOpen={false}
                    >
                        <div className="components-base-control">
                            <div className="components-base-control__field">
                                <label className="components-base-control__label">
                                Titulo Bloque
                                </label>

                                <TextControl 
                                    onChange={onChangeTituloBloque}
                                    value={tituloBloque}
                                />

                            </div>
                        </div>
                    </PanelBody>

                </InspectorControls>


                <h2 className="titulo-menu">{tituloBloque}</h2>
                <ul className="nuestro-menu">
                    {especialidades.map(especialidad => (
                        <li>
                            <img src={especialidad.imagen_destacada} />
                            <div className="platillo">
                                <div className="precio-titulo">
                                    <h3>{especialidad.title.rendered}</h3>
                                    <p>$ {especialidad.precio}</p>
                                </div>
                                <div className="contenido-platillo">
                                    <p>
                                        <RichText.Content value={especialidad.content.rendered.substring(0, 180)} />
                                    </p>
                                </div>

                            </div>
                        </li>
                    ))}
                </ul>
            </>
        )
    }),
    save: () => {
        return null;
    }
})