import React from 'react'
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  Switch
} from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import 'react-tooltip/dist/react-tooltip.css'
import { setSelectedProductFilters } from '../../redux/slices/mainSlice'
import { store } from '../../redux/store'
import { newSearch } from '../../utils/searchHelper'
import './Filter.css'

const Filter = () => {
  // State that should contain the selected filters
  const _selectedProductFilters = useSelector(
    (state) => state.mainSlice.selectedProductFilters
  )
  const _selectedProductData = useSelector(
    (state) => state.mainSlice.selectedProductData
  )

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

  if (_selectedProductData?.constraints?.properties == null) return null
  for (const constraintName of Object.keys(
    _selectedProductData.constraints.properties
  )) {
    const constraint =
      _selectedProductData.constraints.properties[constraintName]
    if (constraint.type === 'integer') {
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
            value={_selectedProductFilters[constraintName] || 0}
            onChange={(event, newValue) => {
              store.dispatch(
                setSelectedProductFilters({
                  ..._selectedProductFilters,
                  [constraintName]: newValue
                })
              )
            }}
            required={_selectedProductData.constraints.required.includes(
              constraintName
            )}
          />
          <FormHelperText sx={{ color: '#FFF', paddingTop: 3.5 }}>
            {constraint.description}
          </FormHelperText>
        </FormControl>
      )
      continue
    }

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
            required={_selectedProductData.constraints.required.includes(
              constraintName
            )}
            onChange={(event, newValue) => {
              store.dispatch(
                setSelectedProductFilters({
                  ..._selectedProductFilters,
                  [constraintName]: event.target.value
                })
              )
            }}
          />
          <FormHelperText>{constraint.description}</FormHelperText>
        </FormControl>
      )
      continue
    }

    if (constraint.type === 'boolean') {
      console.log(constraint)
      filterContainer.push(
        <FormControl key={constraintName}>
          <FormControlLabel
            control={
              <Switch
                id={constraintName}
                name={constraintName}
                aria-describedby={constraintName}
                checked={
                  _selectedProductFilters[constraintName] || constraint.default
                }
                onChange={(event) => {
                  store.dispatch(
                    setSelectedProductFilters({
                      ..._selectedProductFilters,
                      [constraintName]: event.target.checked
                    })
                  )
                }}
              />
            }
            label={constraint.title}
            labelPlacement="top"
          />

          <FormHelperText>{constraint.description}</FormHelperText>
        </FormControl>
      )
      continue
    }

    if (constraint.type === 'array') {
      const options = []

      for (const option of constraint?.items?.enum || []) {
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
          <Select
            id={constraintName}
            name={constraintName}
            required={_selectedProductData.constraints.required.includes(
              constraintName
            )}
            onChange={(event) => {
              store.dispatch(
                setSelectedProductFilters({
                  ..._selectedProductFilters,
                  [constraintName]: event.target.value
                })
              )
            }}
          >
            {options}
          </Select>
          <FormHelperText>{constraint.description}</FormHelperText>
        </FormControl>
      )
      continue
    }
  }

  function processSearchBtn(formEvent) {
    formEvent.preventDefault()

    console.log('Parameters: ', _selectedProductFilters)
    newSearch(_selectedProductFilters)
    // dispatch(setshowSearchByGeom(false))
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: '15px' }} data-testid="Search">
        <form onSubmit={processSearchBtn}>
          <Stack gap={4}>{filterContainer}</Stack>

          <div className="" style={{ marginTop: 24 }}>
            <button className={`actionButton searchButton`} type="submit">
              Find Opportunities
            </button>
          </div>
        </form>
      </div>
    </ThemeProvider>
  )
}

export default Filter
