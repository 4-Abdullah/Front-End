import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();
// const { id } = useParams();
    // const location  = useLocation()
    // const productObj = location.state || {}; 
    const [searchParams]=useSearchParams();
    const user =searchParams.get('username')
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Payment Successful!</h1>
      <p>Thank you for your payment. Your transaction has been completed successfully.</p>
      <button 
        onClick={() => navigate(`/?username=${user}`)} 
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '5px'
        }}
      >
        Go Back to Home
      </button>
    </div>
  );
};

export default Success;