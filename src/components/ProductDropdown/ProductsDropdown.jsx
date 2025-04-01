import { React, useState, useEffect } from 'react'
import './ProductsDropdown.css'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import NativeSelect from '@mui/material/NativeSelect'
import { useDispatch, useSelector } from 'react-redux'
import {
  setSelectedProductData
} from '../../redux/slices/mainSlice'

const Dropdown = () => {
  const _selectedProductData = useSelector(
    (state) => state.mainSlice.selectedProductData
  )

  const dispatch = useDispatch()
  const [selectedProductID, setSelectedProductId] = useState(_selectedProductData)
  const _productsData = useSelector(
    (state) => state.mainSlice.productsData
  )
  const _appConfig = useSelector((state) => state.mainSlice.appConfig)


  useEffect(() => {

    if (_productsData.length > 0) {
      setSelectedProductId(_productsData[0].id);
    }
  }, [_productsData])


  useEffect(() => {
    const selectedProduct = _productsData?.find(
      (e) => e.id === selectedProductID
    )
    if (selectedProduct) {
      dispatch(setSelectedProductData(selectedProduct))
    }
  }, [selectedProductID])

  function onCollectionChanged(e) {
    setSelectedProductId(e.target.value);
  }

  return (
    <Box>
      <label htmlFor="productsDropdown">Products</label>
      <Grid container alignItems="center">
        <Grid item xs>
          <NativeSelect
            id="productsDropdown"
            value={selectedProductID}
            label="Products"
            onChange={(e) => onCollectionChanged(e)}
          >
            <option value="selectOne" disabled={true}>
              Select Product
            </option>
            {_productsData &&
              _productsData.map(({ id, title, providers }) => (
                <option key={id} value={id}>
                  {title} - {Array.isArray(providers) ? providers[0]?.name : providers.name.toUpperCase()}
                </option>
              ))}
          </NativeSelect>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dropdown
