"use client"
import Header from "@/components/inc_header"
import Footer from "@/components/inc_footer"
// import Swal from "sweetalert2"
import { useEffect, useState } from "react"
import axios from "axios"
import LoadingProcess from "@/components/loadingProcess"

export default function Home() {
    const [loading, setLoading] = useState(false);
    const [cnt, setCnt] = useState(0);  // 상태를 바꾸기 위해 useState을 사용해야 한다. 
    const [refModel, setRefModel] = useState(null);
    // const [selfRef, setSelRef] = ("");
    const [refImage, setRefImage] = useState(-1);
    const [refId, setRefId] = useState(-1);

    // const chgRefName = (e) => {
    //     refModel.map((data, index) => {
    //         if (index == e.target.value) {
    //             console.log(data.image)
    //             setRefImage(data.image)
    //         }

    //     })
    //     setSelRef(e.target.value)
    // }

    // const messageClick = () => {
    //     Swal.fire({
    //         title: "에러!",
    //         text: "월요일 오픈 예정",
    //         icon: "error"
    //     })
    // }

    //서버에서 ref 모델 정보 가져오는 비동기 함수 
    // const getRefModel = async () => {
    //     try {
    //         setLoading(true);
    //         const res = await axios.get('/v1/getmodellist/')
    //         console.log(res.data.refModel)
    //         console.log(res.data.code)
    //         setRefModel(res.data.refModel)

    //         console.log('refModel =' + refModel)

    //         setLoading(false);

    //         if (res.data.code != 1) {
    //             Swal.fire({
    //                 title: "에러!",
    //                 text: "데이터 가져오기 실패",
    //                 icon: "error"
    //             })
    //         }
    //     }
    //     catch (e) {
    //         Swal.fire({
    //             title: "에러!",
    //             text: "서버에서 데이터 가져오기 실패",
    //             icon: "error"
    //         })
    //     }
    // }

    // function plusHandle() {
    //     setCnt(cnt + 1)
    // }

    // useEffect(() => {
    //     console.log("useEffect 실행했습니다.")
    //     getRefModel()
    // }, []);


    return (
        <>
            <Header />

            {loading ?
                <LoadingProcess /> :
                <section className="text-gray-600 body-font">
                    <form action="http://localhost:8000/api/v1/sendimage/" method="post" encType="multipart/form-data">
                        <input type="hidden" name="refId" value={refId} />
                        <div className="container px-5 py-5 mx-auto">
                            <div className="flex flex-wrap -mx-4 -mb-10 text-center">
                                <div className="sm:w-1/2 mb-10 px-4">
                                    <div className="rounded-lg h-[450px] overflow-hidden">
                                        <img alt="content" className="object-cover object-center w-full" src="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202306/04/138bdfca-3e86-4c09-9632-d22df52a0484.jpg" />
                                    </div>
                                    <h2 className="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">내사진 업로드</h2>
                                    <div className="relative mb-4">
                                        <input type="file" accept="image/png, image/gif, image/jpeg" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                    </div>
                                    {/* <button type="submit" href="image_result.html" className="flex mx-auto mt-6 text-white bg-indigo-500 border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded">사진등록</button> */}
                                </div>
                                <div className="sm:w-1/2 mb-10 px-4">
                                    <div className="rounded-lg h-[450px] overflow-hidden">
                                        <img alt="content" className="object-cover object-center w-full" src={refImage} />
                                    </div>
                                    <h2 className="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">화장모델</h2>
                                    {/* <select onChange={chgRefName} name="model" id="lang" className="w-full h-[50px] bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                        {refModel.map((data, index) => (
                                            <option value={index} key={data.id}>{data.name}</option>
                                        )

                                        )}
                                    </select> */}
                                    {/* <button onClick={messageClick} className="flex mx-auto mt-6 text-white bg-indigo-500 border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded">모델적용</button> */}
                                </div>
                            </div>
                        </div>
                    </form>
                </section>
            }

            <Footer />
        </>


    )

}