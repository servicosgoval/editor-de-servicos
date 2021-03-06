'use strict';

var referencia = require('referencia');

var selectTipo = function (prop) {
  return m.component(require('componentes/select2'), {
    prop: prop,
    data: referencia.unidadesDeTempo
  });
};

module.exports = {

  controller: function (args) {
    this.servico = args.servico;
  },

  view: function (ctrl) {
    return m('fieldset#tempo-total-estimado', [
      m('h3', [
        'Tempo estimado para realizar esse serviço',
        m.component(require('tooltips').tempoTotalEstimado)
      ]),

      m.component(require('componentes/select2'), {
        prop: ctrl.servico().tempoTotalEstimado().tipo,
        data: [
          {
            id: 'ate',
            text: 'Até'
          },
          {
            id: 'entre',
            text: 'Entre'
          }
        ]
      }),

      m('span.tipo-ate', {
        style: {
          display: ctrl.servico().tempoTotalEstimado().tipo() === 'ate' ? 'inline' : 'none'
        }
      }, [
        m('.input-container.inline.margin-right', {
          class: ctrl.servico().tempoTotalEstimado().ateMaximo.erro()
        }, [m('input.ate-maximo[type="number"]', {
          value: ctrl.servico().tempoTotalEstimado().ateMaximo(),
          onchange: m.withAttr('value', ctrl.servico().tempoTotalEstimado().ateMaximo)
        })]),

        selectTipo(ctrl.servico().tempoTotalEstimado().ateTipoMaximo)
      ]),

      m('span.tipo-entre', {
        style: {
          display: ctrl.servico().tempoTotalEstimado().tipo() === 'entre' ? 'inline' : 'none'
        }
      }, [
        m('.input-container.inline', {
          class: ctrl.servico().tempoTotalEstimado().entreMinimo.erro()
        }, [m('input.entre-minimo[type="number"]', {
          value: ctrl.servico().tempoTotalEstimado().entreMinimo(),
          onchange: m.withAttr('value', ctrl.servico().tempoTotalEstimado().entreMinimo)
        })]),

        m('span', ' e '),

        m('.input-container.inline.margin-right', {
          class: ctrl.servico().tempoTotalEstimado().entreMaximo.erro()
        }, [m('input.entre-maximo[type="number"]', {
          value: ctrl.servico().tempoTotalEstimado().entreMaximo(),
          onchange: m.withAttr('value', ctrl.servico().tempoTotalEstimado().entreMaximo)
        })]),

        selectTipo(ctrl.servico().tempoTotalEstimado().entreTipoMaximo)
      ]),

      m('label.titulo.opcional', 'Comentários sobre exceções ou informações adicionais ao tempo estimado'),

      m.component(require('componentes/editor-markdown'), {
        rows: 3,
        onchange: m.withAttr('value', ctrl.servico().tempoTotalEstimado().descricao),
        value: ctrl.servico().tempoTotalEstimado().descricao(),
        erro: ctrl.servico().tempoTotalEstimado().descricao.erro()
      })
    ]);
  }
};
