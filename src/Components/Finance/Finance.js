import React, {useState, useEffect} from 'react';
import axios from "axios";
import { useHireContext } from '../../App.js';

const Finance = () => {
  const [transactions, setTransactions] = useState([]);
  const {email} = useHireContext();

  useEffect(() => {
    const data = {
        email: email
    }
    axios.post("http://localhost:8000/getTransactions", data).then((res) => {   
      if (res) {
        setTransactions(res.data.transactions);
      } 
    });
  }, []);

  return (
    <div className="container history-container mt-5" >
      <div className="dashboard-header">
        <h3 style={{ color: 'rgb(102 99 99)' }}>Transactions</h3>
      </div>
      <div className="table-responsive mt-4">
        <table className="table">
          <thead className="fw-bold" style={{ backgroundColor: '#141414' }}>
            <tr>
              <th style={{ border: 'none' }} scope="col">#</th>
              <th style={{ border: 'none' }} scope="col">Date</th>
              <th style={{ border: 'none' }} scope="col">Type</th>
              <th style={{ border: 'none' }} scope="col">Balance Before</th>
              <th style={{ border: 'none' }} scope="col">Balance After</th>
              <th style={{ border: 'none' }} scope="col">Total Amount</th>
              <th style={{ border: 'none' }} scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={transaction._id}>
                <td style={{ border: 'none', textAlign: 'center' }}>{index + 1}</td>
                <td style={{ border: 'none', textAlign: 'center' }}>{transaction.date}</td>
                <td style={{ border: 'none', textAlign: 'center' }}>{transaction.type}</td>
                <td style={{ border: 'none', textAlign: 'center' }}>{transaction.balanceBefore}</td>
                <td style={{ border: 'none', textAlign: 'center' }}>{transaction.balanceAfter}</td>
                <td style={{ border: 'none', textAlign: 'center' }}>${transaction.totalAmount}</td>
                <td style={{ border: 'none', textAlign: 'center' }}>
                    {transaction.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Finance;
