import { setProductsData } from '../redux/slices/mainSlice'
import { store } from '../redux/store'

export async function GetProductsService(provider, apikey) {
    // const allProductRequests = ALL_PROVIDERS.map(async provider => {
    //     return fetch('/api/products', {
    //         headers: new Headers({
    //             'Backend': provider.id,
    //             'Authorization': `Bearer ${userToken}`
    //         })
    //     })
    //         .then(async res => await res.json())
    //         .then(data => { return { 'provider': provider.id, 'data': data } })
    // });

  // Promise.all(allProductRequests).then((results) => {
  //     store.dispatch(setProductsData(Object.fromEntries(Object.values(results).map(value => {
  //         return value.data.products
  //     }))))
  // }).catch(e => setError(e));

    /* .then(async res => await res.json())
    .then((data) => {
        console.log(data)
        umbraProducts = data.products
        store.dispatch(setProductsData([...eusiProducts, ...umbraProducts, ...planetProducts]))
    }); */



  const planetProducts = [
    {
      type: 'Product',
      conformsTo: [
        'https://geojson.org/schema/Point.json',
        'https://geojson.org/schema/LineString.json'
      ],

      id: 'PL-123456:Assured Tasking',
      title: 'SkySat Assured Tasking',
      description: 'An assured SkySat capture at a specific time and location.',
      keywords: ['EO', 'color', 'assured'],
      license: 'Planet',
      providers: [
        {
          name: 'Planet',
          description: 'Planet Labs, Inc.',
          roles: ['producer'],
          url: 'https://planet.com/'
        }
      ],
      links: [
        {
          href: 'https://oden.prod.planet-labs.com/',
          rel: 'documentation',
          type: 'docs',
          title: 'Planet Tasking API OpenAPI specs'
        }
      ],
      parameters: {
        $defs: {
          scheduling_type: {
            enum: ['Assured'],
            title: 'Scheduling Type',
            type: 'string'
          },
          satellite_types: {
            enum: ['SkySat'],
            title: 'Satellite Types',
            type: 'string'
          },
          exclusivity_days: {
            enum: [0, 30],
            title: 'Exclusivity Days',
            type: 'number'
          }
        },
        description: 'Planet Assured Parameters docstring',
        properties: {
          scheduling_type: {
            allOf: [
              {
                $ref: '#/parameters/$defs/scheduling_type'
              }
            ],
            default: 'Assured',
            title: 'Scheduling Type'
          },
          satellite_types: {
            items: [
              {
                $ref: '#/parameters/$defs/satellite_types'
              }
            ],
            default: ['SkySat'],
            type: 'array',
            title: 'Satellite Types'
          },
          exclusivity_days: {
            allOf: [
              {
                $ref: '#/parameters/$defs/exclusivity_days'
              }
            ],
            default: 0,
            title: 'Exclusivity Days'
          }
        }
      }
    },
    {
      type: 'Product',
      conformsTo: [
        'https://geojson.org/schema/Point.json',
        'https://geojson.org/schema/LineString.json',
        'https://geojson.org/schema/Polygon.json',
        'https://geojson.org/schema/MultiPoint.json',
        'https://geojson.org/schema/MultiPolygon.json',
        'https://geojson.org/schema/MultiLineString.json'
      ],
      id: 'PL-123456:Flexible Tasking',
      title: 'SkySat Flexible Tasking',
      description:
        'A flexible SkySat order at a specific location, to be fulfilled over a defined timerange.',
      keywords: ['EO', 'color', 'flexible'],
      license: 'Planet',
      providers: [
        {
          name: 'Planet',
          description: 'Planet Labs, Inc.',
          roles: ['producer'],
          url: 'https://planet.com/'
        }
      ],
      links: [
        {
          href: 'https://oden.prod.planet-labs.com/',
          rel: 'documentation',
          type: 'docs',
          title: 'Planet Tasking API OpenAPI specs'
        }
      ],
      parameters: {
        $defs: {
          scheduling_type: {
            enum: ['Flexible'],
            title: 'Scheduling Type',
            type: 'string'
          },
          satellite_types: {
            enum: ['SkySat'],
            title: 'Satellite Types',
            type: 'string'
          },
          exclusivity_days: {
            enum: [0, 30],
            title: 'Exclusivity Days',
            type: 'number'
          }
        },
        description: 'Planet Flexible Parameters docstring',
        properties: {
          scheduling_type: {
            allOf: [
              {
                $ref: '#/parameters/$defs/scheduling_type'
              }
            ],
            default: 'Flexible',
            title: 'Scheduling Type'
          },
          satellite_types: {
            items: [
              {
                $ref: '#/parameters/$defs/satellite_types'
              }
            ],
            default: ['SkySat'],
            type: 'array',
            title: 'Satellite Types'
          },
          exclusivity_days: {
            allOf: [
              {
                $ref: '#/parameters/$defs/exclusivity_days'
              }
            ],
            default: 0,
            title: 'Exclusivity Days'
          },
          'view:sat_elevation': {
            type: 'number',
            min: 20,
            max: 90
          },
          'view:azimuth': {
            type: 'number',
            min: -360,
            max: 360
          },
          'view:sun_zenith': {
            type: 'number',
            min: 0,
            max: 85
          },
          'view:sun-azimuth': {
            type: 'number',
            min: -360,
            max: 360
          }
        }
      }
    }
  ]

  const umbraProducts = [
    {
      type: 'Product',
      conformsTo: ['https://geojson.org/schema/Point.json'],
      id: 'umbra_spotlight',
      title: 'Umbra Spotlight',
      description:
        'Spotlight images served by creating new Orders. Way more detail here or a link down in links to Product documentation.',
      keywords: ['SAR', 'Spotlight'],
      license: 'CC-BY-4.0',
      providers: [
        {
          name: 'Umbra',
          description: 'Global Omniscience',
          roles: ['producer'],
          url: 'https://umbra.space'
        }
      ],
      links: [
        {
          href: 'https://docs.canopy.umbra.space',
          rel: 'documentation',
          type: 'docs',
          title: 'Canopy Documentation'
        }
      ],
      parameters: {
        $defs: {
          ProductType: {
            enum: ['GEC', 'SIDD'],
            title: 'ProductType',
            type: 'string'
          },
          SceneSize: {
            enum: ['5x5_KM', '10x10_KM'],
            title: 'SceneSize',
            type: 'string'
          }
        },
        description: 'Umbra Spotlight Parameters docstring yay!',
        properties: {
          sceneSize: {
            allOf: [
              {
                $ref: '#/parameters/$defs/SceneSize'
              }
            ],
            default: '5x5_KM',
            description: 'The scene size of the Spotlight collect. The first '
          },
          grazingAngleDegrees: {
            type: 'number',
            minimum: 40,
            maximum: 70,
            description:
              'The minimum angle between the local tangent plane at the target location and the line of sight vector between the satellite and the target. First value is the minimum grazing angle the second is the maximum.',
            title: 'Grazing Angle Degrees'
          },
          satelliteIds: {
            description: 'The satellites to consider for this Opportunity.',
            items: {
              type: 'string',
              regex: 'Umbra-\\d{2}'
            },
            title: 'Satelliteids',
            type: 'array'
          },
          deliveryConfigId: {
            anyOf: [
              {
                format: 'uuid',
                type: 'string'
              },
              {
                type: 'null'
              }
            ],
            default: null,
            description: '',
            title: 'Deliveryconfigid'
          },
          productTypes: {
            default: ['GEC'],
            description: '',
            items: {
              $ref: '#/parameters/$defs/ProductType'
            },
            title: 'Producttypes',
            type: 'array'
          }
        },
        required: ['satelliteIds'],
        title: 'UmbraSpotlightParameters',
        type: 'object'
      }
    },
    {
      type: 'Product',
      conformsTo: [
        'https://geojson.org/schema/Polygon.json',
        'https://geojson.org/schema/MultiPolygon.json'
      ],
      id: 'umbra_archive_catalog',
      title: 'Umbra Archive Catalog',
      description:
        'Umbra SAR Images served by the Archive Catalog. Way more detail here or a link down in links to Product documentation.',
      keywords: ['SAR', 'Archive'],
      license: 'CC-BY-4.0',
      providers: [
        {
          name: 'Umbra',
          description: 'Global Omniscience',
          roles: ['producer'],
          url: 'https://umbra.space'
        }
      ],
      links: [
        {
          href: 'https://docs.canopy.umbra.space/',
          rel: 'documentation',
          type: 'docs',
          title: 'Canopy Documentation'
        }
      ],
      parameters: {
        description: 'Umbra Archive Catalog Parameters docstring yay!',
        properties: {
          'sar:resolution_range': {
            type: 'number',
            minimum: 0.25,
            maximum: 1,
            description:
              'The range resolution of the SAR Image. This is equivalent to the resolution of the ground plane projected GEC Cloud-Optimized Geotiff',
            title: 'Range Resolution (m)'
          },
          'sar:looks_azimuth': {
            type: 'number',
            minimum: 1,
            maximum: 10,
            description:
              'The azimuth looks in the SAR Image. This value times the sar:resolution_range gives the azimuth resolution of the complex products.',
            title: 'Range Resolution (m)'
          },
          platform: {
            description: 'The satellites to consider for this Opportunity.',
            title: 'Platform (Satellite)',
            type: 'string',
            regex: 'Umbra-\\d{2}'
          }
        },
        title: 'UmbraArchiveCatalogParameters',
        type: 'object'
      }
    }
  ]
  // TODO: PUT ENDPOINT HERE
//   const endpoint = '/landsat/products'
//   const eusiProducts = await fetch(endpoint, {
//     method: 'GET'
//   })
//     .then(async (res) => await res.json())
//     .then((data) => {
//       console.log(data)
//       umbraProducts = data.products
//     })

  const eusiProducts = [
    {
      type: 'Product',
      conformsTo: [],
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

    switch (provider) {
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
    }
         
  // store.dispatch(setProductsData(mockProducts))
}
