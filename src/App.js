import React, { Fragment, useEffect, useState } from 'react'
import { Formulario } from './components/Formulario'
import { Cita } from './components/Cita'

export const App = () => {
  //citas en localstorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = []
  }

  //ARREGLO DE CITAS
  const [citas, guardarCitas] = useState(citasIniciales);

  useEffect(() => {
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas));
    }else{
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas, citasIniciales])

  //funcion que tome las citas actualies y agrege la nueva
  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ]);
  }
  //funcion que elimina una cita por su id
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  }

  //mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus Citas'

  return (
    <>
      <h1>Administrador de Pacientes</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario 
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita 
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

