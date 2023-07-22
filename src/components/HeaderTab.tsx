import { Icon } from "@rneui/themed";
import React from "react";
import { View } from "react-native";
import { usePageNavigtation } from "../hooks/usePageNavigation";



export function HeaderTab(props:{children?:React.ReactNode,arrowColor?:string}){
    const {children,arrowColor = '#333333'} = props
    const {goBack}= usePageNavigtation()
    return (
        <View
          style={{
            flexDirection:'row',
            height:40,
            width:'100%',
            alignItems:'center'
          }}
        >
            <Icon
              name='angle-left'
              type='font-awesome'
              color={arrowColor}
              size={30}
              style={{
                paddingHorizontal:10,
              }}
              onPress={goBack}
            />
            {children}
        </View>
    )
}