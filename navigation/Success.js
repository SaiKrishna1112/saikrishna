import React from "react";
import { Root,Popup,Toast} from 'popup-ui'


export default function success(){
    return (
        
     Popup.show({
       type: 'Success',
       title: 'Success',
       button: true,
       textBody: 'Given Details Saved Succesfully',
       buttontext: 'Ok',
       callback: () => Popup.hide(),
   
     })
           );
   }

   
