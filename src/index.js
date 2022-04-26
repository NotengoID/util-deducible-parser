const casos = [
  {
    input: {
      "payload": {
        "text": `(No Inclueye I.G.V.)
      Por evento 10% del monto a indemnizar, mínimo US$200.00
      Excepto para:
      Robo Parcial 10% del monto a indemnizar, mínimo US$150.00
      Siniestros atendidos en talleres preferenciales 10% del monto a indemnizar, mínimo US$150.00
      Robo de accesorios Musicales 10% del monto a indemnizar, mínimo 150.00
      Responsabilidad civil 10% del monto a indemnizar, mínimo 150.00
      Robo total solo se aseguran con GPS obligatorio hasta el segundo año de antigüedad, sin coaseguro. Tercer año, coaseguro 80/20`
      }
    },
    output: {
      "payload": [
        {
          "deducible": 10,
          "copago": 150,
          "moneda": "USD",
          "tipo": "NO TIPO",
          "marca": "NO MARCA",
          "taller": "NO TALLER"
        }
      ]
    }
  },
  {
    input: {
      "payload": {
        "text": `*Los siniestros, serán atendidos únicamente en la relación de talleres especiales descritos en la cláusula  VEHA07
  20% del monto indemnizable, mínimo US$ 200 
  20% del monto indemnizable para pérdida total`
      }
    },
    output: {
      "payload": [
        {
          "deducible": 20,
          "copago": 200,
          "moneda": "USD",
          "tipo": "NO TIPO",
          "marca": "NO MARCA",
          "taller": "NO TALLER"
        }
      ]
    }
  }
]

const tallerRegex = /taller[\w %,íá]+US\$\s*[\d]+/gi

const procesarDeducibles = (input) => {
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

for (const caso of casos) {
  const { input, output } = caso;
  const resultado = procesarDeducibles(input);
  console.log(JSON.stringify(output) === JSON.stringify(resultado));
}
