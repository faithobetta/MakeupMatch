
import Confetti from 'react-confetti';
import '../CSS-pages/Success.css';

const Success = () => {


  return (
    <div className="payment-success-container">
      <Confetti width={window.innerWidth} height={window.innerHeight} />
      <div className="success-message">
        <h1>Payment Successful!</h1>
        <p>Thank you for your purchase. Your booking is confirmed!</p>
      </div>
    </div>
  );
};

export default Success;
