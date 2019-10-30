exports.seed = function (knex, Promise) {
    return knex('Room').del().then(() => {
        return knex('Room').insert([
            { idRoom: 1, number: 1, status: 'AVAILABLE' },
            { idRoom: 2, number: 2, status: 'AVAILABLE' },
            { idRoom: 3, number: 3, status: 'AVAILABLE' }
        ])
    })
}