import React,{useState} from 'react';
import { UnitEquipment } from '../UnitEquipment';

import './equipment-container.css';

export const EquipmentContainer = ({equipment}) => {
    return (
        <div className='equipment-container'>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Number</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {equipment.map(item =>(
                        <UnitEquipment
                            key={item.name}
                            nameUnit={item.name}
                            numberUnit={item.number}
                            id={item.id}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}