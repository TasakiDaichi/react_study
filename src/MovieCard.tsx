import "./App.css";
import { Link } from "react-router";

// Movie型を定義しておくと、propsをmovieだけで受け取れるようになる
type Movie = {
    id: string;
    original_title: string;
    poster_path: string;
};

type Props = {
    movie: Movie;
};

const MovieCard = (props: Props) => {
    const { movie } = props;
    return (
        <div>
            <Link to={`/movies/${movie.id}`} key={movie.id} className="movie-card">
                <div className="movie-card__imgwrap">
                    <img
                        src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`}
                        alt={movie.original_title}
                        className="movie-card__img"
                    />
                    <div className="movie-card__overlay">
                        <h3 className="mmovie-card__title">{movie.original_title}</h3>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default MovieCard;