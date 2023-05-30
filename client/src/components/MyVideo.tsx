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


    //const videos: IVideo[] = useSelector((state: RootState) => state.videoAuth.videos)

    const videos: any = [
        { _id: '32131', picturePath: "https://i.ytimg.com/vi/wxsck_WCtf0/maxresdefault.jpg", name: "Розробка додаток на nest", viewCount: 2 },
        { _id: '32131', picturePath: "https://png.pngtree.com/thumb_back/fw800/back_our/20190621/ourmid/pngtree-music-headset-red-simple-banner-image_174717.jpg", name: "топ 10 крутих хітів цього літа", viewCount: 0 },
        { _id: '32131', picturePath: "https://yablyk.com/wp-content/uploads/2018/05/lifehack-banner.jpg", name: "Лайфхаки які спростили вам життя", viewCount: 0 },
        { _id: '32131', picturePath: "https://apostrophe.ua/uploads/image/9ee323e2dff17c2ab371024e29cb4250.jpg", name: "Яка професія буде актуальною у 2024 році", viewCount: 4 },
        { _id: '32131', picturePath: "https://img.freepik.com/premium-vector/mathematics-word-concepts-banner-presentation-website-isolated-lettering-typography-idea-with-linear-icons-algebra-geometry-statistics-basic-maths-vector-outline-illustration_106317-11228.jpg", name: "Математика для учнів 5 класу – просто", viewCount: 1 },
        { _id: '32131', picturePath: "https://slovyanka.com/wp-content/uploads/2017/05/87979009.jpg", name: "Моя поїзди до карпатів. Мій влог", viewCount: 3 },
        { _id: '32131', picturePath: "https://balthazar.club/uploads/posts/2022-10/1666233840_2-balthazar-club-p-svadebnii-tort-kremovogo-tsveta-oboi-2.jpg", name: "Готуємо торт із печива за 15 хвилин", viewCount: 6 },
    ]

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
                    <div key={video._id} className="bg-white shadow rounded p-4">
                        <img src={video.picturePath} alt={video.name} className="w-full h-40 object-cover mb-2" />
                        <h2 className="text-xl font-semibold">{video.name}</h2>
                        <p className="text-gray-500">Перегляди: {video.viewCount}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyVideo