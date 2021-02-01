import React from 'react';

const LogItem = (props)=>{
    
    const PrintItems = ()=>{
        let { items } = props;
        let print = items.map((item)=>
            <p className="container-item" key={item.id}>{item.value}</p>
        )
        return print;
    }
    
     
    return (
        <>
        {PrintItems()}
        </>
    );
    
}
 
export default LogItem;