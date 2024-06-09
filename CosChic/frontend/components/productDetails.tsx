
const ProductDetails = ({ product }: { product: any }) => (
    <div className="mb-10">
        <h2 className="text-xl font-semibold">사용한 상품</h2>
        <div className="justify-between flex mt-4">
            <img src={product.image} alt={product.name} className="items-start w-56 h-56 mr-0 rounded-md" />
            <div className="flex flex-col justify-center">
                <p className="text-center text-lg mb-2">상품명: {product.name}</p>
                <p className="text-center text-lg mb-2">가격: {product.price}</p>
                <p className="text-center text-lg mb-2">
                    URL: <a href={product.url} className="text-blue-500">{product.url}</a>
                </p>
            </div>
            <div></div>
        </div>
    </div>
);

export default ProductDetails;