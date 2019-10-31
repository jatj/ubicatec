exports.seed = function (knex, Promise) {
    return knex('Book').del().then(() => {
        return knex('Book').insert([
            { idBook: 1, title: 'Libro 1', description: 'Descripcion del libro 1', code: 'Codigo del libro 1', status: 'AVAILABLE', image: 'https://cdn.pastemagazine.com/www/system/images/photo_albums/best-book-covers-july-2019/large/bbcjuly19verynice.jpg?1384968217' },
            { idBook: 2, title: 'Libro 2', description: 'Descripcion del libro 2', code: 'Codigo del libro 2', status: 'AVAILABLE', image: 'https://99designs-start-attachments.imgix.net/alchemy-pictures/2016%2F02%2F12%2F00%2F05%2F05%2F910db405-6bd4-4a5d-bce7-c2e3135dc5e6%2F449070_WAntoneta_55908c_killing.png?auto=format&ch=Width%2CDPR&fm=png&w=600&h=600'},
            { idBook: 3, title: 'Libro 3', description: 'Descripcion del libro 3', code: 'Codigo del libro 3', status: 'AVAILABLE', image: 'https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/12/attachment_83090027.jpg?auto=format&q=60&fit=max&w=930' },
            { idBook: 4, title: 'Libro 4', description: 'Descripcion del libro 4', code: 'Codigo del libro 4', status: 'AVAILABLE', image: 'https://img0-placeit-net.s3-accelerate.amazonaws.com/uploads/stage/stage_image/40050/large_thumb_stage.jpg' }
        ])
    })
}