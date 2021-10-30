import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

export default function ImageRoute() {

    let {id} = useParams();
    const imgRef = useRef(null);

    id = id.replace('.gif', '');
    
    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/images/${id}`)
        .then((response) => {
            if(response.data !== null) {
                const item = response.data[Math.floor(Math.random()*response.data.length)];    
                // imgRef.current.src = item;       
                document.body.innerHTML = `<img src="${item}"></img>`;    
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [id]);

    return <img ref={imgRef} alt="display" />
}