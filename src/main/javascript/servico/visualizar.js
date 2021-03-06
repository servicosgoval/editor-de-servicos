'use strict';

var CabecalhoModel = require('cabecalho/cabecalho-model');
var carregarServico = require('xml/carregar');
var limparModelo = require('limpar-modelo');

module.exports = {

  controller: function (args) {
    this.cabecalho = new CabecalhoModel();
    this.servico = carregarServico(m.route.param('id'), this.cabecalho);
  },

  view: function (ctrl, args) {
    var servico = limparModelo(ctrl.servico());

    return m('#conteudo', [m('span.cabecalho-cor'),
                m('#wrapper', [
                m.component(require('cabecalho/cabecalho'), {
          metadados: false,
          logout: true,
          cabecalho: ctrl.cabecalho
        }),
                m('#servico', m('.scroll', [m('.row', m('h2', servico.nome() + (servico.sigla() ? '|' + servico.sigla() + '|' : ''))),
                      m('.row', m.component(require('servico/visualizar/ancoras'), servico)),
                      m('.row', m.component(require('servico/visualizar/descricao'), servico)),
                      m('.row', m.component(require('servico/visualizar/solicitantes'), servico)),
                      m('.row', m.component(require('servico/visualizar/etapas'), servico))
                    ]))])
            ]);
  }
};
