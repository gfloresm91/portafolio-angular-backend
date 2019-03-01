'use strict'

var controller = {
    home: (req, res) => {
        return res.status(200).send({
            message: 'Soy home'
        });
    },

    test: (req, res) => {
        return res.status(200).send({
            message: 'Soy test'
        });
    }

};

module.exports = controller;