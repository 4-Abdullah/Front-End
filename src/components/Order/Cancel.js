import React from 'react';
import { useNavigate, useSearchParams, useParams  } from 'react-router-dom';

const Cancel = () => {
  const navigate = useNavigate();
    const { id } = useParams();
    // const location  = useLocation()
    // const productObj = location.state || {}; 
    const [searchParams]=useSearchParams();
    const user =searchParams.get('username')
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Payment Cancelled</h1>
      <p>It seems like you cancelled the payment process. Feel free to try again.</p>
      <button 
        onClick={() => navigate(`/order/${id}?username=${user}`)} 
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '5px'
        }}
      >
        Go Back to Checkout
      </button>
    </div>
  );
};

export default Cancel;