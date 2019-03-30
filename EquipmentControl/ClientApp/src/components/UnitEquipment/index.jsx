import React,{useState,useEffect,useRef} from 'react';

import './unit-equipment.css';
import { APIEquipment } from '../../support/constants';
import { EquipmentContext } from '../../context';

export const UnitEquipment = ({id,nameUnit,numberUnit}) => {
    const [editable, setEditable] = useState(false);
    const [name, setName] = useState(nameUnit);
    const [number, setNumber] = useState(numberUnit);
    let unit = {
        id : id,
        name : name,
        number : number
    };
    const node = useRef();

    useEffect(() => {
        document.addEventListener("mousedown", handleClick);
    
        return () => {
          document.removeEventListener("mousedown", handleClick);
        };
      }, []);
//detect outside click with using refs
    const handleClick = e => {
        if (node.current.contains(e.target)){
            return;
        }
        setEditable(false);
    }
    
    const changeName = e => {
        let length = e.target.value.length;
        if (!(length>0 && length <50)) {
            return false;
        }
        setName(e.target.value);
        unit.name=e.target.value;
        changeUnit(unit);
    }

    const changeNumber = e => {
        if (!(e.target.value>0)) {
            return false;
        }
        setNumber(e.target.value)
        unit.number=e.target.value;
        changeUnit(unit);
    }

    return(
        <EquipmentContext.Consumer>
            {value=> (
                <React.Fragment>
                    {(editable) ?
                        <tr ref={node}>
                            <td>
                                <input
                                    value={name}
                                    onChange={changeName}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={number}
                                    onChange={changeNumber}
                                />
                            </td>
                        </tr>
                        :
                        <tr ref={node}>
                            <td>{name}</td>
                            <td>{number}</td>
                            <td>
                                <img
                                    src='./img/edit.png'
                                    alt='1'
                                    onClick={()=>setEditable(true)}
                                />
                            </td>
                            <td>
                                <img
                                    src='./img/ic_trash.png'
                                    alt='1'
                                    onClick = {()=>removeUnit(id,value)}
                                />
                            </td>
                        </tr>
                    }
                </React.Fragment>
            )}
        </EquipmentContext.Consumer>
    );
}
//action on click to unit recycle-bin
const removeUnit = (id,value) => {
    fetch(APIEquipment + '/' + id, {
        method: 'GET'
    }).then(response =>response.status)
    .then(()=>value.onDelete());
}
//action on submit change of unit
const changeUnit = (unit) => {
    fetch(APIEquipment, {
        method: 'put',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(unit)
    }).then(response =>response.status)
}