// Function to calculate the total quantity for each malacha_prakar
function calculateTotalQuantity(productDetails) {
  const totalQuantityByProductType = {};

  productDetails.shetkaryache_products_details.forEach((entry) => {
    entry.arr_malacha_tapshil.forEach((product) => {
      const { malacha_prakar, vajan_malacha_tapshil } = product;

      if (!totalQuantityByProductType[malacha_prakar]) {
        totalQuantityByProductType[malacha_prakar] = 0;
      }
// console.log(product)
      totalQuantityByProductType[malacha_prakar] += vajan_malacha_tapshil.ekun_vajan_quintal_kilo;
    });
  });

  return totalQuantityByProductType;
}

module.exports=calculateTotalQuantity