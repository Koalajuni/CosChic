
// 0620 11:11 backup
const ProductDetails = ({ product }: { product: any }) => (
    <div className="mb-10">
        <h2 className="text-xl font-semibold">사용한 상품</h2>
        <div className="justify-between flex mt-4">
        {product && product.productImage &&(
            <img src={product.productImage} alt={product.productName} className="items-start w-56 h-56 mr-0 rounded-md" />
            )}<div className="flex flex-col justify-center">
                {product && product.productName &&(
                <p className="text-center text-lg mb-2">상품명: {product.productName}</p>
                )}
                {product && product.price &&(
                <p className="text-center text-lg mb-2">가격: {product.price}</p>
                )}
                {product && product.productUrl &&(
                <p className="text-center text-lg mb-2">
                    URL: <a href={product.productUrl} className="text-blue-500">{product.productUrl}</a>
                </p>
                )}
            </div>
            <div></div>
        </div>
    </div>
);

export default ProductDetails;