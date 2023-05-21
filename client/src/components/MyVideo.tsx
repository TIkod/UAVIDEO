import { loadVideos } from '@/store/features/video.user.slice';
import { AppDispatch, RootState } from '@/types/store.type'
import { IVideo } from '@/types/video.user.type';
import React, { ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface MyVideoProps {
    userID: string,
    count: number,
    offset: number
}

const MyVideo: React.FC<MyVideoProps> = ({ userID, count, offset }) => {

    const videos: IVideo[] = useSelector((state: RootState) => state.videoAuth.videos)
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(loadVideos({ userID, count, offset }))
    }, [])


    return (
        <>
            {
                videos.map((v: IVideo): ReactElement => (
                    <div key={v.name}>
                        <p>
                            <img src={process.env.NEXT_PUBLIC_URL_BACK + '/' + v.picturePath} alt="banner" style={{ width: "200px", height: "100px" }} />
                        </p>
                        <p>{v.name}</p>
                    </div>
                ))
            }
        </>
    )
}

export default MyVideo