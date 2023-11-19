const formatearFecha = (fecha) => {
  const fechaAArreglo = fecha.split('-')
  const dia = fechaAArreglo[2]
  const mes = fechaAArreglo[1]
  const anio = fechaAArreglo[0]

  return mes + '/' + dia + '/' + anio.slice(-2)
}

export default formatearFecha