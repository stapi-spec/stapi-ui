import { React, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './PopupResults.css'
import { useDispatch, useSelector } from 'react-redux'
import PopupResult from '../PopupResult/PopupResult'
import {
  setCurrentPopupResult,
  setcartItems,
  setimageOverlayLoading,
  setselectedPopupResultIndex
} from '../../redux/slices/mainSlice'
import { ChevronRight, ChevronLeft } from '@mui/icons-material'
import {
  isSceneInCart,
  numberOfSelectedInCart,
  areAllScenesSelectedInCart
} from '../../utils/dataHelper'
import { debounceTitilerOverlay } from '../../utils/mapHelper'

const PopupResults = (props) => {
  const dispatch = useDispatch()
  const _searchResults = useSelector((state) => state.mainSlice.searchResults)
  const _appConfig = useSelector((state) => state.mainSlice.appConfig)

  const [viewState, setViewState] = useState('list');
  const [featureDetails, setFeatureDetails] = useState();

  const handleCardClick = (id) => {
    setViewState('details');
    setFeatureDetails(_searchResults.features.find((feature) => feature.properties.product_id === id))
  }

  return (
    <>
      {viewState === 'list' ? <div data-testid="testPopupResults" className="popupResultsContainer">
        {_searchResults ? (
          <div>
            {_searchResults.features.map((feature) => {
              return <div className="opportunity-card" onClick={() => handleCardClick(feature.properties.product_id)}><div>
                <p>ID: <span>{feature.properties.id}</span></p>
                <p>Start time: <span>{feature.properties.start_datetime}</span></p>
                <p>End time: <span>{feature.properties.end_datetime}</span></p>
              </div></div>
            })}
          </div>
        ) : (
          <div className="popupResultsEmpty">
            <span className="popupResultsEmptyPrimaryText">No Data Available</span>
            <span className="popupResultsEmptySecondaryText">
              search and click opportunities on map to view details
            </span>
          </div>
        )}
      </div> : <div className='opportunity-details'>
        <h4>Opportunity Details</h4>
        <p>Product ID: <span>{featureDetails.properties.product_id}</span></p>
        <p>Start time: <span>{featureDetails.properties.start_datetime}</span></p>
        <p>End time: <span>{featureDetails.properties.end_datetime}</span></p>
        <h5>Constraints: </h5>
        {Object.keys(featureDetails.properties.constraints).map((key)=>{
          return <p>{key} - Min:{featureDetails.properties.constraints[key][0]} , Max:{featureDetails.properties.constraints[key][1]} </p>
        })}
      </div>}
    </>

  )
}


export default PopupResults
