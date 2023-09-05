class HomeScreen {
    get skipMessage(){
        return $('id:com.woocommerce.android:id/button_skip')
    }

    get enterStoreAddress() {
        return $('id:com.woocommerce.android:id/button_login_store')
    }

    async skipScreen() {
        this.skipMessage.click()
    }

    async goToLogin() {
        this.enterStoreAddress.click()
    }

}
module.exports = new HomeScreen