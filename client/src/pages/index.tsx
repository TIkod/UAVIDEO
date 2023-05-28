import MainLayout from '@/layouts/MainLayout';
import RegistrationForm from '../components/Forms/RegistrationForm';

const HomePage: React.FC = () => {
    return (
        <MainLayout>
            <div className="bg-blue-500 text-white p-4">
                <h1 className="text-2xl font-bold">Привет, мир!</h1>
                <p className="mt-2">Это Tailwind CSS в Next.js</p>
            </div>
            <h1>Home</h1>
        </MainLayout>
    );
};

export default HomePage;
