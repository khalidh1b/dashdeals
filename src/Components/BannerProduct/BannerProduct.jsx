import Countdown from 'react-countdown';
import renderer from '../BannerProductCountdown/BannerProductCountdown';

const BannerProduct = () => {
    const endTime = Date.now() + 343196000;
    return (
        <div className="bg-[#000] flex justify-center py-16 mx-36 gap-8">
            <div>
                <h4 className="text-[#0F6] pb-7">Categories</h4>
                <h1 className="text-[48px] text-[#FAFAFA] font-semibold leading-[52px] pb-7">Enhance Your <br /> Music Experience</h1>
                <Countdown date={endTime} renderer={renderer} />
                <button className="bg-[#0F6] mt-10 text-white py-3 px-8 rounded">Buy Now!</button>
            </div>
            <div>
                <img src="https://i.postimg.cc/KvRzvbKL/jbl-boombox-hero.png" alt="Boombox" />
            </div>
        </div>
    );
};

export default BannerProduct;