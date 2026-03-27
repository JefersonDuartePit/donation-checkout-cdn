;(function () {
  'use strict'

  // 1.1 Leitura do data-sku-id
  var scriptTag = document.querySelector('script[data-sku-id]')
  var skuId = scriptTag ? scriptTag.getAttribute('data-sku-id') : null
  if (!skuId) return

  // 1.2 Verificacao de vtexjs e jQuery
  if (typeof vtexjs === 'undefined' || typeof $ === 'undefined') return

  // 1.3 Flag de controle para prevenir loop entre atualizacao programatica e handler de click
  var isUpdating = false

  // 1.4 Funcao injectContainer
  function injectContainer() {
    var anchor = document.querySelector('.btn-place-order')
    if (!anchor) return

    if (document.getElementById('donation-checkout-container')) return

    var container = document.createElement('div')
    container.id = 'donation-checkout-container'
    container.style.margin = '10px 0'

    var checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.id = 'donation-checkout-checkbox'

    var label = document.createElement('label')
    label.htmlFor = 'donation-checkout-checkbox'
    label.appendChild(document.createTextNode(' Adicionar doacao de arvore ao pedido'))

    container.appendChild(checkbox)
    container.appendChild(label)

    anchor.parentNode.insertBefore(container, anchor)

    // 1.6 Handler de click no checkbox
    checkbox.onclick = function () {
      if (isUpdating) return

      try {
        if (checkbox.checked) {
          vtexjs.checkout.addToCart([{ id: skuId, quantity: 1, seller: '1' }])
        } else {
          vtexjs.checkout.getOrderForm().done(function (orderForm) {
            try {
              var idx = -1
              for (var i = 0; i < orderForm.items.length; i++) {
                if (orderForm.items[i].id === skuId) {
                  idx = i
                  break
                }
              }
              if (idx !== -1) {
                vtexjs.checkout.removeItems([{ index: idx, quantity: 1 }])
              }
            } catch (e) {}
          })
        }
      } catch (e) {}
    }
  }

  // 1.5 Funcao syncDonation
  function syncDonation(orderForm) {
    injectContainer()

    var checkbox = document.getElementById('donation-checkout-checkbox')
    if (!checkbox) return

    var found = false
    for (var i = 0; i < orderForm.items.length; i++) {
      if (orderForm.items[i].id === skuId) {
        found = true
        break
      }
    }

    isUpdating = true
    checkbox.checked = found
    isUpdating = false
  }

  // 1.7 Registro do evento jQuery
  $(window).on('orderFormUpdated.vtex', function (evt, orderForm) {
    try {
      syncDonation(orderForm)
    } catch (e) {}
  })
})()
