import React from "react";
import { Text, Heading, Box, AspectRatio, Stack, HStack } from "native-base";
import { StyleSheet, TouchableOpacity, Image, View } from "react-native";
const systemDate = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
  return today;
};
const News = (props) => (
  <TouchableOpacity
    onPress={() => props.navigation.navigate("Edit", { item: props.data })}
  >
    <Box
      shadow="2"
      rounded="lg"
      mt={5}
      _light={{ bg: "coolGray.50" }}
      _dark={{ bg: "gray.700" }}
    >
      <Image
        source={{
          uri: `http://localhost/webservice/imagenes/sitios/${props.data.imagenportada}`,
        }}
        alt="image base"
        style={{
          width: "100%",
          height: 260,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
      />

      <Text bold position="absolute" color="success.500" top="0" m="4">
        {props.data.titulo}
      </Text>
      <Stack space="2" p="4">
        <Text color="gray.400">{systemDate()}</Text>
        <Heading size={["md", "lg", "md"]} fontWeight="medium">
          {props.data.titulo}{" "}
        </Heading>
        <Text isTruncated noOfLines={["4", "4", "4"]}>
          {props.data.descripcion}
        </Text>
      </Stack>
    </Box>
  </TouchableOpacity>
);

export default News;
