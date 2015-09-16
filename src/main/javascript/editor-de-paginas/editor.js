'use strict';

var CabecalhoModel = require('cabecalho/cabecalho-model');
var carregarPagina = require('editor-de-paginas/carregar');
var salvarOrgao = require('editor-de-paginas/salvar');

var modificado = m.prop(false);

module.exports = {

  controller: function () {
    this.cabecalho = new CabecalhoModel();
    this.pagina = carregarPagina(m.route.param('id'), this.cabecalho);

    this.salvar = _.bind(function () {
      window.console.log(this.pagina().nome());
      return salvarOrgao(this.pagina());
    }, this);
  },

  view: function (ctrl) {
    var binding = {
      pagina: ctrl.pagina
    };

    return m('#conteudo', {
      config: function (element, isInitialized) {
        if (isInitialized) {
          return;
        }

        jQuery(element).on('change', function () {
          modificado(true);
        });

        jQuery(window).bind('beforeunload', function () {
          if (modificado()) {
            return 'Suas últimas alterações ainda não foram salvas.';
          }
        });
      }
    }, [
      m('span.cabecalho-cor'),
      m('#wrapper', [
        m.component(require('../cabecalho/cabecalho'), {
          metadados: true,
          logout: true,
          salvar: _.bind(ctrl.salvar, ctrl),
          cabecalho: ctrl.cabecalho
        }),
        m('#servico',
          m('.scroll', [
            m.component(require('editor-de-paginas/componentes/tipo-de-pagina'), binding),
            m.component(require('editor-de-paginas/componentes/nome'), binding),
            m.component(require('editor-de-paginas/componentes/conteudo'), _.assign(binding, {
              maximo: 1500
            }))
          ])
        )
      ])
    ]);
  }
};
