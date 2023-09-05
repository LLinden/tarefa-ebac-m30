class detalheProdutoScreen {

    get adicionaCarrinho() {
        return $(`~Adicionar ao carrinho`)
    }

    get tamanho() {
        return $(`-ios predicate string:name CONTAINS 'Size'`)
    }

    get selecionaTamanho() {
        return $(`~S`)
    }

    get cor() {
        return $(`-ios predicate string:name CONTAINS 'Color'`)
    }

    get selecionaCor() {
        return $(`~Red`)
    }

    get iconeCarrinho() {
        return $(`-ios class chain:**/XCUIElementTypeButton[1]`)
    }

    async clicaIconeCarrinho() {
        await this.iconeCarrinho.click()
    }

    async clicaSelecionaCor() {
        await this.selecionaCor.click()
    }

    async clicaCor() {
        await this.cor.click()
    }

    async clicaSelecionaTamanho() {
        await this.selecionaTamanho.click()
    }

    async clicaTamanho() {
        await this.tamanho.click()
    }

    async clicaBotaoAdicionaCarrinho() {
        await this.adicionaCarrinho.click()
    }
}
module.exports = new detalheProdutoScreen();