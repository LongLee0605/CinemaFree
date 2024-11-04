import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCartoon } from "../../redux/slices/cartoonSlice";
import { fetchLatestMovies } from "../../redux/slices/homeSlice";
import { fetchSeries } from "../../redux/slices/seriesSlice";
import { fetchSingle } from "../../redux/slices/singleSlice";
import { fetchTVShow } from "../../redux/slices/tvShowSlice";
import Carousel from "../Carousel";
import CarouselNoHttp from "../CarouselNoHttp";
const Home = () => {
  const dispatch = useDispatch();
  const latestMovies = useSelector((state) => state.latestMovies.items);
  const phimLe = useSelector((state) => state.phimLe.items);
  const phimBo = useSelector((state) => state.phimBo.items);
  const phimHoatHinh = useSelector((state) => state.hoatHinh.items);
  const tvShows = useSelector((state) => state.tvShows.items);
  useEffect(() => {
    dispatch(fetchLatestMovies());
    dispatch(fetchSingle());
    dispatch(fetchSeries());
    dispatch(fetchCartoon());
    dispatch(fetchTVShow());
  }, [dispatch]);
  return (
    <>
      <div className="w-[1240px] bg-black mx-auto">
        <div className="text-center py-4 border-[1px] border-[#fff9]">
          <p className="text-sm">
            Đây là trang web Cinema Free, chuyên Update phim mới
          </p>
        </div>
        <div>
          <div className="flex gap-5">
            <div className="w-[70%] px-4">
              <div>
                <Carousel items={latestMovies} />
              </div>
              <div className="py-5 border-b-[1px] border-[#fff6]">
                <div className="flex justify-between pr-4">
                  <h2 className="text-2xl font-semibold text-white">
                    Phim Lẻ Mới Cập Nhật
                  </h2>
                  <Link to="/phim-le">
                    <p>Xem thêm</p>
                  </Link>
                </div>
                <div>
                  <CarouselNoHttp items={phimLe} />
                </div>
              </div>
              <div className="py-5 border-b-[1px] border-[#fff6]">
                <div className="flex justify-between pr-4">
                  <h2 className="text-2xl font-semibold text-white">
                    Phim Bộ Mới Cập Nhật
                  </h2>
                  <Link to="/phim-bo">
                    <p>Xem thêm</p>
                  </Link>
                </div>
                <div>
                  <CarouselNoHttp items={phimBo} />
                </div>
              </div>
              <div className="py-5 border-b-[1px] border-[#fff6]">
                <div className="flex justify-between pr-4">
                  <h2 className="text-2xl font-semibold text-white">
                    Phim Hoạt Hình Mới Cập Nhật
                  </h2>
                  <Link to="/phim-hoat-hinh">
                    <p>Xem thêm</p>
                  </Link>
                </div>
                <div>
                  <CarouselNoHttp items={phimHoatHinh} />
                </div>
              </div>
              <div className="py-5">
                <div>
                  <div className="flex justify-between pr-4">
                    <h2 className="text-2xl font-semibold text-white">
                      TV Show Mới Cập Nhật
                    </h2>
                    <Link to="/tv-shows">
                      <p>Xem thêm</p>
                    </Link>
                  </div>
                </div>
                <div>
                  <CarouselNoHttp items={tvShows} />
                </div>
              </div>
            </div>
            <div className="w-[30%]">SideBar</div>
          </div>
        </div>
        <div className="text-center border-t-[1px] border-[#fff6] py-5">
          <p>Built and designed by Le Tran Dang Long</p>
          <p>Copyright © 2024 All Rights Reserved</p>
        </div>
      </div>
    </>
  );
};

export default Home;
