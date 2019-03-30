import React,{useState} from 'react'
import {Modal,Dropdown} from 'semantic-ui-react';
import './add-unit.css';
import { APIEquipment } from '../../support/constants';
import { EquipmentContext } from '../../context';
export const AddUnit = ({hierarchy}) => {

    const [modalOpen,setOpen] = useState(false);
    const [name,setName] = useState('');
    const [number,setNumber] = useState();
    const [room,setRoom] = useState();

    let unit = {
        name : name,
        number : number,
        roomId : room
    };

    const roomOptions = hierarchy.map(room => ({
        key: room.roomName,
        text: room.city + ': ' + room.roomName,
        value: room.id,
    }))
    
    const changeName = e => {
        let length = e.target.value.length;
        if (!(length>0 && length <50)) {
            return false;
        }
        setName(e.target.value);
        unit.name=e.target.value;
    }

    const changeNumber = e => {
        if (!(e.target.value>0 && e.target.value<10000)) {
            return false;
        }
        setNumber(e.target.value);
        unit.number=e.target.value;
    }

    const changeRoom = (e,{value}) => {
        if (!(value>0)) {
            return false;
        }
        setRoom(value);
        unit.roomId=value;
    }

    const addUnit = (value) => {
        if(!(name.length>0 && number && room)){
            return false;      
        }
        fetch(APIEquipment +'/'+'Add', {
            method: 'put',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(unit)
        }).then(response =>value.onAdd());
        setName('');
        setNumber('');
        setRoom('');
        setOpen(false);
    }

    return(
        <EquipmentContext.Consumer>
            {value=> (
                <Modal
                    open={modalOpen}
                    onClose={()=>setOpen(false)}
                    size='small'
                    trigger={<button onClick={()=>setOpen(true)}>Add Unit</button>}
                >
                    <div className='add-modal'>
                        <p>New unit</p>
                        <input
                            placeholder='Enter name'
                            value={name}
                            onChange={changeName}
                        />
                        <input
                            type='number'
                            placeholder='Enter number'
                            value={number}
                            onChange={changeNumber}
                        />
                        <Dropdown
                            selection
                            placeholder='Select your room'
                            options={roomOptions}
                            onChange={changeRoom}
                        />
                        <button onClick={()=>addUnit(value)}>Submit</button>
                    </div>
                </Modal>
            )}
        </EquipmentContext.Consumer>
    )
}