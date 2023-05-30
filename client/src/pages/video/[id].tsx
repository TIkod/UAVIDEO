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

    //<video ref={videoRef} controls style={{ width: "300px" }} />

    const [isPlaying, setIsPlaying] = useState(false);



    if (errorVideo) {
        return <h1>Ошибка загрузки видео :( </h1>
    } else {
        return (
            <MainLayout>
                <PrivateRoute>
                    {
                        video ?
                            <>
                                <div className="w-full bg-gray-100">
                                    <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col md:flex-row md:space-x-8">
                                        <div className="w-full md:w-2/3">
                                            <div className="aspect-w-16 aspect-h-9">
                                                <div className="relative rounded-lg overflow-hidden">
                                                    <video ref={videoRef} controls className="w-full h-full object-cover rounded-lg shadow-lg" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full md:w-1/3 mt-4 md:mt-0">
                                            <h2 className="text-2xl font-bold mb-2">Інтерв'ї, яке варто побачити</h2>

                                            <p className="text-gray-600 mb-4">На цей раз, інтерв'ю яке ми взяли шокує вас. Гість нашого шоу здивує вас з перших хвилин перегляду!</p>

                                            <div className="flex items-center mb-4">
                                                <div className="mr-4">
                                                    <span className="text-gray-600">переглядів: </span>
                                                    <span className="font-bold">12</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-600">Лайки: </span>
                                                    <span className="font-bold">4</span>
                                                </div>
                                            </div>

                                            <button className="bg-red-900 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                                                лайкнути
                                            </button>
                                        </div>
                                    </div>
                                    <div className="max-w-5xl mx-auto px-4 py-8">
                                        <div className="w-full md:w-2/3">
                                            <form>

                                                <div className="mb-4">
                                                    <label htmlFor="comment" className="block text-gray-600 mb-1">
                                                        Коментар
                                                    </label>
                                                    <textarea
                                                        id="comment"
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 resize-none"
                                                        rows={3}
                                                    ></textarea>
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                                                >
                                                    висловитися
                                                </button>
                                            </form>
                                        </div>
                                    </div>

                                    <div className="max-w-5xl mx-auto px-4 py-8">
                                        <h3 className="text-lg font-bold mb-4">Коментарі</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-start">
                                                <div className="flex-shrink-0">
                                                    <img src="https://cdn.segodnya.ua/img/gallery/5066/23/547462_main.jpg" alt="Аватар пользователя" className="w-10 h-10 rounded-full" />
                                                </div>
                                                <div className="ml-4">
                                                    <p className="font-bold">Андрій</p>
                                                    <p>Ось це нічого собі ... Я в шоці звичайно від такого результату подій !!!</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start">
                                                <div className="flex-shrink-0">
                                                    <img src="https://cdn.segodnya.ua/img/gallery/5066/23/547462_main.jpg" alt="Аватар пользователя" className="w-10 h-10 rounded-full" />
                                                </div>
                                                <div className="ml-4">
                                                    <p className="font-bold">Тоня</p>
                                                    <p>Якщо чесно, мені щось не дуже зайшло якось це відео. Минули інтерв'ю були краще :(</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start">
                                                <div className="flex-shrink-0">
                                                    <img src="https://cdn.segodnya.ua/img/gallery/5066/23/547462_main.jpg" alt="Аватар пользователя" className="w-10 h-10 rounded-full" />
                                                </div>
                                                <div className="ml-4">
                                                    <p className="font-bold">Тетяна</p>
                                                    <p>Ось це нічого собі ... Я в шоці звичайно від такого результату подій !!!</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

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