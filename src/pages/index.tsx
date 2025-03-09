import React from "next";
import { css } from '../../styled-system/css';
import HMeta from "../components/headermeta";
import Layout from "../layout/main";
import Image from "next/image";
import Link from "next/link";
import { ProfileHead, ProfileBody, ProfileContactLink, ProfileCenter } from "../components/profile";

export default function Index() {
    return (
        <Layout>
            <HMeta pageTitle="Profile" />
            <div className={css({
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
            })}>
                <ProfileCenter>

                    <Image
                        className={css({ borderRadius: "50%", background: "#c1d0ff", m: 10 })}
                        src="https://images.microcms-assets.io/assets/a2939c8d25434ae5a1f853f2dc239a0f/b625a5435e8d4d18ab6c0b5499405b30/icon.jpeg?fit=crop&w=200&h=200" width={200} height={200} alt="icon" />

                    <div className={css({
                        fontSize: "30px",
                        padding: "20px",

                    })}>
                        Hello! I'm Nknight AMAMIYA.
                    </div>
                </ProfileCenter>
                <div>
                    <ProfileHead>Skills</ProfileHead>
                    <ProfileBody>
                        <p className={css({ fontSize: "20px" })}>javascript, typescript, c#, Nextjs and React</p>
                    </ProfileBody>

                    <ProfileHead>Repos</ProfileHead>
                    <ProfileBody>
                        <ProfileContactLink href={"https://github.com/nknighta/vx"}>
                            <p>VX</p>
                        </ProfileContactLink>

                        <ProfileContactLink href={"https://nknighta.github.io/oss-map-weather/"}>
                            <p>OSS-WEATHER</p>
                        </ProfileContactLink>


                        <ProfileContactLink href={"https://github.com/nknighta/grove-player"}>
                            <p>Grove Player</p>
                        </ProfileContactLink>
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
                                src={"https://images.microcms-assets.io/assets/a2939c8d25434ae5a1f853f2dc239a0f/b52fcd2616084cd6b453d512e8591d7a/header.png"}
                                width={500}
                                height={200}
                                alt="header"
                            />
                            
                            <Image
                                src={"https://images.microcms-assets.io/assets/a2939c8d25434ae5a1f853f2dc239a0f/31d6d24b062c4eb494a6567795f84e3e/home.png"}
                                width={500}
                                height={200}
                                alt="header"
                            />
                        </ProfileCenter>
                    </ProfileBody>
                </div>
            </div>
        </Layout>
    )
}