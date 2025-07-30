import React from "next";
import { css } from "../../../styled-system/css";
import HMeta from "../../components/headermeta";
import Layout from "../../layout/main";
import Image from "next/image";
import Link from "next/link";
import {
  ProfileHead,
  ProfileBody,
  ProfileContactLink,
  ProfileCenter,
} from "../../components/profile";
import { useState, useEffect } from "react";

export default function Index({ data }) {
  return (
    <Layout>
      <HMeta pageTitle="Videos" />
      <div>
        <ProfileCenter>
          <div className={css({ paddingY: "40px" })}>
            <ProfileHead>Videos</ProfileHead>
          </div>
        </ProfileCenter>
        <div
          className={css({
            background: "#2a0071",
          })}
        >
          <ProfileBody>
            <div className={css({ padding: "20px" })}>
              <Link
                href="/videos/player?p=myvideo_makebynotebooklm.mp4"
                className={css({
                  borderRadius: "10px",
                  background: "#c1d0ff22",
                  padding: "10px",
                  width: "100%",
                  maxWidth: "500px",
                  margin: "0 auto",
                  display: "block",
                  textAlign: "center",
                  textDecoration: "none",
                })}
              >
              <Image
                className={css({
                  borderRadius: "10px",
                  marginBottom: "10px",
                  objectFit: "cover",
                  width: "100%",
                })}
                src="/images/videopreview.png"
                alt="Video Preview"
                layout="responsive"
                width={500}
                height={300}
              />
              <div className={css({ padding: "10px", color: "#fff" })}>
                introducing nknight amamiya
              </div>
            </Link>
            </div>
          </ProfileBody>
        </div>
      </div>
    </Layout>
  );
}
