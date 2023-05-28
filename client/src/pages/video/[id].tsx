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


const VideoPage = ({ video, comments }: { video: IVideo, comments: IComment[] }) => {
    const user: IUser | null = useSelector((state: RootState) => state.auth.user)
    const router: NextRouter = useRouter()
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [errorVideo, setErrorVideo] = useState(false);
    const [likeView, setLikeView] = useState(0);
    const [textComment, setTextComment] = useState('');
    const [commentsAll, setCommentsAll] = useState([] as IComment[]);

    useEffect(() => {
        setCommentsAll(comments)
        fetchVideo();
        upCountView();
        if (video) {
            setLikeView(video.likeCount)
        }
    }, []);


    const fetchVideo = async (): Promise<void> => {
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


    const upCountView = async (): Promise<void> => {
        if (user && video) {
            axios.post(`${process.env.NEXT_PUBLIC_URL_BACK}/view/${video._id}/${user._id}`);
        }
    }


    const changeLike = async (): Promise<void> => {
        if (user && video) {
            const response: AxiosResponse = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACK}/like/${video._id}/${user._id}`);
            if (response.status == StatusCodes.CREATED) {
                setLikeView(response.data.likeCount)
            }
        }
    }

    const addComment = async (): Promise<void> => {
        try {
            const response: AxiosResponse = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACK}/comments/`, {
                text: textComment,
                videoId: video._id,
                userId: user?._id
            });
            const author = { id: user!._id, name: user!.name, email: user!.email }
            setCommentsAll([...commentsAll, { text: textComment, video: video._id, author: author } as IComment])
        } catch (err) {
            console.error(err);
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
                                <p>Название: {video.name}</p>
                                <p>Описание: {video.description}</p>
                                <p>Количество просмотров: {video.viewCount}</p>
                                <button onClick={changeLike}>Like</button>
                                <p>Лайки: {likeView}</p>
                                <button onClick={() => router.back()}>back</button>
                                <h2>add comment</h2>
                                <textarea value={textComment} onChange={(e) => setTextComment(e.target.value)}></textarea>
                                <button onClick={addComment}>add comment</button>
                                <h3>comments</h3>
                                {
                                    commentsAll.map((comment: IComment) => (
                                        <div>
                                            <p>{comment.author.name}  {comment.author.email}</p>
                                            <p>{comment.text}</p>
                                        </div>
                                    ))
                                }
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
        const responseVideo: AxiosResponse = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACK}/videos/${params!.id}`)
        const video: IVideo | '' = responseVideo.data

        const responseComments: AxiosResponse = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACK}/comments/${params!.id}`)
        const comments: IComment[] = responseComments.data

        return {
            props: {
                video,
                comments
            }
        }
    } catch (error) {
        return {
            notFound: true,
        }
    }
}