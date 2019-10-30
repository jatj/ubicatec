exports.seed = function (knex, Promise) {
    return knex('Place').del().then(() => {
        return knex('Place').insert([
            {
                idPlace: 1, name: 'Life', description: 'Descripción life', fence: JSON.stringify({
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                                -99.2211756,
                                18.8078463
                            ],
                            [
                                -99.2212025,
                                18.8075568
                            ],
                            [
                                -99.2207894,
                                18.8075226
                            ],
                            [
                                -99.2207411,
                                18.8078082
                            ],
                            [
                                -99.2211756,
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
                idPlace: 3, name: 'Edificio norte', description: 'Descripción edificio norte', fence: JSON.stringify({
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                                -99.2222199,
                                18.8064202
                            ],
                            [
                                -99.2222682,
                                18.8060597
                            ],
                            [
                                -99.2209861,
                                18.8059784
                            ],
                            [
                                -99.2209325,
                                18.8063136
                            ],
                            [
                                -99.2222199,
                                18.8064202
                            ]
                        ]
                    ]
                })
            },
            {
                idPlace: 4, name: 'Edificio sur', description: 'Descripción edificio sur', fence: JSON.stringify({
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                                -99.2223487,
                                18.8055265
                            ],
                            [
                                -99.2223809,
                                18.8051558
                            ],
                            [
                                -99.2210398,
                                18.8050796
                            ],
                            [
                                -99.2210344,
                                18.8054401
                            ],
                            [
                                -99.2223487,
                                18.8055265
                            ]
                        ]
                    ]
                })
            }
        ])
    })
}