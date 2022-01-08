const properties = require('./json/properties.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool
    .query(`SELECT id, name, email, password
  FROM users
  WHERE email = $1`, [email])
    .then((result) => {
      console.log(result.rows);
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool
    .query(`SELECT id, name, email, password
FROM users
WHERE id = $1`, [id])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {
  return pool
    .query(`INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3) RETURNING *;`, [user.name, user.email, user.password])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.addUser = addUser;

/// Reservations

/**
   * Get all reservations for a single user.
   * @param {string} guest_id The id of the user.
   * @return {Promise<[{}]>} A promise to the reservations.
   */
const getAllReservations = function(guestId, limit = 10) {
  return pool
    .query(`SELECT *
    FROM reservations JOIN properties ON properties.id = reservations.property_id
    WHERE reservations.guest_id = $1
    LIMIT $2;`, [Number(guestId), limit])
    .then((result) => {
      console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
   * Get all properties.
   * @param {{}} options An object containing query options.
   * @param {*} limit The number of results to return.
   * @return {Promise<[{}]>}  A promise to the properties.
   */
const getAllProperties = (options, limit = 10) => {
  console.log(options);
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  LEFT JOIN property_reviews ON properties.id = property_id
  `;

  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += `WHERE owner_id = $${queryParams.length} `;
  }
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    if (queryParams.length > 1) {
      queryString += `AND properties.city LIKE $${queryParams.length} `;
    } else {
      queryString += `WHERE properties.city LIKE $${queryParams.length} `;
    }
  }
  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night * 100}`);
    if (queryParams.length > 1) {
      queryString += `AND cost_per_night >= $${queryParams.length} `;
    } else {
      queryString += `WHERE cost_per_night >= $${queryParams.length} `;
    }
  }
  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night * 100}`);
    if (queryParams.length > 1) {
      queryString += `AND cost_per_night <= $${queryParams.length} `;
    } else {
      queryString += `WHERE cost_per_night <= $${queryParams.length} `;
    }
  }


  // 4
  queryString += `
  GROUP BY properties.id
  `;
  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.length} `;
  }

  queryParams.push(limit);
  queryString += `ORDER BY cost_per_night
  LIMIT $${queryParams.length};`;

  // 5
  console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams).then((res) => res.rows);
};
exports.getAllProperties = getAllProperties;


/**
   * Add a property to the database
   * @param {{}} property An object containing all of the property details.
   * @return {Promise<{}>} A promise to the property.
   */
const addProperty = function(property) {
  console.log(property);
  // return pool
  //   .query(`INSERT INTO properties (
  //     owner_id,
  //     title,
  //     description,
  //     thumbnail_photo_url,
  //     cover_photo_url,
  //     cost_per_night,
  //     parking_spaces,
  //     number_of_bathrooms,
  //     number_of_bedrooms,
  //     country,
  //     street,
  //     city,
  //     province,
  //     post_code
  //   )
  //     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`,
  //     [property.owner_id,
  //     property.title,
  //     Number(property.description),
  //     property.thumbnail_photo_url,
  //     property.cover_photo_url,
  //     Number(property.cost_per_night),
  //     Number(property.parking_spaces),
  //     Number(property.number_of_bathrooms),
  //     Number(property.number_of_bedrooms),
  //     property.country,
  //     property.street,
  //     property.city,
  //     property.province,
  //     property.post_code]
  //   )
  //   .then((result) => {
  //     return result.rows[0];
  //   })
  //   .catch((err) => {
  //     console.log(err.message);
  //   });
  return pool
    .query(`INSERT INTO properties (
      JSON.stringify(Object.keys(x)).slice(2, -2)
    )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`, Object.values(properties)
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.addProperty = addProperty;

// id SERIAL PRIMARY KEY NOT NULL,
//   owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
//   title VARCHAR(255) NOT NULL,
//   description TEXT,
//   thumbnail_photo_url VARCHAR(255) NOT NULL,
//   cover_photo_url VARCHAR(255) NOT NULL,
//   cost_per_night INTEGER NOT NULL DEFAULT 0,
//   parking_spaces INTEGER NOT NULL DEFAULT 0,
//   number_of_bathrooms INTEGER NOT NULL DEFAULT 0,
//   number_of_bedrooms INTEGER NOT NULL DEFAULT 0,
//   country VARCHAR(255) NOT NULL,
//   street VARCHAR(255) NOT NULL,
//   city VARCHAR(255) NOT NULL,
//   province VARCHAR(255) NOT NULL,
//   post_code VARCHAR(255) NOT NULL,
//   active BOOLEAN NOT NULL DEFAULT TRUE