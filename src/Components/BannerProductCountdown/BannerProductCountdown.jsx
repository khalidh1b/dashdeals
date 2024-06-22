import PropTypes from 'prop-types';

const BannerProductCountdown = ({days, hours, minutes, seconds}) => {
    return (
        <div>
            <div className="flex gap-10">
                    <div className="bg-[#F5F8F9] rounded-full p-1 w-[65px] h-[65px]">
                        <span className="pl-4 text-base font-semibold">{hours < 10 ? `0${hours}` : hours}</span>
                        <p className="text-[14px] text-center">Hours</p>
                    </div>
                    <div className="bg-[#F5F8F9] rounded-full p-1 w-[65px] h-[65px]">
                        <span className="pl-4 text-base font-semibold">{days < 10 ? `0${days}` : days}</span>
                        <p className="text-[14px] text-center">Days</p>
                    </div>
                    <div className="bg-[#F5F8F9] rounded-full p-1 w-[65px] h-[65px]">
                        <span className="pl-4 text-base font-semibold">{minutes < 10 ? `0${minutes}` : minutes}</span>
                        <p className="text-[14px]">Munites</p>
                    </div>
                    <div className="bg-[#F5F8F9] rounded-full w-[65px] h-[65px]">
                        <span className="pl-4 text-base font-semibold">{seconds < 10 ? `0${seconds}` : seconds}</span>
                        <p className="text-[14px]">Seconds</p>
                    </div>
                </div>
        </div>
    );
};

BannerProductCountdown.propTypes = {
    days: PropTypes.number.isRequired,
    hours: PropTypes.number.isRequired,
    minutes: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired,
};

export default BannerProductCountdown;