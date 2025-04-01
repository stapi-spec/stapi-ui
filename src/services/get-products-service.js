import { setProductsData } from "../redux/slices/mainSlice"
import { store } from '../redux/store'

export async function GetProductsService() {
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


    const eusiProducts =
        [
            {
                "type": "Product",
                "stat_version": "0.0.1",
                "stat_extensions": [],
                "id": "maxar_opt",
                "title": "Maxar tasking",
                "description": "",
                "keywords": [
                    "EO",
                    "OPTICAL",
                    "WV01",
                    "WV02",
                    "WV03",
                    "GE01",
                    "VHR"
                ],
                "license": "proprietary",
                "providers": [
                    {
                        "name": "EUSI",
                        "description": null,
                        "roles": [
                            "licensor",
                            "processor",
                            "producer",
                            "host"
                        ],
                        "url": "https://www.euspaceimaging.com"
                    }
                ],
                "links": [],
                "constraints": {
                    "taskingScheme": {
                        "description": "Property containing the type of tasking scheme to apply to the subOrder",
                        "type": "string",
                        "enum": [
                            "single_window"
                        ],
                        "default": "single_window"
                    },
                    "taskingPriority": {
                        "description": "Property containing the tasking priority level to apply to the subOrder",
                        "type": "string",
                        "enum": [
                            "Select",
                            "Select Plus"
                        ],
                        "default": "Select"
                    },
                    "maxCloudCover": {
                        "minimum": 5.0,
                        "maximum": 100.0
                    },
                    "minOffNadir": {
                        "minimum": 0.0,
                        "maximum": 15.0
                    },
                    "maxOffNadir": {
                        "minimum": 10.0,
                        "maximum": 45.0
                    },
                    "scanDirection": {
                        "description": "Property describing the allowed scan direction value to apply to the subOrder",
                        "type": "string",
                        "enum": [
                            "Any"
                        ]
                    },
                    "singleSensor": {
                        "description": "Property forcing collection of the area of interest with a single sensor",
                        "type": "boolean",
                        "default": false
                    },
                    "sensors": {
                        "description": "Array containing the values of the allowed sensors for imagery collection",
                        "type": "array",
                        "items": {
                            "type": "string",
                            "enum": [
                                "WV01",
                                "WV02",
                                "WV03",
                                "GE01"
                            ]
                        }
                    },
                    "stereo": {
                        "description": "Property describing whether to collect this subOrder as in-track stereo",
                        "type": "boolean",
                        "default": false
                    },
                    "required": [
                        "taskingScheme",
                        "maxCloudCover",
                        "maxOffNadir",
                        "stereo",
                        "sensors",
                        "taskingPriority"
                    ]
                },
                "parameters": {
                    "customerReference": {
                        "title": "Customer Reference",
                        "description": "Free text parameter containing the client reference to the overall order",
                        "type": "string"
                    },
                    "purchaseOrderNo": {
                        "title": "Purchase Order Number",
                        "description": "Free text parameter containing the a client-side purchase order number to apply to the invoice",
                        "type": "string"
                    },
                    "projectName": {
                        "title": "Project Name",
                        "description": "Free text parameter containing a client-side reference to an overarching project",
                        "type": "string"
                    },
                    "productLevel": {
                        "title": "Product Level",
                        "description": "Property containing the production level to apply to delivered product",
                        "type": "string",
                        "enum": [
                            "OR2A",
                            "ORTHO",
                            "2A"
                        ],
                        "default": "OR2A"
                    },
                    "bandCombination": {
                        "title": "Band combination",
                        "description": "Property containing the band combination to apply to delivered product",
                        "type": "string",
                        "enum": [
                            "PAN",
                            "4PS",
                            "4BB",
                            "8BB"
                        ],
                        "default": "4BB"
                    },
                    "resolution": {
                        "title": "Resolution",
                        "description": "Property containing the resolution apply to delivered product",
                        "type": "number",
                        "enum": [
                            0.5,
                            0.4,
                            0.3
                        ],
                        "default": 0.5
                    },
                    "bitDepth": {
                        "title": "Bit depth",
                        "description": "Property containing the bit depth to apply to delivered product",
                        "type": "integer",
                        "enum": [
                            8,
                            11,
                            16
                        ],
                        "default": 16
                    },
                    "resamplingKernel": {
                        "title": "Resampling Kernel",
                        "description": "Property containing the resampling kernel to apply to delivered product",
                        "type": "string",
                        "enum": [
                            "NN",
                            "MTF",
                            "CC",
                            "PS",
                            "ENH"
                        ],
                        "default": "CC"
                    },
                    "dra": {
                        "title": "DRA",
                        "description": "Property describing whether to apply dynamic range adjustment to delivered product",
                        "type": "boolean",
                        "default": false
                    },
                    "acomp": {
                        "title": "ACOMP",
                        "description": "Property describing whether to apply atmospheric compensation to delivered product",
                        "type": "boolean",
                        "default": false
                    },
                    "format": {
                        "title": "Format",
                        "description": "Property containing the final product format to apply to delivered product",
                        "type": "string",
                        "enum": [
                            "GeoTIFF"
                        ],
                        "default": "GeoTIFF"
                    },
                    "fullStrip": {
                        "type": "boolean",
                        "default": false
                    },
                    "projection": {
                        "title": "Product projection",
                        "description": "Property containing the projection to apply to delivered product",
                        "type": "string",
                        "enum": [
                            "UTM_WGS84_Meter",
                            "Geographic_WGS84_DecimalDegree"
                        ]
                    },
                    "priority": {
                        "title": "Production priority",
                        "description": "Property containing the priority class of the order",
                        "type": "string",
                        "enum": [
                            "Standard"
                        ]
                    },
                    "required": [
                        "productLevel",
                        "bandCombination",
                        "resolution",
                        "priority"
                    ]
                }
            }
        ]

    const planetProducts = [
        {
            "type": "Product",
            "conformsTo": [
                "https://geojson.org/schema/Point.json",
                "https://geojson.org/schema/LineString.json"
            ],

            "id": "PL-123456:Assured Tasking",
            "title": "SkySat Assured Tasking",
            "description": "An assured SkySat capture at a specific time and location.",
            "keywords": [
                "EO",
                "color",
                "assured"
            ],
            "license": "Planet",
            "providers": [{
                "name": "Planet",
                "description": "Planet Labs, Inc.",
                "roles": ["producer"],
                "url": "https://planet.com/"
            }],
            "links": [{
                "href": "https://oden.prod.planet-labs.com/",
                "rel": "documentation",
                "type": "docs",
                "title": "Planet Tasking API OpenAPI specs"
            }],
            "parameters": {
                "$defs": {
                    "scheduling_type": {
                        "enum": [
                            "Assured"
                        ],
                        "title": "Scheduling Type",
                        "type": "string"
                    },
                    "satellite_types": {
                        "enum": [
                            "SkySat"
                        ],
                        "title": "Satellite Types",
                        "type": "string"
                    },
                    "exclusivity_days": {
                        "enum": [0, 30],
                        "title": "Exclusivity Days",
                        "type": "number"
                    }
                },
                "description": "Planet Assured Parameters docstring",
                "properties": {
                    "scheduling_type": {
                        "allOf": [
                            {
                                "$ref": "#/parameters/$defs/scheduling_type"
                            }
                        ],
                        "default": "Assured",
                        "title": "Scheduling Type"
                    },
                    "satellite_types": {
                        "items": [
                            {
                                "$ref": "#/parameters/$defs/satellite_types"
                            }
                        ],
                        "default": ["SkySat"],
                        "type": "array",
                        "title": "Satellite Types"
                    },
                    "exclusivity_days": {
                        "allOf": [
                            {
                                "$ref": "#/parameters/$defs/exclusivity_days"
                            }
                        ],
                        "default": 0,
                        "title": "Exclusivity Days"
                    }
                }
            }
        },
        {
            "type": "Product",
            "conformsTo": [
                "https://geojson.org/schema/Point.json",
                "https://geojson.org/schema/LineString.json",
                "https://geojson.org/schema/Polygon.json",
                "https://geojson.org/schema/MultiPoint.json",
                "https://geojson.org/schema/MultiPolygon.json",
                "https://geojson.org/schema/MultiLineString.json"
            ],
            "id": "PL-123456:Flexible Tasking",
            "title": "SkySat Flexible Tasking",
            "description": "A flexible SkySat order at a specific location, to be fulfilled over a defined timerange.",
            "keywords": [
                "EO",
                "color",
                "flexible"
            ],
            "license": "Planet",
            "providers": [{
                "name": "Planet",
                "description": "Planet Labs, Inc.",
                "roles": [
                    "producer"
                ],
                "url": "https://planet.com/"
            }],
            "links": [
                {
                    "href": "https://oden.prod.planet-labs.com/",
                    "rel": "documentation",
                    "type": "docs",
                    "title": "Planet Tasking API OpenAPI specs"
                }
            ],
            "parameters": {
                "$defs": {
                    "scheduling_type": {
                        "enum": [
                            "Flexible"
                        ],
                        "title": "Scheduling Type",
                        "type": "string"
                    },
                    "satellite_types": {
                        "enum": [
                            "SkySat"
                        ],
                        "title": "Satellite Types",
                        "type": "string"
                    },
                    "exclusivity_days": {
                        "enum": [
                            0,
                            30
                        ],
                        "title": "Exclusivity Days",
                        "type": "number"
                    }
                },
                "description": "Planet Flexible Parameters docstring",
                "properties": {
                    "scheduling_type": {
                        "allOf": [
                            {
                                "$ref": "#/parameters/$defs/scheduling_type"
                            }
                        ],
                        "default": "Flexible",
                        "title": "Scheduling Type"
                    },
                    "satellite_types": {
                        "items": [
                            {
                                "$ref": "#/parameters/$defs/satellite_types"
                            }
                        ],
                        "default": [
                            "SkySat"
                        ],
                        "type": "array",
                        "title": "Satellite Types"
                    },
                    "exclusivity_days": {
                        "allOf": [
                            {
                                "$ref": "#/parameters/$defs/exclusivity_days"
                            }
                        ],
                        "default": 0,
                        "title": "Exclusivity Days"
                    },
                    "view:sat_elevation": {
                        "type": "number",
                        "min": 20,
                        "max": 90
                    },
                    "view:azimuth": {
                        "type": "number",
                        "min": -360,
                        "max": 360
                    },
                    "view:sun_zenith": {
                        "type": "number",
                        "min": 0,
                        "max": 85
                    },
                    "view:sun-azimuth": {
                        "type": "number",
                        "min": -360,
                        "max": 360
                    }
                }
            }
        }
    ]
    let umbraProducts = [
        {
            "type": "Product",
            "conformsTo": [
                "https://geojson.org/schema/Point.json"
            ],
            "id": "umbra_spotlight",
            "title": "Umbra Spotlight",
            "description": "Spotlight images served by creating new Orders. Way more detail here or a link down in links to Product documentation.",
            "keywords": [
                "SAR",
                "Spotlight"
            ],
            "license": "CC-BY-4.0",
            "providers": [{
                "name": "Umbra",
                "description": "Global Omniscience",
                "roles": [
                    "producer"
                ],
                "url": "https://umbra.space"
            }],
            "links": [{
                "href": "https://docs.canopy.umbra.space",
                "rel": "documentation",
                "type": "docs",
                "title": "Canopy Documentation"
            }],
            "parameters": {
                "$defs": {
                    "ProductType": {
                        "enum": [
                            "GEC",
                            "SIDD"
                        ],
                        "title": "ProductType",
                        "type": "string"
                    },
                    "SceneSize": {
                        "enum": [
                            "5x5_KM",
                            "10x10_KM"
                        ],
                        "title": "SceneSize",
                        "type": "string"
                    }
                },
                "description": "Umbra Spotlight Parameters docstring yay!",
                "properties": {
                    "sceneSize": {
                        "allOf": [
                            {
                                "$ref": "#/parameters/$defs/SceneSize"
                            }
                        ],
                        "default": "5x5_KM",
                        "description": "The scene size of the Spotlight collect. The first "
                    },
                    "grazingAngleDegrees": {
                        "type": "number",
                        "minimum": 40,
                        "maximum": 70,
                        "description": "The minimum angle between the local tangent plane at the target location and the line of sight vector between the satellite and the target. First value is the minimum grazing angle the second is the maximum.",
                        "title": "Grazing Angle Degrees"
                    },
                    "satelliteIds": {
                        "description": "The satellites to consider for this Opportunity.",
                        "items": {
                            "type": "string",
                            "regex": "Umbra-\\d{2}"
                        },
                        "title": "Satelliteids",
                        "type": "array"
                    },
                    "deliveryConfigId": {
                        "anyOf": [
                            {
                                "format": "uuid",
                                "type": "string"
                            },
                            {
                                "type": "null"
                            }
                        ],
                        "default": null,
                        "description": "",
                        "title": "Deliveryconfigid"
                    },
                    "productTypes": {
                        "default": [
                            "GEC"
                        ],
                        "description": "",
                        "items": {
                            "$ref": "#/parameters/$defs/ProductType"
                        },
                        "title": "Producttypes",
                        "type": "array"
                    }
                },
                "required": [
                    "satelliteIds"
                ],
                "title": "UmbraSpotlightParameters",
                "type": "object"
            }
        },
        {
            "type": "Product",
            "conformsTo": [
                "https://geojson.org/schema/Polygon.json",
                "https://geojson.org/schema/MultiPolygon.json"
            ],
            "id": "umbra_archive_catalog",
            "title": "Umbra Archive Catalog",
            "description": "Umbra SAR Images served by the Archive Catalog. Way more detail here or a link down in links to Product documentation.",
            "keywords": [
                "SAR",
                "Archive"
            ],
            "license": "CC-BY-4.0",
            "providers": [{
                "name": "Umbra",
                "description": "Global Omniscience",
                "roles": [
                    "producer"
                ],
                "url": "https://umbra.space"
            }],
            "links": [{
                "href": "https://docs.canopy.umbra.space/",
                "rel": "documentation",
                "type": "docs",
                "title": "Canopy Documentation"
            }],
            "parameters": {
                "description": "Umbra Archive Catalog Parameters docstring yay!",
                "properties": {
                    "sar:resolution_range": {
                        "type": "number",
                        "minimum": 0.25,
                        "maximum": 1,
                        "description": "The range resolution of the SAR Image. This is equivalent to the resolution of the ground plane projected GEC Cloud-Optimized Geotiff",
                        "title": "Range Resolution (m)"
                    },
                    "sar:looks_azimuth": {
                        "type": "number",
                        "minimum": 1,
                        "maximum": 10,
                        "description": "The azimuth looks in the SAR Image. This value times the sar:resolution_range gives the azimuth resolution of the complex products.",
                        "title": "Range Resolution (m)"
                    },
                    "platform": {
                        "description": "The satellites to consider for this Opportunity.",
                        "title": "Platform (Satellite)",
                        "type": "string",
                        "regex": "Umbra-\\d{2}"
                    }
                },
                "title": "UmbraArchiveCatalogParameters",
                "type": "object"
            }
        }
    ]

    // TODO: PUT ENDPOINT HERE
    const endpoint = '/landsat/products'
    await fetch(
        endpoint,
    {
        method: 'GET'
    }
    ).then(async res => await res.json())
    .then((data) => {
        console.log(data)
        umbraProducts = data.products
        store.dispatch(setProductsData([...eusiProducts, ...umbraProducts, ...planetProducts]))
    });

}
