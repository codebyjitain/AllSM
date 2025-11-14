import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { verifyOwner } from '../redux/slices/ownerSlice';

const OwnerMiddleware = ({children}) => {
    const ownerToken = localStorage.getItem('ownertoken')
    const dispatch = useDispatch();

    const navigate = useNavigate();
    

    useEffect(() => {
        const checkOwner = async () => {
            if (!ownerToken) {
                navigate('/login');
                return; // exit early
            }

            try {
                const resultAction = await dispatch(verifyOwner(ownerToken));
                if (verifyOwner.fulfilled.match(resultAction)) {
                    navigate('/owner');
                } else {
                    // token invalid
                    localStorage.removeItem('ownertoken');
                    navigate('/login');
                }   

            } catch (error) {
                console.error(error);
                navigate('/login');
            }
        };

        checkOwner();
    }, [ownerToken]);

  return children
}

export default OwnerMiddleware