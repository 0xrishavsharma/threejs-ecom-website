import React from 'react';
import CustomButton from "./CustomButton";

const AIPicker = ({ prompt, setPrompt, generatingImg, handleSubmit }) => {
    return (
        <div className='aipicker-container'>
            <textarea
                className='aipicker-textarea'
                placeholder='Ask AI...'
                rows={5}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />
            <div>
                {
                    generatingImg ?
                        <CustomButton
                            type="outline"
                            title="Asking AI..."
                            customStyles="text-xs"
                        />
                        :
                        <div className='flex gap-4'>
                            <CustomButton
                                type="outline"
                                title="AI Logo"
                                customStyles="text-xs"
                                handleClick={() => handleSubmit('logo')}
                            />
                            <CustomButton
                                type="filled"
                                title="AI Full"
                                customStyles="text-xs"
                                handleClick={() => handleSubmit('full')}
                            />
                        </div>
                }
            </div>
        </div>
    )
}

export default AIPicker