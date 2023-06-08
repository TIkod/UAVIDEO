import PrivateRoute from '@/components/System/PrivateRoute';
import MainLayout from '@/layouts/MainLayout';
import { RootState } from '@/types/store.type';
import { IVideo } from '@/types/video.user.type';
import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const Recommendations = () => {

    const [videos, setVideos] = useState([] as IVideo[])
    const user: IUser | null = useSelector((store: RootState) => store.auth.user)

    useEffect(() => {
        if (user) {
            axios.get(`${process.env.NEXT_PUBLIC_URL_BACK}/videos/user/${user._id}/tags`)
                .then((response: AxiosResponse) => setVideos(response.data))
        }
    }, [user])

    console.log(videos)

    return (
        <MainLayout>
            <PrivateRoute>
                <div className="container mx-auto py-8">
                    <h1 className="text-4xl font-bold mb-4">Рекомендаційні відео</h1>
                    <p className="text-lg mb-4">Тут ви можете подивитись відео які були підібрані виходячи з ваших уподобань.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {videos.map((video) => (
                            <div key={video._id} className="bg-white rounded shadow p-4">
                                <img src={video.picturePath} alt={video.name} className="w-full h-48 object-cover mb-4" />
                                <h2 className="text-lg font-bold">{video.name}</h2>
                                <p className="text-sm text-gray-500 mb-2">{typeof video.user == "object" ? video.user.name : video.user}</p>
                                <p className="text-sm text-gray-500">{`${video.viewCount} переглядів`}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </PrivateRoute>
        </MainLayout>
    );
}

export default Recommendations
