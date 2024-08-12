import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useAuthAndUserData = () => {
    const [name, setName] = useState('');
    const [data, setData] = useState({});
    const [render, setRender] = useState(false); // <-- This state variable triggers re-render

    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthAndFetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                localStorage.clear();
                navigate('/');
                return;
            }

            try {
                setName(token);
                const response = await axios.get('http://127.0.0.1:5000/protected', {
                    headers: { Authorization: `bearer ${token}` }
                });
                setData(response.data);
            } catch (error) {
                console.log('Error fetching user data:', error);
            }
        };

        checkAuthAndFetchUserData();
    }, [render, navigate]);

    const logout = () => {
        localStorage.clear();
        setName('');
        navigate('/');
    };

    const uploadFile = async (file) => {
        try {
            const formData = new FormData();
            formData.append('ProfilePic', file);
            formData.append('object', name);

            await axios.post(`http://127.0.0.1:5000/log/pic?name=${name}`, formData, {
                headers: { Authorization: `bearer ${localStorage.getItem('token')}` }
            });
            setRender(prevRender => !prevRender); // <-- Update render state to trigger re-render
        } catch (error) {
            console.log('Error uploading file:', error);
        }
    };

    return { name, data, render, logout, uploadFile }; // <-- Include render state in return value
};

export default useAuthAndUserData;
