import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState();

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    // console.log(json);
    // console.log(json.data.movie.url);
    setMovie(json.data.movie);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);

  //   console.log(movie);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>Detail</h1>
          <hr></hr>
          <h2>{movie.title_long}</h2>
          <p>
            year: {movie.year}, rating: {movie.rating}, runtime: {movie.runtime}
            min
          </p>
          <p>
            genres:{" "}
            {movie.genres.map((g) => (
              <span key={g}>{g} </span>
            ))}
          </p>
          <img src={movie.large_cover_image} />
          <p>{movie.description_full}</p>
        </div>
      )}
    </div>
  );
}

export default Detail;
