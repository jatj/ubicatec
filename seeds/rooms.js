exports.seed = function (knex, Promise) {
    return knex('Room').del().then(() => {
        return knex('Room').insert([
            { idRoom: 1, number: 1, status: 'AVAILABLE', image: 'https://drive.google.com/uc?authuser=0&id=19NIg5RecPZV7KfxuG13wzMEVfsROoCNH&export=download' },
            { idRoom: 2, number: 2, status: 'AVAILABLE', image: 'https://drive.google.com/uc?authuser=0&id=1jRYqaeQhxI5-vtnRzNvixIVEuskMERcs&export=download' },
            { idRoom: 3, number: 3, status: 'AVAILABLE', image: 'https://drive.google.com/uc?authuser=0&id=1b9F9s4GGFsrjDkhSDFOS_TLEFO0lkT9O&export=download' },
            { idRoom: 4, number: 4, status: 'AVAILABLE', image: 'https://drive.google.com/uc?authuser=0&id=1qbZOka0eXRFtdcxrIZvCdY8YXgAOnTsG&export=download' }
        ])
    })
}