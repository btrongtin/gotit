import React from 'react';

import Image01 from '../../images/user-36-05.jpg';
import Image02 from '../../images/user-36-06.jpg';
import Image03 from '../../images/user-36-07.jpg';
import Image04 from '../../images/user-36-08.jpg';
import Image05 from '../../images/user-36-09.jpg';
import moment from 'moment';

function UpcomingTasks({tasks}) {

  const customers = [
    {
      id: '0',
      image: Image01,
      name: 'Alex Shatov',
      email: 'alexshatov@gmail.com',
      location: '🇺🇸',
      spent: '$2,890.66',
    },
    {
      id: '1',
      image: Image02,
      name: 'Philip Harbach',
      email: 'philip.h@gmail.com',
      location: '🇩🇪',
      spent: '$2,767.04',
    },
    {
      id: '2',
      image: Image03,
      name: 'Mirko Fisuk',
      email: 'mirkofisuk@gmail.com',
      location: '🇫🇷',
      spent: '$2,996.00',
    },
    {
      id: '3',
      image: Image04,
      name: 'Olga Semklo',
      email: 'olga.s@cool.design',
      location: '🇮🇹',
      spent: '$1,220.66',
    },
    {
      id: '4',
      image: Image05,
      name: 'Burak Long',
      email: 'longburak@gmail.com',
      location: '🇬🇧',
      spent: '$1,890.66',
    },
  ];

  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200 w-[60%]">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Upcoming tasks</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Task</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Goal</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Type</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Due date</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100">
              {
                tasks?.map(task => {
                  return (
                    <tr key={task._id}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="font-medium text-slate-800">{task.name}</div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{task.boardName}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left text-sm font-bold w-fit bg-cyan-400 px-2 py-2 rounded-lg text-white">{task.type}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-sm font-bold text-center">{moment(task.dueDate).format('DD MMM YYYY')}</div>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

        </div>

      </div>
    </div>
  );
}

export default UpcomingTasks;
