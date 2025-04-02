import { React  } from 'react'
import './Search.css'
import 'react-tooltip/dist/react-tooltip.css'
import Filter from '../Filter/Filter'
import ProductDropdown from '../ProductDropdown/ProductsDropdown'
import APIKey from './APIKey'
import { Box, } from '@mui/system'
import ProviderDropdown from './ProviderDropdown'

const Search = () => {
  

  return (
    <div className="Search" data-testid="Search">
      <div className="searchFilters">
        <div className={`searchContainer collectionDropdown`}>
          <Box sx={{ gap: '20px', display: 'flex', flexDirection: 'column' }}>
            <ProviderDropdown />
            <APIKey />
            <ProductDropdown />
          </Box>
        </div>
        <Filter />
      </div>
    </div>
  )
}

export default Search
