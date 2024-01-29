import React from 'react'
import './PageDetail.css'

function PageDetail({page}) {
  return (
    <div className='page-detail-container'>
          Dashboard { `> ${page}`}
    </div>
  )
}

export default PageDetail
