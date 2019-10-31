exports.seed = function (knex, Promise) {
    return knex('Room').del().then(() => {
        return knex('Room').insert([
            { idRoom: 1, number: 1, status: 'AVAILABLE', image: 'https://image.flaticon.com/icons/svg/188/188234.svg' },
            { idRoom: 2, number: 2, status: 'AVAILABLE', image: 'https://image.flaticon.com/icons/svg/188/188235.svg' },
            { idRoom: 3, number: 3, status: 'AVAILABLE', image: 'https://image.flaticon.com/icons/svg/188/188236.svg' },
            { idRoom: 4, number: 4, status: 'AVAILABLE', image: 'https://image.flaticon.com/icons/svg/188/188237.svg' }
        ])
    })
}