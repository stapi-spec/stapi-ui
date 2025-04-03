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

export async function SearchService(searchParams, productData, apiKey) {
  /*
 const opportunities = [{
   id: 'cc4a6b70-d45b-415b-b7ea-0f636fdc9a2d',
   product_id: 'maxar',
   opportunity_request: {
     datetime:
       '2025-04-03T10:28:47.935480+00:00/2025-04-03T10:28:47.935484+00:00',
     geometry: {
       type: 'Point',
       coordinates: [0.0, 0.0]
     },
     filter: null,
     next: null,
     limit: 10
   },
   status: {
     timestamp: '2025-04-03T10:28:47.935549Z',
     status_code: 'completed',
     reason_code: null,
     reason_text: null,
     links: []
   },
   links: [
     {
       href: 'https://apps.euspaceimaging.com/test/internal/tara/api/v1/feasibility/cc4a6b70-d45b-415b-b7ea-0f636fdc9a2d',
       rel: 'feasibility'
     },
     {
       href: 'http://apps.euspaceimaging.com/test/internal/stapi/searches/opportunities/cc4a6b70-d45b-415b-b7ea-0f636fdc9a2d',
       rel: 'self',
       type: 'application/json'
     }
   ]
 }]
   
 console.log(opportunities[0].opportunity_request)
 const featureHack = {
   type: 'FeatureCollection',
   features: []
  }
  for (const [key, value] of Object.entries(opportunities)) {
   featureHack.features.push({
     type: 'Feature',
     properties: { id: value.id },
     geometry: value.opportunity_request.geometry
   })
 } 
    
 
 console.log(featureHack)

  store.dispatch(setSearchResults(featureHack))
  store.dispatch(setmappedScenes(featureHack))
  const options = {
    style: footprintLayerStyle
  }
  store.dispatch(setSearchLoading(false))
  
  addDataToLayer(featureHack, 'searchResultsLayer', options, true)
  // store.dispatch(setClickResults(fakeOpportunities.features))
  store.dispatch(settabSelected('details'))
  store.dispatch(sethasLeftPanelTabChanged(true))

  return
  */

  /// ///////
  console.log('REQUEST', searchParams)
  await fetch(productData.providerBaseUrl + '/products/maxar/opportunities', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
      Authorization: `Bearer ${apiKey}`
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

      const opportunities = [json]
      const featureHack = {
        type: 'FeatureCollection',
        features: []
      }
      for (const [key, value] of Object.entries(opportunities)) {
        featureHack.features.push({
          type: 'Feature',
          properties: { id: value.id },
          geometry: value.opportunity_request.geometry
        })
      }

      console.log(featureHack)

      store.dispatch(setSearchResults(featureHack))
      store.dispatch(setmappedScenes(featureHack))
      const options = {
        style: footprintLayerStyle
      }
      store.dispatch(setSearchLoading(false))

      addDataToLayer(featureHack, 'searchResultsLayer', options, true)
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
