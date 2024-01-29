import React from 'react'

function Display({data}) {
    return (
      <>
        {data.map((item) => (
          <div key={item._id} className="data-item">
            <img src={item.image} alt="Product" />
            <h3>{item.selectedCategory}</h3>
            <p>{item.selectedFitPosition}</p>
            <p>{item.description}</p>
          </div>
        ))}
      </>
    )
}

export default Display
