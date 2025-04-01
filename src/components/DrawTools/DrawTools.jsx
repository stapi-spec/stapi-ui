import { React,  useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Button from '@mui/material/Button'
import { useSelector, useDispatch } from 'react-redux'
import 'react-tooltip/dist/react-tooltip.css'
import {
  setautoCenterOnItemChanged,
  setisDrawingEnabled,
  setsearchGeojsonBoundary,
  setshowSearchByGeom
} from '../../redux/slices/mainSlice'
import {
  clearLayer,
  enableMapPolyDrawing,
  enableMapPointDrawing
} from '../../utils/mapHelper'

const DrawTools = () => {
  const dispatch = useDispatch()

  const _showSearchByGeom = useSelector(
    (state) => state.mainSlice.showSearchByGeom
  )

  const _searchGeojsonBoundary = useSelector(
    (state) => state.mainSlice.searchGeojsonBoundary
  )

  const _autoCenterOnItemChanged = useSelector(
    (state) => state.mainSlice.autoCenterOnItemChanged
  )

  function onDrawBoundaryClicked() {
    if (_searchGeojsonBoundary) {
      return
    }
    dispatch(setshowSearchByGeom(!_showSearchByGeom))
    dispatch(setisDrawingEnabled('area'))
    enableMapPolyDrawing()
  }

  function onPointClicked() {
    if (_searchGeojsonBoundary) {
      return
    }
    dispatch(setshowSearchByGeom(!_showSearchByGeom))
    dispatch(setisDrawingEnabled('point'))
    enableMapPointDrawing()
  }

  function onClearButtonClicked() {
    if (!_searchGeojsonBoundary) {
      return
    }
    dispatch(setsearchGeojsonBoundary(null))
    dispatch(setshowSearchByGeom(false))
    clearLayer('drawBoundsLayer')
  }

  function updateAutoCenterState() {
    dispatch(setautoCenterOnItemChanged(!_autoCenterOnItemChanged))
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: '#DEDEDE'
      },
      secondary: {
        main: '#4f5768'
      },
      textLabel: '#A9B0C1'
    }
  })

  const _selectedProductData = useSelector(
    (state) => state.mainSlice.selectedProductData
  )

  useEffect(() => {
    // clear drawing when switching products
    onClearButtonClicked()

  }, [_selectedProductData])

  const allowsPoint =
    _selectedProductData &&
    _selectedProductData.conformsTo &&
    _selectedProductData.conformsTo.some((str) => str.includes('Point'))
  const allowsPolygon =
    _selectedProductData &&
    _selectedProductData.conformsTo &&
    _selectedProductData.conformsTo.some((str) => str.includes('Polygon'))

  return (
    <ThemeProvider theme={theme}>
      <div className="searchContainer searchBoundary">
        <Typography variant="body2" color="textLabel">
          Collection Type{' '}
        </Typography>

        <Box className="searchFilterContainer">
          <div
            style={{
              display: 'grid',
              gridAutoFlow: 'column',
              gridColumnGap: '10px'
            }}
          >
            <Button
              color="primary"
              variant="contained"
              onClick={onDrawBoundaryClicked}
              disabled={!allowsPolygon}
              size="small"
            >
              Area
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={onPointClicked}
              disabled={!allowsPoint}
              size="small"
            >
              Point
            </Button>
            <Button
              color="primary"
              variant="outline"
              onClick={onClearButtonClicked}
              size="small"
            >
              Clear
            </Button>
          </div>
        </Box>
      </div>
    </ThemeProvider>
  )
}

export default DrawTools
