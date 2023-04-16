import React from 'react';
import CustomButton from './CustomButton';
import { getContrastingColor } from '../config/helpers';
import state from '../store';
import { useSnapshot } from 'valtio';


const FilePicker = ({ file, setFile, readFile }) => {
    const snap = useSnapshot(state)
    return (
        <div className='filepicker-container'>
            <div className={`flex flex-col flex-1`}>
                <input
                    id='file-upload'
                    type='file'
                    accept='image/*'
                    onChange={(e) => setFile(e.target.files[0])}

                />
                <label
                    htmlFor='file-upload'
                    className={`filepicker-label text-${getContrastingColor(snap.color)}`}
                >
                    Upload file
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