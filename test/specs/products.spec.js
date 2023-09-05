const productViewScreen = require("../screens/productView.screen");

describe("Product List", () => {
  it("should list products", async () => {
    expect(await productViewScreen.product("Augusta Pullover")).toExist();
    expect(await productViewScreen.productList()).toBeElementsArrayOfSize(10);
  });

  it('should search by Ingrid', async () => {
    let searchName = 'Ingrid'
    await productViewScreen.waitProduct(searchName)
    await productViewScreen.search()
    await productViewScreen.searchByName(searchName)

    expect(await productViewScreen.product(searchName)).toExist();
  })
});
