import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Timer from "../UI/Timer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const NewItems = () => {

  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState();

  async function fetchNewNfts() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    )
    setNfts(data);
    setLoading(false)
  }

  useEffect(() => {
    fetchNewNfts()
  }, [])

  const responsiveness = {
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      768: {
        items: 3,
      },
      1024: {
        items: 4,
      },
    },
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
      <div className="row" data-aos="fade-in">
      <div className="col-lg-12">
      <div className="text-center">
          <h2>New Items</h2>
          <div className="small-border bg-color-2"></div>
          </div>
          </div>
          
          {!loading ? (
          <OwlCarousel
            items={4}
            loop={true}
            nav={true}
            margin={12}
            responsive={responsiveness.responsive}>

          {nfts.map((data) => (
            <div className="" key={data.id}>
            <div className="nft__item">
            <div className="author_list_pp">
              <Link to={`/author/${data.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Creator: Monica Lucas">
              <img className="lazy" src={data.authorImage} alt="" />
              <i className="fa fa-check"></i>
              </Link>
            </div>

            {data.expiryDate && (
                <div className="de_countdown">
                <Timer time={data.expiryDate} />
                </div>)}
                <div className="nft__item_wrap">
                <Link to={`/item-details/${data.nftId}`}>
                  <img src={data.nftImage}
                    className="lazy nft__item_preview"
                    alt=""/>
                </Link>
                </div>
                <div className="nft__item_info">
                <Link to={`/item-details/${data.nftId}`}>
                    <h4>{data.title}</h4>
                </Link>
                <div className="nft__item_price">{data.price} ETH</div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{data.likes}</span>
                </div>
                </div>
                </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <OwlCarousel
              items={4}
              loop={true}
              nav={true}
              margin={12}
              responsive={responsiveness.responsive}>
              {new Array(1).fill(0).map((data) => (
                <div className="" key={data.id}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Skeleton width={50} height={50} borderRadius={50} />
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="de_countdown">
                      <Skeleton width={95} height={15} borderRadius={10} />
                    </div>

                    <div className="nft__item_wrap">
                      <Skeleton width={520} height={265} borderRadius={10} />
                    </div>
                    <div className="nft__item_info">
                      <h4>
                        <Skeleton width={150} />
                      </h4>

                      <div className="nft__item_price">
                        <Skeleton width={80} />
                      </div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>
                          <Skeleton width={20} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;