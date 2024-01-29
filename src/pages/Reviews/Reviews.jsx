import React from 'react'
import './Review.css'
import PageDetail from '../../components/PageAlert/PageDetail'

function Reviews() {
    const review = 'Reviews'
  return (
     <div className="home-container">
          <PageDetail page={ review} />
       
<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-content">
      <div class="timeline-date">2023-01-01</div>
      <div class="timeline-heading">Event 1</div>
      <div class="timeline-description">
        Description for Event 1.
      </div>
    </div>
  </div>
  
  <div class="timeline-item">
    <div class="timeline-content">
      <div class="timeline-date">2023-02-15</div>
      <div class="timeline-heading">Event 2</div>
      <div class="timeline-description">
        Description for Event 2.
      </div>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-content">
      <div class="timeline-date">2023-02-15</div>
      <div class="timeline-heading">Event 2</div>
      <div class="timeline-description">
        Description for Event 2.
      </div>
    </div>
  </div>

</div>
      
    </div>
  )
}

export default Reviews
