import React from 'react'
import {
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  Switch,
  Typography
} from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import 'react-tooltip/dist/react-tooltip.css'
import { setSelectedProductFilters } from '../../redux/slices/mainSlice'
import { store } from '../../redux/store'
import { newSearch } from '../../utils/searchHelper'
import './Filter.css'
import { Box } from '@mui/system'

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
      const marks = [
        {
          value: constraint.minimum,
          label: constraint.minimum
        },
        {
          value: constraint.maximum,
          label: constraint.minimum
        }
      ]

      filterContainer.push(
        <FormControl key={constraintName} sx={{ marginTop: 4 }}>
          <FormControlLabel
            control={
              <Slider
                id={constraintName}
                name={constraintName}
                valueLabelDisplay="auto"
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
            }
            label={constraint.title}
            labelPlacement="top"
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{constraint.minimum}</Typography>
            <Typography variant="body2">{constraint.maximum}</Typography>
           
          </Box>
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
          <FormControlLabel
            control={
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
            }
            label={constraint.title}
            labelPlacement="top"
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
          <FormControlLabel
            control={
              <Select
                id={constraintName}
                name={constraintName}
                required={_selectedProductData.constraints.required.includes(
                  constraintName
                )}
                fullWidth
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
            }
            label={constraint.title}
            labelPlacement="top"
          />

          <FormHelperText>{constraint.description}</FormHelperText>
        </FormControl>
      )
      continue
    }
  }

  function processSearchBtn(formEvent) {
    formEvent.preventDefault()
    console.log('Parameters: ', _selectedProductFilters)
    newSearch(_selectedProductFilters, _selectedProductData)
    // dispatch(setshowSearchByGeom(false))
  }

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={processSearchBtn}>
        <Divider sx={{ background: 'white'}}>
          <Chip
            label="Constraints"
            size="small"
            sx={{ backgroundColor: 'white' }}
          />
        </Divider>
        <div style={{ padding: '15px' }} data-testid="Search">
          <Stack gap={4}>{filterContainer}</Stack>
        </div>
        <div className="" style={{ marginTop: 24 }}>
          <button className={`actionButton searchButton`} type="submit">
            Find Opportunities
          </button>
        </div>
      </form>
    </ThemeProvider>
  )
}

export default Filter
