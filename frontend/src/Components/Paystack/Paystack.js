import React, { useState, useEffect } from "react"
import { PaystackButton } from "react-paystack"
import axios from "axios";
import { toast } from 'react-toastify';
import { useHireContext } from '../../App.js';

const Paystack = (params) => {
  const [amountInNGN, setAmountInNGN] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(1);
  const { balance, email, setBalance } = useHireContext();
  const [pKey, setPkey] = useState('pk_test_0be4d6378df1b00099a0ca8bb24ab1443ee17da9');
  const [loading, setLoading] = useState(false);

  const handleUpdateBalance = (reference) => {
    const newBalance = Number(balance) + Number(params.amount);
    const data = {
      user: email,
      balance: newBalance
    };
    axios.post("http://localhost:8000/addBalance", data).then((res) => {
      if (res) {
        setBalance(data.balance);
        toast.success('Balance added successfully');
      }
    });
  }

  const handleDummyButtonClick = async (e) => {
    setLoading(true);
    const data = {
      currency: "USDTNGN",
    };

    try {
      const response = await axios.post("https://ozchest.com/getCryptoRate", data);

      if (response.data && response.data.cur) {
        let erate = 1 / response.data.cur;
        let amount2 = (Number(params.amount) / erate) * 100;
        setExchangeRate(erate);
        setAmountInNGN(Number(amount2));

        setTimeout(() => {
          setLoading(false);
          const paystackButtonDiv = document.getElementById("paystackButton");
          const paystackButton = paystackButtonDiv?.querySelector('button');
          if (paystackButton) {
            paystackButton.click();
          }
        }, 2000);
      }
    } catch (error) {
      console.error('Error fetching exchange rate:', error.message);
    }
  };

  return (
    <>
    {loading ? (
      <div className="spinner-border" role="status">
      </div>
    ) : (
    <div className="refill-div">
      <button className='btn btn-primary' onClick={(e)=>handleDummyButtonClick(e)}>Top Up</button>
    </div>
    )}
      <div id="paystackButton" style={{display: 'none'}}>
        <PaystackButton
          reference={(new Date()).getTime().toString()}
          email={email}
          amount={amountInNGN}
          publicKey={pKey}
          text="Refill"
          onSuccess={(reference) => {
            handleUpdateBalance(reference);
          }}
          onClose={() => {
            console.log('exittt');
          }}
        />
      </div>
    </>
  )
}

export default Paystack;