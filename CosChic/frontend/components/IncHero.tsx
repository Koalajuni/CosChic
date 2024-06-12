"use client"
import { ReactTyped } from "react-typed"

export default function IncHero() {
    return (
        <div className="HERO text-white">
            <p className="text-[#00df9a] font-bold "></p>

            <div>
                <p className="md: text-4xl sm:text-3x1 tesxt-xl font-bold" >
                    <ReactTyped strings={["Here you can find anything"]} typeSpeed={40} />
                    <br />

                    <ReactTyped
                        strings={[
                            "Search for products",
                            "Search for categories",
                            "Search for brands",
                        ]}
                        typeSpeed={40}
                        backSpeed={50}
                        attr="placeholder"
                        loop
                    >
                        <input type="text" />
                    </ReactTyped>

                </p>
            </div>
            <button className="bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black">Get Started</button>

        </div>



    );
}