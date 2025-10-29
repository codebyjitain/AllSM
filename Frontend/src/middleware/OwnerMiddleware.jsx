import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const OwnerMiddleware = ({children}) => {
    const ownerToken = localStorage.getItem('ownertoken')
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!ownerToken) {
            navigate('/ownerlogin');
        }
    }, [ownerToken]);

  return children
}

export default OwnerMiddleware