import PropTypes from 'prop-types';

const SaleCountDown = ({ days, hours, minutes, seconds }) => {
    
    const timeUnits = [
        { label: 'Days', value: days },
        { label: 'Hours', value: hours },
        { label: 'Munites', value: minutes },
        { label: 'Seconds', value: seconds },
    ];
    
    return (
        <div className="flex items-center gap-4 md:gap-20">
            <h2 className="md:text-[36px] text-3xl font-semibold">Flash Sales</h2>
            <div className="flex md:gap-6 gap-1">
                {timeUnits.map((unit, index) => (
                    <div key={unit.label} className='flex items-center gap-1'>
                        <TimeUnit label={unit.label} value={unit.value}/>
                        {index !== timeUnits.length - 1 && (
                            <div className='text-4xl text-[#DB4444] pt-4'>:</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SaleCountDown;

const TimeUnit = ({ label, value }) => {
    return (
        <div className="text-center">
            <p className="text-[12px] font-medium text-[#000] dark:text-white">{label}</p>
            <span className="text-[32px] font-bold text-[#000] dark:text-white">
                {value < 10 ? `0${value}` : value}
            </span>
        </div>
    )
};

SaleCountDown.propTypes = {
    days: PropTypes.number.isRequired,
    hours: PropTypes.number.isRequired,
    minutes: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired,
};

TimeUnit.propTypes = {
    label: PropTypes.string,
    value: PropTypes.number
};