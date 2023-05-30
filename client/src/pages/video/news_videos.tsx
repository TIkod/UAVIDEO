import MainLayout from '@/layouts/MainLayout';
import React from 'react';

const news_videos = () => {
    const videos = [
        {
            _id: '32131',
            author: "ЯрікБлог",
            picturePath: "https://i.ytimg.com/vi/wxsck_WCtf0/maxresdefault.jpg",
            name: "Розробка додаток на nest",
            viewCount: 2
        },
        {
            _id: '32131',
            author: "Світ Травні",
            picturePath: "https://png.pngtree.com/thumb_back/fw800/back_our/20190621/ourmid/pngtree-music-headset-red-simple-banner-image_174717.jpg",
            name: "топ 10 крутих хітів цього літа",
            viewCount: 0
        },
        {
            _id: '32131',
            author: "Зоряне небо",
            picturePath: "https://yablyk.com/wp-content/uploads/2018/05/lifehack-banner.jpg",
            name: "Лайфхаки які спростили вам життя",
            viewCount: 0
        },
        {
            _id: '32131',
            author: "Наздожене",
            picturePath: "https://balthazar.club/uploads/posts/2022-10/1666233840_2-balthazar-club-p-svadebnii-tort-kremovogo-tsveta-oboi-2.jpg",
            name: "Готуємо торт із печива за 15 хвилин",
            viewCount: 6
        },
        {
            _id: '32131',
            author: "Артурусік",
            picturePath: "https://slovyanka.com/wp-content/uploads/2017/05/87979009.jpg",
            name: "Моя поїзди до карпатів. Мій влог",
            viewCount: 3
        },
        {
            _id: '32131',
            author: "Кирило",
            picturePath: "https://apostrophe.ua/uploads/image/9ee323e2dff17c2ab371024e29cb4250.jpg",
            name: "Яка професія буде актуальною у 2024 році",
            viewCount: 4
        },
        {
            _id: '32131',
            author: "Сьогодні Назавжди",
            picturePath: "https://img.freepik.com/premium-vector/mathematics-word-concepts-banner-presentation-website-isolated-lettering-typography-idea-with-linear-icons-algebra-geometry-statistics-basic-maths-vector-outline-illustration_106317-11228.jpg",
            name: "Математика для учнів 5 класу – просто",
            viewCount: 1
        },
    ];

    return (
        <MainLayout>
            <div className="container mx-auto py-8">
                <h1 className="text-4xl font-bold mb-4">Нові відео</h1>
                <p className="text-lg mb-4">Ви можете переглянути останні додані відео.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {videos.map((video) => (
                        <div key={video._id} className="bg-white rounded shadow p-4">
                            <img src={video.picturePath} alt={video.name} className="w-full h-48 object-cover mb-4" />
                            <h2 className="text-lg font-bold">{video.name}</h2>
                            <p className="text-sm text-gray-500 mb-2">{video.author}</p>
                            <p className="text-sm text-gray-500">{`${video.viewCount} переглядів`}</p>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
};

export default news_videos;
