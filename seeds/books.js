exports.seed = function (knex, Promise) {
    return knex('Book').del().then(() => {
        return knex('Book').insert([
            { idBook: 1, title: 'Libro 1', description: 'Descripcion del libro 1', code: 'Codigo del libro 1', status: 'AVAILABLE' },
            { idBook: 2, title: 'Libro 2', description: 'Descripcion del libro 2', code: 'Codigo del libro 2', status: 'AVAILABLE' },
            { idBook: 3, title: 'Libro 3', description: 'Descripcion del libro 3', code: 'Codigo del libro 3', status: 'AVAILABLE' },
            { idBook: 4, title: 'Libro 4', description: 'Descripcion del libro 4', code: 'Codigo del libro 4', status: 'AVAILABLE' }
        ])
    })
}