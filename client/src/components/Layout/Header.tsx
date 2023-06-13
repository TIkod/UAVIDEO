import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { AppDispatch, RootState } from '@/types/store.type'
import { NextRouter, useRouter } from 'next/router'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { exit } from '@/store/features/user.slice'
import { RiSearchLine } from 'react-icons/ri';

const navigation = [
    { name: 'Головна', href: '/' },
    { name: 'Новинки', href: '/video/news_videos' },
    { name: 'Рекомендації', href: '/video/recommendations' },
    { name: 'Рандомні відео', href: '/video/random' },
]

function classNames(classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const Header: React.FC = () => {

    const user: IUser | null = useSelector((state: RootState) => state.auth.user)
    const router: NextRouter = useRouter()

    const dispatch: AppDispatch = useDispatch()

    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>

                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((link) => (
                                            <span
                                                key={link.name}
                                                className={classNames(['text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']
                                                )}
                                                onClick={() => router.push(link.href)} style={{ cursor: "pointer" }}
                                            >
                                                {link.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center" style={{ marginRight: "20px" }}>
                                <input
                                    type="text"
                                    placeholder="Поиск видео"
                                    className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none"
                                />
                                <button
                                    type="button"
                                    className="ml-2 px-4 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 focus:outline-none"

                                >
                                    <RiSearchLine className="h-5 w-5" />
                                </button>
                            </div>
                            <div className={classNames(['text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']
                            )} style={{ display: "flex", alignItems: 'center', cursor: 'pointer' }} onClick={() => router.push('/user/profile')}>
                                <div style={{ marginRight: '25px' }}>
                                    {user!.name}
                                </div>
                                <img
                                    className="h-8 w-8 rounded-full"
                                    src="https://cdn.segodnya.ua/img/gallery/5066/23/547462_main.jpg"
                                    alt=""
                                />
                            </div>
                            <div className={classNames(['text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']
                            )} style={{ display: "flex", alignItems: 'center', cursor: 'pointer', textAlign: 'center' }} onClick={() => dispatch(exit())}>
                                <div>
                                    Вийти
                                </div>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((link) => (
                                <Disclosure.Button
                                    key={link.name}
                                    className={classNames(
                                        ['text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'block rounded-md px-3 py-2 text-base font-medium']
                                    )}
                                    onClick={() => router.push(link.href)}
                                >
                                    {link.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}

export default Header