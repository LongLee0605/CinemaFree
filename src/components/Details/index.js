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
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://phimapi.com/phim/${slug}`);
        const data = await response.json();

        if (data.status) {
          setMovieDetails(data.movie);
          setMovieLink(data);
        } else {
          setError("Không tìm thấy phim.");
        }
      } catch (err) {
        setError("Không thể tải thông tin phim.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [slug]);

  if (loading) return <Loading />;
  if (error)
    return <div className="text-red-500 text-center mt-4">{error}</div>;

  const linkEmbeds = movieLink?.episodes?.[0]?.server_data || [];

  return (
    <div className="w-full lg:w-[1240px] mx-auto bg-black text-white">
      {movieDetails && (
        <>
          <div className="flex">
            {/* Chi tiết phim */}
            <div className="w-full lg:w-3/4 p-4 border-[1px] border-[#fff4]">
              <div className="flex gap-6 mb-4 justify-center lg:justify-start">
                {selectedEpisode ? (
                  <iframe
                    width="100%"
                    height="500px"
                    src={selectedEpisode}
                    title="Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <>
                    <div className="block lg:flex gap-10">
                      <img
                        src={movieDetails.poster_url}
                        alt={movieDetails.name}
                        className="h-auto w-full lg:w-60 mb-4 rounded-lg"
                      />
                      <div>
                        <h2 className="text-2xl font-bold mb-2">
                          {movieDetails.name}
                        </h2>
                        <div className="flex flex-col gap-3 lg:pl-0 pl-3">
                          <p>
                            <strong>Tên gốc:</strong> {movieDetails.origin_name}
                          </p>
                          <p>
                            <strong>Tình trạng:</strong>{" "}
                            {movieDetails.episode_current}
                          </p>
                          <p>
                            <strong>Thời lượng phim:</strong>{" "}
                            {movieDetails.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Tabs chuyển đổi */}
              <div className="mt-8">
                <div className="flex border-b border-gray-300 mb-4">
                  {["Xem Phim", "Nội Dung", "Thông Tin"].map((title, index) => (
                    <button
                      key={index}
                      className={`flex-1 text-center py-2 font-medium ${
                        activeTab === index ? "text-white" : "text-gray-500"
                      }`}
                      onClick={() => setActiveTab(index)}
                    >
                      {title}
                    </button>
                  ))}
                </div>

                {/* Nội dung tab */}
                <div className="p-4 shadow-md rounded-b">
                  {activeTab === 0 && (
                    <div>
                      {linkEmbeds.length > 0 ? (
                        <div className="flex gap-5 flex-wrap justify-center">
                          {linkEmbeds.map((server, index) => (
                            <button
                              key={index}
                              onClick={() =>
                                setSelectedEpisode(server.link_embed)
                              } // Lưu link tập phim
                              className="border-[1px] border-gray-300 rounded-lg p-2 w-24 text-center hover:bg-gray-200 hover:text-gray-800"
                            >
                              {linkEmbeds.length > 1
                                ? `Tập ${index + 1}`
                                : "Xem phim"}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p>Không tìm thấy tập phim nào.</p>
                      )}
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
                      </p>
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

            {/* Sidebar */}
            <div className="w-1/4 hidden lg:block p-4">
              <p>Sidebar</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
