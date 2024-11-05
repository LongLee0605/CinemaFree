import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading";

const MovieDetails = () => {
  const { slug } = useParams();
  const [movieLink, setMovieLink] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

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

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  const linkEmbeds = movieLink?.episodes?.[0]?.server_data || [];

  return (
    <div className="w-[1240px] mx-auto bg-black">
      {movieDetails && (
        <>
          <div className="flex">
            <div className="w-3/4 p-4 border-[1px] border-[#fff4]">
              <div className="flex gap-6 mb-4">
                <img
                  src={movieDetails.poster_url}
                  alt={movieDetails.name}
                  className="h-auto w-60 mb-4"
                />
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    {movieDetails.name}
                  </h2>
                  <div className="flex flex-col gap-3">
                    {" "}
                    <p>
                      <strong>Tên gốc:</strong> {movieDetails.origin_name}
                    </p>
                    <p>
                      <strong>Tình trạng:</strong>{" "}
                      {movieDetails.episode_current}
                    </p>
                    <p>
                      <strong>Thời lượng phim:</strong> {movieDetails.time}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <div className="flex border-b border-gray-300 mb-4">
                  {["Xem Phim", "Nội Dung", "Thông Tin"].map((title, index) => (
                    <button
                      key={index}
                      className={`flex-1 text-center py-2 font-medium ${
                        activeTab === index ? "" : "text-gray-500"
                      }`}
                      onClick={() => setActiveTab(index)}
                    >
                      {title}
                    </button>
                  ))}
                </div>

                <div className="p-4 shadow-md rounded-b">
                  {activeTab === 0 && linkEmbeds.length > 0 && (
                    <div className="flex gap-5 flex-wrap">
                      {linkEmbeds.map((server, index) => (
                        <button
                          key={index}
                          className="border-[1px] border-gray-300 rounded-lg p-2 w-24 hover:bg-gray-200 hover:text-gray-800"
                        >
                          <a
                            href={server.link_embed}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {linkEmbeds.length > 1
                              ? `Tập ${index + 1}`
                              : "Xem phim"}
                          </a>
                        </button>
                      ))}
                    </div>
                  )}
                  {activeTab === 1 && (
                    <p>
                      <strong>Nội dung:</strong> {movieDetails.content}
                    </p>
                  )}
                  {activeTab === 2 && (
                    <div>
                      <p>
                        <strong>Ngôn ngữ:</strong> {movieDetails.lang}
                      </p>
                      <p>
                        <strong>Chất lượng:</strong> {movieDetails.quality}
                      </p>
                      <p>
                        <strong>Diễn viên:</strong>{" "}
                        {movieDetails.actor.join(", ")}
                      </p>
                      <p>
                        <strong>Đạo diễn:</strong>{" "}
                        {movieDetails.director.join(", ")}
                      </p>
                      <p>
                        <strong>Ngày tạo:</strong>{" "}
                        {new Date(
                          movieDetails.created.time
                        ).toLocaleDateString()}
                      </p>{" "}
                      <p>
                        <strong>Ngày cập nhật:</strong>{" "}
                        {new Date(
                          movieDetails.modified.time
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="1/4">Sidebar</div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
