import Key from "@/assets/seven.jpeg"
import ThumbsUp from "@/assets/four.jpeg"
import Wifi from "@/assets/five.jpeg"
import Lock from "@/assets/six.jpeg"
import Checkmark from "@/assets/eight.jpeg"
import Shield from "@/assets/three.jpeg"
import Image from "next/image"

function ChecksHeader() {
    return (
        <div className="relative flex flex-col gap-4 text-center px-4 sm:px-6 md:px-0">
            {/* Floating images */}
            <div className="absolute w-full h-full">
                {/* Left side images */}
                <div className="absolute left-0 md:left-[0] top-[-20%] sm:top-[-40%] -translate-x-2 sm:-translate-x-8">
                    <Image src={Key} alt="Key" className="w-6 h-6 sm:w-12 sm:h-12" />
                </div>

                <div className="absolute left-0 md:left-[0] top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-16">
                    <Image src={ThumbsUp} alt="Thumbs Up" className="w-6 h-6 sm:w-12 sm:h-12" />
                </div>

                <div className="absolute left-0 sm:left-[-5%] bottom-[-20%] sm:bottom-[-30%] -translate-x-2 sm:-translate-x-4">
                    <Image src={Shield} alt="Shield" className="w-6 h-6 sm:w-12 sm:h-12" />
                </div>

                {/* Right side images */}
                <div className="absolute right-[10%] md:right-[0] top-[-20%] sm:top-[-40%] translate-x-2 sm:translate-x-8">
                    <Image src={Wifi} alt="Wifi" className="w-6 h-6 sm:w-12 sm:h-12" />
                </div>

                <div className="absolute right-[10%] md:right-[0] top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-16">
                    <Image src={Lock} alt="Lock" className="w-6 h-6 sm:w-12 sm:h-12" />
                </div>

                <div className="absolute right-[10%] md:right-[-5%] bottom-[-20%] sm:bottom-[-30%] translate-x-2 sm:translate-x-4">
                    <Image src={Checkmark} alt="Checkmark" className="w-6 h-6 sm:w-12 sm:h-12" />
                </div>
            </div>

            {/* Existing content */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold max-w-lg text-black">
                Verify the <span className="text-[#D62027]">Authenticity</span> of Your Device in Seconds
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
                Use our trusted IMEI checker to ensure your phone is legitimate and not blacklisted.
            </p>
        </div>
    )
}

export default ChecksHeader;
