import React, { useEffect } from "react";
import { VStack, Heading, Box, Spinner, FlatList } from "native-base";
import News from "../../components/news";
import Fab from "../../components/fab";
import useData from "../../customHooks/useData";
const Home = ({ navigation }) => {
  const datos = useData();

  return (
    <VStack space={4} alignItems="center">
      <Heading>
        Turismo
        <Heading color="emerald.500"> React Ecosystem</Heading>
      </Heading>
      <Box flex={1} px="3" safeArea>
        {datos.length > 0 ? (
          <FlatList
            data={datos}
            h={650}
            renderItem={({ item }) => <News data={item} navigation={navigation} />}
            keyExtractor={item => item.id}
          />
        ) : (
          <Spinner accessibilityLabel="Loading posts" />
        )}
      </Box>
      <Fab navigation={navigation} />
    </VStack>
  );
};

export default Home;
