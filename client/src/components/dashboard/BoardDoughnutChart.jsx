import React, { useEffect, useState } from 'react';
import { tailwindConfig } from '../../utils/Utils';
import DoughnutChart from '../../charts/DoughnutChart';
import randomColor from 'randomcolor'

const BoardDoughnutChart = ({ data }) => {
    // console.log('MAMAMALKAKA', JSON.stringify(data.value))
    // const [chartData, setChartData] = useState(data || {});
    // const percent =
    let chartData = {};

    data.value = data.value.filter(item => item.count > 0);

    chartData = {
        labels: data.value.map((board) => board.name),
        datasets: [
            {
                label: 'Top Countries',
                data: data.value.map((obj) => obj.count),
                backgroundColor: randomColor({
                    count: data.value.length,
                    // luminosity: 'dark',
                    // format: 'rgba',
                    hue: 'blue'
                    // alpha: 0.5
                  })
                ,
                // hoverBackgroundColor: [
                //     tailwindConfig().theme.colors.indigo[600],
                //     tailwindConfig().theme.colors.blue[500],
                //     tailwindConfig().theme.colors.indigo[900],
                //     '#c4f7a5'
                // ],
                hoverBorderColor: tailwindConfig().theme.colors.white,
            },
        ],
    };

    return (
        <div className='flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200 w-[40%]'>
            <header className='px-5 py-4 border-b border-slate-100'>
                <h2 className='font-semibold text-slate-800'>
                    Goals that you are joining in
                </h2>
            </header>
            {/* Chart built with Chart.js 3 */}
            {/* Change the height attribute to adjust the chart height */}
            <DoughnutChart data={chartData} width={389} height={260} />
        </div>
    );
};

export default BoardDoughnutChart;
