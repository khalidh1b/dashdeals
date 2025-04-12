import Swal from 'sweetalert2';
import useAxiosSecure from './useAxiosSecure';

const useUserFeedback = () => {
    const axiosSecure = useAxiosSecure();

    const handleUserFeedback = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const message = form.message.value;
        const data = {name, email, phone, message};
        console.log('clicking', data);

        axiosSecure.post('/userFeedback', data)
        .then((res) => {
            console.log(res);
            if(res.data.insertedId) {
                form.reset();
                Swal.fire({
                    icon: "success",
                    title: "Thanks for sharing your thoughts",
                    showConfirmButton: false,
                    timer: 2500
                });
            }
        })
        .catch((error) => {
            console.log(error);
        })
    };

    return { handleUserFeedback };
};

export default useUserFeedback;