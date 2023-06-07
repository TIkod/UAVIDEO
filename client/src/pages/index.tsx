import MainLayout from '@/layouts/MainLayout';
import { IStats } from '@/types/stats.type';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

const HomePage: React.FC = () => {

    const [stats, setStats] = useState([] as IStats[])


    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_URL_BACK}/statistic`)
            .then((response: AxiosResponse) => {
                const data: { views: number, videos: number, users: number } = response.data
                setStats([
                    { id: 1, name: 'Стільки людей зараз дивиться український контент', value: `${data.users} користувачів` },
                    { id: 2, name: 'стільки відео радують і дарують гарний настрій', value: `${data.videos} відеороликів` },
                    { id: 3, name: 'Стільки разів користувачі сайту побачили відео наших блогерів', value: `${data.views} відеопереглядів` },
                ])
            })
    }, [])

    return (
        <MainLayout>
            <main className="container mx-auto px-4 py-8">
                <section>
                    <div className="bg-white py-24 sm:py-32">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <h1 className="text-3xl font-bold text-center" style={{ marginBottom: "80px" }}>Наші показники</h1>
                            <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
                                {stats.map((stat) => (
                                    <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                                        <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
                                        <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                                            {stat.value}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold">Основна мета</h2>
                    <p className="text-lg mt-2">
                        Основною метою є реалізація повністю українського продукту для українських користувачів. Це допоможе підняти кількість та популярність українських блогерів, монтажерів, дизайнерів та інших творчих професій у сфері відеоконтенту.
                    </p>
                </section>
                <section>
                    <h2 className="text-2xl font-bold">Опис сервісу</h2>
                    <p className="text-lg mt-2">
                        Наш відеохостинг забезпечує користувачам можливість завантажувати, переглядати та скачувати відео матеріали. Ми надаємо швидку та стабільну інфраструктуру, що дозволяє користувачам без затримок переглядати відео в високій якості. Крім того, наш сервіс має дружній інтерфейс, який дозволяє легко навігувати та знаходити потрібні відео.
                    </p>
                </section>
            </main>
        </MainLayout >
    );
};

export default HomePage;
