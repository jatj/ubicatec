exports.up = knex => {
  return knex.schema
    /**
    * =================================
    * Creating table: User
    * =================================
    */ 
    .createTable('User', table => {
      // Creating property: idUser
      table
      .increments('idUser').primary()
      .comment('The unique identifier of the User')
      // Creating property: name
      table
      .string('name', 255)
      .notNullable()
      .comment('The name of the user')
      // Creating property: lastname
      table
      .string('lastname', 255)
      .comment('The lastname of the user')
      // Creating property: studentNumber
      table
      .string('studentNumber', 255)
      .notNullable()
      .unique()
      .comment('The student number of the user')
      // Creating property: fbUserId
      table
      .string('fbUserId', 255)
      .notNullable()
      .unique()
      .comment('The facebook user id, to link each facebook user to a student')
    })
    /**
    * =================================
    * Creating table: Place
    * =================================
    */ 
    .createTable('Place', table => {
      // Creating property: idPlace
      table
      .increments('idPlace').primary()
      .notNullable()
      .comment('The unique identifier of the Place')
      // Creating property: name
      table
      .string('name', 255)
      .notNullable()
      .comment('The name of the place')
      // Creating property: description
      table
      .string('description', 255)
      .comment('The description of the place')
      // Creating property: fence
      table
      .string('fence', 255)
      .notNullable()
      .unique()
      .comment('The geo fence of the place')
    })
    /**
    * =================================
    * Creating table: Book
    * =================================
    */ 
    .createTable('Book', table => {
      // Creating property: idBook
      table
      .increments('idBook').primary()
      .notNullable()
      .comment('The unique identifier of the Book')
      // Creating property: title
      table
      .string('title', 255)
      .notNullable()
      .comment('The title of the book')
      // Creating property: description
      table
      .string('description', 255)
      .comment('The description of the book')
      // Creating property: code
      table
      .string('code', 255)
      .comment('The code of the book')
      // Creating property: status
      table
      .enu('status', ['AVAILABLE','RENTED','RESERVED'])
    })
    /**
    * =================================
    * Creating table: Room
    * =================================
    */ 
    .createTable('Room', table => {
      // Creating property: idRoom
      table
      .increments('idRoom').primary()
      .notNullable()
      .comment('The unique identifier of the Room')
      // Creating property: number
      table
      .integer('number')
      .notNullable()
      .comment('The number of the room')
      // Creating property: status
      table
      .enu('status', ['AVAILABLE','RENTED','RESERVED'])
    })
    /**
    * =================================
    * Creating table: Rental
    * =================================
    */ 
    .createTable('Rental', table => {
      // Creating property: idRental
      table
      .increments('idRental').primary()
      .notNullable()
      .comment('The unique identifier of the Rental')
      // Creating property: fkBook
      table
      .integer('fkBook').unsigned()
      .references('Book.idBook')
      .index()
      .onDelete('NO ACTION')
      .notNullable()
      .comment('The foreign key of the book associated with this rental, if it is a book rental')
      // Creating property: fkRoom
      table
      .integer('fkRoom').unsigned()
      .references('Room.idRoom')
      .index()
      .onDelete('NO ACTION')
      .comment('The foreign key of the book associated with this rental, if it is a room rental')
      // Creating property: type
      table
      .enu('type', ['RENT','RESERVE','RETURN'])
    })
};

exports.down = knex => {
  return knex.schema
    // Droping table: User
    .dropTableIfExists('User')
    // Droping table: Place
    .dropTableIfExists('Place')
    // Droping table: Book
    .dropTableIfExists('Book')
    // Droping table: Room
    .dropTableIfExists('Room')
    // Droping table: Rental
    .dropTableIfExists('Rental')
};
