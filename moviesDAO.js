
let movies

class Movies {
  async injectDB(conn) {
    if (movies) {
      return
    }
    try {
      // client.db("sample_mflix").collection("movies");
      movies = await conn.db('sample_mflix').collection("movies")
      console.log('movies', movies);
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in moviesDAO: ${e}`,
      )
    }
  }
}

module.exports = Movies;
