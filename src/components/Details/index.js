import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const { slug } = useParams();
  const [movieLink, setMovieLink] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://phimapi.com/phim/${slug}`);
        const data = await response.json();
        setMovieLink(data);
        if (data.status) {
          setMovieDetails(data.movie);
        } else {
          setError("Movie not found.");
        }
      } catch (err) {
        setError("Failed to fetch movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const linkEmbeds = movieLink?.episodes?.[0]?.server_data || [];

  return (
    <div>
      {movieDetails && (
        <>
          <h2 className="text-2xl font-bold mb-4">{movieDetails.name}</h2>
          <img
            src={movieDetails.poster_url}
            alt={movieDetails.name}
            className="h-auto w-60 mb-4"
          />
          <p>
            <strong>Origin Name:</strong> {movieDetails.origin_name}
          </p>
          <p>
            <strong>Content:</strong> {movieDetails.content}
          </p>
          <p>
            <strong>Thời gian:</strong> {movieDetails.time}
          </p>
          <p>
            <strong>Chất lượng:</strong> {movieDetails.quality}
          </p>
          <p>
            <strong>Ngôn ngữ:</strong> {movieDetails.lang}
          </p>
          <p>
            <strong>Diễn viên:</strong> {movieDetails.actor.join(", ")}
          </p>
          <p>
            <strong>Đạo diễn:</strong> {movieDetails.director.join(", ")}
          </p>
          <p>
            <strong>Ngày tạo:</strong>{" "}
            {new Date(movieDetails.created.time).toLocaleDateString()}
          </p>
          <p>
            <strong>Ngày cập nhật:</strong>{" "}
            {new Date(movieDetails.modified.time).toLocaleDateString()}
          </p>
          {linkEmbeds.length > 0 && (
            <div>
              <strong>Xem phim:</strong>
              {linkEmbeds.map((server, index) => (
                <button
                  key={index}
                  className="text-blue-500 underline cursor-pointer block mt-2"
                >
                  <a
                    href={server.link_embed}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {linkEmbeds.length > 1
                      ? `Nhấn để xem phim ${index + 1}`
                      : "Nhấn để xem phim"}
                  </a>
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MovieDetails;