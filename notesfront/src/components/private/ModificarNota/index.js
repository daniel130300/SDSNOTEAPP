import Page from '../../shared/Page/Page';
import Field from '../../shared/DataField/DataField';
import Button from '../../shared/Buttons/Button';
import { useSession } from '../../../hooks/Session';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { privateaxios } from '../../../store/axios';
import { NOTA_CURRENT_LOAD } from '../../../store/reducers/notas';

const ModificarNota = ()=> {
    const routeHistory = useHistory();
    let { from } = { from : {pathname:"/misNotas"}};
    const [{ nota }, dispatch ] = useSession();
  
    const cargarNota = async ()=>{
        if (nota.idActual && true) {
            const { data } = await privateaxios.get(`/api/notas/porId/${nota.idActual}`);
            console.log(data);
            dispatch({type:NOTA_CURRENT_LOAD, payload:data});
        }
    }

    const { notaActual } = nota;

    useEffect(()=>{
        cargarNota();
        setValoresFormulario({
            titulo: notaActual.titulo,
            descripcion: notaActual.descripcion,
            palabrasClave: notaActual.palabrasClave.toString()
        });
    }, []);

    const [valoresFormulario, setValoresFormulario] = useState({
        titulo: "",
        descripcion: "",
        palabrasClave: ""
    });

    const submitHandler = async (e) =>{
        e.preventDefault();
        e.stopPropagation();
        try{
            const { data } = await privateaxios.put(`/api/notas/modificarNota/${nota.idActual}`, valoresFormulario);
            dispatch({type:NOTA_CURRENT_LOAD, payload:data});
            routeHistory.replace(from);
        } 
        catch(ex)
        {
            console.log(ex);
        }
    }

    const onChangeHandler =  (e)=>{
        const {name, value} = e.target;
        setValoresFormulario({...valoresFormulario, [name]: value})
    }
  
    return (
        <Page showHeader title="Modificar Nota">
        <section>
            <Field
            name="titulo"
            id="titulo"
            placeholder="Titulo nota"
            type="text"
            labelText="Titulo"
            value={valoresFormulario.titulo}
            onChange={onChangeHandler}
            >
            </Field>
            <Field
            name="descripcion"
            id="descripcion"
            placeholder="Descripcion nota"
            type="textarea"
            labelText="Descripcion"
            value={valoresFormulario.descripcion}
            onChange={onChangeHandler}
            rows="10"
            style={{minHeight:"40vh"}}
            >
            </Field>
            <Field
            name="palabrasClave"
            id="palabrasClave"
            placeholder="Etiquetas"
            type="text"
            labelText="Etiquetas"
            value={valoresFormulario.palabrasClave}
            onChange={onChangeHandler}
            >
            </Field>
        </section>
        <section style={{padding:"1rem"}}>
            <Button onClick={submitHandler}>Modificar Nota</Button>
            </section>
        </Page>
        );
}

export default ModificarNota;