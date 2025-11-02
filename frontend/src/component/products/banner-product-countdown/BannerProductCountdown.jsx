import PropTypes from 'prop-types';

const BannerProductCountdown = ({days, hours, minutes, seconds}) => {
    return (
            <div className="md:flex flex gap-10">
                <TimerUnit value={hours} label="Hours"/>
                <TimerUnit value={days} label="Days"/>
                <TimerUnit value={minutes} label="Minutes"/>
                <TimerUnit value={seconds} label="Seconds"/>
            </div>
    );
};

export default BannerProductCountdown;

const TimerUnit = ({ value, label }) => {
    const formattedValue = value < 10 ? `0${value}` : value;

    return (
        <div className="bg-[#F5F8F9] dark:bg-slate-500 rounded-full p-1 w-[65px] h-[65px]">
            <span className="pl-4 text-base font-semibold">{formattedValue}</span>
            <p className="text-[14px] text-center">{label}</p>
        </div>
    )
};

BannerProductCountdown.propTypes = {
    days: PropTypes.number.isRequired,
    hours: PropTypes.number.isRequired,
    minutes: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired,
};

TimerUnit.propTypes = {
    value: PropTypes.number,
    label: PropTypes.string
};