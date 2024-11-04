import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLatestMovies } from "../../redux/slices/homeSlice";
import { fetchSingle } from "../../redux/slices/singleSlice";
import Carousel from "../Carousel";
const Home = () => {
  const dispatch = useDispatch();
  const latestMovies = useSelector((state) => state.latestMovies.items);
  const phimLe = useSelector((state) => state.phimLe.items);
  useEffect(() => {
    dispatch(fetchLatestMovies());
    dispatch(fetchSingle());
  }, [dispatch]);
  return (
    <>
      <div className="w-[1024px] bg-black h-screen mx-auto">
        <div className="text-center py-4 border-[1px] border-[#fff9]">
          <p className="text-sm">
            Đây là trang web Cinema Free, chuyên Update phim mới
          </p>
        </div>
        <div>
          <div className="flex gap-5">
            <div className="w-[70%] px-4">
              <div>
                <Carousel items={latestMovies} moviesHTTP />
              </div>
              <div>
                <div>
                  <h2>Phim Lẻ Mới Cập Nhật</h2>
                </div>
                <div>
                  <Carousel
                    items={phimLe}
                    infiniteLoop={true}
                    showDots={false}
                    showButtons={true}
                    moviesNoHTTP
                  />
                </div>
              </div>
            </div>
            <div className="w-[30%]">SideBar</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
