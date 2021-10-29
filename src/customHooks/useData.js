import React, {useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';

import axios from 'axios';
const useData = () =>{
    const [data, setData] = useState([]);
    
    useFocusEffect(  React.useCallback(()=>{
         axios.get('http://localhost/webservice/').then((response)=>{
            setData(response.data.items);
        }).catch((err)=>{
            setData([]);
        })
    },[]))

    return data;
}

export default useData;