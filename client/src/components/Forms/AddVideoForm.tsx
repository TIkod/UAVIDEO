import { useState } from 'react';
import axios from 'axios';
import { AppDispatch } from '@/types/store.type';
import { useDispatch } from 'react-redux';

interface AddVideoFormProps {
    id: string;
}

const AddVideoForm: React.FC<AddVideoFormProps> = ({ id }) => {

    const dispatch: AppDispatch = useDispatch()

    const [videoData, setVideoData] = useState({
        name: '',
        description: '',
        video: {},
        picture: {},
        user: id,
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setVideoData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    };

    return (
        <div>
            <h1>Add Video</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={videoData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={videoData.description}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="videoPath">Video:</label>
                    <input
                        type="file"
                        id="videoPath"
                        name="videoPath"
                        accept='video/*'
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="picturePath">Picture:</label>
                    <input
                        type="file"
                        id="picturePath"
                        name="picturePath"
                        accept='image/*'
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Add Video</button>
            </form>
        </div>
    );
};

export default AddVideoForm;
