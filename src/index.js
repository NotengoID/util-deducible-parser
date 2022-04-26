const tallerRegex = /taller[\w %,íá]+US\$\s*[\d]+/gi

const procesarDeducibles = (input) => {
  console.log('input', input);
  let moneda = 'USD';
  let tipo = 'NO TIPO';
  let marca = 'NO MARCA';
  let taller = 'NO TALLER';
  let deducible = 0;
  let copago = 0;

  let text = input.payload.text.replace(/\n/g, ' ');
  const [txtTaller] = text.match(tallerRegex)||[];

  const txtDeducible = txtTaller.match(/\d{2}%/g)[0];
  console.log('txtDeducible', txtDeducible);
  deducible = parseInt(txtDeducible.replace('%', ''));
    
  const txtCopago = txtTaller.match(/US\$\s*[\d]+/gi)[0];
  console.log('txtCopago', txtCopago);
  copago = parseInt(txtCopago.replace(/US\$\s*/gi, ''));

  return {
    "payload": [
      {
        deducible,
        copago,
        moneda,
        tipo,
        marca,
        taller
      }
    ]
  };
}

module.exports = procesarDeducibles;
