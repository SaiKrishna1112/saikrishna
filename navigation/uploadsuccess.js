import React from "react";
import { Root,Popup,Toast} from 'popup-ui'


export default function uploadsuccess(){
    return (
        
     Popup.show({
       type: 'Success',
       title: 'Success',
       button: true,
       textBody: 'Successfully Uploaded Your File',
       buttontext: 'Ok',
       callback: () => Popup.hide(),
   
     })
           );
   }
