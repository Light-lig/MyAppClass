import React from "react"
import { Fab, Icon, Box } from "native-base"
import { AntDesign } from "@expo/vector-icons"

 const Example = (props) => {
    return (
      <Box position="relative" w="100%">
        <Fab
          position="absolute"
          size="sm"
          icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
          onPress={()=>props.navigation.navigate('Add')}
        />
      </Box>
    )
  }

  export default Example;