import { React } from 'react'
import Box from '@mui/material/Box'
import { useDispatch, useSelector } from 'react-redux'
import {
  setSelectedProvider,
} from '../../redux/slices/mainSlice'

import { Select, MenuItem, InputLabel } from '@mui/material'

const ProviderDropdown= () => {
  const selectedProvider = useSelector(
    (state) => state.mainSlice.selectedProvider
  )

  const dispatch = useDispatch()


  function handleChange(e) {
    dispatch(setSelectedProvider(e.target.value))
  }

  return (
    <Box>
      <InputLabel id="provider-label" sx={{ color: 'white' }}>
        Provider
      </InputLabel>

      <Select
        labelId="provider-label"
        value={selectedProvider}
        onChange={handleChange}
        sx={{ color: 'white' }}
        fullWidth
      >
        <MenuItem value={'eusi'}>EUSI</MenuItem>
        <MenuItem value={'opencosmos'}>Open Cosmos</MenuItem>
        <MenuItem value={'planet'}>Planet</MenuItem>
      </Select>
    </Box>
  )
}

export default ProviderDropdown
