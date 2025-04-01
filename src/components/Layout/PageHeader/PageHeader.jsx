import React from 'react'
import './PageHeader.css'
import DrawTools from '../../DrawTools/DrawTools'
import Logo from '../../../assets/taskingSprintLogo.svg'
import DateTimeRangeSelector from '../../DateTimeRangeSelector/DateTimeRangeSelector'

const PageHeader = () => {

  

  return (
    <div className="PageHeader" data-testid="testPageHeader">
      <div className="pageHeaderLeft">

        <img
          src={
            Logo
          }
          alt="FilmDrop default app logo"
          className="headerLogoImage"
        />

        <h3>Portugal Tasking Sprint 2025</h3>

      </div>
      <div className="pageHeaderRight">
        <DateTimeRangeSelector />
        <DrawTools />
       
      </div>
    </div>
  )
}

export default PageHeader
