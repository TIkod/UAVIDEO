import { loadVideos } from '@/store/features/video.user.slice';
import { AppDispatch, RootState } from '@/types/store.type'
import { IVideo } from '@/types/video.user.type';
import { NextRouter, useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface MyVideoProps {
    userID: string,
    count: number,
    offset: number
}

const MyVideo: React.FC<MyVideoProps> = ({ userID, count, offset }) => {

    const videos = useSelector((store: RootState) => store.videoAuth.videos)


    const dispatch: AppDispatch = useDispatch();
    const router: NextRouter = useRouter()

    useEffect(() => {
        dispatch(loadVideos({ userID, count, offset }))
    }, [])


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Мої відео</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {videos.map((video: any) => (
                    <div key={video._id} className="bg-white shadow rounded p-4" onClick={() => router.push(`/video/${video._id}`)}>
                        <img src={process.env.NEXT_PUBLIC_URL_BACK + '/' + video.picturePath} alt={video.name} className="w-full h-40 object-cover mb-2" />
                        <h2 className="text-xl font-semibold">{video.name}</h2>
                        <p className="text-gray-500">Перегляди: {video.viewCount}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyVideo