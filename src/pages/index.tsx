import React from "next";
import client from "../utils/cms";
import { css } from "../../styled-system/css";
import HMeta from "../components/headermeta";
import Layout from "../layout/main";
import Image from "next/image";
import Link from "next/link";
import {
  ProfileHead,
  ProfileBody,
  ProfileContactLink,
  ProfileCenter,
} from "../components/profile";
import { useState, useEffect } from "react";

export default function Index({ data }) {
  const [repos, setRepos] = useState(null);

  useEffect(() => {
    const githubrepos = async () => {
      const res = await fetch("https://api.github.com/repos/nknighta/vx");
      const data = await res.json();
      return data;
    };
    const data = githubrepos();
    data.then((data) => setRepos(data));
  }, [data]);
  return (
    <Layout>
      <HMeta pageTitle="Profile" />
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        })}
      >
        <ProfileCenter>
          <Image
            className={css({
              borderRadius: "50%",
              background: "#c1d0ff",
              m: 10,
            })}
            src="https://images.microcms-assets.io/assets/a2939c8d25434ae5a1f853f2dc239a0f/b625a5435e8d4d18ab6c0b5499405b30/icon.jpeg?w=170&h=170&q=50&fm=webp"
            width={200}
            height={200}
            alt="icon"
          />

          <div
            className={css({
              fontSize: "30px",
              padding: "20px",
            })}
          >
            Hello! I'm Nknight AMAMIYA.
          </div>
          <Link
            href={"/whoareyou?im=amamiya"}
            className={css({
              color: "#f0d0ff",
              fontSize: "20px",
              textDecoration: "underline",
            })}
          >
            Who are you?
          </Link>
        </ProfileCenter>
        <div>
          <ProfileHead>Skills</ProfileHead>
          <ProfileBody>
            <p className={css({ fontSize: "20px" })}>
              javascript, typescript, c#, Nextjs and React
            </p>
          </ProfileBody>

          <ProfileHead>Repos</ProfileHead>
          <ProfileBody>
            <ProfileContactLink href={"https://github.com/nknighta/vx"}>
              <p>VX</p>
            </ProfileContactLink>
            <ProfileBody>
              <p>
                Default branch
                {repos && " : " + repos.default_branch}
              </p>
              <p>
                Latest commit
                <span>{repos && " : " + repos.pushed_at}</span>
              </p>

              <p>
                Watchers
                <span>{repos && " : " + repos.watchers}</span>
              </p>
            </ProfileBody>
            <ProfileContactLink
              href={"https://nknighta.github.io/oss-map-weather/"}
            >
              <p>OSS-WEATHER</p>
            </ProfileContactLink>

            <ProfileContactLink
              href={"https://github.com/nknighta/grove-player"}
            >
              <p>Grove Player</p>
            </ProfileContactLink>

            <ProfileContactLink
              href={"https://github.com/nknighta/IndexLanguage"}
            >
              <p>IndexLanguage</p>
            </ProfileContactLink>

            <Link
              href={"/repos"}
              className={css({ color: "#f0d0ff", fontSize: "20px" })}
            >
              and more ...
            </Link>
          </ProfileBody>

          <ProfileHead>Contact</ProfileHead>
          <ProfileBody>
            <ProfileContactLink href={"https://twitter.com/ama_dev_1"}>
              Twitter @ama_dev_1
            </ProfileContactLink>

            <ProfileContactLink href={"https://github.com/nknighta"}>
              GitHub @nknighta
            </ProfileContactLink>

            <ProfileContactLink href={"https://instagram.com/ama_p0627"}>
              Instagram @ama_p0627
            </ProfileContactLink>
          </ProfileBody>

          <ProfileHead>Images</ProfileHead>
          <ProfileBody>
            <ProfileCenter>
              <Image
                src={
                  "https://images.microcms-assets.io/assets/a2939c8d25434ae5a1f853f2dc239a0f/b52fcd2616084cd6b453d512e8591d7a/header.png?fm=webp&w=500&h=300&q=90"
                }
                width={500}
                height={300}
                alt="header"
              />

              <Image
                src={
                  "https://images.microcms-assets.io/assets/a2939c8d25434ae5a1f853f2dc239a0f/31d6d24b062c4eb494a6567795f84e3e/home.png?fm=webp&w=500&h=300&q=90"
                }
                width={500}
                height={300}
                alt="header"
              />
            </ProfileCenter>
          </ProfileBody>
        </div>
      </div>
    </Layout>
  );
}
