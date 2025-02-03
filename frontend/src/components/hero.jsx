/* eslint-disable react/prop-types */
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { BiArrowBack } from "react-icons/bi";

const HeroBanner = ({images}) => {
    return (
        <div className="relative text-white  text-[20px] w-full  my-auto mx-auto">
            <Carousel
                autoPlay={true}
                infiniteLoop={true}
                showThumbs={false}
                showIndicators={false}
                showStatus={false}
                renderArrowPrev={(clickHandler) => (
                    <div
                        onClick={clickHandler}
                        className="absolute right-[31px] rounded-t-md md:right-[51px] bottom-0 w-[30px] md:w-[50px] h-[15px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90 transition-transform transform duration-300 ease-in-out hover:scale-110 hover:shadow-xl focus:outline-none"
                    >
                        <BiArrowBack className="text-sm md:text-lg" />
                    </div>
                )}
                renderArrowNext={(clickHandler) => (
                    <div
                        onClick={clickHandler}
                        className="absolute right-0 rounded-l-md bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90 transition-transform transform duration-300 ease-in-out hover:scale-110 hover:shadow-xl focus:outline-none"
                    >
                        <BiArrowBack className="rotate-180 text-sm md:text-lg" />
                    </div>
                )}
            >
                {images?.map((img, i) => (
                    <div key={i}>
                        <img src={img.url} sizes={25} className="rounded-lg h-[625px] w-full object-contain" />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default HeroBanner;
