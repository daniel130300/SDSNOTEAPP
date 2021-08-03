import Page from '../../shared/Page/Page';
import {useSession} from '../../../hooks/Session';
import {Link, Redirect} from 'react-router-dom';
import { useEffect } from 'react';
import { privateaxios } from '../../../store/axios';
import { NOTA_CURRENT_LOAD } from '../../../store/reducers/notas';

import './MiNota.css';

const MiNota = () => {
  const [{ nota }, dispatch ] = useSession();

  useEffect(
    async ()=>{
      if (nota.idActual && true) {
        const { data } = await privateaxios.get(`/api/notas/porId/${nota.idActual}`);
        console.log(data);
        dispatch({type:NOTA_CURRENT_LOAD, payload:data});
      }
    },
    []
  );
  // Si no hay un codigo a cargar se regresa a la lista
  if (!(nota.idActual && true)) {
    return (
      <Redirect to="/misNotas"></Redirect>
    )
  }
  const { notaActual } = nota;

  // Si hay un codigo pero aun no se ha cargado ... se muestra cargando
  if (!(notaActual && true)){
    return (
      <Page title="Mi Nota" showHeader>
        <strong>Cargando .... </strong>
      </Page>
    );
  }
  //Si hay un codigo y ya esta cargado
  const claves = notaActual.palabrasClave.map((o, i)=>{
    return (<span key={i} className="palabrasClave">{o}</span>);
  });

  /*
  const comments = notaActual.comments.map((o,i)=>{
    return (
      <section key={i} className="comment">
        <div>
          <div>{o.email}</div>
          <div>{new Date(o.date).toLocaleDateString()}</div>
        </div>
        <div>{o.comment}</div>
      </section>);
  });
  */
  return (
    <Page title="Nota" showHeader>
      <pre className="pre">
        {notaActual.titulo}
      </pre>
      <section className="contenedorDescripcion">
        <h2>Descripción</h2>
        {notaActual.descripcion}
      </section>
      <section className="contenedorPalabras">
        <h2>Palabras Claves</h2>
        {claves}
      </section>
      <Link to="/misNotas" className="btn">Regresar</Link>
    </Page>
  )
}

export default MiNota;