import React, {useState, useEffect} from 'react';
import axios from "axios";

const VirtualAssistants = () => {
  const [virtualAssistants, setVirtualAssistants] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:8000/getAllVas").then((res) => {   
      if (res) {
        setVirtualAssistants(res.data.vas);
        console.log(res.data);
      } 
    });
  }, []);

  return (
    <div className="container mt-5">
      <h3 style={{ color: 'rgb(102 99 99)' }}>Virtual Assistants</h3>
      <div className="table-responsive mt-4">
        <table className="table table-striped">
          <thead style={{ backgroundColor: '#141414' }}>
            <tr>
              <th style={{ border: 'none' }}>#</th>
              <th style={{ border: 'none' }}>Name</th>
              <th style={{ border: 'none' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {virtualAssistants.map((assistant, index) => (
              <tr key={assistant.id}>
                <td style={{ border: 'none', textAlign: 'center' }}>{index + 1}</td>
                <td style={{ border: 'none', textAlign: 'center' }}>{assistant.name}</td>
                <td style={{ border: 'none', textAlign: 'center' }}>
                  {assistant.available === true ? (
                    <button className="btn btn-success" style={{width: '90px'}}>Active</button>
                  ) : (
                    <button className="btn btn-secondary" disabled style={{width: '90px'}}>Inactive</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VirtualAssistants;
