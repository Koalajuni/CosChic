
export default function IncNews() {
    return (
        <div className="NEWS">
            <div className="w-full py-16 text-white px-4">
                <div className="max-w-[1240px] mx-auto grid lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">메일주소를 남겨주세요.</h1>
                        <p>좀 더 다양한 정보를 원하시면 메일주소를 남겨주세요.</p>
                    </div>
                    <div className="my-4">
                        <div className="flex flex-col sm:flex-row items-center justify-between w-full">
                            <input className="p-3 flex w-full rounded-md text-black" type="email" placeholder="이메일 주소를 입력하세요." />
                            <button className="bg-[#00df9a] text-black rounded-md font-medium w-[200px] ml-4 my-6 py-3">보내기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}