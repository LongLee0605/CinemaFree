import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCartoon } from "../../redux/slices/cartoonSlice";
import { fetchLatestMovies } from "../../redux/slices/homeSlice";
import { fetchSeries } from "../../redux/slices/seriesSlice";
import { fetchSingle } from "../../redux/slices/singleSlice";
import { fetchTVShow } from "../../redux/slices/tvShowSlice";
import Carousel from "../Carousel/index.jsx";
import CarouselNoHttp from "../CarouselNoHttp/index.jsx";
import Loading from "../Loading/index.jsx";

const Home = () => {
  const dispatch = useDispatch();
  const latestMovies = useSelector((state) => state.latestMovies.items);
  const phimLe = useSelector((state) => state.phimLe.items);
  const phimBo = useSelector((state) => state.phimBo.items);
  const phimHoatHinh = useSelector((state) => state.hoatHinh.items);
  const tvShows = useSelector((state) => state.tvShows.items);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        dispatch(fetchLatestMovies()),
        dispatch(fetchSingle()),
        dispatch(fetchSeries()),
        dispatch(fetchCartoon()),
        dispatch(fetchTVShow()),
      ]);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, [dispatch]);

  // Nếu đang tải, hiển thị animation
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="container">
        <div className="text-center py-4 border-[1px] border-[#fff9]">
          <p className="text-sm">
            Đây là trang web Cinema Free, chuyên Update phim mới
          </p>
        </div>
        <div>
          <div className="flex gap-5">
            <div className="w-full lg:w-[70%] px-4">
              <div>
                <Carousel itemsCarousel={latestMovies} />
              </div>
              <div className="py-5 border-b-[1px] border-[#fff6]">
                <div className="flex justify-between pr-4 items-center">
                  <h2 className="text-lg lg:text-2xl font-semibold text-white">
                    Phim Lẻ Mới
                  </h2>
                  <Link to="/phim-le">
                    <p className="text-sm lg:text-base">Xem thêm</p>
                  </Link>
                </div>
                <div>
                  <CarouselNoHttp itemsCarousel={phimLe} />
                </div>
              </div>
              <div className="py-5 border-b-[1px] border-[#fff6]">
                <div className="flex justify-between pr-4 items-center">
                  <h2 className="text-lg lg:text-2xl font-semibold text-white">
                    Phim Bộ Mới
                  </h2>
                  <Link to="/phim-bo">
                    <p className="text-sm lg:text-base">Xem thêm</p>
                  </Link>
                </div>
                <div>
                  <CarouselNoHttp itemsCarousel={phimBo} />
                </div>
              </div>
              <div className="py-5 border-b-[1px] border-[#fff6]">
                <div className="flex justify-between pr-4 items-center">
                  <h2 className="text-lg lg:text-2xl font-semibold text-white">
                    Phim Hoạt Hình Mới
                  </h2>
                  <Link to="/phim-hoat-hinh">
                    <p className="text-sm lg:text-base">Xem thêm</p>
                  </Link>
                </div>
                <div>
                  <CarouselNoHttp itemsCarousel={phimHoatHinh} />
                </div>
              </div>
              <div className="py-5">
                <div>
                  <div className="flex justify-between pr-4 items-center">
                    <h2 className="text-lg lg:text-2xl font-semibold text-white">
                      TV Show Mới
                    </h2>
                    <Link to="/tv-shows">
                      <p className="text-sm lg:text-base">Xem thêm</p>
                    </Link>
                  </div>
                </div>
                <div>
                  <CarouselNoHttp itemsCarousel={tvShows} />
                </div>
              </div>
            </div>
            <div className="w-[30%] lg:block hidden">SideBar</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
