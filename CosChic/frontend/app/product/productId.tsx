import { useRouter } from 'next/router';

const ProductPage = () => {
    const router = useRouter();
    const { productId } = router.query;

    const userProfileImage = 'https://via.placeholder.com/150';
    const userResembleModels = [
        { name: '모델 A', similarity: 87, image: 'https://via.placeholder.com/100' },
        { name: '모델 B', similarity: 63, image: 'https://via.placeholder.com/100' },
        { name: '모델 C', similarity: 43, image: 'https://via.placeholder.com/100' },
        { name: '모델 D', similarity: 23, image: 'https://via.placeholder.com/100' },
        { name: '모델 E', similarity: 23, image: 'https://via.placeholder.com/100' }
    ];

    const productData = {
        name: '에뛰드',
        price: 15000,
        url: 'https://example.com',
        image: 'https://via.placeholder.com/150',
        brandName: '브랜드 A'
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">가상화장</h1>
            <div className="flex justify-between mb-4">
                <img src={userProfileImage} alt="원본 사진" className="w-1/2 rounded-md" />
                <img src={productData.image} alt="화장 후 사진" className="w-1/2 rounded-md" />
            </div>
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">사용한 상품</h2>
                <div>
                    <p>상품명: {productData.name}</p>
                    <p>가격: {productData.price}</p>
                    <p>URL: <a href={productData.url} className="text-blue-500">{productData.url}</a></p>
                </div>
            </div>
            <h2 className="text-xl font-semibold mb-2">GPT 설명</h2>
            <div className="p-4 bg-gray-200 rounded-md">
                GPT가 설명하는 칸입니다. 여기서는 화장품 또는 위에 GAN이 설명할 칸이라고 생각해주시면 되겠습니다.
            </div>
            <h2 className="text-xl font-semibold mt-4 mb-2">추가로 비슷한 모델</h2> /
            <div className="flex justify-around">
                {userResembleModels.map((model, index) => (
                    <div key={index} className="text-center">
                        <img src={model.image} alt={model.name} className="w-20 h-20 rounded-full border-2 border-red-500" />
                        <p>{model.name} - {model.similarity}%</p>
                    </div>
                ))}
            </div>
            <h2 className="text-xl font-semibold mt-4 mb-2">관련 브랜드 상품</h2>
            <div className="flex justify-around">
                {/* Add related brand products here */}
                <div className="w-1/4 p-2">
                    <div className="bg-gray-300 p-4 rounded-md">관련 상품 A</div>
                </div>
                <div className="w-1/4 p-2">
                    <div className="bg-gray-300 p-4 rounded-md">관련 상품 B</div>
                </div>
                <div className="w-1/4 p-2">
                    <div className="bg-gray-300 p-4 rounded-md">관련 상품 C</div>
                </div>
                <div className="w-1/4 p-2">
                    <div className="bg-gray-300 p-4 rounded-md">관련 상품 D</div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;