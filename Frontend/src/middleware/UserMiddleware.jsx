import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { verifyUser } from '../redux/slices/userSlice'

const UserMiddleware = ({children}) => {
    const token = localStorage.getItem('token')
    const dispatch = useDispatch();

    const navigate = useNavigate();
    

    useEffect(() => {
        const checkUser = async () => {
            if (!token) {
                navigate('/login');
                return; // exit early
            }

            try {
                const resultAction = await dispatch(verifyUser(token));
                if (verifyUser.fulfilled.match(resultAction)) {
                    navigate('/');
                } else {
                    // token invalid
                    localStorage.removeItem('token');
                    navigate('/login');
                }   

            } catch (error) {
                console.error(error);
                navigate('/login');
            }
        };

        checkUser();
    }, [token]);

  return children
}

export default UserMiddleware