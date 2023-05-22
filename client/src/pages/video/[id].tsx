import React, { useEffect, useRef, useState } from 'react'
import { NextRouter, useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import axios, { AxiosResponse } from 'axios'
import { IVideo } from '@/types/video.user.type'
import { StatusCodes } from 'http-status-codes'
import { useSelector } from 'react-redux'
import { RootState } from '@/types/store.type'
import PrivateRoute from '@/components/System/PrivateRoute'
import MainLayout from '../../layouts/MainLayout'


const VideoPage = ({ video }: { video: IVideo }) => {
    const user: IUser | null = useSelector((state: RootState) => state.auth.user)
    const router: NextRouter = useRouter()
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [errorVideo, setErrorVideo] = useState(false);
    const [countView, setCountView] = useState(0);

    useEffect(() => {
        fetchVideo();
        upCountView();
    }, []);


    const fetchVideo = async () => {
        try {
            const response: AxiosResponse = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACK}/videos/stream/${video._id}`, {
                responseType: 'arraybuffer',
            });

            if (response.status == StatusCodes.OK) {
                const videoBlob: Blob = new Blob([response.data], { type: 'video/mp4' });
                const videoUrl: string = URL.createObjectURL(videoBlob);
                if (videoRef.current) {
                    videoRef.current.src = videoUrl;
                } else {
                    setErrorVideo(true);
                }
            }
        } catch (error) {
            setErrorVideo(true);
        }
    };


    const upCountView = async () => {
        if (user && video) {
            const response: AxiosResponse = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACK}/view/${video._id}/${user._id}`);
            if (response.status == StatusCodes.CREATED) {
                setCountView(response.data.views);
            } else {
                setCountView(video.viewCount);
            }
        }
    }

    if (errorVideo) {
        return <h1>Ошибка загрузки видео :( </h1>
    } else {
        return (
            <MainLayout>
                <PrivateRoute>
                    {
                        video ?
                            <>
                                <video ref={videoRef} controls style={{ width: "300px" }} />
                                <p>Название {video.name}</p>
                                <p>Описание {video.description}</p>
                                <p>Количество просмотров {video.viewCount}</p>
                                <button onClick={() => router.back()}>back</button>
                            </>
                            :
                            <>Идет загрузка</>
                    }
                </PrivateRoute>
            </MainLayout>
        )
    }
}


export default VideoPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    try {
        const response: AxiosResponse = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACK}/videos/${params!.id}`)
        const video: IVideo | '' = response.data

        return {
            props: {
                video
            }
        }
    } catch (error) {
        return {
            notFound: true,
        }
    }
}