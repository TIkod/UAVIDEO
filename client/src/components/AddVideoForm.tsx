import React, { useState } from 'react';

const VideoForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [videoFile, setVideoFile] = useState<File | null>(null);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    };

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: File | undefined = e.target.files?.[0];
        if (file) {
            setVideoFile(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();


        setTitle('');
        setDescription('');
        setVideoFile(null);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Название видео:
                    <input type="text" value={title} onChange={handleTitleChange} />
                </label>
            </div>
            <div>
                <label>
                    Описание видео:
                    <input type="text" value={description} onChange={handleDescriptionChange} />
                </label>
            </div>
            <div>
                <label>
                    Видео файл:
                    <input type="file" accept="video/*" onChange={handleVideoChange} />
                </label>
            </div>
            <button type="submit">Добавить видео</button>
        </form>
    );
};

export default VideoForm;
