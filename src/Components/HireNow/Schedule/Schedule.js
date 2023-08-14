import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Schedule.css';

const SchedulePage = ({ onNext, onBack }) => {
    const [workingHours, setWorkingHours] = useState(new Map());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOrientationRequired, setIsOrientationRequired] = useState(false);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return day + '/' + month + '/' + year;
  };

  const handleHourClick = (event, day) => {
    const updatedWorkingHours = new Map(workingHours);
    let currentDate = addDaysToDate(selectedDate,day);
    currentDate = formatDate(currentDate);
    let hour = Number(event.currentTarget.closest('tr').id);
    if (updatedWorkingHours.has(currentDate)) {
      const hours = updatedWorkingHours.get(currentDate);
      if (!hours.includes(hour)) {
        hours.push(hour);
      } else {
        const index = hours.indexOf(hour);
        if (index > -1) {
          hours.splice(index, 1);
        }
      }
    } else {
      updatedWorkingHours.set(currentDate, [hour]);
    }
    setWorkingHours(updatedWorkingHours);
  };

  const addDaysToDate = (date, days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  };

  const renderHourCells = (date, index) => {
    let selectedHours;
    const days = Array.from({ length: 7 }, (_, index) => index);

    return days.map((day) => {
      selectedHours = workingHours.get(formatDate(addDaysToDate(date,day))) || [];
      const isSelected = selectedHours.includes(index);
      const newDate = addDaysToDate(date, day);
      const uniqueKey = `${newDate.toISOString()}-${index}`;
      return (
        <td
          key={uniqueKey}
          id={day}
          className={`hour-cell ${isSelected ? 'selected' : ''}`}
          onClick={(event) => handleHourClick(event, day)}
        >
          {isSelected && <div className="selected-mark"></div>}
        </td>
      );
    });
  };

  const renderDateHeaders = () => {
    const dates = Array.from({ length: 7 }, (_, index) => {
      const newDate = new Date(selectedDate);
      newDate.setDate(selectedDate.getDate() + index);
      return newDate;
    });

    return dates.map((date) => (
      <th key={date.toISOString()}>{date.toDateString()}</th>
    ));
  };


  const handleOrientationChange = (e) => {
    setIsOrientationRequired(e.target.value === 'yes');
    setSelectedTimeFrame('');
  };

  const handleTimeFrameChange = (e) => {
    setSelectedTimeFrame(e.target.value);
  };

  return (
    <div className="cstm-container mt-5">
      <h2 className='cstm-h2'>Schedule</h2>
      <form>
      <div className="cstm-form-group">
          <label>Select Date:</label>
          <DatePicker selected={selectedDate} onChange={handleDateChange} />
        </div>
        <div className="cstm-form-group">
          <label>Working Hours:</label>
          <div className="table-responsive">
            <table className="cstm-table">
              <thead>
                <tr>
                  <th>Hours</th>
                  {renderDateHeaders()}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 24 }, (_, index) => (
                  <tr id={index} key={index}>
                    <td>{index}:00</td>
                    {renderHourCells(selectedDate, index)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="cstm-form-group">
          <label>Is orientation required?</label>
          <div>
            <label style={{marginRight: '20px'}}>
              <input
                type="radio"
                name="orientation"
                value="yes"
                checked={isOrientationRequired}
                onChange={handleOrientationChange}
              />{' '}
              YES
            </label>
            <label>
              <input
                type="radio"
                name="orientation"
                value="no"
                checked={!isOrientationRequired}
                onChange={handleOrientationChange}
              />{' '}
              NO
            </label>
          </div>
        </div>
        {isOrientationRequired && (
          <div className="cstm-form-group">
            <label>Select Time Frame:</label>
            <div>
              <label style={{marginRight: '20px'}}>
                <input
                  type="radio"
                  name="timeFrame"
                  value="30 minutes"
                  checked={selectedTimeFrame === '30 minutes'}
                  onChange={handleTimeFrameChange}
                />{' '}
                30 minutes
              </label>
              <label style={{marginRight: '20px'}}>
                <input
                  type="radio"
                  name="timeFrame"
                  value="1 hour"
                  checked={selectedTimeFrame === '1 hour'}
                  onChange={handleTimeFrameChange}
                />{' '}
                1 hour
              </label>
              <label>
                <input
                  type="radio"
                  name="timeFrame"
                  value="2 hours"
                  checked={selectedTimeFrame === '2 hours'}
                  onChange={handleTimeFrameChange}
                />{' '}
                2 hours
              </label>
            </div>
          </div>
        )}
        <div className="d-flex justify-content-between mt-6">
          <button className="btn btn-secondary" onClick={onBack}>
            Back
          </button>
          <button className="btn btn-primary" onClick={onNext}>
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default SchedulePage;
