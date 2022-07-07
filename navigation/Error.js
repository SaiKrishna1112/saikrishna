import React from "react";
import { Root,Popup,Toast} from 'popup-ui'

export default function error(){
    return (
    
      Popup.show({
        type: 'Error',
        title: 'OOPS',
        button: true,
        textBody: response.error,
        buttontext: 'Ok',
        callback: () => Popup.hide(),
    
      })
    )
  }