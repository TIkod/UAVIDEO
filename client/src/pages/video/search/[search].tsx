import React from 'react'
import { GetServerSideProps } from 'next'
import axios, { AxiosResponse } from 'axios'
import { IVideo } from '@/types/video.user.type'
import PrivateRoute from '@/components/System/PrivateRoute'
import MainLayout from '@/layouts/MainLayout'
import { useRouter } from 'next/router'


const SearchPage = ({ videos }: { videos: IVideo[] }) => {

    const router = useRouter()

    return (
        <MainLayout>
            <PrivateRoute>
                {
                    videos.length != 0 ?
                        <>
                            <div className="container mx-auto py-8">
                                <h1 className="text-4xl font-bold mb-4">результат пошуку</h1>
                                <p className="text-lg mb-4">Відео які вдалося знайти за вашим запитом</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {videos.map((video) => (
                                        <div key={video._id} className="bg-white rounded shadow p-4" onClick={() => router.push(`/video/${video._id}`)}>
                                            <img src={process.env.NEXT_PUBLIC_URL_BACK + '/' + video.picturePath} alt={video.name} className="w-full h-48 object-cover mb-4" />
                                            <h2 className="text-lg font-bold">{video.name}</h2>
                                            <p className="text-sm text-gray-500 mb-2">{typeof video.user == "object" ? video.user.name : video.user}</p>
                                            <p className="text-sm text-gray-500">{`${video.viewCount} переглядів`}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                        :
                        <>Не удалось найти видео</>
                }
            </PrivateRoute>
        </MainLayout>
    )
}


export default SearchPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    try {
        const responseVideo: AxiosResponse = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACK}/videos/search?q=${params!.search}`)
        const videos: IVideo[] = responseVideo.data

        return {
            props: {
                videos
            }
        }
    } catch (error) {
        return {
            notFound: true,
        }
    }
}