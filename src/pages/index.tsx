import React from "next";
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
import SplitText from "../components/animations/SplitText/SplitText";
import AnimatedContent from "../components/AnimatedContent/AnimatedContent";
import TextType from "../components/animations/TextType/TextType";
import CurvedLoop from "../components/animations/CurvedLoop/CurvedLoop";

export default function Index({ data }) {
  const [repos, setRepos] = useState(null);
  const based_duration = 0.6;
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
          <AnimatedContent
            direction="vertical"
            duration={based_duration}
            ease="ease.in"
            initialOpacity={0}
            animateOpacity
            threshold={0.2}
            delay={0.3}
          >
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
          </AnimatedContent>

          <div
            className={css({
              fontSize: "30px",
              padding: "20px",
              display: "flex",
              textAlign: "center",
              flexDirection: "column",
            })}
          >
            <AnimatedContent
              direction="vertical"
              duration={based_duration + 0.2}
              ease="ease.in"
              initialOpacity={0}
              animateOpacity
              threshold={0.2}
              delay={0.3}
            >
              <SplitText text="Hello!" duration={0.5} />
            </AnimatedContent>

            <AnimatedContent
              direction="vertical"
              ease="ease.in"
              initialOpacity={0}
              animateOpacity
              threshold={0.2}
              delay={0.3}
            >
              <SplitText text="I'm Nknight AMAMIYA." duration={1} />
            </AnimatedContent>
          </div>

          <Link
            href={"/whoareyou?im=amamiya"}
            className={css({
              color: "#f0d0ff",
              fontSize: "20px",
              textDecoration: "underline",
            })}
          >
            <AnimatedContent
              direction="vertical"
              ease="ease.in"
              initialOpacity={0}
              animateOpacity
              threshold={0.2}
              delay={0.3}
            >
              
              Who are you?
            </AnimatedContent>
          </Link>
        </ProfileCenter>
        <div>
          <AnimatedContent
            direction="vertical"
            ease="ease.in"
            initialOpacity={0}
            animateOpacity
            threshold={0.2}
            delay={0.3}
          >
            <ProfileHead>
              <SplitText text="Skills" duration={1} />
            </ProfileHead>
          </AnimatedContent>

          <ProfileBody>
            <AnimatedContent
              direction="vertical"
              ease="ease.in"
              initialOpacity={0}
              animateOpacity
              threshold={0.2}
              delay={0.3}
            >
              <div className={css({ fontSize: "20px" })}>
                <SplitText duration={1} delay={30} text="javascript, typescript, c#, Nextjs and React" />
              </div>
            </AnimatedContent>
          </ProfileBody>

          <div className={css({ paddingTop: "30vh" })}>
            <ProfileHead>Repos</ProfileHead>
            <ProfileBody>
              <ProfileContactLink href={"https://github.com/nknighta/vx"}>
                VX
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
              <ProfileContactLink href={"/x"}>
                Twitter @ama_dev_1
              </ProfileContactLink>

              <ProfileContactLink href={"/g"}>
                GitHub @nknighta
              </ProfileContactLink>

              <ProfileContactLink href={"/i"}>
                Instagram @ama_p0627
              </ProfileContactLink>

              <ProfileContactLink href={"/q"}>
                Qiita @amamiya_dev
              </ProfileContactLink>
            </ProfileBody>
          </div>

          <ProfileHead>Images</ProfileHead>
          <ProfileBody>
            <ProfileCenter>
              <AnimatedContent delay={0.2}>
                <Image
                  src={
                    "https://images.microcms-assets.io/assets/a2939c8d25434ae5a1f853f2dc239a0f/b52fcd2616084cd6b453d512e8591d7a/header.png?fm=webp&w=500&h=300&q=90"
                  }
                  width={500}
                  height={300}
                  alt="header"
                />
              </AnimatedContent>
              <AnimatedContent delay={0.4}>
                <Image
                  src={
                    "https://images.microcms-assets.io/assets/a2939c8d25434ae5a1f853f2dc239a0f/31d6d24b062c4eb494a6567795f84e3e/home.png?fm=webp&w=500&h=300&q=90"
                  }
                  width={500}
                  height={300}
                  alt="header"
                />
              </AnimatedContent>
            </ProfileCenter>
          </ProfileBody>
        </div>
      </div>
    </Layout>
  );
}
