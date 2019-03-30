import React,{useState} from 'react';

import './menu.css';
import { APIEquipment } from '../../support/constants';

export const Menu = ({hierarchy,onMenuElemClick}) => {
    let keys = Object.keys(hierarchy[0]);
//we delete id from keys as it does not participate in iteration
    keys.shift();
    return (
        <div className="menu">
            <p className='menu-label'>Equipment App</p>
            <CompanyTree
                hierarchy={hierarchy}
                keys={keys}
                onMenuElemClick={onMenuElemClick}
            />
        </div>
    );
}

const CompanyTree = ({hierarchy,keys,onMenuElemClick,count=0}) => {
    let currentKey = keys[count];
//array of current level values
    const uniqueElements = [...new Set(hierarchy.map(item => item[currentKey]))];
    return(
        <ul>
            {uniqueElements.map(element=>{
//define a hierarchy branch for each value. listId - list of all id leafs, included in the current branch. need to load equipment.
                let restHierarchy = hierarchy.filter(item=> item[currentKey] === element);
                const listId = [...new Set(restHierarchy.map(item => item.id))];
                if (listId.length>1) {
                    return (
                        <li key={element}>
                            <p
                                onClick={()=>onMenuElemClick(listId)}
                            >
                                {element}
                            </p>
                            <CompanyTree
                                hierarchy={restHierarchy}
                                keys={keys}
                                count={count+1}
                                onMenuElemClick={onMenuElemClick}
                            />
                        </li>
                    )
                } else if (listId.length===1) {
//listId.length===1 - we have leaf of tree.
                    return(
                        <Leaf
                            onMenuElemClick={onMenuElemClick}
                            listId={listId}
                            element={element}
                        />
                    )
                }
            })}
        </ul>
    );
}

const Leaf = ({onMenuElemClick,listId,element}) =>{
    let LeafId = listId[0];
//method for check availability of equipment
    function indicateEquipment(id){
        fetch(APIEquipment+'/check/'+id,
            {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            }
            })
            .then(response =>response.json())
            .then(data => {
                setIndicator(data);
            })
    }
    const [indicator,setIndicator] = useState(false);
    indicateEquipment(LeafId);
    return(
        <li key={element}>
            <p
                onClick={()=>onMenuElemClick(listId)}
            >
                <div className={indicator ? 'circle':'circle-red'}/>
                {element}
            </p>
        </li>
    )
}