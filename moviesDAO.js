let movies;

class Movies {
  async injectDB(conn) {
    if (movies) {
      // console.log("movies already injected", movies);
      return;
    }
    try {
      movies = await conn.db("sample_mflix").collection("movies");
      // console.log("moviesDAO", movies);
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in moviesDAO: ${e}`
      );
    }
  }

  async getMovies({ filters = null, page = 0, moviesPerPage = 20 } = {}) {
    console.log("getMovies", filters, page, moviesPerPage);
    let query;
    if (filters) {
      if ("title" in filters) {
        query = { $text: { $search: filters["title"] } };
      } else if ("cast" in filters) {
        query = { cast: { $in: [filters["cast"]] } };
      } else if ("genre" in filters) {
        query = { genres: { $in: [filters["genre"]] } };
      }
    }

    let cursor;
    try {
      cursor = await movies
        .find(query)
        .limit(moviesPerPage)
        .skip(moviesPerPage * page);

      const moviesList = await cursor.toArray();
      const totalNumMovies = await movies.countDocuments(query);
      console.log(`movies #${moviesList.length} of ${totalNumMovies}`);
      return { moviesList, totalNumMovies };
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { moviesList: [], totalNumMovies: 0 };
    }
  }
}

module.exports = Movies;
