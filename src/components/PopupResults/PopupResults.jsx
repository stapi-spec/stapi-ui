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
import { Typography } from '@mui/material'
import { Box } from '@mui/system'

const PopupResults = (props) => {
  const dispatch = useDispatch()
  const _searchResults = useSelector((state) => state.mainSlice.searchResults)
  const _appConfig = useSelector((state) => state.mainSlice.appConfig)

  const [viewState, setViewState] = useState('list')
  const [featureDetails, setFeatureDetails] = useState()

  const handleCardClick = async (link) => {
    console.log(link)
    await fetch(link.href, {
      method: link.method,
      headers: {
        'Content-Type': link.type,
        Accept: '*/*'
      },
      body: JSON.stringify(link.body)
    })
  }
  console.log(_searchResults)

  return (
    <>
      {viewState === 'list' ? (
        <div data-testid="testPopupResults" className="popupResultsContainer">
          {_searchResults ? (
            <div>
              {_searchResults.features.map((feature, inx) => {
                return (
                  <div
                    className="opportunity-card"
                    onClick={() => handleCardClick(feature.links[0])}
                    key={inx}
                  >
                    <Box display="flex" flexDirection="column">
                      <Typography variant="caption">
                        ID: {feature.id}
                      </Typography>

                      {Object.keys(feature.properties).map((key) => {
                        if (key === 'datetime') {
                          const dateArray = feature.properties[key].split('/')
                          return (
                            <>
                              <Typography variant="caption">
                                Start: {dateArray[0]}
                              </Typography>

                              <Typography variant="caption">
                                End: {dateArray[1]}
                              </Typography>
                            </>
                          )
                        }
                        return (
                          <Typography variant="caption" key={key}>
                            {key}: {feature.properties[key]}
                          </Typography>
                        )
                      })}
                    </Box>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="popupResultsEmpty">
              <span className="popupResultsEmptyPrimaryText">
                No Data Available
              </span>
              <span className="popupResultsEmptySecondaryText">
                search and click opportunities on map to view details
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="opportunity-details">
          <h4>Opportunity Details</h4>
          <p>
            Product ID: <span>{featureDetails.properties.product_id}</span>
          </p>
          <p>
            Start time: <span>{featureDetails.properties.start_datetime}</span>
          </p>
          <p>
            End time: <span>{featureDetails.properties.end_datetime}</span>
          </p>
          <h5>Constraints: </h5>
          {Object.keys(featureDetails.properties.constraints).map((key) => {
            return (
              <p>
                {key} - Min:{featureDetails.properties.constraints[key][0]} ,
                Max:{featureDetails.properties.constraints[key][1]}{' '}
              </p>
            )
          })}
        </div>
      )}
    </>
  )
}

export default PopupResults
