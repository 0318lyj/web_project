//element.insertAdjacentHTML('beforebegin/afterbegin/beforeend/afterend','html')
//<span></span><div><span></span><span></span><span></span></div>

let productData =JSON.parse(localStorage.getItem('productData'));

//상품갯수만큼 반복생성
productData.forEach(function(product){
  
  let str = `<div class="col">
                <div class="product-item">
                  ${product.sale == 0 ? '' : `<span class="badge bg-success position-absolute m-3">-${product.sale}%</span>`}
                  <a href="#" class="btn-wishlist"><svg width="24" height="24"><use xlink:href="#heart"></use></svg></a>
                  <figure>
                    <a href="index.html" title="Product Title">
                      <img src="${product.image}"  class="tab-image">
                    </a>
                  </figure>
                  <h3>${product.prodName}</h3>
                  <span class="qty">1 Unit</span><span class="rating"><svg width="24" height="24" class="text-primary"><use xlink:href="#star-solid"></use></svg>${product.likeIt}</span>
                  <span class="price">${product.price}원</span>
                  <div class="d-flex align-items-center justify-content-between">
                    <div class="input-group product-qty">
                        <span class="input-group-btn">
                            <button type="button" class="quantity-left-minus btn btn-danger btn-number" data-type="minus">
                              <svg width="16" height="16"><use xlink:href="#minus"></use></svg>
                            </button>
                        </span>
                        <input type="text" id="quantity" name="quantity" class="form-control input-number" value="1">
                        <span class="input-group-btn">
                            <button type="button" class="quantity-right-plus btn btn-success btn-number" data-type="plus">
                                <svg width="16" height="16"><use xlink:href="#plus"></use></svg>
                            </button>
                        </span>
                    </div>
                    <a href="#" class="nav-link">Add to Cart <iconify-icon icon="uil:shopping-cart"></a>
                  </div> <!-- d-flex -->
                </div> <!-- class="product-item" -->
              </div> <!-- class = "col" -->`;
  let target = document.querySelector('div.product-grid');
  target.insertAdjacentHTML('beforeend',str);
}); //forEach 끝


