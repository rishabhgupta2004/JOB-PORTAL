import React from 'react';
import { RadioGroup } from './ui/radio-group';

const filterData = [
  {
    filterType: "Location",
    array: [
      "Delhi", "Kanpur", "Mumbai", "Gurgaon", "Noida", "Bangalore", "Hyderabad", 
      "Chennai", "Pune", "Kolkata", "Ahmedabad", "Jaipur", "Lucknow", "Patna"]
      
  },
  {
    filterType: "Industry",
    array: ["IT", "Finance", "Manufacturing", "Construction", "Education", "Healthcare", "Retail", "Transport"]
  },
  {
    filterType: "Salary",
    array: ["Less than 5 Lacs", "5-10 Lacs", "10-20 Lacs"]
  }
];

const FilterCard = () => {
  return (
    <div className='w-full bg-white p-4 rounded-lg shadow-md'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3' />
      {filterData.map((data, index) => (
        <div key={index} className='mt-4'>
          <h2 className='font-bold text-lg'>{data.filterType}</h2>
          <RadioGroup>
            {data.array.map((item, i) => (
              <div key={i} className='flex items-center space-x-2 my-2'>
                <input type="radio" id={item} name={data.filterType} value={item} />
                <label htmlFor={item}>{item}</label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
