
import Header from "@/components/inc_header"
import Footer from "@/components/inc_footer"
import CardProfileInformation from "@/components/card_profileInfo";
import SimilarModels from "@/components/similarModels";

export default function UserProfile() {

    {/*        더미 모델 공간입니다             */ }

    //주의: 
    //여기서 실제 DB안에 있는 유저 모델 정보를 입력해서 사용해주세요 
    // String인지, number인지 확인하고 아래 기입해주세요

    const dummyUserData = {
        "model": "",
        "pk": "",
        "fields": {
            "names": "",
            "age": "",
            "gender": "",
            "email": "",
            "createDate": "",
            "password": "",
            "IP": "",
            "uploadDate": "",
            "orgImage": "",
            "UUID": ""
        }
    };
    const dummyProductData = {
        "model": "",
        "pk": 1,
        "fields": {
            "productUrl": "",
            "productName": "",
            "brandName": "",
            "price": "",
            "productImage": "",
            "modelImage": "",
            "count": "",
            "categoryId": "",
            "category": ""
        }
    };
    {/*        더미 모델 공간입니다             */ }



    const profileImageStyle = {
        backgroundImage: "url('https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202306/04/138bdfca-3e86-4c09-9632-d22df52a0484.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "200px",
        height: "200px",
        borderRadius: "30%",
        border: "1px solid gray",
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
    };
    const userResembleModels = [
        { name: '모델 A', similarity: 87, image: 'https://via.placeholder.com/100' },
        { name: '모델 B', similarity: 63, image: 'https://via.placeholder.com/100' },
        { name: '모델 C', similarity: 43, image: 'https://via.placeholder.com/100' },
        { name: '모델 D', similarity: 23, image: 'https://via.placeholder.com/100' },
        { name: '모델 E', similarity: 23, image: 'https://via.placeholder.com/100' }
    ];

    return (
        <>
            <Header />
            <section className="h-full flex justify-center">
                <div className="px-3 py-2">
                    <div className="flex flex-wrap border shadow rounded-lg p-3 dark:bg-gray-600 items-center flex-col">
                        <a
                            className="block mx-auto"
                            href=""
                            style={profileImageStyle}
                        ></a>
                        <p className="font-serif font-semibold">코스칙</p>
                        <span className="text-sm text-gray-400">
                            New York, NY - Los Angeles, CA
                        </span>
                        <span className="text-sm text-gray-400">
                            {dummyUserData.age}, 성별
                        </span>
                        <span>

                        </span>
                    </div>
                </div>
                <div>
                    <CardProfileInformation />
                </div>
            </section>
            <div>
                <h2 className="text-xl font-semibold mt-4 mb-2">나와 비슷한 모델</h2>
                <SimilarModels models={userResembleModels} />
            </div>
            <Footer />
        </>
    )

} 