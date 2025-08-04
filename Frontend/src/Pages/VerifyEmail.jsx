import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
const baseUrl = import.meta.env.VITE_BASE_URL;

function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await axios.get(`${baseUrl}/api/auth/verify-email/${token}`);
        toast.success('Email verified successfully! Please login.');
        setTimeout(() => navigate('/login'), 2000);
      } catch (error) {
        toast.error(error.response?.data?.error || 'Verification failed');
        setTimeout(() => navigate('/register'), 2000);
      } finally {
        setVerifying(false);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="container my-5 text-center">
      {verifying ? (
        <div>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Verifying your email...</p>
        </div>
      ) : (
        <p>Redirecting...</p>
      )}
    </div>
  );
}

export default VerifyEmail;