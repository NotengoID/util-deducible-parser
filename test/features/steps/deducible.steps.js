const { loadFeature, defineFeature } = require('jest-cucumber');
const procesarDeducibles = require('../../../src/index.js');
const inputs = require('./../inputs/inputs.js');
const outputs = require('./../outputs/outputs.js');
const feature = loadFeature('./../deducible.feature', { loadRelativePath: true, errors: true });

defineFeature(feature, test => {
  test('Póliza con deducible texto plano', ({ given, when, then }) => {

    let solicitud;
    let respuesta;

    given(/^la póliza tiene un deducible en forma del (.*)$/, (texto) => {
      solicitud = inputs[texto];
    });

    when('ejecutamos el conversor de deducible', () => {
      respuesta = procesarDeducibles(solicitud);
    });

    then(/^obtenemos la parametrización del deducible en (.*)$/, (detalle) => {
      expect(outputs[detalle]).toEqual(respuesta);
    });
  });
});
