import MyVideo from '@/components/MyVideo'
import AddVideoForm from '../../components/Forms/AddVideoForm'
import PrivateRoute from '@/components/System/PrivateRoute'
import MainLayout from '@/layouts/MainLayout'
import { RootState } from '@/types/store.type'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const profile: React.FC = () => {
    const user: IUser | null = useSelector((state: RootState) => state.auth.user)

    const videos = [
        { id: 1, title: 'Видео 1' },
        { id: 2, title: 'Видео 2' },
        { id: 3, title: 'Видео 3' },
    ];
    const [videoTitle, setVideoTitle] = useState('');
    const [videoDescription, setVideoDescription] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [hashtags, setHashtags] = useState<string[]>([]);
    const [currentHashtag, setCurrentHashtag] = useState('');

    const handleVideoTitleChange = (e: any) => {
        setVideoTitle(e.target.value);
    };

    const handleVideoDescriptionChange = (e: any) => {
        setVideoDescription(e.target.value);
    };

    const handleVideoFileChange = (e: any) => {
        const file = e.target.files[0];
        setVideoFile(file);
    };

    const handleImageFileChange = (e: any) => {
        const file = e.target.files[0];
        setImageFile(file);
    };

    const handleHashtagChange = (e: any) => {
        setCurrentHashtag(e.target.value);
    };

    const handleHashtagKeyDown = (e: any) => {
        if (e.key === ' ') {
            e.preventDefault();
            if (currentHashtag.trim() !== '') {
                setHashtags([...hashtags, '#' + currentHashtag.trim()]);
                setCurrentHashtag('');
            }
        }
    };

    return (
        <MainLayout>
            <PrivateRoute>
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                    <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                        <h1 className="text-2xl font-bold mb-4">Профіль користувача</h1>
                        <h2 className="text-lg font-semibold mb-2">Профіль</h2>
                        <div className="mb-4">
                            <label className="text-gray-700">Ім'я:</label>
                            <p className="text-gray-900">{user?.name}</p>
                        </div>
                        <div className="mb-4">
                            <label className="text-gray-700">Пошта:</label>
                            <p className="text-gray-900">{user?.email}</p>
                        </div>
                        <h2 className="text-lg font-semibold mb-2">Добавити відео</h2>
                        <form className="mb-4">
                            <div className="mb-4">
                                <label htmlFor="videoTitle" className="text-gray-700">
                                    Назва відео:
                                </label>
                                <input
                                    type="text"
                                    id="videoTitle"
                                    className="border border-gray-300 px-3 py-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                    value={videoTitle}
                                    onChange={handleVideoTitleChange}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="videoDescription" className="text-gray-700">
                                    Опис відео:
                                </label>
                                <textarea
                                    id="videoDescription"
                                    className="border border-gray-300 px-3 py-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                    rows={4}
                                    value={videoDescription}
                                    onChange={handleVideoDescriptionChange}
                                ></textarea>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="videoFile" className="text-gray-700">
                                    Завантажити відео:
                                </label>
                                <input
                                    type="file"
                                    id="videoFile"
                                    className="focus:outline-none"
                                    accept="video/*"
                                    onChange={handleVideoFileChange}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="imageFile" className="text-gray-700">
                                    Завантажити зображення:
                                </label>
                                <input
                                    type="file"
                                    id="imageFile"
                                    className="focus:outline-none"
                                    accept="image/*"
                                    onChange={handleImageFileChange}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="hashtags" className="text-gray-700">
                                    Хештеги:
                                </label>
                                <input
                                    type="text"
                                    id="hashtags"
                                    className="border border-gray-300 px-3 py-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                    value={currentHashtag}
                                    onChange={handleHashtagChange}
                                    onKeyDown={handleHashtagKeyDown}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="text-gray-700">Вибрані хештеги:</label>
                                <ul className="list-disc ml-6">
                                    {hashtags.map((tag, index) => (
                                        <li key={index}>{tag}</li>
                                    ))}
                                </ul>
                            </div>

                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            >
                                Відправити
                            </button>
                        </form>
                    </div>
                </div>

                {user ? <MyVideo userID={user!._id} offset={0} count={5} /> : <></>}

            </PrivateRoute>
        </MainLayout>
    )
}

export default profile