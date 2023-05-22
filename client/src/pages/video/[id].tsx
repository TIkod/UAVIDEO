import React, { useEffect, useRef } from 'react'
import { NextRouter, useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import axios, { AxiosResponse } from 'axios'
import { IVideo } from '@/types/video.user.type'


const VideoPage = ({ video }: { video: IVideo }) => {
    const router: NextRouter = useRouter()

    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL_BACK}/videos/stream/${video._id}`); // Замените "videoId" на фактический идентификатор видео
                if (response.ok) {
                    const videoBlob = await response.blob();
                    const videoUrl = URL.createObjectURL(videoBlob);
                    if (videoRef.current) {
                        videoRef.current.src = videoUrl;
                    }
                } else {
                    console.error('Failed to fetch video');
                }
            } catch (error) {
                console.error('Error fetching video:', error);
            }
        };

        fetchVideo();
    }, []);

    return (
        <div>
            {
                video ?
                    <>
                        <p>{video.name}</p>
                        <p>{video.description}</p>
                        <button onClick={() => router.back()}>back</button>
                        <video ref={videoRef} controls style={{ width: "300px" }} />
                    </>
                    :
                    <>Идет загрузка</>
            }
        </div>
    )
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