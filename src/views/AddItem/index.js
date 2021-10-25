import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Platform, Image } from 'react-native';
import { VStack, Button, FormControl, Input, Heading, Avatar, Center, useToast,TextArea } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
const Formulario = () => {
  const initialState = { btnGuardar: true }

  const toast = useToast();
  const [formData, setData] = useState(initialState);
  const [errors, setErros] = useState({});
  const [image, setImage] = useState(null);
  const [icon, setIcon] = useState(null);

  const validate = () => {
    if (formData.titulo === undefined) {
      setErros({
        ...errors,
        titulo: 'Campo requerido'
      })
      return false;
    }
    if (formData.introduccion === undefined) {
      setErros({
        ...errors,
        introduccion: 'Campo requerido'
      })
      return false;
    }
    if (formData.descripcion === undefined) {
      setErros({
        ...errors,
        descripcion: 'Campo requerido'
      })
      return false;
    }
    if (formData.btnIcono === undefined) {
      setErros({
        ...errors,
        btnIcono: 'Campo requerido'
      })
      return false;
    }
    if (formData.btnPortada === undefined) {
      setErros({
        ...errors,
        btnPortada: 'Campo requerido'
      })
      return false;
    }
    return true;
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      let localUri = result.uri;
      let filename = localUri.split('/').pop();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      setData({ ...formData, btnPortada: { uri: localUri, name: filename, type } })
    }
  };
  const pickIcon = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setIcon(result.uri);
      let localUri = result.uri;
      let filename = localUri.split('/').pop();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      // Upload the image using the fetch and FormData APIs
      // Assume "photo" is the name of the form field the server expects
      setData({ ...formData, btnIcono: { uri: localUri, name: filename, type } })
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          toast.show({
            description: "Sorry, we need camera roll permissions to make this work!",
          })
        }
      }
    })();
  }, []);
  const onSubmit = () => {
    console.log(formData)
    validate() ? axios.post(`http://127.0.0.1:8080/webservice/formularios/registro.php`, formData)
      .then((response) => {
        setData(initialState);
        toast.show({
          description: "Se agrego correctamente",
        })
      }).catch((err) => {
        console.log(err);
        toast.show({
          description: "Ocurrio un error.",
        })
      }) : console.log('Invalido')
  }
  return (<VStack width='90%' mx="3">
    <Heading textAling="center">
      Turismo
    </Heading>
    <FormControl isRequired isInvalid={'titulo' in errors || 'introduccion' in errors || 'descripcion' in errors || 'btnIcono' in errors || 'btnPortada' in errors}>
      <FormControl.Label _text={{ bold: true }}>Titulo</FormControl.Label>
      <Input placeholder="Titulo"
        onChangeText={(value) => setData({ ...formData, titulo: value })}
      />
      {'titulo' in errors ? <FormControl.ErrorMessage _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>{errors.titulo}</FormControl.ErrorMessage> : <></>}
      <FormControl.Label _text={{ bold: true }}>Introduccion</FormControl.Label>
      <Input placeholder="Titulo"
        onChangeText={(value) => setData({ ...formData, introduccion: value })}
      />
      {'introduccion' in errors ? <FormControl.ErrorMessage _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>Error campo requerido</FormControl.ErrorMessage> : <></>}
      <FormControl.Label _text={{ bold: true }}>Descripcion</FormControl.Label>
      <TextArea placeholder="Descripcion"
        onChangeText={(value) => setData({ ...formData, descripcion: value })}
      />
      {'descripcion' in errors ? <FormControl.ErrorMessage _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>Error campo requerido</FormControl.ErrorMessage> : <></>}
      <Button onPress={pickIcon} mt={5}>Agrega una imagen para el Icono</Button>
      <Center>      {icon && <Avatar source={{ uri: icon }} />}
      </Center>
      {'btnIcono' in errors ? <FormControl.ErrorMessage _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>Error campo requerido</FormControl.ErrorMessage> : <></>}

      <Button onPress={pickImage} mt={10}>Agrega una imagen para la portada</Button>
      {image && <Image source={{ uri: image }} style={{ width: '100%', height: 200 }} />}
      {'btnPortada' in errors ? <FormControl.ErrorMessage _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>Error campo requerido</FormControl.ErrorMessage> : <></>}

    </FormControl>
    <Button onPress={onSubmit} mt='5' colorScheme='cyan'>Agregar</Button>
  </VStack>

  );
}

export default Formulario;