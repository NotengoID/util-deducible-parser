const tallerRegex = /taller[\w\s%.,á-ú]+(US\$|S\/.)\s*\d+(.\d+)?|(marca[\w\s.,:á-ú]+)*\d+(.\d+)?%[\w\s.,á-ú]+(US\$|S\/.)\s*\d+[\w\s.,á-ú(]+taller[\w \t.,á-ú)]+(\n|$)/gi;

const procesarDeducibles = (input) => {
  console.log('input', input);

  let text = input.payload.text;
  const textosTalleres = text.match(tallerRegex);

  const payload = textosTalleres.map((txtTaller) => decode(txtTaller));
  console.log('payload', payload);

  return { payload };
}

const decode = (txtTaller) => {

  const deducible = getDeducible(txtTaller);
  const copago = getCopago(txtTaller);
  const taller = getTaller(txtTaller);
  const tipo = getTipo(txtTaller);
  const marca = getMarca(txtTaller);
  const moneda = getMoneda(txtTaller);

  return {
    deducible,
    copago,
    moneda,
    tipo,
    marca,
    taller
  };
}

const getDeducible = (txtTaller) => {
  const txtDeducible = txtTaller.match(/\d+(.\d+)?%/g)[0];
  return parseInt(txtDeducible.replace('%', ''));
}

const getCopago = (txtTaller) => {
  const txtCopago = txtTaller.match(/(US\$|S\/.)\s*\d+(.\d+)?/gi)[0];
  return parseInt(txtCopago.replace(/(US\$|S\/.)\s*/gi, ''));
}

const getTaller = (txtTaller) => {
  const taller = txtTaller.match(/(otro(s)? )?taller[\wá-ú\t, ]+(\d+(.\d+)?%|\n|$|\)|\.)/gi)[0];
  const palabraFiltroEncontrada = taller.search(/preferencia|especial|afiliado|otro/gi);
  return palabraFiltroEncontrada == -1 ? taller.replace(/(\s*taller(es)?\s+|,\s+\d+(.\d+)?%)/gi, '').trimEnd() : 'NO TALLER';
}

const getTipo = (txtTaller) => {
  const tipo = txtTaller.match(/multimarca/gi);
  return tipo ? 'Multimarca' : 'NO TIPO';
}

const getMarca = (txtTaller) => {
  const marca = txtTaller.match(/marca\s+[\wá-ú, ]+:/gi);
  return marca ? marca[0].replace(/(marca\s*|:)/gi, '').toUpperCase() : 'NO MARCA';
}

const getMoneda = (txtTaller) => {
  const txtMoneda = txtTaller.match(/US\$|S\/./gi)[0];
  return txtMoneda.replace(/US\$/gi, 'USD').replace(/S\/./gi, 'PEN').toUpperCase();
}

module.exports = procesarDeducibles;
