import React from 'react';

const ListUserInModal = (props) => {
    const {users} = props
    return (
        <div className='users-list flex flex-col'>
            <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
                <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
                    <div className='overflow-hidden'>
                        <table className='min-w-full text-left text-sm font-light'>
                            <thead className='border-b font-medium'>
                                <tr>
                                    <th scope='col' className='px-6 py-4'>
                                        #
                                    </th>
                                    <th scope='col' className='px-6 py-4'>
                                        Display name
                                    </th>
                                    <th scope='col' className='px-6 py-4'>
                                        Email
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index)=> 
                                    (<tr key={index} className='border-b transition duration-300 ease-in-out hover:bg-neutral-100'>
                                    <td className='whitespace-nowrap px-6 py-4 font-medium'>
                                        {index+1}
                                    </td>
                                    <td className='whitespace-nowrap px-6 py-4'>
                                        {user.name}
                                    </td>
                                    <td className='whitespace-nowrap px-6 py-4'>
                                        {user.email}
                                    </td>
                                </tr>)
                                )}
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListUserInModal;
