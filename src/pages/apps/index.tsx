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
      <HMeta pageTitle="Apps" />
      <div>
        <ProfileCenter>
          <ProfileHead>Apps</ProfileHead>
        </ProfileCenter>
        <div
          className={css({
            background: "#2a0071",
          })}
        >
          <ProfileBody>
            <ProfileCenter>
              <ProfileHead>YTImage-dl</ProfileHead>
            </ProfileCenter>
            <ProfileCenter>
              <Image
                src="https://images.microcms-assets.io/assets/a2939c8d25434ae5a1f853f2dc239a0f/11e26841b33348fa8d701607845f9866/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202025-06-01%20165235.png?fit=fill&fill-color=000021&w=500&h=300"
                alt="Apps Image"
                width={300}
                height={300}
              />
            </ProfileCenter>
            <p>get youtube thumbnail</p>
            <div>
              <ProfileContactLink href="/apps/ytimage-dl">
                <p>App</p>
              </ProfileContactLink>

              <ProfileContactLink href="https://github.com/nknighta/ytimage-dl">
                <p>Repository (HTML version)</p>
              </ProfileContactLink>

              <ProfileCenter>
                <ProfileHead>Grove Player</ProfileHead>
              </ProfileCenter>
              <ProfileContactLink href="/apps/grove">
                <p>App Link (web application)</p>
              </ProfileContactLink>

              <ProfileCenter>
                <ProfileHead>Examples and Playground</ProfileHead>
              </ProfileCenter>
              <ProfileContactLink href="/playground/mdxloadtest">
                <p>mdx load test</p>
              </ProfileContactLink>

            <ProfileCenter>
              <Image
                src="/images/css.png"
                alt="Apps Image"
                width={300}
                height={300}
              />
            </ProfileCenter>
              <ProfileContactLink href="/awesome-css-website">
                <p>Awesome CSS Website</p>
              </ProfileContactLink>
            </div>
          </ProfileBody>
        </div>
      </div>
    </Layout>
  );
}
