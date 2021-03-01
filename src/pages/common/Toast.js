import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

export default function Toast(props) {
    const toastId = React.useRef(null);

    useEffect(() => {
        if (!toast.isActive(toastId.current)) {
            toastId.current = toast.error(props.errors.message, {
                toastId: props.errors.code
            });
        }
    }, [props.errors])

    return (
        <div>
            <ToastContainer 
                position="bottom-center"
                autoClose={3000}
                closeOnClick
                pauseOnHover
                draggable
            />
        </div>
    );
}