import { Link } from 'react-router-dom';
import './Home.css'; 


function Home() {
  return (
    <div className="Home">
      <div className="Home__header">
        <h1 className="Home__title" >Welcome to TradeCode</h1>
        <p className="Home__subtitle">
          Your Trusted Solution for Product Authentication
        </p>
      </div>
      <div className="Home__description">
        <p>
          Companies can now easily register and obtain a customized smart
          contract, which acts as a secure registry for all of your products.
          Our blockchain-based technology ensures the authenticity of your
          products, providing peace of mind to both you and your customers.
        </p>
        <p className="Home__warning">
          <strong>Note:</strong> Only contract owners can add products to their
          contract.
        </p>
      </div>
      <div className="Home__instructions">
        <h2>Get Started</h2>
        <ul>
          <li>
            <Link className="Home__link" to="createcontract">
              Register Organization
            </Link>
          </li>
          <li>
            <Link className="Home__link" to="getcontract">
              Mint Tokens
            </Link>
          </li>
          <li>
            <Link className="Home__link" to="addproduct">
              Add Products
            </Link>
          </li>
          <li>
            <Link className="Home__link" to="verify">
              Verify Product Authenticity
            </Link>
          </li>
        </ul>
      </div>
      <footer className="Home__footer">
        <p>&copy; 2023 TradeCode. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
