exports.seed = function (knex, Promise) {
    return knex('Place').del().then(() => {
        return knex('Place').insert([
            {
                idPlace: 1, name: 'Life', description: 'Descripción life', fence: JSON.stringify({
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                               -99.221181,
                               18.8078463
                            ],
                            [
                               -99.2212079,
                               18.8075568
                            ],
                            [
                               -99.2209021,
                               18.807548
                            ],
                            [
                               -99.2208886,
                               18.8076959
                            ],
                            [
                               -99.2208752,
                               18.8078387
                            ],
                            [
                               -99.221181,
                               18.8078463
                            ]
                         ]
                    ]
                })
            },
            {
                idPlace: 2, name: 'Canchas life', description: 'Descripción canchas life', fence: JSON.stringify({
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                               -99.2212132,
                               18.8074921
                            ],
                            [
                               -99.2212829,
                               18.8068472
                            ],
                            [
                               -99.2208618,
                               18.8068193
                            ],
                            [
                               -99.2207974,
                               18.8074515
                            ],
                            [
                               -99.2212132,
                               18.8074921
                            ]
                        ]
                    ]
                })
            },
            {
                idPlace: 3, name: 'Cafeteria', description: 'Cafeteria', fence: JSON.stringify({
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                                -99.2217734,
                                18.8060296
                             ],
                             [
                                -99.22143,
                                18.8060143
                             ],
                             [
                                -99.2214086,
                                18.8063038
                             ],
                             [
                                -99.221768,
                                18.8063445
                             ],
                             [
                                -99.2217734,
                                18.8060296
                             ]
                        ]
                    ]
                })
            },        
            {
                idPlace: 4, name: 'Biblioteca', description: 'Biblioteca', fence: JSON.stringify({
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                                -99.2220094,
                                18.8051613
                             ],
                             [
                                -99.2214086,
                                18.8051105
                             ],
                             [
                                -99.2213818,
                                18.8054253
                             ],
                             [
                                -99.2219772,
                                18.8054659
                             ],
                             [
                                -99.2220094,
                                18.8051613
                             ]
                        ]
                    ]
                })
            },        
            {
                idPlace: 5, name: 'Punto Azul', description: 'Punto Azul', fence: JSON.stringify({
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                                -99.221935,
                                18.8060509
                             ],
                             [
                                -99.2218063,
                                18.8060357
                             ],
                             [
                                -99.2218009,
                                18.8062083
                             ],
                             [
                                -99.2218063,
                                18.8063556
                             ],
                             [
                                -99.2219457,
                                18.8063607
                             ],
                             [
                                -99.221935,
                                18.8060509
                             ]
                        ]
                    ]
                })
            },        
            {
                idPlace: 6, name: 'Baños Noreste', description: 'Baños Noreste', fence: JSON.stringify({
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                                -99.2213342,
                                18.8060712
                             ],
                             [
                                -99.2211679,
                                18.8060509
                             ],
                             [
                                -99.2211518,
                                18.8061779
                             ],
                             [
                                -99.2213288,
                                18.8061982
                             ],
                             [
                                -99.2213342,
                                18.8060712
                             ]
                        ]
                    ]
                })
            },        
            {
                idPlace: 7, name: 'Baños Noroeste', description: 'Baños Noroeste', fence: JSON.stringify({
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                               -99.2219726,
                               18.8060814
                            ],
                            [
                               -99.2219779,
                               18.8062642
                            ],
                            [
                               -99.2221603,
                               18.8062541
                            ],
                            [
                               -99.2221389,
                               18.8060611
                            ],
                            [
                               -99.2219726,
                               18.8060814
                            ]
                         ]
                    ]
                })
            },        
            {
                idPlace: 8, name: 'Baños Suroeste', description: 'Baños Suroeste', fence: JSON.stringify({
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                               -99.2222408,
                               18.8054822
                            ],
                            [
                               -99.2222515,
                               18.8053349
                            ],
                            [
                               -99.2220691,
                               18.8053248
                            ],
                            [
                               -99.222053,
                               18.8054771
                            ],
                            [
                               -99.2222408,
                               18.8054822
                            ]
                         ]
                    ]
                })
            },        
            {
                idPlace: 9, name: 'Baños Sureste', description: 'Baños Sureste', fence: JSON.stringify({
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                               -99.2213288,
                               18.8052588
                            ],
                            [
                               -99.2211786,
                               18.8052486
                            ],
                            [
                               -99.221184,
                               18.8054111
                            ],
                            [
                               -99.2213818,
                               18.8054253
                            ],
                            [
                               -99.2213288,
                               18.8052588
                            ]
                         ]
                    ]
                })
            },        
            {
                idPlace: 10, name: 'Gimnasio', description: 'Gimnasio', fence: JSON.stringify({
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                               -99.2207442,
                               18.8078211
                            ],
                            [
                               -99.2208752,
                               18.8078387
                            ],
                            [
                               -99.2208886,
                               18.8076959
                            ],
                            [
                               -99.2207549,
                               18.8077043
                            ],
                            [
                               -99.2207442,
                               18.8078211
                            ]
                         ]
                    ]
                })
            },        
            {
                idPlace: 11, name: 'Subway', description: 'Subway', fence: JSON.stringify({
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                               -99.2212079,
                               18.8075568
                            ],
                            [
                               -99.2212109,
                               18.8076332
                            ],
                            [
                               -99.2212914,
                               18.8076332
                            ],
                            [
                               -99.2213021,
                               18.8075622
                            ],
                            [
                               -99.2212079,
                               18.8075568
                            ]
                         ]
                    ]
                })
            },        
            {
                idPlace: 12, name: 'Parque Tec', description: 'Parque Tec', fence: JSON.stringify({
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                               -99.2217463,
                               18.8032296
                            ],
                            [
                               -99.2218053,
                               18.8027777
                            ],
                            [
                               -99.2212581,
                               18.8027218
                            ],
                            [
                               -99.2212098,
                               18.8031992
                            ],
                            [
                               -99.2217463,
                               18.8032296
                            ]
                         ]
                    ]
                })
            },        
            {
                idPlace: 13, name: 'Cancha', description: 'Cancha', fence: JSON.stringify({
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                               -99.2220499,
                               18.8084433
                            ],
                            [
                               -99.2222055,
                               18.8074734
                            ],
                            [
                               -99.2222109,
                               18.8071485
                            ],
                            [
                               -99.2220553,
                               18.8069707
                            ],
                            [
                               -99.2215886,
                               18.8069199
                            ],
                            [
                               -99.2213848,
                               18.8070672
                            ],
                            [
                               -99.2212721,
                               18.8082402
                            ],
                            [
                               -99.2213526,
                               18.8083722
                            ],
                            [
                               -99.2220499,
                               18.8084433
                            ]
                         ]
                    ]
                })
            },        
        ])
    })
}