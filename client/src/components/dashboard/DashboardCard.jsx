import React from 'react';
import { COLORS_PALLETE } from '../../constant';

function DashboardCard(props) {
    const {data, index} = props
    const color = COLORS_PALLETE[index]
    return (
        <div className='w-[250px]'>
            <div className='max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-sm h-64'
                style={{background: `${color
                }`}}
            >
                <div className='flex justify-center items-center w-full h-full'>
                    <div className='flex flex-col items-center'>
                        <h1 className='text-xl text-white font-medium'>
                            {data.name}
                        </h1>
                        <span className='text-sm text-white'>
                            Has {data.cards.length} task
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardCard;
