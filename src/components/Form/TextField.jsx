import React from 'react';

const TextField = ({...rest}) => {
    return <input {...rest} className="w-full px-4 py-3 rounded-lg ring-blue-200 focus:ring-4 focus:outline-none transition duration-300 border border-gray-300" />
}

export default TextField;
