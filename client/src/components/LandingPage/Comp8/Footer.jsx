import React, { useState, useEffect } from 'react';
import Color from '../../../assets/Colors';
import Android from '../../../assets/app_android.svg';

import Apple from '../../../assets/app_apple.svg';
import Des from '../../../assets/app_desktop.svg';
import S1 from '../../../assets/social_discord_2.svg';
import S2 from '../../../assets/social_dribbble_2.svg';
import S3 from '../../../assets/social_facebook_2.svg';
import S4 from '../../../assets/social_instagram_2.svg';
import S5 from '../../../assets/social_twitter_2.svg';
import S6 from '../../../assets/social_youtube_2.svg';

function Footer() {
  const data = ['Buea', 'Limbe', 'Younde', 'Douala', 'Kouserri', 'Baffousam'];
  const [stateToggler, setstateToggler] = useState(null);
  const [i, setI] = useState(0);

  useEffect(() => {
    setstateToggler(data[i]);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (i < data.length) {
        setI((prev) => prev + 1);
        setstateToggler(data[i]);
      } else {
        setI(0);
      }
    }, 1000);
  }, [i]);

  return (
    <div
      style={{
        color: Color.secondary,
      }}
    >
      <div
        className=" pt-5"
        style={{
          color: Color.secondary,
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        <div className="pl-4 pr-3 pt-4 ml-1">
          <p className="font-weight-bold text-dark pb-3">Discover</p>
          <p>Free careers</p>
          <p> Marketplace</p>
          <p> Hire us </p>
          <p> Showcase </p>
          <p> Sell animations </p>
          <p> Telegram sticker packs</p>
        </div>
        <div className="pl-4 pr-3 pt-4 ml-1">
          <p className="font-weight-bold text-dark pb-3">Design</p>
          <p>Adobe After Effects plugin</p>
          <p>Lottie Preview</p>
          <p>Lottie Editor</p>
          <p>SVG to Lottie</p>
          <p>Sell animations</p>
          <p>Figma Plugin</p>
        </div>
        <div className="pl-4 pr-3 pt-4 ml-1">
          <p className="font-weight-bold text-dark pb-3">Code</p>
          <p>Web Player</p>
          <p>Lottie Libraries</p>
          <p>JSON Editor</p>
          <p>Supported Features</p>
        </div>
        <div className="pl-4 pr-3 pt-4 ml-1">
          <p className="font-weight-bold text-dark pb-3">Learn</p>
          <p>Blog</p>
          <p>Courses</p>
          <p>What is Lottie</p>
          <p>Forum</p>
          <p>FAQ & Support</p>
        </div>
        <div className="pl-4 pr-3 pt-4 ml-1">
          <p className="font-weight-bold text-dark pb-3">Terms and Policies</p>
          <p>Privacy Policy</p>
          <p>Terms and Conditions</p>
          <p>Community Guidelines</p>
          <p>Upload Guidelines</p>
        </div>
        <div className="pl-4 pr-3 pt-4 ml-1">
          <p className="font-weight-bold text-dark pb-3">
            Get LottieFiles for mobile and desktop
          </p>
          <img src={Android} className="pr-4" />
          <img src={Apple} className="pr-4" />
          <img src={Des} className="pr-4" />

          <p className="font-weight-bold text-dark pt-5">Social</p>
          <div className="d-flex">
            <img src={S3} className="pr-2" />
            <img src={S4} className="pr-2" />
            <img src={S5} className="pr-2" />
            <img src={S6} className="pr-2" />

            <img src={S2} className="pr-2" />

            <img src={S1} className="pr-2" />
          </div>
        </div>
      </div>
      <div className="row pt-5">
        <p className="col-md-4 col-sm-12">
          LottieFiles is by Design Barn Inc. Copyright © 2021 Design Barn Inc.
          All rights reserved
        </p>
        <p className="col-md-4 col-sm-12 mt-3">
          Made with
          <i
            class="fas fa-heart pl-2 pr-3"
            style={{
              color: '#E14033',
            }}
          ></i>
          from
          <span className="p-3 places">{stateToggler}</span>
        </p>
        <div className=" row col-md-4 col-sm-12 pt-5">
          <p className=" col-md-2 col-sm-12">Feedback</p>
          <p className=" col-md-2 col-sm-12">Press</p>
          <p className=" col-md-5 col-sm-12">Meet the team</p>
          <p className=" col-md-2 col-sm-12">Careers</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
