import { React, useEffect } from 'react'
import './Search.css'
import { useDispatch, useSelector } from 'react-redux'
import {
  setshowSearchByGeom,
  setisDrawingEnabled,
  setsearchGeojsonBoundary,
  setshowUploadGeojsonModal,
  setautoCenterOnItemChanged
} from '../../redux/slices/mainSlice'
import 'react-tooltip/dist/react-tooltip.css'
import DateTimeRangeSelector from '../DateTimeRangeSelector/DateTimeRangeSelector'
import CloudSlider from '../CloudSlider/CloudSlider'
import CollectionDropdown from '../CollectionDropdown/CollectionDropdown'
import ViewSelector from '../ViewSelector/ViewSelector'
import { newSearch } from '../../utils/searchHelper'
import { enableMapPolyDrawing, clearLayer } from '../../utils/mapHelper'
import { Box, Switch } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Filter from '../Filter/Filter'
import DrawTools from '../DrawTools/DrawTools'
import ProductDropdown from '../ProductDropdown/ProductsDropdown'

const Search = () => {
  const theme = createTheme({
    components: {
      MuiSwitch: {
        styleOverrides: {
          switchBase: {
            color: '#fff'
          },
          colorPrimary: {
            '&.Mui-checked': {
              color: '#fff'
            }
          },
          track: {
            backgroundColor: '#dedede',
            '.Mui-checked.Mui-checked + &': {
              backgroundColor: '#6cc24a'
            }
          }
        }
      }
    }
  })

  return (
    <div className="Search" data-testid="Search">
      <div className="searchFilters">
        <div className={`searchContainer collectionDropdown`}>
          <ProductDropdown />
        </div>
        <Filter />
      </div>
    </div>
  )
}

export default Search
