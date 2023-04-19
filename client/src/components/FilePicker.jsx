import React, { useState } from 'react';
import CustomButton from './CustomButton';
import { getContrastingColor } from '../config/helpers';
import state from '../store';
import { useSnapshot } from 'valtio';
import { BiLoaderAlt } from "react-icons/bi"


const FilePicker = ({ file, setFile, readFile }) => {
    const snap = useSnapshot(state);
    const [isLoading, setIsLoading] = useState(false)

    const fileUploadHandler = (e) => {
        console.log("Inside the upload handler")
        setIsLoading(true)
        file !== '' ? setIsLoading(false) : setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 7000);
    }

    return (
        <div className='filepicker-container'>
            <div className={`flex flex-col flex-1`}>
                <input
                    id='file-upload'
                    type='file'
                    accept='image/*'
                    onClick={fileUploadHandler}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <label
                    htmlFor='file-upload'
                    className={`filepicker-label flex gap-2 items-center text-${getContrastingColor(snap.color)}`}
                >
                    <span>Upload file</span>
                    {
                        isLoading && <BiLoaderAlt className='animate-spin' />
                    }
                </label>
                <p className='mt-2 text-xs text-gray-900 truncate'>
                    {
                        file === '' ? "No file choosen" : file.name
                    }
                </p>
            </div>
            <div className='flex flex-wrap gap-3 mt-4'>
                <CustomButton
                    type="outline"
                    title="Logo"
                    handleClick={() => readFile('logo')}
                    customStyles="text-xs"
                />
                <CustomButton
                    type="filled"
                    title="Full"
                    handleClick={() => readFile('full')}
                    customStyles="text-xs"
                />
            </div>
        </div>
    )
}

export default FilePicker   