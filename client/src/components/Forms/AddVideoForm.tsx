import { useState } from 'react';
import axios from 'axios';
import { AppDispatch } from '@/types/store.type';
import { useDispatch } from 'react-redux';
import { addVideo } from '@/store/features/video.user.slice';

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
        tags: ''
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setVideoData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        dispatch(addVideo(videoData))
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
                        onChange={(e) => {
                            if (e.target.files) setVideoData({ ...videoData, video: e.target.files[0] })
                        }
                        }
                    />
                </div>
                <div>
                    <label htmlFor="picturePath">Picture:</label>
                    <input
                        type="file"
                        id="picturePath"
                        name="picturePath"
                        accept='image/*'
                        onChange={(e) => {
                            if (e.target.files) setVideoData({ ...videoData, picture: e.target.files[0] })
                        }
                        }
                    />
                </div>
                <div>
                    <label htmlFor="tags">tags:</label>
                    <textarea
                        id="tags"
                        name="tags"
                        value={videoData.tags}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Add Video</button>
            </form>
        </div>
    );
};

export default AddVideoForm;
