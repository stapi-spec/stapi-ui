import { setProductsData } from '../redux/slices/mainSlice'
import { store } from '../redux/store'

  const PROVIDER_URLS = {
    eusi: 'https://apps.euspaceimaging.com/test/internal/stapi',
    opencosmos: 'http://localhost:8000'
  }

export async function GetProductsService(provider, apikey) {

  if (!(provider in PROVIDER_URLS)){
    console.error('Unsupported provider URL', provider)
    setProductsData(null)
    return
  }

  const baseUrl = PROVIDER_URLS[provider]

  

    // Get all products meta data
    const productMetaResponse = await fetch(baseUrl + '/products', {
      method: 'GET'
    }).then((res) => res.json())
    const productList = []

    // Get all constraints
    for (const product of productMetaResponse.products) {
      const constraints = await fetch(
        baseUrl + `/products/${product.id}/constraints`,
        {
          method: 'GET'
        }
      ).then((res) => res.json())

      const orderParameters = await fetch(
        baseUrl + `/products/${product.id}/order-parameters`,
        { method: 'GET' }
      ).then((res) => res.json())

      productList.push({
        ...product,
        constraints,
        orderParameters
      })
    }

    // return { id: providerData.id, productList }

  console.log('products', productList)
  store.dispatch(setProductsData(productList))

 /* const mockProducts = [
    {
      type: 'Product',
      conformsTo: ['https://geojson.org/schema/Polygon.json'],
      id: 'maxar',
      title: 'Maxar Optical',
      description: 'Optical Imagary from the Maxar constellation',
      keywords: ['eo', 'optical', 'WorldView', 'Legion'],
      queryables: {
        additionalProperties: true,
        properties: {
          offNadirAngle: {
            title: 'Offnadirangle',
            type: 'integer'
          },
          sensor: {
            title: 'Sensor',
            type: 'string'
          }
        },
        required: ['offNadirAngle', 'sensor'],
        title: 'MaxarConstraints',
        type: 'object'
      },
      orderParameters: {
        additionalProperties: false,
        properties: {
          customerReference: {
            default: '',
            description:
              'Free text parameter containing the client reference to the tasking order',
            title: 'Customer Reference',
            type: 'string'
          },
          opportunityRequestId: {
            default: '',
            description:
              'ID returned from an opportunity request. Must be included to place order.',
            title: 'Opportunity Request Id',
            type: 'string'
          },
          endUserIds: {
            description:
              'Parameter containing a list of EUSI assigned UUID for the end users',
            title: 'EUSI Enduser ID',
            type: 'string'
          },
          endUseCode: {
            description:
              'Parameter containing the end use code describing usage of the imagery',
            title: 'EUSI Enduse Code',
            type: 'string'
          },
          productLevel: {
            default: 'OR2A',
            description:
              'Property containing the production level to apply to delivered product',
            enum: ['OR2A', 'ORTHO', '2A'],
            title: 'Product Level',
            type: 'string'
          },
          bandCombination: {
            default: 'PAN',
            description:
              'Property containing the band combination to apply to delivered produc',
            enum: ['PAN', '4BB', '4PS', '8BB'],
            title: 'Band combination',
            type: 'string'
          },
          resolution: {
            default: '0.50',
            description:
              'Property containing the bit depth to apply to delivered product',
            enum: ['0.50', '0.40', '0.30'],
            title: 'Bit depth',
            type: 'string'
          },
          stereo: {
            default: false,
            description:
              'Property describing whether to collect this subOrder as in-track stereo',
            title: 'Stereo',
            type: 'boolean'
          },
          vehicle: {
            default: ['WV01', 'WV02', 'WV03', 'GE01'],
            description:
              'Array containing the values of the allowed vehicles for imagery collection',
            enum: ['WV01', 'WV02', 'WV03', 'GE01'],
            items: {
              type: 'string'
            },
            title: 'Selected Vehicles',
            type: 'array'
          }
        },
        required: ['endUserIds', 'endUseCode'],
        title: 'MaxarOrderParameters',
        type: 'object'
      },
      license: 'proprietary',
      providers: [
        {
          name: 'EUSI',
          description: 'Provides Maxar Imagery',
          roles: ['processor'],
          url: 'https://www.euspaceimaging.com/'
        }
      ]
    }
  ]
  // //   const EUSI_MAXAR_OPTICAL_PRODUCT = {
  //     type: 'Product',
  //     stat_version: '0.0.1',
  //     stat_extensions: [],
  //     id: 'maxar_opt',
  //     title: 'Maxar tasking',
  //     description: '',
  //     keywords: ['EO', 'OPTICAL', 'WV01', 'WV02', 'WV03', 'GE01', 'VHR'],
  //     license: 'proprietary',
  //     providers: [
  //       {
  //         name: 'EUSI',
  //         description: null,
  //         roles: ['licensor', 'processor', 'producer', 'host'],
  //         url: 'https://www.euspaceimaging.com'
  //       }
  //     ],
  //     links: [],
  //     constraints: {
  //       additionalProperties: true,
  //       properties: {
  //         offNadirAngle: {
  //           title: 'Offnadirangle',
  //           type: 'integer'
  //         },
  //         sensor: {
  //           title: 'Sensor',
  //           type: 'string'
  //         }
  //       },
  //       required: ['offNadirAngle', 'sensor'],
  //       title: 'MaxarConstraints',
  //       type: 'object'
  //     },
  //     parameters: {
  //       additionalProperties: false,
  //       properties: {
  //         customerReference: {
  //           default: '',
  //           description:
  //             'Free text parameter containing the client reference to the tasking order',
  //           title: 'Customer Reference',
  //           type: 'string'
  //         },
  //         opportunityRequestId: {
  //           description:
  //             'ID returned from an opportunity request. Must be included to place order.',
  //           title: 'Opportunity Request Id',
  //           type: 'string'
  //         },
  //         endUserIds: {
  //           description:
  //             'Parameter containing a list of EUSI assigned UUID for the end users',
  //           title: 'EUSI Enduser ID',
  //           type: 'string'
  //         },
  //         endUseCode: {
  //           description:
  //             'Parameter containing the end use code describing usage of the imagery',
  //           title: 'EUSI Enduse Code',
  //           type: 'string'
  //         }
  //       },
  //       required: ['opportunityRequestId', 'endUserIds', 'endUseCode'],
  //       title: 'MaxarOrderParameters',
  //       type: 'object'
  //     }
  // //   }
  // //   const EUSI_PRODUCTS = [EUSI_MAXAR_OPTICAL_PRODUCT]
*/
  /* switch (provider) {
    case 'eusi':
      store.dispatch(setProductsData(eusiProducts))
      return
    case 'umbra':
      store.dispatch(setProductsData(umbraProducts))
      return
    case 'planet':
      store.dispatch(setProductsData(planetProducts))
      return
    default:
      console.error('Unsupported provider', provider)
  } */

}
