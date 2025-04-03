import { store } from '../redux/store'
import {
  setClickResults,
  setSearchLoading,
  setSearchResults,
  setmappedScenes,
  settabSelected,
  sethasLeftPanelTabChanged
} from '../redux/slices/mainSlice'
import { addDataToLayer, footprintLayerStyle } from '../utils/mapHelper'

export async function SearchService(searchParams, productData) {
  //   const fakeOpportunities = {
  //     "type": "FeatureCollection",
  //     "features": [
  //         {
  //             "type": "Feature",
  //             "geometry": {
  //                 "type": "Point",
  //                 "coordinates": [
  //                     0,
  //                     0
  //                 ]
  //             },
  //             "properties": {
  //                 "start_datetime": "2023-03-01T13:00:00Z",
  //                 "end_datetime": "2023-03-2T15:30:00Z",
  //                 "product_id": "EO",
  //                 "constraints": {
  //                     "gsd": [
  //                         1.0,
  //                         10.0
  //                     ],
  //                     "view:off_nadir": [
  //                         0,
  //                         30
  //                     ],
  //                     "sat_elevation": [
  //                         60,
  //                         90
  //                     ],
  //                     "view:sun_elevation": [
  //                         10,
  //                         90
  //                     ],
  //                     "sat_azimuth": [
  //                         0,
  //                         360
  //                     ],
  //                     "view:sun_azimuth": [
  //                         0,
  //                         360
  //                     ]
  //                 }
  //             }
  //         },
  //         {
  //             "type": "Feature",
  //             "geometry": {
  //                 "type": "Point",
  //                 "coordinates": [
  //                     0,
  //                     0
  //                 ]
  //             },
  //             "properties": {
  //                 "start_datetime": "2023-03-02T13:00:00Z",
  //                 "end_datetime": "2023-03-03T15:30:00Z",
  //                 "product_id": "EO",
  //                 "constraints": {
  //                     "gsd": [
  //                         1.0,
  //                         10.0
  //                     ],
  //                     "view:off_nadir": [
  //                         0,
  //                         30
  //                     ],
  //                     "sat_elevation": [
  //                         60,
  //                         90
  //                     ],
  //                     "view:sun_elevation": [
  //                         10,
  //                         90
  //                     ],
  //                     "sat_azimuth": [
  //                         0,
  //                         360
  //                     ],
  //                     "view:sun_azimuth": [
  //                         0,
  //                         360
  //                     ]
  //                 }
  //             }
  //         }
  //     ],
  //     "links": {
  //         "rel": "next",
  //         "title": "Next page of Opportunities",
  //         "method": "GET",
  //         "type": "application/geo+json",
  //         "href": "stat-api.example.com?page=2"
  //     }
  // };
  console.log('REQUEST', searchParams)
  // TODO: PUT ENDPOINT HERE
  // check for selected product and map endpoint
  await fetch(productData.providerBaseUrl + '/products/maxar/opportunities', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*'
    },
    body: JSON.stringify(searchParams)
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Error()
    })
    .then((json) => {
      console.log('RESPONSE', json)

      const opportunities = json.response()
      store.dispatch(setSearchResults(opportunities))
      // store.dispatch(setmappedScenes(fakeOpportunities.features))
      const options = {
        style: footprintLayerStyle
      }
      store.dispatch(setSearchLoading(false))
      addDataToLayer(opportunities, 'searchResultsLayer', options, true)
      // store.dispatch(setClickResults(fakeOpportunities.features))
      store.dispatch(settabSelected('details'))
      store.dispatch(sethasLeftPanelTabChanged(true))
    })
    .catch((error) => {
      store.dispatch(setSearchLoading(false))
      const message = 'Error Fetching Search Results'
      // log full error for diagnosing client side errors if needed
      console.error(message, error)
    })
}
