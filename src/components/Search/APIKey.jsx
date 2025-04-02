import { React} from 'react'
import Box from '@mui/material/Box'
import { useDispatch, useSelector } from 'react-redux'
import { setApiKey } from '../../redux/slices/mainSlice'

import { InputLabel, TextField } from '@mui/material'

const APIKey = () => {
   const apiKey = useSelector(
    (state) => state.mainSlice.apiKey
  )

  const dispatch = useDispatch()


  function handleChange(e) {
    dispatch(setApiKey(e.target.value))
  }


  return (
    <Box>
      <InputLabel id="key-label" sx={{ color: 'white' }}>
        API Key
      </InputLabel>
      <TextField
        labelId="key-label"
        sx={{ input: { color: 'white' } }}
        onChange={handleChange}
        value={apiKey}
        fullWidth
      />
    </Box>
  )
}

export default APIKey
