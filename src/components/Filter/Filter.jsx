import React from 'react';
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack
} from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import 'react-tooltip/dist/react-tooltip.css'
import { setSelectedProductFilters } from '../../redux/slices/mainSlice'
import { store } from '../../redux/store'
import { newSearch } from '../../utils/searchHelper'
import './Filter.css'

const Filter = () => {
  const dispatch = useDispatch()
  const _selectedCollectionData = useSelector(
    (state) => state.mainSlice.selectedCollectionData
  )

  // State that should contain the selected filters
  const _selectedProductFilters = useSelector(
    (state) => state.mainSlice.selectedProductFilters
  )
  const _selectedProductData = useSelector(
    (state) => state.mainSlice.selectedProductData
  )

  const _viewMode = useSelector((state) => state.mainSlice.viewMode)
  const _searchGeojsonBoundary = useSelector(
    (state) => state.mainSlice.searchGeojsonBoundary
  )
  const _appConfig = useSelector((state) => state.mainSlice.appConfig)
  const mosaicTilerURL = _appConfig.MOSAIC_TILER_URL || ''

  const theme = createTheme({
    components: {
      MuiFormControlLabel: {
        styleOverrides: {
          label: {
            color: '#fff'
          },
          root: {
            color: '#fff'
          }
        }
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            color: '#fff'
          }
        }
      },

      MuiSelect: {
        styleOverrides: {
          root: {
            color: '#fff'
          }
        }
      },

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

  const filterContainer = []
  if (_selectedProductData?.parameters?.properties) {
    for (const constraintName of Object.keys(
      _selectedProductData.parameters.properties
    )) {
      const constraint =
        _selectedProductData.parameters.properties[constraintName]
      if (constraint.type === 'number') {
        filterContainer.push(
          <FormControl key={constraintName} sx={{ marginTop: 4 }}>
            <InputLabel
              htmlFor={constraintName}
              sx={{ color: '#FFF', paddingTop: 2 }}
            >
              {constraint.title}
            </InputLabel>
            <Slider
              id={constraintName}
              name={constraintName}
              valueLabelDisplay="on"
              min={constraint.minimum}
              max={constraint.maximum}
              value={_selectedProductFilters[constraintName] || [0, 0]} // TODO: this should be managed by redux, but it's not working right now :) (the other controls should also be added on redux)
              onChange={(event, newValue) => {
                store.dispatch(
                  setSelectedProductFilters({
                    ..._selectedProductFilters,
                    [constraintName]: newValue
                  })
                )
              }}
            />
            <FormHelperText sx={{ color: '#FFF', paddingTop: 3.5 }}>
              {constraint.description}
            </FormHelperText>
          </FormControl>
        )
        continue
      }
      if (constraint.type === 'string') {
        filterContainer.push(
          <FormControl key={constraintName}>
            <InputLabel
              htmlFor={constraintName}
              sx={{ color: '#FFF', paddingTop: 0 }}
            >
              {constraint.title}
            </InputLabel>
            <Input
              id={constraintName}
              name={constraintName}
              aria-describedby={constraintName}
            />
            <FormHelperText>{constraint.description}</FormHelperText>
          </FormControl>
        )
        continue
      }

      if (constraint.type === 'array') {
        // TODO for umbras case we need to add a check for the $ref property, if it exists we need to get the enum values from the $ref object
        // and populate the dropdown with those values
        // otherwise just take the enum values from the parameter properties
        // its not working for the last umbra json but maybe after the changes it will?

        let refItem = {}
        if (constraint.items.$ref) {
          const refName = constraint.items.$ref.split('/').pop()
          refItem = _selectedProductData.parameters.$defs[refName]
        }

        const options = []

        for (const option of refItem?.enum || []) {
          options.push(
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          )
        }

        filterContainer.push(
          <FormControl key={constraintName}>
            <InputLabel
              htmlFor={constraintName}
              sx={{ color: '#FFF', paddingTop: 0 }}
            >
              {constraint.title}
            </InputLabel>
            <Select id={constraintName} name={constraintName}>
              {options}
            </Select>
            <FormHelperText>{constraint.description}</FormHelperText>
          </FormControl>
        )
        continue
      }
    }
  }

  function processSearchBtn(formEvent) {
    formEvent.preventDefault()
    /*
    const keys = Object.keys(formEvent.target).slice(0, -2)
    let res = {}
    console.log(_selectedProductFilters)

    for (const key of keys) {
      if (formEvent.target[key].value) {
            console.log(formEvent.formEvent.target[key])

        res = {
          ...res,
          [formEvent.target[key].name]: formEvent.target[key].value
        }
      }
    } */

    console.log('Parameters: ', _selectedProductFilters)
    newSearch(_selectedProductFilters)
    // dispatch(setshowSearchByGeom(false))
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{'padding':'15px'}} data-testid="Search">
        <form onSubmit={processSearchBtn}>
          <Stack gap={4}>{filterContainer}</Stack>

          <div className="" style={{ marginTop: 24 }}>
            <button className={`actionButton searchButton`} type="submit">
              Search
            </button>
          </div>
        </form>
      </div>
    </ThemeProvider>
  )
}

export default Filter
