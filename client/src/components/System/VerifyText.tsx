import React from 'react'

const VerifyText = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md px-4 py-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-center mb-4">
                    Підтвердження аккаунта
                </h1>
                <p className="text-center mb-6">
                    На вашу пошту було відправлено СМС з посиланням для підтвердження аккаунта.
                    Будь ласка, перейдіть до неї, щоб підтвердити ваш аккаунт.
                </p>
            </div>
        </div>
    );
}

export default VerifyText