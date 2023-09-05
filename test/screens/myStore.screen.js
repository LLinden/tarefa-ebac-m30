class MyStoreScreen {
    get myStoreName(){
        return $('id:com.woocommerce.android:id/toolbar_subtitle')
    }

    get myStoreLogo(){
        return $('~My store')
    }

    get productScreen() {
        return $('id:com.woocommerce.android:id/products')
    }

    async getStoreName() {
        await this.myStoreName.waitForExist()
        return await this.myStoreName.getText()
    }

    async getStoreLogo() {
        await this.myStoreLogo.waitForExist()
        return await this.myStoreLogo.isDisplayed()
    }

    async clickProductScreen() {
        await this.productScreen.click()
    }
}
module.exports = new MyStoreScreen