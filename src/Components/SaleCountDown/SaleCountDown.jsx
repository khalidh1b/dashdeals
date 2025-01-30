import PropTypes from 'prop-types';

const SaleCountDown = ({ days, hours, minutes, seconds }) => {
    return (
        <div className="flex items-center gap-4 md:gap-20">
            <h2 className="md:text-[36px] text-3xl font-semibold">Flash Sales</h2>
            <div className="flex md:gap-6 gap-1">
                <div>
                    <p className="text-[12px] font-medium text-[#000] dark:text-white">Days</p>
                    <span className="text-[32px] font-bold text-[#000] dark:text-white">{days < 10 ? `0${days}` : days}</span>
                </div>
                <div className="text-4xl text-[#DB4444] pt-4">:</div>
                <div>
                    <p className="text-[12px] font-medium text-[#000] dark:text-white">Hours</p>
                    <span className="text-[32px] font-bold text-[#000] dark:text-white">{hours < 10 ? `0${hours}` : hours}</span>
                </div>
                <div className="text-4xl text-[#DB4444] pt-4">:</div>
                <div>
                    <p className="text-[12px] font-medium text-[#000] dark:text-white">Minutes</p>
                    <span className="text-[32px] font-bold text-[#000] dark:text-white">{minutes < 10 ? `0${minutes}` : minutes}</span>
                </div>
                <div className="text-4xl text-[#DB4444] pt-4">:</div>
                <div>
                    <p className="text-[12px] font-medium text-[#000] dark:text-white">Seconds</p>
                    <span className="text-[32px] font-bold text-[#000] dark:text-white">{seconds < 10 ? `0${seconds}` : seconds}</span>
                </div>
            </div>
        </div>
    );
};

SaleCountDown.propTypes = {
    days: PropTypes.number.isRequired,
    hours: PropTypes.number.isRequired,
    minutes: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired,
};

export default SaleCountDown;