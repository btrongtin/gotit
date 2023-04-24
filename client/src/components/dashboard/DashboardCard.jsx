import React from 'react';
import { COLORS_PALLETE } from '../../constant';

function DashboardCard(props) {
    const { data, index } = props;
    const color = COLORS_PALLETE[index];
    const bgStyle = [
        // backgroundColor: "#0cbaba"
        'linear-gradient(315deg, #0cbaba 0%, #380036 74%)',
        'linear-gradient(90deg, #FFC300, #FF5733)',
        'linear-gradient(315deg, #63d471 0%, #233329 74%)',
        'linear-gradient(45deg, #E8B1BD, #2E86C1)',
        'linear-gradient(135deg, #c3ec52, #0ba29d)',
        'linear-gradient(180deg, #0B486B, #F56217)',
        'linear-gradient(270deg, #1D4350, #A43931)',
        'linear-gradient(60deg, #29323c, #485563)',
        'linear-gradient(120deg, #f6d365, #fda085)',
        'linear-gradient(225deg, #20E2D7, #F9FEA5)',
        'linear-gradient(300deg, #8A2387, #E94057)',
        'linear-gradient(10deg, #1D4350, #A43931)',
    ];
    return (
        <div className='w-[250px]'>
            <div
                className='max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-sm h-64'
                // style={{background: `${color
                // }`}}
                // style={`backgroundImage: ${bgStyle.backgroundImage}`}
                style={{ backgroundImage: `${bgStyle[index]}` }}
            >
                <div className='flex justify-center items-center w-full h-full'>
                    <div className='flex flex-col items-center'>
                        <h1 className='text-xl text-white font-medium'>
                            {data.name}
                        </h1>
                        <span className='text-sm text-white'>
                            Has {data.count} task
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardCard;
