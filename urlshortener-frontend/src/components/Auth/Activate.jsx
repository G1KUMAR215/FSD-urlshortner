import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Activate = () => {
    const { token } = useParams();

    useEffect(() => {
        const activateAccount = async () => {
            try {
                const res = await axios.get(`/api/auth/activate/${token}`);
                alert(res.data.message);
            } catch (error) {
                console.error(error.response.data);
            }
        };
        activateAccount();
    }, [token]);

    return <div>Activating account...</div>;
};

export default Activate;
