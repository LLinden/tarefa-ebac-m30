const productViewScreen = require("../screens/productView.screen");
const detalheProdutoScreen = require("../screens/detalheProduto.screen")
const carrinhoScreen = require("../screens/carrinho.screen")

describe('Fluxo de compra de produto', () => {
    it('deve realizar fluxo de compra de um produto e2e', async () => {
        let produto = 'Ingrid Running'
        await productViewScreen.waitProduct(produto)
        await productViewScreen.selecionaProduto(produto)
        await detalheProdutoScreen.clicaBotaoAdicionaCarrinho()
        await detalheProdutoScreen.clicaTamanho()
        await detalheProdutoScreen.clicaSelecionaTamanho()
        await detalheProdutoScreen.clicaCor()
        await detalheProdutoScreen.clicaSelecionaCor()
        await detalheProdutoScreen.clicaBotaoAdicionaCarrinho()

        expect(await carrinhoScreen.product(produto)).toExist();
    })
})