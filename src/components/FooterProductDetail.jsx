import DOMPurify from "dompurify";
const FooterProductDetail = ({ product, productsData, ProductList }) => {
  return (
    <div>
      <div className="mt-8">
        <div className="px-10">
          <div className="bg-white p-4 shadow">
            <div className="rounded bg-gray-50 p-4 text-lg capitalize text-slate-700">
              Mô tả sản phẩm
            </div>
            <div className="mx-4 mb-4 mt-12 text-sm leading-loose">
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product.description),
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="px-10">
          <div className="uppercase text-gray-400">CÓ THỂ BẠN CŨNG THÍCH</div>
          {productsData && (
            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {productsData.data?.data?.products.map((product) => (
                <div className="col-span-1" key={product._id}>
                  <ProductList
                    id={product._id}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    price_before_discount={product.price_before_discount}
                    star={product.rating}
                    sold={product.sold}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default FooterProductDetail;
