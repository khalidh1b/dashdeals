import PropTypes from 'prop-types';

const SaleCountDown = ({ days, hours, minutes, seconds }) => {
    return (
        <div className="flex items-center gap-20">
            <h2 className="text-[36px] font-semibold">Flash Sales</h2>
            <div className="flex gap-6">
                <div>
                    <p className="text-[12px] font-medium text-[#000]">Days</p>
                    <span className="text-[32px] font-bold text-[#000]">{days < 10 ? `0${days}` : days}</span>
                </div>
                <div className="text-4xl text-[#DB4444] pt-4">:</div>
                <div>
                    <p className="text-[12px] font-medium text-[#000]">Hours</p>
                    <span className="text-[32px] font-bold text-[#000]">{hours < 10 ? `0${hours}` : hours}</span>
                </div>
                <div className="text-4xl text-[#DB4444] pt-4">:</div>
                <div>
                    <p className="text-[12px] font-medium text-[#000]">Minutes</p>
                    <span className="text-[32px] font-bold text-[#000]">{minutes < 10 ? `0${minutes}` : minutes}</span>
                </div>
                <div className="text-4xl text-[#DB4444] pt-4">:</div>
                <div>
                    <p className="text-[12px] font-medium text-[#000]">Seconds</p>
                    <span className="text-[32px] font-bold text-[#000]">{seconds < 10 ? `0${seconds}` : seconds}</span>
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