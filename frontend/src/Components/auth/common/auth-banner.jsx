import './style.css';
import { Image } from '@/components/common/image/image';
import PropTypes from 'prop-types';

export const AuthBanner = ({ altText }) => {
    return (
        <> 
            <div className='auth-banner-img'>
                <Image 
                    src="https://res.cloudinary.com/dksiicemx/image/upload/v1729422686/authentication-banner_i6gqed.png" 
                    alt={altText} 
                    width={600}
                    height={800}
                />
            </div>
        </>
    )
};

AuthBanner.propTypes = {
    altText: PropTypes.string.isRequired
};