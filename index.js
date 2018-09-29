/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';
const Alexa = require('alexa-sdk');

const SKILL_NAME = 'Refranes Populares';
const GET_FACT_MESSAGE = "Este refrán me gusta mucho: ";
const HELP_MESSAGE = 'Puedo decirte un refrán popular, ¿quieres uno?';
const HELP_REPROMPT = '¿En qué te puedo ayudar?';
const STOP_MESSAGE = '¡Adios!';

const data = [
    'Dando y dando pajarito volando',
    'A darle que es mole de olla',
    'El que es perico donde quiera es verde',
    'Chocolate que no tiñe, claro está',
    'El que con lobos anda, a aullar se enseña'
];

const handlers = {
    'LaunchRequest': function () {
        this.emit('obtenerRefran');
    },
    'obtenerRefran': function () {
        const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = GET_FACT_MESSAGE + randomFact;

        this.response.cardRenderer(SKILL_NAME, randomFact);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
