import { useEffect, useState } from 'react'
import './App.css'
import MovieCard from './MovieCard'


type Movie = {
  id: string;
  original_title: string;
  poster_path: string;
  overview: string;
};

type MovieJson = {
  adult: boolean;
  backdrop_path: String;
  genre_ids: number[];
  id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_data: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

function App() {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  // javascriptを書く部分

  // keywordが変わると、そこに関係するすべての要素が再レンダリングされる
  const [keyword, setKeyword] = useState("");
  const [movieList, setMovieList] = useState<Movie[]>([]);

  const fetchMovieList = async () => {
    let url = ""
    if (keyword) {
      url = `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=ja&page=1`
    } else {
      url = 'https://api.themoviedb.org/3/movie/popular?language=ja&page=1'
    }
    const res = await fetch(
      url,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`
        },
      }
    );
    const data = await res.json();
    console.log(data);
    setMovieList(data.results.map((movie: MovieJson) => ({
      id: movie.id,
      original_title: movie.original_title,
      overview: movie.overview,
      poster_path: movie.poster_path
    }))
    )
  };

  // 画面が表示される前に1回だけ動作させる(依存配列が[]のとき)
  // 最近はuseEffectでデータ取得をしないほうが良い
  // react query, SWRを使用したほうが◯
  // 依存配列の変数が変わる毎に関数の呼び出しが発生する
  useEffect(() => {
    fetchMovieList()
  }, [keyword])

  // テストデータ
  const defaultMovieList = [
    {
      id: 1,
      name: "君の名は",
      image: "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/yLglTwyFOUZt5fNKm0PWL1PK5gm.jpg",
      overview: "1,000年に1度のすい星来訪が、1か月後に迫る日本。山々に囲まれた田舎町に住む女子高生の三葉は、町長である父の選挙運動や、家系の神社の風習などに鬱屈（うっくつ）していた。それゆえに都会への憧れを強く持っていたが、ある日彼女は自分が都会に暮らしている少年になった夢を見る。夢では東京での生活を楽しみながらも、その不思議な感覚に困惑する三葉。一方、東京在住の男子高校生・瀧も自分が田舎町に生活する少女になった夢を見る。やがて、その奇妙な夢を通じて彼らは引き合うようになっていくが……。"
    },
    {
      id: 2,
      name: "ハウルの動く城",
      image: "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/v0K2e1t6ocUNnkZ9BeiFdcOT9LG.jpg",
      overview: "父親の帽子店で帽子を作って暮らしていた18歳のソフィーは、荒野の魔女の呪いで90歳の老婆の姿になってしまう。彼女はハンサムだが気弱な魔法使いハウルと出会って、彼の居城でいっしょに暮らすようになるが、その城は4本足で歩く動く城だった。"
    },
    {
      id: 3,
      name: "もののけ姫",
      image: "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/mVdz3vlmioKWZaHTGfu99zIuayZ.jpg",
      overview: "山里に住む若者アシタカは、怒りと憎しみにより“タタリ神”と化した猪神から呪いをかけられてしまう。呪いを解く術を求めて旅に出るアシタカはやがて、西方の地で“タタラ”の村にたどり着く。エボシ御前が率いるその村では、鉄を造り続けていたが、同時にそれは神々の住む森を破壊することでもあった。そして、そんなタタラ達に戦いを挑むサンの存在をアシタカは知る。人の子でありながら山犬に育てられた彼女は“もののけ姫”と呼ばれていた。"
    },
    {
      id: 4,
      name: "backtothefuture",
      image: "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/oHaxzQXWSvIsctZfAYSW0tn54gQ.jpg",
      overview: "スティーブン・スピルバーグとロバート・ゼメキスが贈るSFアドベンチャーシリーズ第1弾。高校生のマーティは、科学者・ドクの発明したタイムマシン・デロリアンで過去にタイムスリップしてしまう。"
    }
  ]

  const heroTitle = "君の名は。";
  const heroYear = 2016;
  const heroOverview =
    "1,000年に1度のすい星来訪が、1か月後に迫る日本。山々に囲まれた田舎町に住む女子高生の三葉は、町長である父の選挙運動や、家系の神社の風習などに鬱屈（うっくつ）していた。それゆえに都会への憧れを強く持っていたが、ある日彼女は自分が都会に暮らしている少年になった夢を見る。夢では東京での生活を楽しみながらも、その不思議な感覚に困惑する三葉。一方、東京在住の男子高校生・瀧も自分が田舎町に生活する少女になった夢を見る。やがて、その奇妙な夢を通じて彼らは引き合うようになっていくが……。";
  const heroImage =
    "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/yLglTwyFOUZt5fNKm0PWL1PK5gm.jpg";

  // returnでHTMLを書く
  // cssは別ファイルに書く
  return (
    <div>
      <section className="hero-section">
        {heroImage && (
          // 必ず1つの要素を返す必要あり
          <>
            <img className="hero-section-bg" src={heroImage} alt={heroTitle} />
            <div className="hero-section-gradient" />
          </>
        )}
        <div className="hero-section-content">
          <h1 className="hero-section-title">{heroTitle}</h1>
          <div className="hero-section-badges">
            <span className="hero-section-badge">{heroYear}</span>
          </div>
          {heroOverview && (
            <p className="hero-section-overview">{heroOverview}</p>
          )}
          <div className="hero-section-actions">
            <button className="hero-section-btn hero-section-btn-primary">
              <span>▶ Play</span>
            </button>
            <button className="hero-section-btn hero-section-btn-secondary">
              <span>More Info</span>
            </button>
          </div>
        </div>
      </section>
      <section className="movie-row-section">
        <h2 className="movie-row-title">
          {keyword ? `「${keyword}」の検索結果` : "人気映画"}
        </h2>
        <div className="movie-row-scroll">
          {movieList.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </section>
      <div className="app-search-wrap">
        <input
          type="text"
          className="app-search"
          placeholder="映画タイトルで検索..."
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
    </div>
  );
}

export default App
