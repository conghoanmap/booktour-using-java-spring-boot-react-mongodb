import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import AirportTransferService from "../services/AirportTransferService";
import BreadCrumbs from "../components/BreadCrumbs";
import VehicleCard from "../components/VehicleCard";
import TourCardSkeleton from "../components/TourCardSkeleton";

const tourSkeletons = [
  TourCardSkeleton,
  TourCardSkeleton,
  TourCardSkeleton,
  TourCardSkeleton,
  TourCardSkeleton,
];
const DetailAirportTransfer = () => {
  const { airportTransferId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [airportTransfer, setAirportTransfer] = useState({});
  const location = useLocation();
  const { state } = location.state || {};
  console.log(state);

  useEffect(() => {
    const fetchAirportTransfer = async () => {
      try {
        const response = await AirportTransferService.getAirportTransferById(
          airportTransferId,
          1,
          1
        );
        // console.log(response.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
        setAirportTransfer(response.data);
      } catch (error) {
        console.error("fetchAirportTransfer -> error", error);
      }
    };
    fetchAirportTransfer();
  }, []);
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BreadCrumbs
          pages={[
            {
              name: "Trang chủ",
              href: "/",
              current: false,
            },
            {
              name: "Dịch vụ đưa đón sân bay",
              href: "#",
              current: true,
            },
          ]}
          other={
            state?.airfieldToAddress
              ? `Từ ${state?.airfieldName} đến ${state?.address}`
              : `Từ ${state?.address} đến ${state?.airfieldName}`
          }
        />
      </div>
      <div className="flex bg-cover saturate-50 bg-center h-56 my-5 bg-[url('/src/assets/img/destinations/2/4.png')]">
        <div className="m-auto grid">
          <h3 className="mx-auto font-roboto text-3xl text-white">
            Dịch vụ đưa đón sân bay
          </h3>
          <p className="mx-auto w-2/3 line-clamp-4 text-white md:text-lg text-center">
            Dịch vụ đưa đón sân bay của GoTrip mang đến giải pháp di chuyển tiện
            lợi, nhanh chóng và an toàn, giúp bạn bắt đầu hoặc kết thúc hành
            trình một cách hoàn hảo. Với đội ngũ tài xế chuyên nghiệp, xe đời
            mới, và cam kết đúng giờ, chúng tôi đảm bảo bạn luôn có trải nghiệm
            thoải mái và yên tâm. Dịch vụ đa dạng từ xe cá nhân đến xe nhóm, phù
            hợp với mọi nhu cầu của khách hàng. Đặt trước dễ dàng qua hệ thống
            trực tuyến, bạn chỉ cần thư giãn và tận hưởng hành trình. GoTrip
            đồng hành cùng bạn trên mọi chặng đường!
          </p>
        </div>
      </div>
      <div>
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
              {/* Product grid */}
              <div className="lg:col-span-3 bg-white border">
                {/* Replace with your content */}
                {/* border-4 border-dashed border-gray-200 */}
                {!isLoading ? (
                  <div className="rounded-lg">
                    <div className="grid gap-3">
                      {airportTransfer.vehicles?.length > 0 ? (
                        airportTransfer.vehicles?.map((vehicle, index) => (
                          <VehicleCard key={index} vehicle={vehicle} />
                        ))
                      ) : (
                        <h1>
                          Hiện tại chúng tôi không hỗ trợ đưa đón tại khu vực
                          này
                        </h1>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg">
                    <div className="grid gap-3">
                      {tourSkeletons.map((item, index) => (
                        <div key={index}>{item()}</div>
                      ))}
                    </div>
                  </div>
                )}
                {/* /End replace */}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default DetailAirportTransfer;
